# Capítulo 3 - Aprendizaje Supervisado

El aprendizaje supervisado se basa en el uso de datos etiquetados para entrenar modelos predictivos que asocian entradas con salidas esperadas. Es una técnica fundamental en aprendizaje automático que se aplica a problemas de clasificación y regresión.

---

## **3.1 Clasificación vs Regresión**

El aprendizaje supervisado se divide en dos categorías principales según la naturaleza de la variable objetivo:

### **3.1.1 Clasificación**
- **Definición:** Busca asignar cada instancia a una de varias categorías discretas.
- **Ejemplos:**
  - Clasificar correos electrónicos como *spam* o *no spam*.
  - Diagnosticar una enfermedad como *presente* o *ausente*.
  - Etiquetar imágenes según contenido (e.g., "gato", "perro", "paisaje").
- **Tipos de problemas de clasificación:**
  - **Binaria:** Dos posibles etiquetas (e.g., "Sí/No").
  - **Multiclase:** Más de dos categorías (e.g., "Rojo", "Amarillo", "Verde").
- **Validación de modelos:**
  - **Matriz de Confusión:** Muestra las predicciones correctas e incorrectas cruzando valores reales y predichos.
  - **Curva ROC:** Representa la proporción de verdaderos positivos frente a falsos positivos, útil para evaluar la discriminación del modelo.

### **3.1.2 Regresión**
- **Definición:** Predicción de valores numéricos continuos a partir de entradas.
- **Ejemplos:**
  - Predecir el precio de una casa.
  - Estimar el tiempo de vida útil de una máquina.
  - Calcular el número de unidades que se venderán de un producto.
- **Técnicas de regresión:**
  - Métodos simples como la regresión lineal.
  - Métodos complejos como redes neuronales profundas.
- **Validación de modelos:**
  - **Error Absoluto Medio (MAE):** Media de las diferencias absolutas entre valores observados y predichos.
  - **Coeficiente de Determinación (\( R^2 \)):** Proporción de varianza explicada por el modelo.

---

## **3.2 Proceso del Aprendizaje Supervisado**

El aprendizaje supervisado sigue un flujo bien definido de pasos para construir y evaluar modelos.

### **Fases principales:**

1. **Entrenamiento del modelo:**
   - Uso de datos etiquetados (ejemplos con salidas conocidas) para construir un modelo.
   - Generalmente, entre el 60% y el 90% de los datos disponibles se utilizan para esta fase.
   - El modelo ajustado debe capturar las relaciones entre las entradas y la salida objetivo.

2. **Prueba del modelo:**
   - Evaluación del modelo con datos nuevos que no se usaron en el entrenamiento.
   - Este conjunto de datos (10%-40% del total) permite estimar la capacidad del modelo para generalizar.
   - **Evitar fugas de datos:** Es crucial dividir los datos antes de aplicar cualquier transformación (e.g., normalización).

3. **Validación cruzada:**
   - Divide los datos en \( k \) subconjuntos (folds).
   - Entrena y prueba iterativamente para obtener una evaluación robusta.
   - **Ventajas:**
     - Maximiza el uso de datos disponibles.
     - Reduce sesgos en problemas con pocos ejemplos.

### **3.2.1 Ajuste y Sobreajuste**
- **Infraajuste:** Modelo demasiado simple, no captura patrones relevantes.
- **Ajuste balanceado:** Modelo que generaliza correctamente, evitando tanto el infraajuste como el sobreajuste.
- **Sobreajuste:** Modelo demasiado complejo, se adapta al ruido del conjunto de entrenamiento, fallando al predecir nuevos datos.

---

## **3.3 Clasificación Bayesiana**

Los clasificadores bayesianos son métodos rápidos y eficientes basados en el Teorema de Bayes. Son útiles para conjuntos de datos con alta dimensionalidad.

### **3.3.1 Conceptos básicos**
- **Teorema de Bayes:** Relaciona probabilidades condicionales entre características y clases.
  \[
  P(L | \text{features}) = \frac{P(\text{features} | L) \cdot P(L)}{P(\text{features})}
  \]
- **Modelo generativo:** Describe cómo se generan los datos para cada clase.

### **3.3.2 Clasificadores Gaussianos**
- **Suposición:** Los datos de cada clase siguen una distribución normal (Gaussiana).
- **Implementación:**
  - Calcula media y varianza para cada clase.
  - Predice la clase más probable para nuevas instancias.
- **Ventajas:**
  - Simplicidad y rapidez.
  - Robusto con datos de alta dimensionalidad.
- **Limitaciones:**
  - Sensible a suposiciones incorrectas sobre la distribución.

### **3.3.3 Clasificadores Multinomiales**
- **Uso:** Ideal para datos de recuento (e.g., frecuencia de palabras en texto).
- **Ejemplo:** Clasificación de documentos (e.g., noticias, correos electrónicos).
- **Técnica:** Modela la frecuencia de características con una distribución multinomial.

### **3.3.4 Ventajas e inconvenientes**
- **Ventajas:**
  - Rápidos y escalables.
  - Predicción probabilística directa.
  - Robustez frente a ruido y datos incompletos.
- **Inconvenientes:**
  - Requieren independencia entre características (difícil de cumplir).
  - Problemas de "frecuencia cero", mitigados con suavizado de Laplace.

---

## **3.4 Vecinos más cercanos (k-NN)**

El algoritmo \( k \)-NN es un método simple y eficaz para problemas de clasificación y regresión basado en la analogía entre casos.

### **3.4.1 El Algoritmo**
- **Principio:** Clasifica nuevas instancias según las etiquetas de los \( k \) vecinos más cercanos.
- **Parámetros clave:**
  - **\( k \):** Número de vecinos a considerar.
  - **Función de distancia:** Métrica para medir similitud entre instancias (e.g., Euclidiana, Manhattan).
  - **Ponderación:** Vecinos más cercanos tienen mayor influencia en la predicción.

### **3.4.2 Ventajas e inconvenientes**
- **Ventajas:**
  - Sin costo de entrenamiento.
  - Flexible y no requiere suposiciones sobre los datos.
  - Resistente al ruido con valores \( k \) adecuados.
- **Inconvenientes:**
  - Altos costos computacionales para buscar vecinos.
  - Sensible a la maldición de la dimensionalidad.
  - Requiere optimización de \( k \) y elección de función de distancia.

### **3.4.3 Variantes y mejoras**
1. **Reducción del conjunto de referencia:**
   - Seleccionar subconjuntos representativos para optimizar cálculos.
2. **Preindexación:** 
   - Construir estructuras como árboles para acelerar búsquedas.
3. **Ponderación de distancias:**
   - Asignar mayor peso a vecinos más cercanos.

---

Este capítulo incluye ejemplos prácticos con Python, demostrando la implementación de clasificadores bayesianos y \( k \)-NN utilizando librerías como scikit-learn.
