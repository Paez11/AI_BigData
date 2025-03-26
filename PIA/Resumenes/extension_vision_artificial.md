# Visión Artificial: Resumen

## Dificultades en la Visión Artificial
- Ambigüedad en la definición de un concepto.
- Cambios de iluminación, escala, deformación, oclusión y movimiento.
- Pérdida de información al pasar de escenas 3D a imágenes 2D.

## Etapas de Preprocesamiento de Imágenes Digitales
- Atenuación de la degradación de la imagen.
- Supresión de ruido.
- Realce del contraste.

## Imagen Digital: Representación Computacional
- Una imagen digital es una función discreta que representa la proyección de una imagen real.
- Se almacena como una matriz de píxeles con valores asociados a intensidad o color.

## Resolución e Imagen en Color
- **Resolución espacial**: Número de píxeles (M filas x N columnas).
- **Resolución espectral**: Número de bandas de la imagen.
- **Resolución radiométrica**: Niveles de cuantización de color.
- **Resolución temporal**: Intervalo entre muestras en imágenes dinámicas.

### Espacios de Color
- **RGB**: Representa el color con combinaciones de rojo, verde y azul.
- **HSV**: Representa el color con tono (hue), saturación y brillo (value).

## Tipos de Distancias en Imágenes
- **Euclídea**: Distancia en línea recta.
- **Manhattan (D4 o D1)**: Pasos verticales/horizontales mínimos.
- **Tchebychev (D8 o D∞)**: Movimientos diagonales, verticales y horizontales.

## Convolución
- Aplicación de una máscara o filtro sobre la imagen.
- Utilizada para detección de bordes y suavizado.

## Histogramas
- Representación gráfica de la distribución de niveles de gris en una imagen.
- Permite analizar brillo y contraste.

## Segmentación y Umbralización
- **Segmentación**: Identificación de regiones homogéneas en una imagen.
- **Umbralización**: Separación de fondo y objeto con valores de intensidad.

---

# OpenCV: Biblioteca de Visión Artificial

## Funcionalidades Clave

### Manejo de Imágenes y Video
- Lectura (`imread`) y visualización (`imshow`).
- Procesamiento de video (`VideoCapture`, `VideoWriter`).

### Manipulación de Imágenes
- Acceso y modificación de píxeles (`NumPy`).
- Ajuste de brillo y contraste (`numpy.clip`).
- Recorte y redimensionado (`resize`).

### Espacios de Color y Conversiones
- Conversión entre RGB, BGR, HSV (`cvtColor`).
- División y fusión de canales (`split`, `merge`).

### Filtrado y Mejora
- Aplicación de desenfoque (`blur`).

### Detección de Características
- Algoritmos como "Good Features to Track".
- Uso de ORB para extracción de descriptores.

### Alineación de Imágenes
- Uso de `findHomography` y `warpPerspective` para registro de imágenes.

### Detección de Objetos y Rostros
- Modelos preentrenados con TensorFlow (`readNetFromTensorflow`).
- Redes neuronales convolucionales para detección facial (`readNetFromCafe`).

### Estimación de Pose Humana
- OpenPose para detección de articulaciones humanas.

### Seguimiento de Objetos
- Algoritmos de tracking como KCF, CSRT, GoTURN.

### Umbralización
- Umbralización global y adaptativa (`threshold`, `adaptiveThreshold`).

### Operaciones Bitwise
- AND, OR, XOR en imágenes (`bitwise_and`, `bitwise_not`).

### Imágenes HDR
- Combinación de imágenes de diferentes exposiciones (`createMergeDebevec`).

### Creación de Panoramas
- Uso de `Stitcher` para combinar imágenes.

### Anotación de Imágenes
- Dibujo de líneas, círculos, rectángulos y texto (`cv2.line`, `cv2.putText`).

### Integración con Otras Bibliotecas
- **NumPy** para manejo eficiente de matrices.
- **Matplotlib** para visualización en Jupyter Notebooks.
- **TensorFlow, Cafe, PyTorch** para integración con aprendizaje profundo.

---

# Avances en Visión Artificial

## V-Estrella: Nueva Meta-Arquitectura
- Uso de modelos multimodales con conocimiento del mundo.
- Aplicación de búsqueda inteligente en imágenes de alta resolución.
- Enfoque iterativo con mapas de atención.

## Redes Neuronales Convolucionales (CNNs)
- Inspiradas en la visión humana.
- Uso de filtros para extraer características.
- Mapas de características generados en cada capa.
- Estructura jerárquica con capas convolucionales y totalmente conectadas.

---

OpenCV es una herramienta poderosa para la visión artificial, integrando procesamiento de imágenes, detección de objetos y aprendizaje profundo con facilidad.
