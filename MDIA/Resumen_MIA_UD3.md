
# Resumen - Modelos de Inteligencia Artificial

## 1. Caracterización de sistemas de Inteligencia Artificial
### 1.1 Fundamentos de la IA
- **Características principales:** La IA se caracteriza por la capacidad de aprendizaje, adaptación, razonamiento y percepción, con aplicaciones en tareas que requieren inteligencia humana.
- **Tipos de inteligencia:** Inteligencia artificial débil (limitada a tareas específicas) e inteligencia artificial fuerte (capaz de realizar cualquier tarea cognitiva humana).
- **Historia de la IA:** Desde sus orígenes en los años 50, con el trabajo pionero de Alan Turing, hasta su evolución moderna con redes neuronales profundas y aprendizaje profundo.

### 1.2 Campos de Aplicaciones
- **Agricultura:** Optimización del cultivo mediante análisis de datos y predicciones meteorológicas.
- **Banca:** Detección de fraude a través de modelos de clasificación y aprendizaje supervisado.
- **Ciberseguridad:** Sistemas que identifican y tratan ataques cibernéticos mediante técnicas avanzadas de detección de anomalías.
- **Atención sanitaria:** Diagnóstico de pacientes utilizando modelos de clasificación y procesamiento de imágenes.
- **Logística:** Optimización de rutas y gestión de inventarios mediante algoritmos heurísticos y redes neuronales.
- **Telecomunicaciones:** Optimización de redes y mejora de la calidad del servicio a través de IA.
- **Juegos:** Creación de agentes inteligentes que aprenden y se adaptan al comportamiento del jugador.
- **Arte:** Generación de creatividad en música, escritura, y artes visuales mediante redes neuronales y modelos generativos.

### 1.3 Técnicas de la IA
- **Algoritmos de búsqueda:** Búsqueda no informada (Búsqueda en amplitud y profundidad) e informada (A*).
- **Algoritmos evolutivos:** Métodos inspirados en la evolución biológica, como algoritmos genéticos.
- **Aprendizaje automático:** Incluye técnicas supervisadas, no supervisadas y de refuerzo.

### 1.4 Nuevas Formas de Interacción
- Sistemas de comprensión del lenguaje natural (NLU) y generación de lenguaje natural (NLG) aplicados a asistentes conversacionales.

---

## 2. Utilización de los Modelos de IA
### 2.1 Entornos de Trabajo
- Plataformas y herramientas de desarrollo como Python, TensorFlow, PyTorch, etc.

### 2.2 Sistemas de Resolución de Problemas
- **Tipos de problemas:** Problemas bien definidos, problemas con información incompleta y problemas con incertidumbre.
- **Programas agente:** Sistemas que perciben su entorno, razonan y actúan para alcanzar objetivos.

### 2.3 Modelos de Sistemas de IA
- **Planificación automática:** Creación de planes o estrategias para alcanzar objetivos en entornos complejos.
- **Sistemas de razonamiento impreciso:** Métodos como la lógica difusa para tratar con incertidumbre y ambigüedad.

---

## 3. Procesamiento de Lenguaje Natural (PLN)
### 3.1 Contexto
- Disciplina que combina IA, lingüística computacional y aprendizaje automático para la comprensión y generación de lenguaje natural.

### 3.2 Preprocesamiento de Textos
- **Identificación del idioma:** Determina el idioma de un texto para su análisis adecuado.

#### Ejemplo: Identificación del idioma con `langdetect`
```python
!pip install langdetect
from langdetect import detect

detect('Spain is different')
detect('España es diferente')
```

- **Eliminación de secciones irrelevantes:** Filtrado de contenido no textual o irrelevante.
- **Limpieza y normalización:** Eliminación de ruido, signos de puntuación y estandarización de términos.
- **Corrección de errores:** Detección y corrección de palabras mal escritas con `TextBlob`.

#### Ejemplo: Corrección de errores con `TextBlob`
```python
!pip install textblob
from textblob import TextBlob

str = "whaat ixs yoor nami"
new_doc = TextBlob(str)
result = new_doc.correct()
print(result)
```

- **Lematización y Stemming:** Reducción de palabras a su forma básica o raíz.

#### Ejemplo: Lematización con `WordNetLemmatizer`
```python
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()

print(lemmatizer.lemmatize('dogs'))
```

- **Segmentación:** Tokenización de frases y palabras con `nltk`.

#### Ejemplo: Tokenización de palabras
```python
from nltk.tokenize import word_tokenize
EJEMPLO_PALABRAS = "Hola mi nombre es Pepe"
word_tokenize(EJEMPLO_PALABRAS)
```

---

## 3.3 Análisis Léxico
- Identificación de la función de las palabras en una oración mediante etiquetado POS (Part of Speech).

#### Ejemplo: Etiquetado POS
```python
from nltk import word_tokenize, pos_tag
text = word_tokenize("And from now on this will be completely different")
print(pos_tag(text))
```

---

## 3.4 Análisis Sintáctico
- Uso de parsers para la construcción de árboles sintácticos y análisis de la estructura de las frases.

---

## 3.5 Análisis Semántico
- Interpretación del significado de frases mediante diccionarios, tesauros y ontologías (e.g., WordNet).

#### Ejemplo: Uso de WordNet para obtener significados
```python
from nltk.corpus import wordnet
synsets = wordnet.synsets('big')
print(synsets[0].definition())
print(synsets[0].examples())
```

---

## 4. Aplicaciones del PLN
### 4.1 Recuperación de Información
- **Modelos de recuperación:** Booleano, Vectorial, Probabilístico.
- **Medidas de evaluación:** Precisión, exhaustividad, F-score, etc.
- **Arquitectura de un buscador:** Procesamiento, indexación y recuperación.

### 4.2 Clasificación de Textos
- Aplicación de algoritmos como SVM (Support Vector Machines) para categorizar textos.

---

## 5. Análisis de Sistemas Robotizados
### 5.1 Simulador CoppeliaSim
- Descripción general de la interfaz, propiedades de objetos, geometría pura y no pura, y jerarquización de objetos.
- Diseño de articulaciones para la creación de robots móviles y brazos robóticos.

### 5.2 Diseño de Robots
- Implementación básica de robots móviles y brazos robóticos en simuladores.

---

## Listado de Acrónimos
- Compilación de términos técnicos utilizados a lo largo del documento.
