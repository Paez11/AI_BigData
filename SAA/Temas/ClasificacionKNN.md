# Resumen extendido: k-Nearest Neighbors (kNN)

El algoritmo **k-Nearest Neighbors (kNN)** es una técnica de aprendizaje supervisado que utiliza la similitud entre datos para realizar predicciones. Se basa en encontrar los \( k \) vecinos más cercanos a una instancia y tomar decisiones en función de sus características.

---

## **kNN como aprendizaje por analogía**

### **Funcionamiento del aprendizaje por analogía en kNN**
1. **Similitud basada en vecindad:**
   - La similitud se mide con distancias como Euclidiana, Manhattan o Minkowski.
   - En clasificación, un punto no etiquetado se clasifica según los vecinos etiquetados más cercanos.
   - En regresión, se predice el valor promedio o mediana de los vecinos.

2. **Votación o promedio:**
   - En clasificación: La etiqueta se decide por la "votación mayoritaria".
   - En regresión: Se utiliza el promedio o mediana de los valores de los vecinos.

### **Beneficios del aprendizaje por analogía**
- **Intuitivo y simple:** Fácil de entender y explicar.
- **Flexible:** No requiere supuestos sobre la distribución de los datos, útil para relaciones no lineales.

### **Desafíos del aprendizaje por analogía**
- **Alto costo computacional:** Calcular distancias con grandes conjuntos de datos puede ser lento.
- **Sensibilidad a la escala:** Requiere normalización para evitar sesgos.
- **Maldición de la dimensionalidad:** En espacios de alta dimensión, las distancias pierden significado.

### **Aplicaciones prácticas**
- **Recomendaciones personalizadas:** Sugiere productos basados en usuarios similares.
- **Diagnósticos médicos:** Compara síntomas con pacientes previos.
- **Reconocimiento de patrones:** Clasificación de imágenes según características visuales.

---

## **kNN como estrategia de procesamiento perezoso**

### **Características del aprendizaje perezoso**
1. **Sin fase de entrenamiento explícita:**
   - Solo almacena los datos de entrenamiento.
   - Calcula distancias y predicciones en el momento de la consulta.

2. **Costo computacional durante la predicción:**
   - Calcula distancias entre la nueva instancia y todo el conjunto de entrenamiento.
   - Realiza votación o promedio entre los \( k \) vecinos.

3. **Almacenamiento versus costo computacional:**
   - **Almacenamiento alto:** Mantiene todos los datos de entrenamiento.
   - **Costo computacional incremental:** Calcular distancias en cada predicción es costoso.

### **Ventajas del aprendizaje perezoso**
- **Adaptabilidad:** Rápido para incorporar nuevos datos sin reentrenamiento.
- **Relaciones no lineales:** Captura patrones sin transformaciones complejas.

### **Desventajas del aprendizaje perezoso**
- **Escalabilidad:** Poco práctico con grandes conjuntos de datos.
- **Maldición de la dimensionalidad:** En espacios de alta dimensión, las distancias pierden significado.

---

## **La "maldición de la dimensionalidad"**

### **Problemas asociados:**
1. **Escasez de datos:** En alta dimensionalidad, los datos están dispersos y los conceptos de cercanía pierden utilidad.
2. **Distancias menos informativas:** Las distancias más cortas y largas se vuelven similares, dificultando la discriminación.
3. **Costo computacional:** Calcular distancias en muchas dimensiones es caro.

### **Impacto en kNN:**
- La dispersión de datos reduce la precisión de las predicciones.
- El tiempo de cálculo incrementa, afectando la eficiencia en conjuntos grandes y complejos.

---

## **¿Cuándo usar un \( k \) fijo o radios de vecindad?**

### **Uso de un \( k \) fijo**
- **Cómo funciona:** Se selecciona un número predefinido \( k \) de vecinos más cercanos.
- **Ventajas:**
  - Consistente, siempre usa \( k \) vecinos.
  - Configuración sencilla.
- **Desventajas:**
  - Sensible al valor de \( k \).
  - No se adapta a la densidad variable de los datos.
- **Cuándo usar:** En conjuntos con densidad uniforme.

### **Uso de radios de vecindad**
- **Cómo funciona:** Considera todos los puntos dentro de un radio fijo alrededor del punto de consulta.
- **Ventajas:**
  - Se adapta mejor a variaciones en densidad.
  - Limita la influencia de puntos lejanos.
- **Desventajas:**
  - Número de vecinos variable, lo que puede introducir inconsistencias.
  - Elegir el radio adecuado puede ser complicado.
- **Cuándo usar:** En datos con densidades variables o proximidad crítica.

### **Conclusión:**
- **\( k \) fijo:** Más simple y directo.
- **Radios de vecindad:** Más flexible para datos con variabilidad en densidad.

---

## **Ponderación de votos en función de la distancia**

### **¿Cuándo ponderar por distancia?**
1. **Relevancia variable de los vecinos:**
   - Vecinos más cercanos suelen ser más relevantes.
2. **Reducción de ruido:**
   - Minimiza el impacto de puntos atípicos.
3. **Desempates:**
   - Preferencia a vecinos más cercanos en situaciones de empate.

### **Métodos de ponderación:**
1. **Inversa de la distancia:** 
   - Peso proporcional a \( \frac{1}{\text{distancia}} \).
2. **Exponencial negativa:** 
   - Peso proporcional a \( e^{-\text{distancia}} \).

### **Implementación en kNN:**
- Verifica si la librería o algoritmo soporta ponderación y ajusta los parámetros según los datos.

### **Conclusión:**
La ponderación por distancia mejora la precisión en casos donde la proximidad implica mayor relevancia, siendo útil en conjuntos con densidad variable o alta importancia en la precisión.

---

kNN es un algoritmo poderoso y flexible que, aunque simple, puede manejar problemas complejos si se ajusta adecuadamente. Sin embargo, su alto costo computacional y sensibilidad a la dimensionalidad lo hacen más adecuado para tareas con conjuntos de datos moderados y características bien definidas.
