# Big Data Aplicado
## UD 4 - Apache Hadoop
### Práctica 2 MapReduce-Yarn

> Para los siguientes ejercicios, copia el comando y haz una captura de pantalla donde se muestre el resultado de cada acción
> Debes entregar los correspondientes comandos y capturas.
> Recuerda que tienes que tener correctamente configurado Apache Hadoop (HDFS, MapReduce y Yarn). Si no es así, consulta la documentación del módulo

1. Calcula el del número π, con 16 maps y 10000000 muestras. _(RA5075.2 / CE.2b )_

```cmd

hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar pi 16 10000000

```
   
3. Cambia el cálculo con 4 maps y las mismas muestras _(RA5075.2 / CE.2b )_

```cmd

hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar pi 4 10000000

```
   
4. Compara los resultados estudiando cada "Jobs" en Yarn a través de su WebUI y analiza las diferencias. ¿Qué conclusiones obtienes? (Añade las correspondientes capturas) _(RA5075.4 / CE.4a )_

```cmd



```

5. Resuelve el siguiente sudoku _(RA5075.2 / CE.2b )_

```
8 5 ? 3 9 ? ? ? ?
? ? 2 ? ? ? ? ? ?
? ? 6 ? 1 ? ? ? 2
? ? 4 ? ? 3 ? 5 9
? ? 8 9 ? 1 4 ? ?
3 2 ? 4 ? ? 8 ? ?
9 ? ? ? 8 ? 5 ? ?
? ? ? ? ? ? 2 ? ?
? ? ? ? 4 5 ? 7 8
```

Tenemos que convertir el sudoku a un formato procesable para MapReduce

```
8 5 0 3 9 0 0 0 0
0 0 2 0 0 0 0 0 0
0 0 6 0 1 0 0 0 2
0 0 4 0 0 3 0 5 9
0 0 8 9 0 1 4 0 0
3 2 0 4 0 0 8 0 0
9 0 0 0 8 0 5 0 0
0 0 0 0 0 0 2 0 0
0 0 0 0 4 5 0 7 8
```

```cmd

hadoop jar SudokuSolver.jar InputDirectory OutputDirectory

```

5. Usando un fichero de texto de gran volumen, realiza el cálculo de la media, mediana y desviación estándar del tamaño de las palabras del texto. Compara los jobs de cada uno de ellos observando su coste en recursos, rendimiento y tiempo. Detalla la conclusión que puedes sacar de estos datos. _(RA5075.2 / CE.2b y RA5075.4 / CE.4a )_

subimos el archivo:

```cmd

hdfs dfs -put large_text_file.txt /bda/ejercicios/input

```

media:

```cmd

hadoop jar WordStats.jar MeanCalculator /bda/ejercicios/input /bda/ejercicios/output_mean

```

mediana:

```cmd

hadoop jar WordStats.jar MeanCalculator /bda/ejercicios/input /bda/ejercicios/output_median

```

desviación estandar:

```cmd

hadoop jar WordStats.jar StdDevCalculator /bda/ejercicios/input /bda/ejercicios/output_stddev

```

7. Vamos a seguir utilizando los ejemplos que nos facilita MapReduce. Para ello vamos a usar un conjunto de 3 aplicaciones(teragen, terasort y teravalidate). Estos se basan en la implementación de MapReduce desarrolladas por Owen O'Malley y Arun Murthy. Estas aplicaciones ganaron el estándar de comparación anual de ordenación de terabytes de uso general ("Daytona") en 2009 con una velocidad de 0,578 TB/min (100 TB en 173 minutos). Para obtener más información sobre este y otros estándares de comparación de ordenación, consulte el sitio [Sort Benchmark](https://sortbenchmark.org/). ***(Opcional)***

Este ejemplo utiliza tres conjuntos de programas de MapReduce:

- TeraGen: programa de MapReduce que genera filas de datos que se van a ordenar.

```cmd

hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar teragen 2147483648 /bda/ejercicios/teragen_output

```

```cmd

hdfs dfs -ls -h /user/yourname/teragen_output

```

- TeraSort: toma una muestra de los datos de entrada y usa MapReduce para ordenar los datos de manera absoluta.

    TeraSort es una ordenación MapReduce estándar, salvo por el particionador personalizado. El particionador usa una lista ordenada de N-1 claves de muestra que definen el intervalo de claves para cada reducción. En concreto, todas las claves, como esa sample[i-1] <= key < sample[i] se envían para reducir i. Este particionador garantiza que las salidas de la reducción i sean todas menores que la salida de la reducción i+1.

```cmd

hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar terasort /bda/ejercicios/teragen_output /bda/ejercicios/terasort_output

```

- TeraValidate: programa de MapReduce que valida que la salida se ordene de manera global.

    Crea una asignación por archivo en el directorio de salida y cada asignación asegura que cada clave es menor o igual que la anterior. La función de asignación genera registros de la primera y última clave de cada archivo. La función de reducción se asegura de que la primera clave del archivo i es mayor que la última clave del archivo i-1. Los problemas se notifican como una salida de la fase de reducción con las claves que no están en orden.

```cmd

hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar teravalidate /bda/ejercicios/terasort_output /bda/ejercicios/teravalidate_output

```

7. Crea un fichero a través de la aplicación `Teragen` de 2GB _(Observa primero si tienes espacio suficiente en el cluster (al menos 10GB) [http://bda-iesgrancapitan:9870/](http://bda-iesgrancapitan:9870/). Puedes hacerlo con menos para el ejercicio)_. El formato del fichero debe ser `Apellido1Nombre_teragen` _(RA5075.2 / CE.2b )_ ***(Opcional)***

```cmd

hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar teragen 20000000 /bda/ejercicios/PaezVictor_teragen

```

```cmd

hdfs dfs -ls -h /user/yourname/Apellido1Nombre_teragen

```

9. Muestra el fichero generado incluyendo permisos y tamaño en formato de GB. Indica que observas _(RA5075.2 / CE.2b )_ ***(Opcional)***

10. Ejecuta la siguiente aplicación `terasort` para ordenar los datos generados anteriormente. _Ponte cómodo, dependiendo de tu máquina, tardará un ratito ;p_. Observa en la WebUI de Yarn el correspondiente _JOB_ y en HDFS como se añaden los datos(bloques), y el espacio ocupado. El formato del fichero debe ser `Apellido1Nombre_terasort` _(RA5075.2 / CE.2b )_ ***(Opcional)***

11. Una vez finalizado, observa y compara el resultado. El formato del fichero debe ser `Apellido1Nombre_teravalidate` _(RA5075.2 / CE.2b )_ ***(Opcional)***

12. Finalmente, valida el resultado obtenido con `teravalidate`. El formato del fichero debe ser `Apellido1Nombre_teravalidate` _(RA5075.2 / CE.2b )_ ***(Opcional)***

13. Busca el checksum resultante de la operación e indica cuál es y donde lo has encontrado _(RA5075.2 / CE.2b )_ ***(Opcional)***

14. Investiga el ejemplo `pentomino`. Deberás explicar [cómo funciona](https://es.wikipedia.org/wiki/Pentomin%C3%B3), realizar un ejemplo con él y explicarlo de forma detallada. Si lo prefieres, cambia la investigación del ejemplo del `pentomino` por cualquier otro de la lista de los ejemplos que proporciona hadoop _(RA5075.2 / CE.2b )_

El Pentomino es un rompecabezas geométrico que consiste en 12 piezas diferentes, cada una formada por cinco cuadrados conectados ortogonalmente. Estas piezas deben colocarse en un tablero rectangular de manera que lo llenen completamente sin superponerse.
Cada pieza tiene una forma específica y puede rotarse o reflejarse para ajustar su posición en el tablero. Este problema es un ejemplo clásico de algoritmos de búsqueda y colocación, como el backtracking o soluciones distribuidas en sistemas como Hadoop.

Ejemplo: Pentomino en un Tablero de 6x10
Planteamiento del problema:
- Tablero: 6x10.
- Piezas: Las 12 piezas del pentomino.
- Objetivo: Llenar el tablero completamente con las piezas.

```cmd

hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar pentomino 6 10

```

```cmd

hdfs dfs -cat /user/yourname/output_pentomino/part-*

```
Un ejemplo de solución podría ser:

```
XXXXXX    
XXOOOO    
PPPPPP    
LLLLLL    
IIIIII    
ZZZZZZ
```
Cada letra representa una pieza diferente.
El programa valida que todas las piezas estén en el tablero sin superponerse.

