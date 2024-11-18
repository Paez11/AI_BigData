Ejercicio 1:
Diseña un grafo, de temática libre, compuesto por mínimo seis nodos. Para las ponderaciones de las aristas tomaremos valores que vayan en consonancia con el contenido elegido

He elegido la red de autopístas que conectan las ciudades de andalucía. Como nodo las ciudades, como relación las salidas o (enlaces)
como las he llamado y las ponderaciones o el costo he puesto el tiempo que se tardaría en cada una.

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
```

Llamada

```
```

Calcula el camino mínimo, utilizando el algoritmo de Dijkstra y el algoritmo A*, entre dos nodos elegidos. Si tu grafo no tiene latitud y longitud, utiliza otro algoritmo de camino mínimo entre los disponibles en path finding GDS

Proyeccion

```
```

Llamada

```
```

Borra el grafo completo.

```
match(n) detach delete n
```

Ejercicio 3:
Diseña e implementa en Neo4j un grafo que represente una red social conformada por ti y, al menos, cuatro amigos más. Hecho esto, obtén las medidas de centralidad de grado, cercanía e intermediación para cada uno de los nodos.