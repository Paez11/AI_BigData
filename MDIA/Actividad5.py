# Importa spaCy
import spacy

# Crea el objeto nlp para procesar español
nlp = spacy.blank("es")

# Procesa un texto
doc = nlp("¿Cómo estás?")

# Imprime en pantalla el texto del documento
print(doc.text)

# -------------------------------------------------------

# Importa spaCy
import spacy

# Crea el objeto nlp para procesar inglés
nlp = spacy.blank("en")

# Procesa un texto (aquí dice "Esta es una oración" en inglés)
doc = nlp("This is a sentence.")

# Imprime en pantalla el texto del documento
print(doc.text)

# -------------------------------------------------------

# Importa spaCy
import spacy

# Crea el objeto nlp para procesar alemán
nlp = spacy.blank("de")

# Procesa un texto (aquí dice "Saludos cordiales!" en alemán)
doc = nlp("Liebe Grüße!")

# Imprime en pantalla el texto del documento
print(doc.text)

# -------------------------------------------------------

# Importa spaCy y crea el objeto nlp para procesar español
import spacy

nlp = spacy.blank("es")

# Procesa el texto
doc = nlp("Me gustan las panteras negras y los leones.")

# Selecciona el primer token
first_token = doc[0]

# Imprime en pantalla el texto del token
print(first_token.text)

# -------------------------------------------------------

# Importa spaCy y crea el objeto nlp para procesar español
import spacy

nlp = spacy.blank("es")

# Procesa el texto
doc = nlp("Me gustan las panteras negras y los leones.")

# Un slice del Doc para "panteras negras"
panteras_negras = doc[3:5]
print(panteras_negras.text)

# Un slice del Doc para "panteras negras y los leones" (sin el ".")
panteras_negras_y_leones = doc[3:8]
print(panteras_negras_y_leones.text)

# -------------------------------------------------------

import spacy

nlp = spacy.blank("es")

# Procesa el texto
doc = nlp(
    "En 1990, más del 60 % de las personas en Asia del Este se encontraban "
    "en extrema pobreza. Ahora, menos del 4 % lo están."
)

# Itera sobre los tokens en el doc
for token in doc:
    # Revisa si el token parece un número
    if token.like_num:
        # Obtén el próximo token en el documento
        next_token = doc[token.i + 1]
        # Revisa si el texto del siguiente token es igual a '%'
        if next_token.text == "%":
            print("Porcentaje encontrado:", token.text)

# -------------------------------------------------------

import spacy

# Carga el modelo "es_core_news_sm"
nlp = spacy.load("es_core_news_sm")

text = (
    "De acuerdo con la revista Fortune, Apple fue la empresa "
    "más admirada en el mundo entre 2008 y 2012."
)

# Procesa el texto
doc = nlp(text)

# Imprime en pantalla el texto del documento
print(doc.text)

# -------------------------------------------------------

import spacy

nlp = spacy.load("es_core_news_sm")

text = (
    "De acuerdo con la revista Fortune, Apple fue la empresa "
    "más admirada en el mundo entre 2008 y 2012."
)

# Procesa el texto
doc = nlp(text)

for token in doc:
    # Obtén el texto del token, el part-of-speech tag y el dependency label
    token_text = token.text
    token_pos = token.pos_
    token_dep = token.dep_
    # Esto es solo por formato
    print(f"{token_text:<12}{token_pos:<10}{token_dep:<10}")

# -------------------------------------------------------

import spacy

nlp = spacy.load("es_core_news_sm")

text = (
    "De acuerdo con la revista Fortune, Apple fue la empresa "
    "más admirada en el mundo entre 2008 y 2012."
)

# Procesa el texto
doc = nlp(text)

# Itera sobre las entidades predichas
for ent in doc.ents:
    # Imprime en pantalla el texto de la entidad y su etiqueta
    print(ent.text, ent.label_)

# -------------------------------------------------------

import spacy

nlp = spacy.load("es_core_news_sm")

text = (
    "Los Olímpicos de Tokio 2020 son la inspiración para la nueva "
    "colección de zapatillas adidas zx."
)

# Procesa el texto
doc = nlp(text)

# Itera sobre las entidades
for ent in doc.ents:
    # Imprime en pantalla el texto de la entidad y su etiqueta
    print(ent.text, ent.label_)

# Obtén el span para "adidas zx"
adidas_zx = doc[14:16]

# Imprime en pantalla el texto del span
print("Entidad faltante:", adidas_zx.text)

# -------------------------------------------------------

import spacy

# Importa el Matcher
from spacy.matcher import Matcher

nlp = spacy.load("es_core_news_sm")
doc = nlp(
    "Los Olímpicos de Tokio 2020 son la inspiración para la nueva "
    "colección de zapatillas adidas zx."
)

# Inicializa el matcher con el vocabulario compartido
matcher = Matcher(nlp.vocab)

# Crea un patrón que encuentre dos tokens: "adidas" y "zx"
pattern = [{"TEXT": "adidas"}, {"TEXT": "zx"}]

# Añade el patrón al matcher
matcher.add("ADIDAS_ZX_PATTERN", [pattern])

# Usa al matcher sobre el doc
matches = matcher(doc)
print("Resultados:", [doc[start:end].text for match_id, start, end in matches])

# -------------------------------------------------------

import spacy
from spacy.matcher import Matcher

nlp = spacy.load("es_core_news_sm")
matcher = Matcher(nlp.vocab)

doc = nlp(
    "Después de hacer la actualización de iOS no notarás un rediseño "
    "radical del sistema: no se compara con los cambios estéticos que "
    "tuvimos con el iOS 7. La mayoría de las funcionalidades del iOS 11 "
    "siguen iguales en el iOS 10."
)

# Escribe un patrón para las versiones de iOS completas
# ("iOS 7", "iOS 11", "iOS 10")
pattern = [{"TEXT": ____}, {"IS_DIGIT": ____}]

# Añade el patrón al matcher y usa el matcher sobre el documento
matcher.add("IOS_VERSION_PATTERN", [pattern])
matches = matcher(doc)
print("Total matches found:", len(matches))

# Itera sobre los resultados e imprime el texto del span
for match_id, start, end in matches:
    print("Match found:", doc[start:end].text)