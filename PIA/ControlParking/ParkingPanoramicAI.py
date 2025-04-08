import os
import cv2
import numpy as np
from urllib.request import urlretrieve

VIDEO_PATH = "assets/VistaPanoramica.mp4"
WEIGHTS_DIR = "weights"
CONFIDENCE_THRESHOLD = 0.5
NMS_THRESHOLD = 0.4
MAX_SPOTS = 23

# He usado el modelo YOLOv4-tiny porque el modelo YOLOv4 es muy pesado y no puedo ejecutarlo bien, al igual que no detecta bien los cohes
# el modelo YOLOv4 es más preciso si al final se usa el script.
def download_weights():
    os.makedirs(WEIGHTS_DIR, exist_ok=True)
    if not os.path.exists(f"{WEIGHTS_DIR}/yolov4-tiny.weights"):
        urlretrieve("https://github.com/AlexeyAB/darknet/releases/download/yolov4/yolov4-tiny.weights",
                    f"{WEIGHTS_DIR}/yolov4-tiny.weights")
    if not os.path.exists(f"{WEIGHTS_DIR}/yolov4-tiny.cfg"):
        urlretrieve("https://raw.githubusercontent.com/AlexeyAB/darknet/master/cfg/yolov4-tiny.cfg",
                    f"{WEIGHTS_DIR}/yolov4-tiny.cfg")
    if not os.path.exists(f"{WEIGHTS_DIR}/coco.names"):
        urlretrieve("https://raw.githubusercontent.com/pjreddie/darknet/master/data/coco.names",
                    f"{WEIGHTS_DIR}/coco.names")

def load_model():
    net = cv2.dnn.readNet(f"{WEIGHTS_DIR}/yolov4-tiny.weights", f"{WEIGHTS_DIR}/yolov4-tiny.cfg")
    layer_names = net.getLayerNames()
    output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers().flatten()]
    with open(f"{WEIGHTS_DIR}/coco.names", "r") as f:
        classes = [line.strip() for line in f.readlines()]
    return net, output_layers, classes

def detect_cars(frame, net, output_layers, classes):
    height, width = frame.shape[:2]
    blob = cv2.dnn.blobFromImage(frame, 1/255.0, (416, 416), swapRB=True, crop=False)
    net.setInput(blob)
    outs = net.forward(output_layers)

    boxes, confidences = [], []
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]

            if classes[class_id] == "car" and confidence > CONFIDENCE_THRESHOLD:
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)
                x = int(center_x - w / 2)
                y = int(center_y - h / 2)

                boxes.append([x, y, w, h])
                confidences.append(float(confidence))

    indexes = cv2.dnn.NMSBoxes(boxes, confidences, CONFIDENCE_THRESHOLD, NMS_THRESHOLD)
    return [(boxes[i], confidences[i]) for i in np.array(indexes).flatten()]

def draw_annotations(frame, detections):
    car_count = len(detections)
    free_spots = max(0, MAX_SPOTS - car_count)

    for box, confidence in detections:
        x, y, w, h = box
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
        cv2.putText(frame, f"Car {confidence:.2f}", (x, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

    cv2.putText(frame, f"Cars Detected: {car_count}", (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.putText(frame, f"Free Spots: {free_spots}", (10, 70),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)
    return frame

def main():
    download_weights()
    net, output_layers, classes = load_model()

    cap = cv2.VideoCapture(VIDEO_PATH)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        detections = detect_cars(frame, net, output_layers, classes)
        frame = draw_annotations(frame, detections)

        cv2.imshow("Parking Panoramic", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
