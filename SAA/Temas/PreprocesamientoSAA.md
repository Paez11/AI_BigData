# Preprocesamiento

El preprocesamiento de datos es un conjunto de tareas iniciales dirigidas a preparar los datos para análisis. Estas tareas incluyen exploración estadística, detección de valores faltantes y outliers, estandarización, reducción de dimensionalidad y selección de variables, entre otras. Estas acciones son fundamentales para garantizar que el análisis posterior sea preciso y significativo.

---

## 5.1 Estadística descriptiva

La estadística descriptiva busca resumir la información en los datos de manera comprensible, lo que incluye medidas de centralidad y dispersión.

### 5.1.1 Medidas de centralidad
- **Definición:** Resumen de un conjunto de datos en un único valor representativo.
- **Tipos:**
  - **Media:** 
    - Fórmula: `x̄ = (Σxi) / n`
    - Representa el promedio de los datos y es útil para variables cuantitativas.
  - **Mediana:** 
    - Valor central al ordenar los datos de menor a mayor.
    - Fórmula:
      - Si `n` es impar: `Me = x(n+1)/2`.
      - Si `n` es par: `Me = (x(n/2) + x(n/2 + 1)) / 2`.
    - Resistente a valores extremos.
  - **Moda:** 
    - Valor más frecuente.
    - Apropiado para variables cualitativas o categóricas.

### 5.1.2 Medidas de dispersión
- **Definición:** Indican qué tan dispersos están los datos respecto a una medida de centralidad.
- **Tipos:**
  - **Varianza muestral (s²):**
    - Fórmula: `s² = Σ(xi - x̄)² / (n-1)`
    - Mide la dispersión cuadrática promedio respecto a la media.
  - **Desviación estándar (s):**
    - Fórmula: `s = √s²`
    - Más interpretable que la varianza, ya que está en las mismas unidades que los datos.
  - **Rango (R):**
    - Diferencia entre el valor máximo y el mínimo: `R = max(xi) - min(xi)`.
    - Sensible a outliers.

---

## 5.2 Distribución normal

### Concepto

La distribución normal en estadística se proponen modelos para reflejar como varían los posibles valores, o más precisamente qué probabilidad tiene que el valor de la variable se encuentre en un determinado intervalo. Normalmente, representada como una "campana de Gauss". La caracterización de una variable aleatoria continua viene definida por dos funciones, función de densidaddeprobabilidad (f.d.p) y función de distribución acumulada o simplemente función de distribución (F.D.).

### Características principales
- Definida por dos parámetros: media (`µ`) y varianza (`σ²`).
- Notación: `X ~ N(µ, σ²)`.

### Funciones asociadas
- **Función de densidad de probabilidad (FDP):**
    φ(x) = (1 / (σ√(2π))) * exp(-(x-µ)² / (2σ²))

- **Función de distribución acumulada (FDA):**
    Φ(x) = ∫[−∞, x] φ(t) dt


### Cálculos típicos
- **Probabilidades:**
- Para calcular `P(a ≤ X ≤ b)`, se usa la FDA: 
  ```
  P(a ≤ X ≤ b) = Φ(b) - Φ(a)
  ```
- **Tipificación:** Transformar `X` a una variable normal estándar (`Z`) usando:
    Z = (X - µ) / σ


---

## 5.3 Outliers

### Definición
Valores anómalos que difieren significativamente del resto de los datos. Pueden surgir por errores de medición o por fenómenos reales.

### Métodos de detección
1. **Basado en normalidad:**
 - Construir bandas centradas en la media:
   ```
   [xL, xU] = [µ - kσ, µ + kσ]
   ```
   donde `k` depende del nivel de confianza deseado.
2. **Rango intercuartílico (IQR):**
 - Definir bandas usando los cuartiles:
   ```
   xL = Q1 - k(Q3 - Q1), xU = Q3 + k(Q3 - Q1)
   ```
 - Valores típicos de `k`: 1.5 (outliers leves) y 3 (outliers extremos).

---

## 5.4 Método de jackknife

### Propósito
Detectar observaciones influyentes en análisis estadísticos, como regresión o clustering.

### Procedimiento
- Excluir un registro a la vez y calcular un índice de calidad del modelo (`ψ`).
- Identificar registros que producen variaciones significativas en `ψ`.

---

## 5.5 Escalamiento (Estandarización)

### Importancia
El rango de las variables puede afectar los resultados. Por ejemplo, una variable con mayor magnitud domina el cálculo de distancias.

### Métodos
1. **Por rangos:** Normaliza entre 0 y 1.
    x_new = (x_old - min(x)) / (max(x) - min(x))

2. **Z-score:** Escala a media 0 y desviación estándar 1.
    x_new = (x_old - x̄) / s

3. **Escalamiento decimal:** Divide por una potencia de 10 basada en el valor máximo absoluto:
    x_new = x_old / 10^m


---

## 5.6 Selección de variables

### Problema
Las bases de datos pueden contener miles de variables, lo que aumenta la complejidad computacional y la dificultad de interpretación.
En el análisis cluster se suele recurrir a la reducción de la dimensionalidad de la matriz de datos X mediante análisis de componentes principales que transformala anterior matriz a una matriz X de dimensiones mucho menor que la original.

En problemas de clasificación y regresión se utilizan las medidas de correlación entre la variable respuesta y y el conjunto de regresores (características) xi quedándose con las que tienen mayores correlaciones. Se intenta considerar sólo aquellas que tienen mayor información de la variable de interés y. Las medidas de correlación intentan medir el grado de dependencia entre dos variables. La medida de este tipo más conocida y aplicada es el coeficiente de correlación de Pearson .

### Estrategias
1. **Reducción de dimensionalidad:**
- Técnicas como el análisis de componentes principales (PCA) transforman variables originales en combinaciones lineales reduciendo la cantidad total.
2. **Correlación con la variable objetivo:**
- Usar medidas como el coeficiente de Pearson para seleccionar variables relevantes.

### Principio de parsimonia
Prefiere modelos simples y fáciles de interpretar, evitando incluir variables irrelevantes.

---

## 5.7 Ponderación de variables

### Propósito
Asignar importancia relativa a las variables.

### Métodos
- En análisis de cluster, las variables se ponderan asignándoles pesos en los cálculos de distancia.
- En regresión y clasificación, los métodos ajustan automáticamente la importancia relativa de las variables.

---


