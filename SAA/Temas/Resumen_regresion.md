# 5.1. Regresión Lineal

La regresión lineal es un enfoque sencillo de aprendizaje supervisado que se emplea para predecir valores cuantitativos.

La regresión lineal simple se define de la siguiente manera. Partimos de una observación X para predecir una respuesta cuantitativa Y.

Suponemos que existe una relación lineal entre ambas (X e Y), esa relación se puede expresar de la siguiente forma:

\[ Y = \beta_0 + \beta_1 X \]

donde \( \beta_0 \) y \( \beta_1 \) son dos constantes desconocidas a priori que representan la intersección (u ordenada en el origen) y la pendiente respectivamente. Juntas \( (\beta_0, \beta_1) \) representan los coeficientes o parámetros del modelo.

Una vez obtenidas las estimaciones de \( \beta_0 \) y \( \beta_1 \) (representadas como \( \hat{\beta}_0 \) y \( \hat{\beta}_1 \)), podemos predecir \( \hat{Y} \) a partir de un valor particular de \( X \).

El ajuste del modelo se realiza minimizando la suma de los errores cuadráticos (RSS):

\[ RSS = \sum_{i=1}^{n} (y_i - \beta_0 - \beta_1 x_i)^2 \]

### Hipótesis del modelo de regresión lineal

1. **Esperanza matemática nula**: \( E(\epsilon | X) = 0 \).
2. **Homocedasticidad**: La varianza de los errores es constante.
3. **Incorrelación o independencia**: Los errores son independientes entre sí.
4. **Regresores no estocásticos**: Los valores de \( X \) son fijos en repetidas muestras.
5. **Independencia lineal**: No hay colinealidad perfecta entre las variables explicativas.
6. **Tamaño de muestra suficiente**: \( T > k + 1 \), donde \( k \) es el número de predictores.
7. **Normalidad**: Los errores siguen una distribución normal.

Si estas hipótesis se cumplen, el **teorema de Gauss-Markov** garantiza que los estimadores de mínimos cuadrados son los mejores estimadores lineales insesgados.

## 5.1.1. Modelos de regresión no lineales

Los modelos lineales pueden ser limitantes en cuanto al poder predictivo. Para mejorar su desempeño se pueden emplear modelos no lineales:

- **Regresión polinomial**: Añade términos de mayor orden (e.g. \( X^2, X^3 \)) para capturar relaciones más complejas.
- **Funciones escalonadas**: Divide el rango de \( X \) en intervalos y ajusta una constante en cada uno.
- **Splines de regresión**: Usa polinomios a trozos con continuidad en derivadas hasta cierto orden.

Estos enfoques pertenecen al método general de **funciones base**.

# 5.2. Regresión Logística

La regresión logística es similar a la regresión lineal, pero en lugar de predecir valores continuos, estima la probabilidad de pertenencia a una clase (clasificación binaria).

El modelo toma la forma:

\[ P(Y=1|X) = \frac{e^{\beta_0 + \beta_1 X}}{1 + e^{\beta_0 + \beta_1 X}} \]

Donde los coeficientes \( \beta_k \) indican la relación entre las variables predictoras y la probabilidad de la clase positiva.

### Características representativas

- Se extiende a clasificación multiclase (**regresión logística multinomial**).
- Permite interpretar la relación entre atributos y clases.
- Es robusta en espacios de alta dimensionalidad.
- Tolera atributos irrelevantes y redundantes.
- No maneja instancias con valores perdidos.

### Proceso de construcción

1. Búsqueda de variables correlacionadas con la variable objetivo.
2. Discretización de variables numéricas.
3. Entrenamiento del modelo inicial.
4. Entrenamiento del modelo refinado.
5. Selección del mejor modelo.
6. Evaluación.

# **Regularización en Regresión**  

La **regularización** en regresión es una técnica utilizada para evitar el sobreajuste penalizando los coeficientes del modelo. 
Se agrega un término de penalización a la función de pérdida para reducir la magnitud de los coeficientes y mejorar la capacidad de generalización del modelo.  

## **Tipos de Regularización en Regresión**  

### **1. Ridge Regression (L2)**  
- Agrega una penalización proporcional al cuadrado de los coeficientes:  
  \[
  \text{Loss} = \sum (y_i - \hat{y}_i)^2 + \lambda \sum \beta_j^2
  \]
- Hace que los coeficientes sean más pequeños pero rara vez los reduce a cero.  
- Útil cuando hay colinealidad entre variables.  

### **2. Lasso Regression (L1)**  
- Agrega una penalización proporcional al valor absoluto de los coeficientes:  
  \[
  \text{Loss} = \sum (y_i - \hat{y}_i)^2 + \lambda \sum |\beta_j|
  \]
- Puede hacer que algunos coeficientes sean exactamente cero, lo que actúa como selección de características.  

### **3. Elastic Net (L1 + L2)**  
- Combina ambas penalizaciones:  
  \[
  \text{Loss} = \sum (y_i - \hat{y}_i)^2 + \lambda_1 \sum |\beta_j| + \lambda_2 \sum \beta_j^2
  \]
- Útil cuando hay muchas variables correlacionadas y queremos selección de características.  

## **¿Cuándo usar regularización?**  
- Si el modelo tiene **muchos parámetros** y riesgo de sobreajuste.  
- Si hay **colinealidad** entre variables predictoras.  
- Si queremos **seleccionar automáticamente variables** importantes (Lasso o Elastic Net).  

# 5.3. Máquinas de Vectores de Soporte (SVM)

Las **Máquinas de Vectores de Soporte (SVM)** son modelos de clasificación eficientes basados en hiperplanos de separación.

## 5.3.1. Clasificador de Margen Máximo

El **Maximal Margin Classifier** busca un hiperplano que maximice la separación entre clases. En muchos casos, esto no es posible sin errores, por lo que se usa un margen suave (**Soft Margin Classifier**).

## 5.3.3. Máquinas de Soporte Vectorial (SVM)

Las SVM permiten separar datos no lineales mediante la transformación de características usando **funciones kernel**.

- **Kernel**: Transforma los datos a un espacio de mayor dimensión donde la separación es más sencilla.
- **Regularización (C)**: Controla el margen y la penalización por errores.
- **Gamma**: Ajusta la parametrización del kernel.

## 5.3.4. Extensiones de SVM

- **Clasificación multiclase** mediante combinaciones de clasificadores binarios.
- **Detección de anomalías** (detección de outliers).
- **Regresión con SVM** para estimar valores continuos.

## 5.3.5. Implementación en Scikit-Learn

Scikit-Learn proporciona herramientas para ajustar modelos SVM con diferentes kernels y parámetros de regularización.

## 5.3.6. Ventajas e inconvenientes

### Ventajas

- Eficiente en alta dimensionalidad.
- Flexibilidad gracias a los kernels.

### Desventajas

- Costoso computacionalmente para grandes volúmenes de datos.
- Sensible a la elección del hiperparámetro \( C \).

# **Descenso del Gradiente**  

El **descenso del gradiente** es un algoritmo de optimización utilizado para minimizar una función de costo ajustando iterativamente los parámetros de un modelo en la dirección del gradiente negativo. Se usa ampliamente en problemas de **regresión, clasificación y redes neuronales**.  

## **¿Cómo funciona?**  
1. **Calcula el gradiente** (derivada parcial) de la función de costo con respecto a cada parámetro.  
2. **Actualiza los parámetros** en la dirección opuesta al gradiente para reducir el error:  
   \[
   \theta = \theta - \alpha \nabla J(\theta)
   \]  
   donde:  
   - \( \theta \) son los parámetros del modelo.  
   - \( \alpha \) es la tasa de aprendizaje (learning rate).  
   - \( \nabla J(\theta) \) es el gradiente de la función de costo \( J(\theta) \).  

3. **Repite el proceso** hasta que la función de costo converja o se alcance el número máximo de iteraciones.  

## **Tipos de Descenso del Gradiente**  
### **1. Gradiente Descendente por Lote (Batch Gradient Descent)**  
- Usa **todo el conjunto de datos** en cada actualización.  
- Convergencia más estable pero más lenta.  

### **2. Gradiente Descendente Estocástico (Stochastic Gradient Descent, SGD)**  
- Usa **un solo ejemplo** aleatorio en cada actualización.  
- Convergencia más rápida pero con mayor variabilidad.  

### **3. Gradiente Descendente Mini-Lote (Mini-Batch Gradient Descent)**  
- Usa **un pequeño subconjunto** de datos en cada iteración.  
- Es un equilibrio entre estabilidad y velocidad.  

## **¿Cuándo se usa?**  
- En modelos de **aprendizaje automático y redes neuronales** para optimizar funciones de costo.  
- Cuando las derivadas de la función de costo pueden calcularse fácilmente.  
- En grandes volúmenes de datos donde los métodos exactos son computacionalmente costosos.  
