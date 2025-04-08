import cv2
import os
import numpy as np
from urllib.request import urlretrieve

VIDEO_PATH = "assets/VistaEntrada.mp4"
WEIGHTS_DIR = "weights"
CONFIDENCE_THRESHOLD = 0.5
NMS_THRESHOLD = 0.4
VEHICLE_CLASSES = {"car", "truck", "bus", "motorbike"}

class CentroidTracker:
    def __init__(self, max_disappeared=5, max_distance=50):
        self.next_id = 0
        self.objects = {}  # id: centroid
        self.disappeared = {}
        self.max_disappeared = max_disappeared
        self.max_distance = max_distance
        self.previous_positions = {}  # id: previous y position

    def update(self, input_centroids):
        if len(input_centroids) == 0:
            to_remove = []
            for object_id in list(self.disappeared.keys()):
                self.disappeared[object_id] += 1
                if self.disappeared[object_id] > self.max_disappeared:
                    to_remove.append(object_id)
            for oid in to_remove:
                self.objects.pop(oid, None)
                self.disappeared.pop(oid, None)
                self.previous_positions.pop(oid, None)
            return self.objects

        if len(self.objects) == 0:
            for centroid in input_centroids:
                self.objects[self.next_id] = centroid
                self.disappeared[self.next_id] = 0
                self.previous_positions[self.next_id] = centroid[1]
                self.next_id += 1
            return self.objects

        object_ids = list(self.objects.keys())
        object_centroids = list(self.objects.values())
        used_ids = set()

        for centroid in input_centroids:
            min_dist = float('inf')
            match_id = None
            for oid, obj_centroid in zip(object_ids, object_centroids):
                if oid in used_ids:
                    continue
                dist = np.linalg.norm(np.array(centroid) - np.array(obj_centroid))
                if dist < min_dist and dist < self.max_distance:
                    min_dist = dist
                    match_id = oid

            if match_id is not None:
                self.objects[match_id] = centroid
                self.disappeared[match_id] = 0
                used_ids.add(match_id)
            else:
                self.objects[self.next_id] = centroid
                self.disappeared[self.next_id] = 0
                self.previous_positions[self.next_id] = centroid[1]
                self.next_id += 1

        return self.objects

# He usado el modelo YOLOv4-tiny porque el modelo YOLOv4 es muy pesado y no puedo ejecutarlo bien, al igual que no detecta bien los cohes
# el modelo YOLOv4 es más preciso si al final se usa el script.
def download_weights():
    os.makedirs(WEIGHTS_DIR, exist_ok=True)
    if not os.path.exists(f"{WEIGHTS_DIR}/yolov4-tiny.weights"):
        urlretrieve(
            "https://github.com/AlexeyAB/darknet/releases/download/yolov4/yolov4-tiny.weights",
            f"{WEIGHTS_DIR}/yolov4-tiny.weights")
    if not os.path.exists(f"{WEIGHTS_DIR}/yolov4-tiny.cfg"):
        urlretrieve(
            "https://raw.githubusercontent.com/AlexeyAB/darknet/master/cfg/yolov4-tiny.cfg",
            f"{WEIGHTS_DIR}/yolov4-tiny.cfg")
    if not os.path.exists(f"{WEIGHTS_DIR}/coco.names"):
        urlretrieve(
            "https://raw.githubusercontent.com/pjreddie/darknet/master/data/coco.names",
            f"{WEIGHTS_DIR}/coco.names")

def load_model():
    net = cv2.dnn.readNet(f"{WEIGHTS_DIR}/yolov4-tiny.weights", f"{WEIGHTS_DIR}/yolov4-tiny.cfg")
    layer_names = net.getLayerNames()
    output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers().flatten()]
    with open(f"{WEIGHTS_DIR}/coco.names", "r") as f:
        classes = [line.strip() for line in f.readlines()]
    return net, output_layers, classes

def detect_vehicles(frame, net, output_layers, classes):
    height, width = frame.shape[:2]
    blob = cv2.dnn.blobFromImage(frame, 1/255.0, (416, 416), swapRB=True, crop=False)
    net.setInput(blob)
    outs = net.forward(output_layers)

    boxes, confidences, class_ids, centers = [], [], [], []

    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = int(scores.argmax())
            confidence = scores[class_id]

            if confidence > CONFIDENCE_THRESHOLD and classes[class_id] in VEHICLE_CLASSES:
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)

                x = int(center_x - w / 2)
                y = int(center_y - h / 2)

                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)
                centers.append((center_x, center_y))

    indexes = cv2.dnn.NMSBoxes(boxes, confidences, CONFIDENCE_THRESHOLD, NMS_THRESHOLD)
    return [(boxes[i], centers[i], class_ids[i]) for i in np.array(indexes).flatten()]

def draw_info(frame, detections, classes, tracker, frame_center_line, counted_ids):
    height, width = frame.shape[:2]
    centroids = [center for _, center, _ in detections]
    objects = tracker.update(centroids)

    entry_count, exit_count = 0, 0
    for object_id, centroid in objects.items():
        cv2.circle(frame, centroid, 4, (0, 255, 0), -1)
        cv2.putText(frame, f"ID {object_id}", (centroid[0] - 10, centroid[1] - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        prev_y = tracker.previous_positions.get(object_id, centroid[1])
        if object_id not in counted_ids:
            if prev_y < frame_center_line and centroid[1] >= frame_center_line:
                entry_count += 1
                counted_ids.add(object_id)
            elif prev_y > frame_center_line and centroid[1] <= frame_center_line:
                exit_count += 1
                counted_ids.add(object_id)
        tracker.previous_positions[object_id] = centroid[1]

    cv2.line(frame, (width // 4, frame_center_line), (width * 3 // 4, frame_center_line), (0, 255, 255), 2)
    cv2.putText(frame, f"Entradas: {len([i for i in counted_ids if tracker.previous_positions.get(i, 0) > frame_center_line])}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.putText(frame, f"Salidas: {len([i for i in counted_ids if tracker.previous_positions.get(i, 0) < frame_center_line])}", (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

    return frame

def main():
    download_weights()
    net, output_layers, classes = load_model()
    cap = cv2.VideoCapture(VIDEO_PATH)

    frame_center_line = None
    tracker = CentroidTracker()
    counted_ids = set()

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        if frame_center_line is None:
            frame_center_line = frame.shape[0] // 2

        detections = detect_vehicles(frame, net, output_layers, classes)
        frame = draw_info(frame, detections, classes, tracker, frame_center_line, counted_ids)

        cv2.imshow("Parking Door", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()