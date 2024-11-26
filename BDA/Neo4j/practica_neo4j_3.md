# Big Data Aplicado
## UD2 - Procesado y Presentación de Datos Almacenados
### Práctica 3 Neo4j

>   Recuerda que para hacer la prácticas puedes optar por cualquiera de la las 3 opciones.
>   - Instalarla en tu máquina local
>   - Usar SandBox Neo4j.com: https://sandbox.neo4j.com/ con Graph Data Science
>   - Crear un contenedor docker.

1. Vamos a **importar un grafo de los aeropuertos y sus conexiones** con el siguiente esquema.

![](img/UD4_Pract3_graph_model2.png)

Trabajaremos con un conjunto de datos de ejemplo que muestra las conexiones entre diferentes aeropuertos de todo el mundo. Hay que tener en cuenta que tenemos 5 etiquetas de nodos diferentes (_:HAS_ROUTE, :IN_CITY, :IN_COUNTRY, :IN_REGION, and :ON_CONTINENT_)

Usaremos el comando de Cypher LOAD CSV para importar nuestros datos a Neo4j desde archivos CSV alojados en GitHub. Analizará los archivos CSV línea por línea como objetos que luego se pueden manipular con Cypher.

Comenzaremos creando restricciones de unicidad en cada uno de los nodos, lo que hace que las consultas sean eficientes. También existe un índice creado en base a las coordenadas geográficas de cada aeropuerto que se puede utilizar para consultas espaciales (no se muestra en esta guía).

```cypher
//Versión Cypher desde 4.4 en adelante
CREATE CONSTRAINT airports IF NOT EXISTS FOR (a:Airport) REQUIRE a.iata IS UNIQUE;
CREATE CONSTRAINT cities IF NOT EXISTS FOR (c:City) REQUIRE c.name IS UNIQUE;
CREATE CONSTRAINT regions IF NOT EXISTS FOR (r:Region) REQUIRE r.name IS UNIQUE;
CREATE CONSTRAINT countries IF NOT EXISTS FOR (c:Country) REQUIRE c.code IS UNIQUE;
CREATE CONSTRAINT continents IF NOT EXISTS FOR (c:Continent) REQUIRE c.code IS UNIQUE;
CREATE INDEX locations IF NOT EXISTS FOR (air:Airport) ON (air.location);
```

A continuación, importaremos los nodos Aeropuerto, País y Continente, estableceremos sus propiedades y crearemos las relaciones _IN_CITY, IN_COUNTRY, IN_REGION and ON_CONTINENT_ entre ellos.

```cypher
//Si el recurso no estuviera disponible, hay una copia en este mismo repositorio
WITH
    'https://raw.githubusercontent.com/neo4j-graph-examples/graph-data-science2/main/data/airport-node-list.csv'
    AS url
LOAD CSV WITH HEADERS FROM url AS row
MERGE (a:Airport {iata: row.iata})
MERGE (ci:City {name: row.city})
MERGE (r:Region {name: row.region})
MERGE (co:Country {code: row.country})
MERGE (con:Continent {name: row.continent})
MERGE (a)-[:IN_CITY]->(ci)
MERGE (a)-[:IN_COUNTRY]->(co)
MERGE (ci)-[:IN_COUNTRY]->(co)
MERGE (r)-[:IN_COUNTRY]->(co)
MERGE (a)-[:IN_REGION]->(r)
MERGE (ci)-[:IN_REGION]->(r)
MERGE (a)-[:ON_CONTINENT]->(con)
MERGE (ci)-[:ON_CONTINENT]->(con)
MERGE (co)-[:ON_CONTINENT]->(con)
MERGE (r)-[:ON_CONTINENT]->(con)
SET a.id = row.id,
    a.icao = row.icao,
    a.city = row.city,
    a.descr = row.descr,
    a.runways = toInteger(row.runways),
    a.longest = toInteger(row.longest),
    a.altitude = toInteger(row.altitude),
    a.latitude = toFloat(row.lat),
    a.longitude = toFloat(row.lon);
```

Finalmente, importaremos la relación _(Airport)-[:HAS_ROUTE]→(Airport)_. Tenga en cuenta que la relación tiene una propiedad de _distance_, que indica la distancia entre cada uno de los aeropuertos. Más tarde usaremos esto para crear grafos ponderados.

```cypher
//Si el recurso no estuviera disponible, hay una copia en este mismo repositorio
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/neo4j-graph-examples/graph-data-science2/main/data/iroutes-edges.csv' AS row
MATCH (source:Airport {iata: row.src})
MATCH (target:Airport {iata: row.dest})
MERGE (source)-[r:HAS_ROUTE]->(target)
ON CREATE SET r.distance = toInteger(row.dist);
```

Podemos visualizar el esquema con el siguiente comando

```cypher
CALL db.schema.visualization()
```

Algunas consultas básicas que podemos realizar

- Distribución del número de aeropuertos por continente usando esta consulta:

```cypher
MATCH (:Airport)-[:ON_CONTINENT]->(c:Continent)
RETURN c.name AS continentName, count(*) AS numAirports ORDER BY numAirports DESC
```

- Desviación mínima, máxima, promedio y estándar del número de vuelos que salen de cada aeropuerto:

```cypher
MATCH (a:Airport)-[:HAS_ROUTE]->(:Airport)
WITH a, count(*) AS numberOfRoutes
RETURN min(numberOfRoutes), max(numberOfRoutes), avg(numberOfRoutes), stdev(numberOfRoutes)
```

- Obtener las estadísticas sobre la duración de los vuelos entre aeropuertos:

```cypher
MATCH (:Airport)-[r:HAS_ROUTE]->(:Airport)
WITH r.distance AS routeDistance
RETURN min(routeDistance), max(routeDistance), avg(routeDistance), stdev(routeDistance)
```

2. **Creación del grafo para el uso de GDS**

```cypher
CALL gds.graph.project(
    'routes',
    'Airport',
    'HAS_ROUTE'
)
YIELD
    graphName, nodeProjection, nodeCount, relationshipProjection, relationshipCount
```

Es útil saber qué grafo hay en el catálogo y sus propiedades. Para ver esto para todos los grafos, utiliza

```cypher
CALL gds.graph.list()
```

También puedes verificar esto para un grafo individual.

```cypher
CALL gds.graph.list('routes')
```

3. **Sintaxis del algoritmo**: **modos de ejecución** disponibles

Una vez que haya creado una proyección de grafo con nombre, se proporcionan 4 modos de ejecución diferentes para cada algoritmo de nivel de producción:

**stream**: Devuelve los resultados del algoritmo como un flujo de registros sin alterar la base de datos

**write**: escribe los resultados del algoritmo en la base de datos de Neo4j y devuelve un registro único de estadísticas de resumen

**mutate**: escribe los resultados del algoritmo en el grafo proyectado y devuelve un registro único de estadísticas de resumen. No cambia la base de datos en sí, pero escribe los resultados del cálculo en cada nodo dentro del grafo proyectado para cálculos futuros.

**stats**: devuelve un único registro de estadísticas de resumen, pero no escribe en la base de datos de Neo4j ni en el grafo proyectado

Además de lo anterior para los modos, es posible utilizar la **estimate** para obtener una estimación de cuánta memoria utilizará un algoritmo determinado.


### Ejercicio 1: Calcula la centralidad vía [PageRank](https://neo4j.com/docs/graph-data-science/current/algorithms/page-rank/)  

Hay muchas formas de determinar la centralidad o importancia de un nodo, pero una de las más populares es mediante el cálculo del PageRank. PageRank mide la influencia transitiva (o direccional) de un nodo. El beneficio de este enfoque es que utiliza la influencia de los vecinos de un nodo para determinar la influencia del nodo de destino. La idea general es que un nodo que tiene más enlaces entrantes y más influyentes desde otros nodos se considera más importante (es decir, un PageRank más alto).

El algoritmo en sí es un algoritmo iterativo. El número de iteraciones se puede establecer como un parámetro de configuración en GDS; sin embargo, el algoritmo puede terminar si las puntuaciones de los nodos convergen en función de un valor de tolerancia específico, que también se puede configurar en GDS.

```cypher
CALL gds.pageRank.stream('routes')
YIELD nodeId, score
WITH gds.util.asNode(nodeId) AS n, score AS pageRank
RETURN n.iata AS iata, n.descr AS description, pageRank
ORDER BY pageRank DESC, iata ASC
```

Esto nos da una lista de aeropuertos ordenados por orden decreciente de PageRank. La función de utilidad _gds.util.asNode()_ asigna los nodos de la base de datos a los resultados de flujo de GDS, lo que nos permite incluir propiedades de la base de datos en el resultado final de nuestra consulta. En este caso, incluimos el código IATA y la descripción del aeropuerto.

Si queremos adjuntar los resultados del cálculo de PageRank como una propiedad de nodo a cada nodo en el grafo, usaríamos _.write()_ de la siguiente manera:

```cypher
CALL gds.pageRank.write('routes',
    {
        writeProperty: 'pageRank'
    }
)
YIELD nodePropertiesWritten, ranIterations
```

Podemos confirmarlo utilizando:

```cypher
MATCH (a:Airport)
RETURN a.iata AS iata, a.descr AS description, a.pageRank AS pageRank
ORDER BY a.pageRank DESC, a.iata ASC
```

###  Ejercicio 2: Detección de comunidad vía [Louvain](https://neo4j.com/docs/graph-data-science/current/algorithms/louvain/)

La detección de comunidades es una herramienta útil para identificar regiones de un grafo que están densamente agrupadas. Por ejemplo, en nuestro grafo de rutas de aeropuertos, la detección de la comunidad puede ayudarnos a identificar grupos naturales de aeropuertos que se formaron a partir de la gran cantidad de rutas que tienen entre sí.

El algoritmo de modularidad de _Louvain_ encuentra grupos dentro de un grafo midiendo la densidad relativa de las relaciones. Esto se cuantifica a través del puntaje de modularidad, que es una comparación de la densidad de relaciones dentro de un grupo con una muestra promedio o aleatoria. Entonces, cuanto mayor es la modularidad, más denso es el clúster. El método de Louvain intenta maximizar la modularidad a lo largo del grafo a través de un enfoque recursivo. Al igual que con PageRank, en GDS el usuario puede especificar un número máximo de iteraciones, así como un factor de tolerancia para la terminación anticipada. Además, el algoritmo puede devolver las asignaciones de la comunidad intermedia en el camino hacia la convergencia.

```cypher
CALL gds.louvain.stream('routes')
YIELD nodeId, communityId
WITH gds.util.asNode(nodeId) AS n, communityId
RETURN
    communityId,
    SIZE(COLLECT(n)) AS numberOfAirports,
    COLLECT(DISTINCT n.city) AS cities
ORDER BY numberOfAirports DESC, communityId;
```

En este caso hemos obtenido los ID de comunidad y contamos el número de aeropuertos en cada comunidad usando la combinación de COLLECT, que crea una lista de los resultados, y SIZE, que devuelve el tamaño de una lista. También devolvemos una lista de las ciudades en cada comunidad.

Explorando esta lista, podemos ver que la comunidad más grande corresponde a los aeropuertos de Estados Unidos, la segunda a los aeropuertos de Europa, y así sucesivamente. En la inspección de superficie, estos resultados tienen sentido porque los aeropuertos en el grafo parecen estar agrupados según el continente.

Como antes, si deseamos escribir estos resultados como propiedades de nodo, podemos usar _gds.louvain.write()_.

### Ejercicio 3: [Node similarity](https://neo4j.com/docs/graph-data-science/current/algorithms/node-similarity/)

Al igual que con las categorías de algoritmos anteriores de centralidad y detección de comunidad, existen varias formas de calcular la similitud de los nodos. En general, la similitud de nodos se calcula entre pares de nodos a través de diferentes métricas basadas en vectores. Esto es útil para cosas como los motores de recomendación en los que desea, por ejemplo, recomendar objetos similares para comprar en función de las compras anteriores de un cliente. En esta sección usaremos el algoritmo de similitud de nodos GDS

```cypher
CALL gds.nodeSimilarity.stream('routes')
YIELD node1, node2, similarity
WITH gds.util.asNode(node1) AS n1, gds.util.asNode(node2) AS n2, similarity
RETURN
    n1.iata AS iata,
    n1.city AS city,
    COLLECT({iata:n2.iata, city:n2.city, similarityScore: similarity}) AS similarAirports
ORDER BY city LIMIT 20
```

1. **Node similarity: topK**

El algoritmo devolvió los 10 aeropuertos más similares para cada nodo de aeropuerto en el grafo. Aplicamos un LÍMITE al final de la consulta para mostrar una fracción de los resultados completos. Lo que ha sucedido aquí detrás de escena es que GDS ha limitado, por nodo (K), la cantidad de resultados que se devuelven, establecida por el parámetro de configuración topK, que tiene un valor predeterminado de 10. Podríamos restringir esto aún más al alterando la consulta anterior como:

```cypher
CALL gds.nodeSimilarity.stream(
    'routes',
    {
        topK: 3
    }
)
YIELD node1, node2, similarity
WITH gds.util.asNode(node1) AS n1, gds.util.asNode(node2) AS n2, similarity
RETURN
    n1.iata AS iata,
    n1.city AS city,
    COLLECT({iata:n2.iata, city:n2.city, similarityScore: similarity}) AS similarAirports
ORDER BY city LIMIT 20
```

2. **Node similarity: topN and bottomN**

Como indicamos anteriormente, podemos limitar la cantidad de puntajes de similitud en todos los nodos especificando _topN_, los puntajes de similitud generales más grandes en el grafo

```cypher
CALL gds.nodeSimilarity.stream(
    'routes',
    {
        topK: 1,
        topN: 10
    }
)
YIELD node1, node2, similarity
WITH gds.util.asNode(node1) AS n1, gds.util.asNode(node2) AS n2, similarity AS similarityScore
RETURN
    n1.iata AS iata,
    n1.city AS city,
    {iata:n2.iata, city:n2.city} AS similarAirport,
    similarityScore
ORDER BY city
```

En este caso, hemos calculado los pares de similitud de puntaje más alto para cada aeropuerto (topK: 1) y luego devolvimos los 10 pares de aeropuertos con la similitud más alta en todo el grafo (topN: 10).

También podemos limitar las puntuaciones de similitud en todos los nodos especificando _bottomN_, que hará lo contrario de topN, almacenando las puntuaciones más bajas. Esto es útil para identificar nodos con relativamente pocas similitudes con otros nodos en el grafo.

3. **Node similarity: degree and similarity cutoff**

Otra forma de limitar la cantidad de cálculos realizados es proporcionar un valor mínimo de grado para que un nodo se considere en los cálculos generales, como a continuación, donde requerimos un grado mínimo de 100 (es decir, un mínimo de 100 vuelos que llegan y fuera de un aeropuerto):

```cypher
CALL gds.nodeSimilarity.stream(
    'routes',
    {
        degreeCutoff: 100
    }
)
YIELD node1, node2, similarity
WITH gds.util.asNode(node1) AS n1, gds.util.asNode(node2) AS n2, similarity
RETURN
    n1.iata AS iata,
    n1.city AS city,
    COLLECT({iata:n2.iata, city:n2.city, similarityScore: similarity}) AS similarAirports
ORDER BY city LIMIT 20
```

También podemos establecer una puntuación mínima de similitud:

```cypher
CALL gds.nodeSimilarity.stream(
    'routes',
    {
        similarityCutoff: 0.5
    }
)
YIELD node1, node2, similarity
WITH gds.util.asNode(node1) AS n1, gds.util.asNode(node2) AS n2, similarity
RETURN
    n1.iata AS iata,
    n1.city AS city,
    COLLECT({iata:n2.iata, city:n2.city, similarityScore: similarity}) AS similarAirports
ORDER BY city LIMIT 20
```

### Ejercicio 4: [Path finding](https://neo4j.com/docs/graph-data-science/current/algorithms/pathfinding/)

Al igual que todas las demás categorías de algoritmos que hemos explorado, existen varios enfoques posibles para la búsqueda de rutas. En términos generales, el propósito de la búsqueda de rutas es encontrar la ruta más corta entre dos o más nodos. En el caso de nuestro grafo de ruta del aeropuerto, esto nos ayudaría a identificar qué conexiones de aeropuerto serían necesarias para minimizar la distancia total del vuelo.

1. **Dijkstra’s algorithm**

Usaremos el algoritmo común de Dijkstra para encontrar el camino más corto entre dos nodos.

Creación de la proyección de grafo

En nuestros ejemplos anteriores no consideramos la distancia de las rutas entre aeropuertos. Sin embargo, en este caso, querremos usar la distancia de la ruta como peso en Dijkstra para que las rutas más cortas resultantes reflejen aquellas con las distancias físicas más cortas. Para hacer esto, primero debemos incluir la distancia de la ruta como una propiedad de la relación en nuestra proyección gráfica de la siguiente manera

```cypher
MATCH (source:Airport)-[r:HAS_ROUTE]->(target:Airport)
RETURN gds.graph.project(
  'routes-weighted',
  source,
  target,
  { relationshipProperties: r { .distance } }
)
```

Vamos a calcular la distancia más corta desde el Aeropuerto Internacional de Denver (DEN) hasta el Aeropuerto Internacional de Malé (MLE) usando nuestra proyección de gráfico ponderado:

```cypher
MATCH (source:Airport {iata: 'DEN'}), (target:Airport {iata: 'MLE'})
CALL gds.shortestPath.dijkstra.stream('routes-weighted', {
    sourceNode: source,
    targetNode: target,
    relationshipWeightProperty: 'distance'
})
YIELD index, sourceNode, targetNode, totalCost, nodeIds, costs, path
RETURN
    index,
    gds.util.asNode(sourceNode).iata AS sourceNodeName,
    gds.util.asNode(targetNode).iata AS targetNodeName,
    totalCost,
    [nodeId IN nodeIds | gds.util.asNode(nodeId).iata] AS nodeNames,
    costs,
    nodes(path) as path
ORDER BY index
```

Podemos ver en la consulta anterior que estamos especificando un nodo de origen y otro de destino y usando la _relationshipWeightProperty_ de _distance_. A partir de ahí, se devuelven muchas cosas, incluido el costo total (similar a la distancia, que generalmente representa la distancia en línea recta entre dos nodos mientras se ignoran otras posibles fuentes de demora, como el tiempo dedicado al rodaje, etc.), y una lista de los aeropuertos por este camino. En este caso, vemos que el camino más corto es de 4 saltos — quizás no sea práctico, pero la distancia total se minimiza.

## Practica 3

Teniendo como base este grafo y los ejemplos guiados indicados anteriormente, realiza los siguientes apartados, siguiendo estas indicaciones:

> -  **Es Imprescindible que todas las operaciones sobre la Base de Datos tenga la intención de Obtener CONOCIMIENTO a partir de la INFORMACIÓN que tienes almacenada en este grafo**
   
> - **Demuestra** y **justifica** el punto anterior en cada una ellas
   
> -  **Estamos en un _Curso de Especialización_ de Big Data. No debe ser tomada como una práctica cualquiera. La práctica debe ser lo suficientemente completa como para el nivel de formación en el que estamos. Además, esta práctica esta pensada para evitar hacer un examen de Neo4j de la UD2**

1. Realiza, al menos, una operación de cada uno de los siguientes algoritmos de [búsqueda de caminos](https://neo4j.com/docs/graph-data-science/current/algorithms/pathfinding/)
   
   - Caminos mínimos entre un nodo del grafo y todos los demás nodos alcanzables

    Por ejemplo, queremos saber desde un viaje tomado desde el aeropuerto de málaga que otros aeropuertos están al alcance
    de este para saber que recorrido tendrían.

Proyección
```
    MATCH (source:Airport)-[r:HAS_ROUTE]->(target:Airport)
    RETURN gds.graph.project(
    'Graph_Delta-Stepping',
    source,
    target,
    { relationshipProperties: r { .distance } }
    )
```

Llamada
```
    MATCH (source:Airport {iata: 'AGP'})
    CALL gds.allShortestPaths.delta.stream('Graph_Delta-Stepping', {
        sourceNode: source,
        relationshipWeightProperty: 'distance',
        delta: 3.0
    })
    YIELD index, sourceNode, targetNode, totalCost, nodeIds, costs, path
    RETURN
        index,
        gds.util.asNode(sourceNode).iata AS SourceAirport,
        gds.util.asNode(targetNode).iata AS DestinyAirport,
        totalCost AS totalDistance,
        [nodeId IN nodeIds | gds.util.asNode(nodeId).iata] AS Airport,
        costs AS distance,
        nodes(path) as path
    ORDER BY index
```

   - Dijkstra de un origen a un destino teniendo en cuenta algún tipo de coste o peso.

    Por ejemplo, queremos saber el coste (en este caso la distancia) que tendría un vuelo de madrid a alemania para luego compararlo con otro
    aeropuerto (por ejemplo AGP) y así escoger el coste mínimo.

    Proyección
   ```
    MATCH (source:Airport)-[r:HAS_ROUTE]->(target:Airport)
    RETURN gds.graph.project(
    'Graph_Dijkstra',
    source,
    target,
    { relationshipProperties: r { .distance } }
    )
   ```

   Llamada
   ```
    MATCH (source:Airport {iata: 'MAD'}), (target:Airport {iata: 'BER'})
    CALL gds.shortestPath.dijkstra.stream('Graph_Dijkstra', {
        sourceNode: source,
        targetNodes: target,
        relationshipWeightProperty: 'distance'
    })
    YIELD index, sourceNode, targetNode, totalCost, nodeIds, costs, path
    RETURN
        index,
        gds.util.asNode(sourceNode).iata AS sourceAirport,
        gds.util.asNode(targetNode).iata AS targetAirport,
        totalCost AS Totaldistance,
        [nodeId IN nodeIds | gds.util.asNode(nodeId).iata] AS Airport,
        costs AS distance,
        nodes(path) as path
    ORDER BY index
   ```

   - Dijkstra  entre un nodo del grafo y todos los demás nodos alcanzables teniendo en cuenta algún tipo de coste o peso.

    Por ejemplo, si queremos saber tods los aeropuertos los cuales podemos alcanzar desde madrid para planear un viaje.

    La proyección podemos usar la misma de antes

    Llamada
    ```
        MATCH (source:Airport {iata: 'MAD'})
        CALL gds.allShortestPaths.dijkstra.stream('Graph_Dijkstra1', {
            sourceNode: source,
            relationshipWeightProperty: 'distance'
        })
        YIELD index, sourceNode, targetNode, totalCost, nodeIds, costs, path
        RETURN
            index,
            gds.util.asNode(sourceNode).iata AS sourceAirport,
            gds.util.asNode(targetNode).iata AS targetAirport,
            totalCost AS totalDistance,
            [nodeId IN nodeIds | gds.util.asNode(nodeId).iata] AS Airport,
            costs AS distance,
            nodes(path) as path
        ORDER BY index
    ```

   - Algoritmo A*

    Por ejemplo, queremos encontrar la ruta más eficiente entre Sevilla y París. Utilizando la distancia geográfica.

    Proyección
   ```
        MATCH (source:Airport)-[r:HAS_ROUTE]->(target:Airport)
        RETURN gds.graph.project(
            'Graph_A*',
            source,
            target,
            {
                sourceNodeProperties: source { .latitude, .longitude },
                targetNodeProperties: target { .latitude, .longitude },
                relationshipProperties: r { .distance }
            }
        )
   ```

   Llamada
   ```
    MATCH (source:Airport {iata: 'SVQ'}), (target:Airport {iata: 'ORY'})
    CALL gds.shortestPath.astar.stream('Graph_A*', {
        sourceNode: source,
        targetNode: target,
        latitudeProperty: 'latitude',
        longitudeProperty: 'longitude',
        relationshipWeightProperty: 'distance'
    })
    YIELD index, sourceNode, targetNode, totalCost, nodeIds, costs, path
    RETURN
        index,
        gds.util.asNode(sourceNode).iata AS sourceAirport,
        gds.util.asNode(targetNode).iata AS targetAirport,
        totalCost AS totalDistance,
        [nodeId IN nodeIds | gds.util.asNode(nodeId).iata] AS nodeNames,
        costs AS distance,
        nodes(path) as path
    ORDER BY index
   ```
   - Algoritmo de Yen

    Si queremos considerar los caminos más cortos porque queremos realizar un viaje de sevilla a grecia 
    de minimo coste que podemos coger para realizar dicho viaje.
   
   Proyección
   ```
        MATCH (source:Airport)-[r:HAS_ROUTE]->(target:Airport)
        RETURN gds.graph.project(
            'Graph_Yens',
            source,
            target,
            { relationshipProperties: r { .distance } }
        )
   ```

   Llamada
   ```
        MATCH (source:Airport {iata: 'SVO'}), (target:Airport {iata: 'LGAL'})
        CALL gds.shortestPath.yens.stream('Graph_Yens', {
            sourceNode: source,
            targetNode: target,
            k: 3,
            relationshipWeightProperty: 'distance'
        })
        YIELD index, sourceNode, targetNode, totalCost, nodeIds, costs, path
        RETURN
            index,
            gds.util.asNode(sourceNode).iata AS sourceAirport,
            gds.util.asNode(targetNode).iata AS targetAirport,
            totalCost AS totalDistance,
            [nodeId IN nodeIds | gds.util.asNode(nodeId).iata] AS Airport,
            costs AS distance,
            nodes(path) as path
        ORDER BY index
   ```

   - Árbol de expansión de peso mínimo (Minimum Weight Spanning Tree)

    Si queremos ver rutas aéreas las cuales tienen el menor costo operativo para un avión por si necesitamos transportar algo o una aerolinea necesita ahorrar combustible.

    Proyección
    ```
        MATCH (source:Airport)
        OPTIONAL MATCH (source)-[r:HAS_ROUTE]->(target:Airport)
        RETURN gds.graph.project(
            'graph_MWST',
            source,
            target,
            { relationshipProperties: r { .distance } },
            { undirectedRelationshipTypes: ['*'] }
        )
    ```
    
    Llamada
    ```
        MATCH (n:Airport{iata: 'AGP'})
        CALL gds.kSpanningTree.write('graph', {
            k: 3,
            sourceNode: n,
            relationshipWeightProperty: 'distance',
            writeProperty:'kmin'
        })
        YIELD preProcessingMillis, computeMillis, writeMillis, effectiveNodeCount
        RETURN preProcessingMillis,computeMillis,writeMillis, effectiveNodeCount;
    ```
    ```
        MATCH (n)
        WITH n.kmin AS p, count(n) AS c
        WHERE c = 3
        MATCH (n)
        WHERE n.kmin = p
        RETURN n.iata As Airport, p as Partition
    ```
   - BFS de un nodo

    Digamos que un pasajero necesita llegar desde un determinado Aeropuerto  a otro Aeropuerto. Se querra buscar las rutas con el menor número de escalas posibles.

    Proyección
    ```
        MATCH (source:Airport)-[r:HAS_ROUTE]->(target:Airport)
        RETURN gds.graph.project(
            'Graph_BFS',
            source,
            target
        )
    ```

    Llamada
    ```
        MATCH (source:Airport{iata:'AGP'})
        CALL gds.bfs.stream('Graph_BFS', {
            sourceNode: source
        })
        YIELD path
        RETURN path
    ```
   - DFS de un nodo

   Por ejemplo un sistema de transporte aéreo necesita listar todas las rutas posibles entre el aeropuerto de málaga y otro aeropuerto para analizar alternativas en caso de congestión o restricciones en las rutas principales.

    Proyección
    ```
        MATCH (source:Airport)-[r:HAS_ROUTE]->(target:Airport)
        RETURN gds.graph.project(
            'Graph_DFS',
            source,
            target
        )
    ```

    Llamada
    ```
        MATCH (source:Airport{iata:'AGP'})
        CALL gds.dfs.stream('Graph_DFS', {
            sourceNode: source
        })
        YIELD path
        RETURN path
    ```

2. Realiza, al menos, una operación de cada uno de los siguientes algoritmos de [centralidad](https://neo4j.com/docs/graph-data-science/current/algorithms/centrality/)
   
   - PageRank
    
    Con esta operación, podemos ver que aeropuertos en que región según la distancia tiene más peso o que estan más conectadas. Con esto podemos sacar
    por ejemplo que región tiene más visitas según la distancia.

    Proyección
    ```
        MATCH (source:Airport)-[r:IN_REGION]->(target:Region)
        RETURN gds.graph.project(
        'Graph_PageRank',
            source,
            target,
        { relationshipProperties: r { .distance } }
        )
    ```

    Llamada
    ```
        CALL gds.pageRank.stream('Graph_PageRank')
        YIELD nodeId, score
        RETURN gds.util.asNode(nodeId).name AS region, score AS pageRank
        ORDER BY pageRank DESC, region ASC
    ```

   - Intermediación

   Por ejemplo si queremos saber el grado de influencia que tiene un aeropuerto sobre otro según su distancia podemos hacer lo siguiente.
   Con esto podemos sabemos que aeropuertos son más importantes a la hora de tomar un vuelo con respecto a otros.

       Proyección
    ```
        MATCH (source:Airport)-[r:HAS_ROUTE]->(target:Airport)
        RETURN gds.graph.project(
        'Graph_Betweenness',
                source,
                target,
            { relationshipProperties: r { .distance } }
        )
    ```

    Llamada
    ```
        CALL gds.betweenness.stream('Graph_Betweenness')
        YIELD nodeId, score
        RETURN gds.util.asNode(nodeId).iata AS airport, score AS betweenness
        ORDER BY airport ASC
    ```

   - Grado

   Con esto podemos llegar a saber que ciudad sobre que pais es más influyente. De esta manera podremos determinar por ejemplo 
   si queremos hacer un estudio de turismo que ciudad es la que probablemente vaya a destacar más en cuanto a visitantes.

       Proyección
    ```
        MATCH (source:City)-[r:IN_COUNTRY]->(target:Country)
        RETURN gds.graph.project(
        'Graph_Degree',
                source,
                target,
            { relationshipProperties: r { .distance } }
        )
    ```

    Llamada
    ```
        CALL gds.degree.stream('Graph_Degree')
        YIELD nodeId, score
        RETURN gds.util.asNode(nodeId).name AS city, score AS country
        ORDER BY country DESC, city DESC
    ```

   - Cercanía

    Por ejemplo si una aerolinea desea expandir sus vuelos, para tener la mayor eficiencia podemos ver que tan cerca esta el aeropuerto para determinar
    por ejemplo una ruta.

    Proyección
    ```
        MATCH (source:Airport)-[r:HAS_ROUTE]->(target:Airport)
        RETURN gds.graph.project(
        'Graph_Closeness',
        source,
        target
        )
    ```

    Llamada
    ```
        CALL gds.closeness.stream('Graph_Closeness')
        YIELD nodeId, score
        RETURN gds.util.asNode(nodeId).iata AS airport, score
        ORDER BY score DESC
    ```

3. Realiza, al menos, una operación de cada uno de los siguientes algoritmos de [Detección de comunidades](https://neo4j.com/docs/graph-data-science/current/algorithms/community/)
   
   - Conteo de triángulos

    Queremos evaluar qué países de diferentes continentes están conectados a través de aeropuertos compartidos o rutas comunes, para entender las dinámicas del tráfico intercontinental.

    Proyección
    ```
        MATCH (source:Country)-[r:ON_CONTINENT]->(target:Continent)
        RETURN gds.graph.project(
            'Graph_triangleCount',
            source,
            target,
            {},
            { undirectedRelationshipTypes: ['*'] }
        )
    ```

    Llamada
    ```
        CALL gds.triangleCount.stream('Graph_triangleCount')
        YIELD nodeId, triangleCount
        RETURN gds.util.asNode(nodeId).code AS country, triangleCount
        ORDER BY triangleCount DESC, country ASC
    ```

   - Coeficiente local de clustering

    Una aerolínea desea evaluar la eficiencia de sus hubs locales en términos de conectividad. Para ello, busca determinar qué aeropuertos tienen un alto coeficiente de clustering local, 
    lo que indica que los aeropuertos conectados a ellos también están bien conectados entre sí. Esto permitirá identificar aeropuertos clave para optimizar la coordinación de vuelos regionales

    Proyección
    ```
        MATCH (source:Airport)-[r:HAS_ROUTE]->(target:Airport)
        RETURN gds.graph.project(
            'Graph_LCC',
            source,
            target,
            {},
        { undirectedRelationshipTypes: ['*'] }
        )
    ```

    Llamada
    ```
        CALL gds.localClusteringCoefficient.stream('Graph_LCC')
        YIELD nodeId, localClusteringCoefficient
        RETURN gds.util.asNode(nodeId).iata AS airport, localClusteringCoefficient
        ORDER BY localClusteringCoefficient DESC, airport
    ```

   - Strongly Connected Components

    Queremos analizar regiones del mundo donde los países están fuertemente interconectados con sus continentes mediante rutas aéreas. El objetivo es encontrar componentes fuertemente conectados para identificar clústeres de países y continentes que tienen tráfico aéreo recíproco.

    Proyección
    ```
        MATCH (source:Country)-[r:ON_CONTINENT]->(target:Continent)
            RETURN gds.graph.project(
            'Graph_SCC',
            source,
            target
        )
    ```

    Llamada
    ```
        CALL gds.scc.stream('Graph_SCC', {})
        YIELD nodeId, componentId
        RETURN gds.util.asNode(nodeId).code AS country, componentId AS Component
        ORDER BY Component, country DESC
    ```

   - Otro de libre elección(K-Core Decomposition)

    Si queremos identificar los aeropuertos clave que tienen conexiones fuertes con múltiples ciudades. Para encontrar aeropuertos que operen con una alta conectividad, lo que facilita una red más eficiente de vuelos hacia varias ciudades importantes.

    Proyección
    ```
        MATCH (source:Airport)-[r:IN_CITY]->(target:City)
        RETURN gds.graph.project(
        'Graph_K-CoreD',
        source,
        target,
        {},
        { undirectedRelationshipTypes: ['*'] }
        )
    ```

    Llamada
    ```
        CALL gds.kcore.stream('Graph_K-CoreD')
        YIELD nodeId, coreValue
        RETURN gds.util.asNode(nodeId).iata AS airport, coreValue
        ORDER BY coreValue ASC, name DESC
    ```

4. Realiza, al menos, una operación de cada uno de los siguientes algoritmos de [Similarity](https://neo4j.com/docs/graph-data-science/current/algorithms/similarity/)
   
   - Similitud de nodo

   Si queremos averiguar cuanto se parecen o comparten similitud 2 aeropuertos según si tienen conexiones iguales podemos realizar el siguiente algoritmo.
   Esto nos puede llegar a ser útil si queremos llegar a de un aeropuerto a otro y queremos comparar que opción nos puede llegar a salir más rentable
   dependiendo de otras cosas, con la seguridad de que los dos aeropuertos nos pueden llegar al mismo destino.

    Proyección
    ```
        MATCH (source:Airport)
        OPTIONAL MATCH (source)-[r:ON_CONTINENT]->(target:Continent)
        RETURN gds.graph.project(
            'Graph_Similarity',
            source,
            target,
            { relationshipProperties: r { strength: coalesce(r.strength, 1.0) } }
        )
    ```

    Llamada
    ```
        CALL gds.nodeSimilarity.stream('Graph_Similarity')
        YIELD node1, node2, similarity
        RETURN gds.util.asNode(node1).iata AS airport1, gds.util.asNode(node2).iata AS airport2, similarity
        ORDER BY similarity DESCENDING, airport1, airport2
    ```

   - Otro de libre elección(K-Nearest Neighbors)

    Si queremos buscar una ruta eficiente entre dos aeropuertos pero no hemos planteado cuales y queremos averiguarlo podemos usar KNN. De esta manera
    si una conexión directa no está disponible, podemos ver aeropuertos alternativos cercanos.

       Proyección
    ```
        MATCH (p:Airport)
        RETURN gds.graph.project(
            'Graph_KNN',
            p,
            null,
            {
                sourceNodeProperties: p { .distance },
                targetNodeProperties: {}
            }
        )
    ```

    Llamada
    ```
        CALL gds.knn.stream('Graph_KNN', {
            topK: 1,
            nodeProperties: ['distance'],
            // The following parameters are set to produce a deterministic result
            randomSeed: 1337,
            concurrency: 1,
            sampleRate: 1.0,
            deltaThreshold: 0.0
        })
        YIELD node1, node2, similarity
        RETURN gds.util.asNode(node1).iata AS Airport1, gds.util.asNode(node2).iata AS Airport2, similarity
        ORDER BY similarity DESCENDING, Airport1, Airport2
    ```


5. Realiza, al menos 3 operaciones de grafos (Cómo vimos en el ejemplo de Twitter) para extraer conocimiento teniendo en cuenta el esquema del grafo


   1º- Algoritmo de Yen
   
    Queremos realizar un viaje desde el aeropuerto de Málaga a Austria. Para ello vamos a considerar los caminos más
    cortos haciendo escala y de minimo coste que podemos coger para realizar dicho viaje.

   Proyección
   ```
        MATCH (source:Airport)-[r:HAS_ROUTE]->(target:Airport)
        RETURN gds.graph.project(
            'Graph_Yens2',
            source,
            target,
            { relationshipProperties: r { .distance } }
        )
   ```

   Llamada
   ```
        MATCH (source:Airport {iata: 'AGP'}), (target:Airport {iata: 'AUA'})
        CALL gds.shortestPath.yens.stream('Graph_Yens2', {
            sourceNode: source,
            targetNode: target,
            k: 3,
            relationshipWeightProperty: 'distance'
        })
        YIELD index, sourceNode, targetNode, totalCost, nodeIds, costs, path
        RETURN
            index,
            gds.util.asNode(sourceNode).iata AS sourceAirport,
            gds.util.asNode(targetNode).iata AS targetCity,
            totalCost AS totalDistance,
            [nodeId IN nodeIds | gds.util.asNode(nodeId).iata] AS Airport,
            costs AS distance,
            nodes(path) as path
        ORDER BY index
   ```

    2º- Centralidad de Cercanía

    Queremos oranizar un viajea través de una red global de aeropuertos, pero queremos la forma más rápida y eficiente de conectar diferentes destinos.
    Sin tiempos de tránsito. Para ello vamos a averiguar que regiones son más centrales según que aeropuerto.


    Proyección
    ```
        MATCH (source:Airport)-[r:IN_REGION]->(target:Region)
        RETURN gds.graph.project(
        'Graph_Closeness2',
        source,
        target
        )
    ```

    Llamada
    ```
        CALL gds.closeness.stream('Graph_Closeness2')
        YIELD nodeId, score
        RETURN gds.util.asNode(nodeId).name AS region, score
        ORDER BY score DESC
    ```

    3º- Conteo de triángulos

    Queremos averiguar que aeropuertos tienen un alto número de triangulos en su país para así determinar que país tiene mayor número de
    conexiones aéreas a nivel nacional. Gracias a esto, podremos determinar que viajes serán más cortos si queremos viajar a algún lugar cercano.

    Proyección
    ```
        MATCH (source:Airport)-[r:IN_COUNTRY]->(target:Country)
        RETURN gds.graph.project(
        'Graph_triangleCount2',
            source,
            target,
            {},
            { undirectedRelationshipTypes: ['*'] }
        )
    ```

    Llamada
    ```
        CALL gds.triangleCount.stream('Graph_triangleCount2')
        YIELD nodeId, triangleCount
        RETURN gds.util.asNode(nodeId).iata AS airport, triangleCount
        ORDER BY triangleCount DESC, airport ASC
    ```