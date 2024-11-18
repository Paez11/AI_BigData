Ejercicio 1:
Diseña un grafo, de temática libre, compuesto por mínimo seis nodos. Para las ponderaciones de las aristas tomaremos valores que vayan en consonancia con el contenido elegido

He elegido la red de autopístas que conectan las ciudades de andalucía. Como nodo las ciudades, como relación las salidas o (enlaces)
y las ponderaciones o el costo he puesto el tiempo que se tardaría en cada una.

Ejercicio 2: Dado el grafo anterior:
Crea el grafo en Neo4j.

```
CREATE
  (Sevilla:Ciudad {nombre: "Sevilla"}),
  (Malaga:Ciudad {nombre: "Málaga"}),
  (Granada:Ciudad {nombre: "Granada"}),
  (Cordoba:Ciudad {nombre: "Córdoba"}),
  (Almeria:Ciudad {nombre: "Almería"}),
  (Jaen:Ciudad {nombre: "Jaén"}),
  (Cadiz:Ciudad {nombre: "Cádiz"}),
  (Huelva:Ciudad {nombre: "Huelva"}),

  (Sevilla)-[:ENLACE {tiempo: 2.1}]->(Malaga),
  (Malaga)-[:ENLACE {tiempo: 2.1}]->(Sevilla),
  
  (Sevilla)-[:ENLACE {tiempo: 1.2}]->(Cordoba),
  (Cordoba)-[:ENLACE {tiempo: 1.2}]->(Sevilla),
  
  (Cordoba)-[:ENLACE {tiempo: 1.4}]->(Malaga),
  (Malaga)-[:ENLACE {tiempo: 1.4}]->(Cordoba),
  
  (Cordoba)-[:ENLACE {tiempo: 2.0}]->(Granada),
  (Granada)-[:ENLACE {tiempo: 2.0}]->(Cordoba),
  
  (Cordoba)-[:ENLACE {tiempo: 1.5}]->(Jaen),
  (Jaen)-[:ENLACE {tiempo: 1.5}]->(Cordoba),
  
  (Malaga)-[:ENLACE {tiempo: 1.5}]->(Granada),
  (Granada)-[:ENLACE {tiempo: 1.5}]->(Malaga),
  
  (Granada)-[:ENLACE {tiempo: 1.4}]->(Almeria),
  (Almeria)-[:ENLACE {tiempo: 1.4}]->(Granada),
  
  (Jaen)-[:ENLACE {tiempo: 1.0}]->(Granada),
  (Granada)-[:ENLACE {tiempo: 1.0}]->(Jaen),
  
  (Cadiz)-[:ENLACE {tiempo: 1.5}]->(Sevilla),
  (Sevilla)-[:ENLACE {tiempo: 1.5}]->(Cadiz),
  
  (Cadiz)-[:ENLACE {tiempo: 2.3}]->(Malaga),
  (Malaga)-[:ENLACE {tiempo: 2.3}]->(Cadiz),
  
  (Cadiz)-[:ENLACE {tiempo: 2.3}]->(Cordoba),
  (Cordoba)-[:ENLACE {tiempo: 2.3}]->(Cadiz),
  
  (Huelva)-[:ENLACE {tiempo: 1.0}]->(Sevilla),
  (Sevilla)-[:ENLACE {tiempo: 1.0}]->(Huelva),
  
  (Huelva)-[:ENLACE {tiempo: 2.5}]->(Cordoba),
  (Cordoba)-[:ENLACE {tiempo: 2.5}]->(Huelva),
  
  (Huelva)-[:ENLACE {tiempo: 3.0}]->(Malaga),
  (Malaga)-[:ENLACE {tiempo: 3.0}]->(Huelva);
```

Haz un recorrido en anchura y profundidad.

Recorrido en anchura

Proyeccion

```
MATCH (source:Ciudad)-[r:ENLACE]->(target:Ciudad)
RETURN gds.graph.project(
  'Graph_BFS',
  source,
  target
)
```

Llamada

```
MATCH (source:Ciudad{nombre:'Córdoba'})
CALL gds.bfs.stream('Graph_BFS', {
  sourceNode: source
})
YIELD path
RETURN path
```

Recorrido en profundidad

Proyeccion

```
MATCH (source:Ciudad)-[r:ENLACE]->(target:Ciudad)
RETURN gds.graph.project(
  'Graph_DFS',
  source,
  target
)
```

Llamada

```
MATCH (source:Ciudad{nombre:'Córdoba'})
CALL gds.dfs.stream('Graph_DFS', {
  sourceNode: source
})
YIELD path
RETURN path
```

Obtén el camino mínimo, utilizando el algoritmo de Dijkstra, entre un nodo y los restantes.

Proyeccion

```
MATCH (source:Ciudad)-[r:ENLACE]->(target:Ciudad)
RETURN gds.graph.project(
  'Graph_Dijkstra',
  source,
  target,
  { relationshipProperties: r { .tiempo } }
)
```

Llamada

```
MATCH (source:Ciudad {nombre: 'Córdoba'})
CALL gds.allShortestPaths.dijkstra.stream('Graph_Dijkstra', {
    sourceNode: source,
    relationshipWeightProperty: 'tiempo'
})
YIELD index, sourceNode, targetNode, totalCost, nodeIds, costs, path
RETURN
    index,
    gds.util.asNode(sourceNode).nombre AS CiudadDeSalida,
    gds.util.asNode(targetNode).nombre AS CiudadDeEntrada,
    totalCost AS tiempoTotal,
    [nodeId IN nodeIds | gds.util.asNode(nodeId).nombre] AS Ciudad,
    costs AS tiempos,
    nodes(path) as path
ORDER BY index
```

Calcula el camino mínimo, utilizando el algoritmo de Dijkstra y el algoritmo A*, entre dos nodos elegidos. Si tu grafo no tiene latitud y longitud, utiliza otro algoritmo de camino mínimo entre los disponibles en path finding GDS

Algoritmo de Dijkstra

Proyeccion

```
MATCH (source:Ciudad)-[r:ENLACE]->(target:Ciudad)
RETURN gds.graph.project(
  'Graph_Dijkstra',
  source,
  target,
  { relationshipProperties: r { .tiempo } }
)
```

Llamada

```
MATCH (source:Ciudad {nombre: 'Córdoba'})
CALL gds.allShortestPaths.dijkstra.stream('Graph_Dijkstra', {
    sourceNode: source,
    relationshipWeightProperty: 'tiempo'
})
YIELD index, sourceNode, targetNode, totalCost, nodeIds, costs, path
RETURN
    index,
    gds.util.asNode(sourceNode).nombre AS CiudadDeSalida,
    gds.util.asNode(targetNode).nombre AS CiudadDeEntrada,
    totalCost AS tiempoTotal,
    [nodeId IN nodeIds | gds.util.asNode(nodeId).nombre] AS Ciudad,
    costs AS tiempos,
    nodes(path) as path
ORDER BY index
```


Como mi grafo no tiene latitud ni longitud he escogido otro algoritmo. En este caso el algoritmo de camino mínimo de Yen´s.

Proyeccion

```
MATCH (source:Ciudad)-[r:ENLACE]->(target:Ciudad)
RETURN gds.graph.project(
  'Graph_Yens_Shortest_Path',
  source,
  target,
  { relationshipProperties: r { .tiempo } }
)
```

Llamada

```
MATCH (source:Ciudad {nombre: 'Córdoba'}), (target:Ciudad {nombre: 'Huelva'})
CALL gds.shortestPath.yens.stream('Graph_Yens_Shortest_Path', {
    sourceNode: source,
    targetNode: target,
    k: 3,
    relationshipWeightProperty: 'tiempo'
})
YIELD index, sourceNode, targetNode, totalCost, nodeIds, costs, path
RETURN     
    index,
    gds.util.asNode(sourceNode).nombre AS CiudadSalida,
    gds.util.asNode(targetNode).nombre AS CiudadLlegada,
    totalCost,
    [nodeId IN nodeIds | gds.util.asNode(nodeId).nombre] AS Ciudades,
    costs AS tiempo,
    nodes(path) as path
ORDER BY index
```

Borra el grafo completo.

```
match(n) detach delete n
```

Ejercicio 3:
Diseña e implementa en Neo4j un grafo que represente una red social conformada por ti y, al menos, cuatro amigos más. Hecho esto, obtén las medidas de centralidad de grado, cercanía e intermediación para cada uno de los nodos.

```
CREATE
(A:User {name: 'Víctor'}),
(B:User {name: 'Fran'}),
(C:User {name: 'Carlos'}),
(D:User {name: 'Pablo'}),
(E:User {name: 'Marta'}),

(A)-[:Follows]->(B),
(A)-[:Follows]->(C),
(A)-[:Follows]->(D),
(A)-[:Follows]->(E),
(B)-[:Follows]->(A),
(B)-[:Follows]->(E),
(C)-[:Follows]->(A),
(C)-[:Follows]->(E),
(C)-[:Follows]->(B),
(D)-[:Follows]->(A),
(D)-[:Follows]->(E),
(E)-[:Follows]->(A),
(E)-[:Follows]->(B),
(E)-[:Follows]->(D),
(E)-[:Follows]->(C)
```

medidas de centralidad de grado

Proyección
```
MATCH (source:User)-[r:Follows]->(target:User)
RETURN gds.graph.project(
  'Graph_centralidad_grado',
  target,
  source
)
```

Llamada
```
CALL gds.degree.stream('Graph_centralidad_grado')
YIELD nodeId, score
RETURN gds.util.asNode(nodeId).name AS name, score AS followers
ORDER BY followers DESC, name DESC
```

medidas de centralidad de cercanía

Proyección
```
MATCH (source:User)-[r:Follows]->(target:User)
RETURN gds.graph.project(
  'Graph_cercania',
  source,
  target
)
```

Llamada
```
CALL gds.closeness.stream('Graph_cercania')
YIELD nodeId, score
RETURN gds.util.asNode(nodeId).name AS name, score
ORDER BY score DESC
```

medidas de centralidad de intermediación

Proyección
```
MATCH (source:User)-[r:Follows]->(target:User)
RETURN gds.graph.project(
  'Graph_intermediacion',
  source,
  target
)
```

Llamada
```
CALL gds.betweenness.stream('Graph_intermediacion')
YIELD nodeId, score
RETURN gds.util.asNode(nodeId).name AS name, score
ORDER BY score DESC
```
