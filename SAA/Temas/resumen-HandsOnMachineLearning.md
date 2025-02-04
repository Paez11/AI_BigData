# Proyecto de Aprendizaje Automático: Predicción de Precios de Viviendas en California

Este proyecto simula el caso de un científico de datos recién contratado en una compañía inmobiliaria, con el objetivo de predecir el precio medio de viviendas en distintos distritos basándose en datos del censo de California (datos del año 1990). Aunque el conjunto de datos no es reciente, presenta características muy interesantes para aprender y aplicar distintas técnicas de análisis, transformación y modelado.

---

## 1. Entender el Panorama General y Enmarcar el Problema

### Objetivo del Proyecto
- **Meta principal:** Predecir el precio medio de viviendas en cada distrito utilizando las métricas del censo.
- **Aplicación:** La predicción alimentará a otro sistema de Aprendizaje Automático que determinará si es rentable invertir en un área determinada.

### Aspectos a Considerar
- **Definición del problema:** Es esencial definir si el problema es de regresión (predicción numérica) o clasificación (por ejemplo, si se convierten los precios en categorías). En este caso, se trata de un problema de regresión.
- **Métricas de desempeño:** Se selecciona el error cuadrático medio (RMSE) para evaluar la calidad de las predicciones.
- **Entendimiento del negocio:** Es importante preguntar a los responsables cuál es la finalidad del modelo y cómo se integrará en el flujo de trabajo general de la empresa.

### Importancia de los Pipelines de Datos
- **Qué son:** Secuencias de procesos que manipulan y transforman los datos desde la ingesta hasta su uso en los modelos.
- **Ventajas:** Permiten que cada componente sea autónomo, facilitando el mantenimiento y la escalabilidad. Además, si un componente falla, los siguientes pueden seguir funcionando utilizando la última salida válida.
- **Riesgos:** Sin un monitoreo adecuado, un componente defectuoso puede pasar desapercibido y afectar el rendimiento global del sistema.

---

## 2. Obtener y Explorar los Datos

### Descarga y Preparación Inicial
- **Fuente de datos:** Conjunto de datos de precios de viviendas en California, obtenido del repositorio StatLib (1990). Para fines didácticos, se han modificado algunos atributos, añadiendo uno categórico y eliminando otros.
- **Automatización:** Es preferible automatizar la descarga y descompresión de los datos, en lugar de hacerlo manualmente.

### Análisis de la Estructura de los Datos
- **Representación:** Cada fila corresponde a un distrito (o “block group”) con múltiples atributos numéricos y uno categórico (`ocean_proximity`).
- **Datos faltantes:** Algunos atributos, como `total_bedrooms`, tienen valores nulos (aproximadamente 207 distritos). Es fundamental detectar y tratar estos valores para evitar problemas durante el modelado.
- **Inspección rápida:** Métodos como `info()`, `describe()` y `value_counts()` ayudan a entender la distribución y calidad de los datos.
- **Visualización:** Generar histogramas para cada atributo numérico permite identificar:
  - Escalas y rangos muy diferentes entre atributos.
  - Posibles outliers o valores atípicos.
  - Distribuciones sesgadas (por ejemplo, la mayoría de los datos pueden estar concentrados en un rango específico).

### Creación del Conjunto de Prueba
- **Objetivo:** Reservar una parte de los datos para evaluar el modelo en datos no vistos y evitar el sobreajuste.
- **Técnicas de muestreo:**
  - **Muestreo aleatorio:** Puede introducir sesgos si el conjunto no es lo suficientemente grande.
  - **Muestreo estratificado:** Se recomienda, especialmente utilizando un atributo importante como el ingreso medio. Se crea una nueva variable categórica basada en el ingreso para asegurar la representatividad en el conjunto de prueba.
- **Identificadores únicos:** Es aconsejable usar identificadores únicos (por ejemplo, el índice de la fila) para que la partición de prueba sea consistente a lo largo del tiempo y se evite la “fuga de datos” (data snooping).

---

## 3. Preparación y Transformación de los Datos para Modelado

### Limpieza de Datos
- **Tratamiento de valores faltantes:**
  - **Eliminación:** Se pueden descartar instancias o atributos completos, aunque esto puede llevar a pérdida de información.
  - **Imputación:** Rellenar los valores faltantes utilizando estrategias como la media, la mediana o un valor constante. Se recomienda usar `SimpleImputer` de Scikit-Learn para aplicar la misma estrategia tanto en el conjunto de entrenamiento como en futuros datos en producción.
- **Trabajo con copias:** Siempre se debe trabajar sobre copias de los datos originales para evitar modificaciones accidentales en el conjunto de entrenamiento.

### Manejo de Atributos Categóricos y de Texto
- **Identificación:** En este conjunto, el atributo `ocean_proximity` es el único categórico.
- **Conversión numérica:**
  - **OrdinalEncoder:** Convierte las categorías a números, pero puede inducir una relación de orden que no existe naturalmente.
  - **One-Hot Encoding:** Crea una columna binaria para cada categoría, eliminando relaciones ordinales artificiales. Se recomienda utilizar `OneHotEncoder` de Scikit-Learn, que permite controlar el comportamiento ante categorías desconocidas (por ejemplo, con el parámetro `handle_unknown`).

### Escalado y Normalización
- **Razonamiento:** Muchos algoritmos de Aprendizaje Automático funcionan mejor cuando las variables tienen escalas comparables.
- **Técnicas:**
  - **Normalización (Min-Max Scaling):** Transforma cada atributo para que sus valores se encuentren entre 0 y 1. Es útil para métodos sensibles a la escala.
  - **Estandarización:** Centra cada atributo (media 0) y lo escala por su desviación estándar (desviación 1). Es más robusto ante outliers.
- **Herramientas:** Se pueden usar `MinMaxScaler` o `StandardScaler` de Scikit-Learn para aplicar estas transformaciones.

### Creación de Pipelines de Transformación
- **Ventajas:** Permiten encadenar múltiples transformaciones (imputación, codificación, escalado) de manera ordenada y reproducible.
- **Uso:** Con `Pipeline` o `make_pipeline` de Scikit-Learn, se configura una serie de pasos que se aplicarán secuencialmente al conjunto de datos, facilitando el ajuste de hiperparámetros y la validación cruzada.

---

## 4. Selección y Entrenamiento del Modelo

### Elección del Modelo
- **Modelo Inicial:** Se puede comenzar con una **Regresión Lineal** como baseline para tener una referencia inicial del desempeño.
- **Modelos más complejos:** Si la Regresión Lineal muestra un error elevado, se pueden probar modelos más potentes como **Árboles de Decisión** o **Random Forests**, que pueden capturar relaciones no lineales en los datos.

### Evaluación en el Conjunto de Entrenamiento
- **Predicciones iniciales:** Comparar las primeras predicciones con los valores reales ayuda a detectar errores grandes o sesgos.
- **Métricas de error:** Se utiliza el RMSE, calculado con `mean_squared_error` de Scikit-Learn, para cuantificar el error medio. Un error elevado puede indicar subajuste (underfitting) o la necesidad de mejorar las características.

### Validación Cruzada
- **Propósito:** Medir la robustez del modelo en diferentes subconjuntos del conjunto de entrenamiento y reducir el riesgo de sobreajuste.
- **Técnica:** Implementar K-Fold Cross Validation, dividiendo el conjunto de entrenamiento en *k* partes y realizando *k* iteraciones donde en cada una se entrena y evalúa el modelo en particiones diferentes.
- **Beneficios:** Permite obtener tanto una estimación del error promedio como la desviación estándar, ofreciendo una visión de la estabilidad del modelo.

### Ajuste de Hiperparámetros con Grid Search
- **Motivación:** Ajustar parámetros (por ejemplo, la profundidad de un árbol o el número de estimadores en un Random Forest) puede mejorar significativamente el rendimiento.
- **Método:** Utilizar `GridSearchCV` para automatizar la búsqueda de la mejor combinación de hiperparámetros a través de una validación cruzada exhaustiva.

---

## 5. Análisis de Resultados y Optimización

### Interpretación de la Importancia de las Características
- **Objetivo:** Identificar qué atributos tienen mayor impacto en la predicción del precio de viviendas.
- **Uso práctico:** Si, por ejemplo, el ingreso medio resulta ser el predictor más relevante, se puede profundizar en su tratamiento o considerar eliminar atributos menos informativos.

### Análisis de Errores
- **Revisión detallada:** Analizar los casos donde el modelo falla (por ejemplo, predicciones con error elevado) para comprender si se debe a outliers, datos mal preparados o a la falta de información relevante.
- **Acciones correctivas:** Ajustar el preprocesamiento, eliminar outliers o modificar la arquitectura del modelo según se identifiquen las causas de los errores.

### Evaluación en Subconjuntos de Datos
- **Equidad y robustez:** Es crucial que el modelo funcione de forma satisfactoria en distintos segmentos (por ejemplo, zonas urbanas vs. rurales, diferentes niveles de ingreso, etc.).
- **Procedimiento:** Crear subconjuntos de validación específicos para cada categoría y evaluar el rendimiento de forma diferenciada para detectar y corregir posibles sesgos.

---

## 6. Evaluación Final, Lanzamiento y Monitoreo del Sistema

### Evaluación en el Conjunto de Prueba
- **Objetivo final:** Una vez ajustado el modelo y evaluado en el conjunto de validación, se aplica sobre el conjunto de prueba reservado para obtener una estimación realista del error de generalización.
- **Métodos adicionales:** Calcular un intervalo de confianza (por ejemplo, al 95%) para el error, lo que brinda una idea de la precisión de la estimación del rendimiento.

### Preparación para el Lanzamiento
- **Presentación de resultados:** Elaborar reportes y visualizaciones claras que expliquen qué se ha aprendido del análisis, las fortalezas y limitaciones del modelo, y los supuestos tomados.
- **Documentación:** Registrar cada paso del proceso, desde la exploración y preprocesamiento hasta la selección y ajuste del modelo, para facilitar futuras iteraciones o auditorías.
- **Integración en producción:** Asegurar que el pipeline de transformación y el modelo se puedan aplicar de forma automática sobre nuevos datos, manteniendo la consistencia con el proceso de entrenamiento.

### Monitoreo y Mantenimiento
- **Importancia del monitoreo:** Una vez desplegado, es crucial implementar un sistema que detecte cambios en el comportamiento de los datos (data drift) o degradación del rendimiento del modelo.
- **Plan de acción:** Establecer alertas y protocolos de reentrenamiento para mantener la efectividad del modelo a lo largo del tiempo.

---

## Conclusión

Este proyecto abarca todas las etapas fundamentales de un caso real de Aprendizaje Automático: desde la comprensión del problema y la obtención y exploración de los datos, hasta la preparación, transformación, modelado y evaluación final. Además, se enfatiza la necesidad de documentar y monitorear el sistema una vez en producción, garantizando que el modelo se mantenga útil y preciso con el tiempo.

---

*Este documento detalla un flujo de trabajo robusto y exhaustivo que puede adaptarse a distintos proyectos de modelado y análisis de datos, asegurando la calidad y sostenibilidad del sistema implementado.*
