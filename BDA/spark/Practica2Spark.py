# Databricks notebook source
spark

# COMMAND ----------

# MAGIC %md
# MAGIC Importación de librerias

# COMMAND ----------

import numpy as np
import pandas as pd
import pyspark.pandas as ps
from pyspark.sql import SparkSession

# COMMAND ----------

# MAGIC %md
# MAGIC Carga de datasets

# COMMAND ----------

dataPilot = pd.read_csv('https://gist.githubusercontent.com/jaimerabasco/0a6911d5bbe08a193314036cd797e374/raw/6d822efd571d61aca5261eea32fc509ec00d8ee2/f1_pilotos_2023.csv', sep=',', encoding = "ISO-8859 -1")
dataPilot.head()

# COMMAND ----------

dataPilot.info()

# COMMAND ----------

dataRacecourse = pd.read_csv('https://gist.githubusercontent.com/jaimerabasco/0a6911d5bbe08a193314036cd797e374/raw/6d822efd571d61aca5261eea32fc509ec00d8ee2/f1_circuitos_2023.csv', sep=',', encoding = "ISO-8859 -1")
dataRacecourse.head()

# COMMAND ----------

dataRacecourse.info()

# COMMAND ----------

dataLap = pd.read_csv('https://gist.githubusercontent.com/jaimerabasco/0a6911d5bbe08a193314036cd797e374/raw/6d822efd571d61aca5261eea32fc509ec00d8ee2/f1_vueltas_2023.csv', sep=',', encoding = "ISO-8859 -1")
dataLap.head()

# COMMAND ----------

dataLap.info()

# COMMAND ----------

# MAGIC %md
# MAGIC Comprobación de datos nulos

# COMMAND ----------

dataPilot.isnull().sum()

# COMMAND ----------

dataRacecourse.isnull().sum()

# COMMAND ----------

dataLap.isnull().sum()

# COMMAND ----------

# MAGIC %md
# MAGIC 1. Calcula el tiempo medio por vuelta de cada piloto en toda la temporada.

# COMMAND ----------

result = dataLap.groupby('nombre_piloto')['tiempo_vuelta'].mean().reset_index()

print(result)

# COMMAND ----------

# MAGIC %md
# MAGIC 2. Identifica el piloto con la vuelta más rápida en cada circuito.

# COMMAND ----------

result = dataLap.groupby('nombre_piloto')['tiempo_vuelta']['circuito'].min().reset_index()

print(result)

# COMMAND ----------

# MAGIC %md
# MAGIC 2. Identifica el piloto con la vuelta más rápida en cada circuito.

# COMMAND ----------



# COMMAND ----------

# MAGIC %md
# MAGIC 3. Determina la vuelta más rápida de la temporada y el piloto.

# COMMAND ----------



# COMMAND ----------

# MAGIC %md
# MAGIC 4. Analiza la consistencia de los pilotos mediante la desviación estándar de sus tiempos de vuelta.

# COMMAND ----------



# COMMAND ----------

# MAGIC %md
# MAGIC 5. Comparación de Equipos: Evalúa el rendimiento general de los equipos comparando los tiempos promedio de vuelta de sus pilotos.

# COMMAND ----------



# COMMAND ----------

# MAGIC %md
# MAGIC 6. Análisis de Circuitos: Determinar cuáles circuitos presentan mayores desafíos para los pilotos, basándose en la variabilidad de los tiempos de vuelta.

# COMMAND ----------


