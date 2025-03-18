import os
import cv2
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image, ImageDraw, ImageFont
import rembg
import time


# Parámetros globales
pixels_per_cm = 13  # Píxeles por cm (ajustar según tu referencia)
umbrales = [150, 165, 175, 180, 185, 190, 195, 200, 205, 210]
vol1 = None  # Volumen inicial
tiempos_iniciales = None
volumenes = []  # Lista para almacenar los volúmenes
etiquetas_tiempo = []  # Lista para almacenar las etiquetas de tiempo


def remove_background(image_path):
    input_image = Image.open(image_path)
    input_array = np.array(input_image)
    output_array = rembg.remove(input_array)
    output_image = Image.fromarray(output_array).convert("RGB")
    return output_image


def estimate_volume(image):
    image_cv = np.array(image)
    gray = cv2.cvtColor(image_cv, cv2.COLOR_RGB2GRAY)
    _, thresh = cv2.threshold(gray, 10, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    if len(contours) == 0:
        return 0, None

    largest_contour = max(contours, key=cv2.contourArea)

    if len(largest_contour) < 5:
        return 0, None

    ellipse = cv2.fitEllipse(largest_contour)
    (x, y), (major_axis, minor_axis), angle = ellipse

    c = 0.6 * major_axis
    volume = ((4 / 3) * np.pi * (major_axis / 2) * (minor_axis / 2) * (c / 2)) * 0.5

    return volume, ellipse


def estimate_volume_cm3(image):
    volume, ellipse = estimate_volume(image)
    if ellipse is None:
        return 0, None

    (x, y), (major_axis, minor_axis), angle = ellipse
    major_axis_cm = major_axis / pixels_per_cm
    minor_axis_cm = minor_axis / pixels_per_cm
    c_cm = 0.6 * major_axis_cm
    volume_cm3 = ((4 / 3) * np.pi * (major_axis_cm / 2) * (minor_axis_cm / 2) * (c_cm / 2)) * 0.5

    return volume_cm3, ellipse


def plot_volume_evolution():
    plt.figure(figsize=(10, 5))
    plt.plot(etiquetas_tiempo, volumenes, marker='o')
    plt.xlabel("Tiempo Transcurrido")
    plt.ylabel("Volumen (cm³)")
    plt.title("Evolución del Volumen del Pan")
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    plt.savefig('output_pan/evolucion_volumen.png')  # Guardar gráfico como imagen
    plt.show()


def process_images():
    folder_path = "pan"
    image_files = sorted([f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))])

    output_folder = "output_pan"
    os.makedirs(output_folder, exist_ok=True)

    global vol1, tiempos_iniciales, volumenes, etiquetas_tiempo
    first_ellipse = None
    volumen_inicial = None
    tiempos_iniciales = time.time()

    for i, image_file in enumerate(image_files):
        image_path = os.path.join(folder_path, image_file)
        image = remove_background(image_path)
        volume_cm3, ellipse = estimate_volume_cm3(image)
        tiempo_actual = time.time() - tiempos_iniciales

        if i == 0:  
            vol1 = volume_cm3
            first_ellipse = ellipse
            volumen_inicial = volume_cm3
            continue

        image_cv = np.array(image)
        if ellipse:
            cv2.ellipse(image_cv, ellipse, (0, 255, 0), 2)
        if first_ellipse:
            cv2.ellipse(image_cv, first_ellipse, (0, 0, 255), 2)

        porcentaje_vol = (volume_cm3 / vol1) * 100
        minutos, segundos = divmod(int(tiempo_actual), 60)
        texto_tiempo = f"{minutos}m{segundos}s"

        cv2.putText(image_cv, f"Foto {i + 1}: {texto_tiempo}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
        cv2.putText(image_cv, f"Volumen estimado: {porcentaje_vol:.2f}%", (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

        if porcentaje_vol >= 150:
            for umbral in umbrales:
                if porcentaje_vol >= umbral:
                    cv2.putText(image_cv, f"AVISO > {umbral}%", (10, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

        output_path = os.path.join(output_folder, image_file)
        output_image = Image.fromarray(image_cv)
        output_image.save(output_path)

        # Almacenar el volumen y el tiempo
        volumenes.append(volume_cm3)
        etiquetas_tiempo.append(texto_tiempo)

    # Llamar a la función de graficado
    plot_volume_evolution()


if __name__ == "__main__":
    process_images()
