import cv2
import numpy as np
import os
import matplotlib.pyplot as plt
from deepface import DeepFace

def load_model():
    """Carga el modelo de detección de rostros."""
    prototxt_path = "weights/deploy.prototxt.txt"
    model_path = "weights/res10_300x300_ssd_iter_140000_fp16.caffemodel"
    return cv2.dnn.readNetFromCaffe(prototxt_path, model_path)

def detect_faces(image, model):
    """Detecta rostros en la imagen usando OpenCV DNN."""
    height, width = image.shape[:2]
    blob = cv2.dnn.blobFromImage(image, 1.0, (300, 300), (104.0, 177.0, 123.0))
    model.setInput(blob)
    detections = model.forward()
    return [(d[2], (d[3:7] * np.array([width, height, width, height])).astype(int)) for d in detections[0, 0] if d[2] > 0.4]

def apply_blur(face):
    """Aplica un desenfoque gaussiano más intenso en el rostro."""
    kernel_size = (face.shape[1] // 5 | 1, face.shape[0] // 5 | 1)  # Ajuste para mayor intensidad
    return cv2.GaussianBlur(face, kernel_size, 0)

def analyze_age(face):
    """Analiza la edad del rostro usando DeepFace."""
    try:
        cv2.imwrite("temp_face.jpg", face)  # Guardar temporalmente el rostro para análisis
        result = DeepFace.analyze(img_path="temp_face.jpg", actions=['age'], detector_backend='retinaface', model_name='FairFace', enforce_detection=True)
        os.remove("temp_face.jpg")  # Eliminar la imagen temporal después del análisis
        return result[0].get("age", 20)  # Retorna 18 si no se detecta la edad
    except Exception as e:
        print(f"Error en análisis de edad: {e}")
        return 20  # En caso de error, asumir edad adulta

def process_images(input_dir, output_dir, model):
    """Procesa todas las imágenes en el directorio de entrada."""
    os.makedirs(output_dir, exist_ok=True)
    
    for filename in filter(lambda f: f.endswith(('.jpg', '.jpeg', '.png')), os.listdir(input_dir)):
        image_path = os.path.join(input_dir, filename)
        image = cv2.imread(image_path)
        if image is None:
            print(f"Error: No se pudo cargar {filename}")
            continue
        
        for confidence, (start_x, start_y, end_x, end_y) in detect_faces(image, model):
            face = image[start_y:end_y, start_x:end_x]
            if face.size == 0:
                continue
            
            estimated_age = analyze_age(image_path)
            if estimated_age < 20:
                face = apply_blur(face)
                image[start_y:end_y, start_x:end_x] = face
        
        output_path = os.path.join(output_dir, f"{os.path.splitext(filename)[0]}_blurred{os.path.splitext(filename)[1]}")
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
