import cv2
import numpy as np
import os
import matplotlib.pyplot as plt
from glob import glob
from deepface import DeepFace

def load_model():
    """Carga el modelo de detección de rostros."""
    prototxt_path = "weights/deploy.prototxt.txt"
    model_path = "weights/res10_300x300_ssd_iter_140000_fp16.caffemodel"
    return cv2.dnn.readNetFromCaffe(prototxt_path, model_path)

# Cargar modelo de estimación de edad
prototxt_age_path = "weights/age_deploy.prototxt"
model_age_path = "weights/age_net.caffemodel"
age_net = cv2.dnn.readNetFromCaffe(prototxt_age_path, model_age_path)
age_ranges = ['(0-2)', '(4-6)', '(8-12)', '(15-20)', '(25-32)', '(38-43)', '(48-53)', '(60-100)']

def detect_faces(image, model):
    """Detecta rostros en la imagen usando OpenCV DNN."""
    height, width = image.shape[:2]
    blob = cv2.dnn.blobFromImage(image, 1.0, (300, 300), (104.0, 177.0, 123.0))
    model.setInput(blob)
    detections = model.forward()
    return [(d[2], (d[3:7] * np.array([width, height, width, height])).astype(int)) for d in detections[0, 0] if d[2] > 0.4]

def estimate_age(face_img):
    """Analiza la edad del rostro usando el modelo de edad."""
    blob = cv2.dnn.blobFromImage(face_img, scalefactor=1.4, size=(227, 227), mean=(80, 90, 110), swapRB=False, crop=False)
    age_net.setInput(blob)
    predictions = age_net.forward()
    age_index = predictions[0].argmax()
    return age_ranges[age_index]

def apply_blur(face):
    """Aplica un desenfoque gaussiano en el rostro."""
    kernel_size = (face.shape[1] // 7 | 1, face.shape[0] // 7 | 1)
    return cv2.GaussianBlur(face, kernel_size, 0)

def process_images(input_dir, output_dir, model):
    """Procesa todas las imágenes en el directorio de entrada."""
    os.makedirs(output_dir, exist_ok=True)
    
    for image_path in glob(os.path.join(input_dir, "*.jpg")):
        image = cv2.imread(image_path)
        if image is None:
            print(f"Error: No se pudo cargar {image_path}")
            continue
        
        for confidence, (start_x, start_y, end_x, end_y) in detect_faces(image, model):
            face = image[start_y:end_y, start_x:end_x]
            if face.size == 0:
                continue
            age = estimate_age(face)
            age_number = int(age.strip('()').split('-')[0])  # Obtener edad aproximada
            if age_number < 18:
                face = apply_blur(face)
            image[start_y:end_y, start_x:end_x] = face
            cv2.rectangle(image, (start_x, start_y), (end_x, end_y), (0, 255, 0), 2)
            cv2.putText(image, age, (start_x, start_y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
        
        output_path = os.path.join(output_dir, os.path.basename(image_path))
        cv2.imwrite(output_path, image)
        print(f"Procesado: {output_path}")

def show_images(directory):
    """Muestra las imágenes procesadas."""
    for filename in filter(lambda f: f.endswith(('.jpg', '.jpeg', '.png')), os.listdir(directory)):
        image_path = os.path.join(directory, filename)
        img = plt.imread(image_path)
        plt.figure(figsize=(8, 6))
        plt.imshow(img)
        plt.title(filename)
        plt.axis('off')
        plt.show()

if __name__ == "__main__":
    input_directory = "input/"
    output_directory = "output/"
    model = load_model()
    process_images(input_directory, output_directory, model)
    show_images(output_directory)
