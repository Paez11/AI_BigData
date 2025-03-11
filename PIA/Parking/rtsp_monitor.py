import cv2
import time
import os
from datetime import datetime

# URL RTSP de la cámara
RTSP_URL = "rtsp://admin:IESgc14@@192.168.127.72:554/"

# Carpeta donde se almacenarán las imágenes
SAVE_FOLDER = 'capturas'
os.makedirs(SAVE_FOLDER, exist_ok=True)

# Cargar clasificadores Haar para detectar personas y coches
#person_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_fullbody.xml')
person_cascade = cv2.CascadeClassifier('C:\Program Files\Python312\Lib\site-packages\cv2\data\haarcascade_fullbody.xml')
#car_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_car.xml')
car_cascade = cv2.CascadeClassifier('C:\Program Files\Python312\Lib\site-packages\cv2\data\haarcascade_car.xml')

# Iniciar la captura de video
cap = cv2.VideoCapture(RTSP_URL)

if not cap.isOpened():
    print("Error al abrir la transmisión RTSP.")
    exit()

# Establecer el tamaño de la ventana (ejemplo: 640x480)
window_width = 640
window_height = 480

cv2.namedWindow("RTSP Stream", cv2.WINDOW_NORMAL)
cv2.resizeWindow("RTSP Stream", window_width, window_height)

try:
    while True:
        # Intentar leer un frame de la cámara
        ret, frame = cap.read()
        
        if not ret:
            print("No se pudo leer el frame. Intentando reconectar...")
            cap = cv2.VideoCapture(RTSP_URL)
            time.sleep(2)
            continue

        # Convertir el frame a escala de grises para la detección
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detectar personas y coches en el frame
        persons = person_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        cars = car_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(50, 50))

        # Lógica para detectar un coche o una persona
        evento_detectado = False
        
        if len(persons) > 0:
            # Dibujar rectángulos alrededor de las personas detectadas
            for (x, y, w, h) in persons:
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            evento_detectado = True
            objeto_detectado = "Persona"
        
        if len(cars) > 0:
            # Dibujar rectángulos alrededor de los coches detectados
            for (x, y, w, h) in cars:
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
            evento_detectado = True
            objeto_detectado = "Coche"

        # Si se detecta una persona o un coche, tomar una captura
        if evento_detectado:
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = os.path.join(SAVE_FOLDER, f"{objeto_detectado}_{timestamp}.jpg")
            cv2.imwrite(filename, frame)
            print(f"{objeto_detectado} detectado. Imagen guardada: {filename}")

        # Mostrar el video en vivo
        cv2.imshow("RTSP Stream", frame)
        
        # Esperar antes de la siguiente comprobación
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
        
except KeyboardInterrupt:
    print("Terminando la captura de video...")
finally:
    cap.release()
    cv2.destroyAllWindows()