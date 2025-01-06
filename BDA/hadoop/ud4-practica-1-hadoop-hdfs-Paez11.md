# Big Data Aplicado
## UD 4 - Apache Hadoop
### Práctica 1 HDFS

> Para los siguientes ejercicios, copia el comando y haz una captura de pantalla donde se muestre el resultado de cada acción

1. Explica paso a paso el proceso de lectura (indicando qué bloques y los datanodes empleados) que realiza HDFS si queremos leer el archivo `/logs/101213.log`  _(RA5075.3 / CE.3a)_ 

<figure style="align: center;">
    <img src="img/UD4_LecturaHDFS_ejercicio.png">
    <figcaption>Proceso de lectura HDFS</figcaption>
</figure>

- Archivos:
/logs/042814.log dividido en bloques: B1, B2, y B3.
/logs/101213.log dividido en bloques: B4 y B5.
- NameNode:
Contiene la metainformación que indica qué bloques forman cada archivo y en qué DataNodes están replicados los bloques.
- DataNodes:
Existen 4 nodos donde están distribuidos los bloques (Nodo 1, Nodo 2, Nodo 3, Nodo 4) con las réplicas correspondientes.

Proceso de lectura:
- El cliente que desea leer un fichero de HDFS, mediante una librería instalada en su equipo, realiza una llamada al Namenode para conocer qué bloques forman un fichero (llamemos X al fichero), así como los Datanodes que contienen cada uno de los bloques.
- El Namenode retorna dicha información, y ordena para cada bloque los Datanodes que contienen dicho bloque en función de la distancia al cliente (un algoritmo evalúa la distancia entre el cliente y cada Datanode). El objetivo de esta lista ordenada es intentar reducir el tiempo de acceso a cada Datanode desde el cliente.
- Con la información recibida del Namenode, el cliente se comunica directamente con el Datanode 1 para solicitarle el primer bloque.
- El cliente se comunica con el Datanode 2 para obtener el bloque 2.
- El cliente se comunica con el Datanode 1 para obtener el bloque 3.

2. En este ejercicio vamos a practicar los comandos básicos de **HDFS**. Una vez arrancado Hadoop _(RA5075.3 / CE.3a y CE.3c)_:
- Crea la carpeta `/bda/ejercicios`.

podemos crear la carpeta con el comando:

```cmd

hdfs dfs mkdir -p /bda/ejercicios

```
luego podemos comprobar que hemos creado la carpeta accediendo a la raiz: ``` hdfs dfs -ls / ```.
- Crea o descargar un fichero de texto con tu nombre y apellidos `Apellido1Apellido2Nombre.txt` en local.

``` cmd

>PaezAnguitaVictor.txt 

```

- Sube el archivo `Apellido1Apellido2Nombre.txt` a la carpeta creada.

```cmd

hdfs dfs -put PaezAnguitaVictor.txt /bda/ejercicios

```
Podemos comprobarlo con:
```cmd

hdfs dfs -ls /bda/ejercicios

```

- Crea una copia en HDFS y llámala `Apellido1Apellido2Nombre2.txt`.

```cmd

hdfs dfs -cp /bda/ejercicios/PaezAnguitaVictor.txt /bda/ejercicios/PaezAnguitaVictor2.txt

```

- Comprueba que se ha creado correctamente el fichero `Apellido1Apellido2Nombre2.txt`.

```cmd

hdfs dfs -ls /bda/ejercicios/

```

- Renombra `Apellido1Apellido2Nombre2.txt` a `Apellido1Apellido2Nombre2_copia.txt`.

```cmd

hdfs dfs -mv /bda/ejercicios/PaezAnguitaVictor2.txt /bda/ejercicios/PaezAnguitaVictor2_copia.txt

```

- Descarga en local `Apellido1Apellido2Nombre2_copia.txt` con su código CRC.

```cmd

hdfs dfs -get /bda/ejercicios/PaezAnguitaVictor2_copia.txt
hdfs dfs -get /bda/ejercicios/.PaezAnguitaVictor2_copia.txt.crc

```

- Adjunta una captura desde la interfaz web donde se vean ambos archivos.

```cmd



```

- Vuelve al terminal y elimina la carpeta con los archivos contenidos mediante un único comando.

```cmd

hdfs dfs -rm -r /bda/ejercicios

```

3. Vamos a practicar los comandos de gestión de instantáneas y administración de HDFS. Para ello: _(RA5075.4 / CE.4e y CE.4f)_
- Crea la carpeta `/bda/snaps`.

```cmd

hdfs dfs -mkdir -p /bda/snaps

```

- Habilita las snapshots sobre la carpeta creada.

```cmd

hdfs dfsadmin -allowSnapshot /bda/snaps

```

- Sube el archivo `Apellido1Apellido2Nombre.txt` creado antes en local a la carpeta creada.

```cmd

hdfs dfs -put PaezAnguitaVictor.txt /bda/snaps/
```

- Crea una copia en HDFS y llámala `Apellido1Apellido2Nombre_snapshot.txt`.

```cmd

hdfs dfs -cp /bda/snaps/PaezAnguitaVictor.txt /bda/snaps/PaezAnguitaVictor_snapshot.txt

```

- Crea una instantánea de la carpeta llamada snap1.

```cmd

hdfs dfs -createSnapshot /bda/snaps snap1

```

- Elimina ambos ficheros.

```cmd

hdfs dfs -rm /bda/snaps/PaezAnguitaVictor.txt
hdfs dfs -rm /bda/snaps/PaezAnguitaVictor_snapshot.txt

```

- Comprueba que la carpeta está vacía.

```cmd

hdfs dfs -ls /bda/snaps

```

- Recupera desde snap1 el archivo `Apellido1Apellido2Nombre.txt`.

```cmd

hdfs dfs -cp /bda/snaps/.snapshot/snap1/PaezAnguitaVictor.txt /bda/snaps/

```

- Crea una nueva instantánea de la carpeta llamada snap2.

```cmd

hdfs dfs -createSnapshot /bda/snaps snap2

```

- Muestra el contenido de la carpeta `/bda/snaps` así como de sus snapshots.

```cmd

hdfs dfs -ls /bda/snaps

```

4. HDFS por dentro _(RA5075.4 / CE.4e y CE.4f)_
- Accede al archivo de configuración `hdfs-site.xml` y averigua la carpeta donde se almacena el namenode.

```cmd

nano /etc/hadoop/conf/hdfs-site.xml

```
La propiedad dfs.namenode.name.dir indica la carpeta donde se almacena el NameNode.

- Muestra los archivos que contiene la carpeta current dentro del namenode

```cmd

ls -l /ruta/dfs.namenode.name.dir/current

```

- Comprueba el id del archivo _VERSION_.

```cmd

cat /ruta/dfs.namenode.name.dir/current/VERSION

```

- En los siguientes pasos vamos a realizar un checkpoint manual para sincronizar el sistema de ficheros. Para ello entramos en modo safe con el comando `hdfs dfsadmin -safemode enter`, para impedir que se trabaje con el sistema de ficheros mientras lanzamos el checkpoint.

- Comprueba mediante la interfaz gráfica que el modo seguro está activo (Safe mode is ON).

```cmd

hdfs dfsadmin -report

```

Ahora realiza el checkpoint con el comando `hdfs dfsadmin -saveNamespace`

- Vuelve a entrar al modo normal (saliendo del modo seguro mediante `hdfs dfsadmin -safemode leave`)

- Accede a la carpeta del namenode y comprueba que los fsimage del namenode son iguales.

```cmd

ls -l /ruta/dfs.namenode.name.dir/current/fsimage*

```
