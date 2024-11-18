use('sample_weatherdata')

//En todas las operaciones hay que trabajar con los array y/o objetos que tengan los documentos.
//Realiza operaciones READ. Estás se pueden combinar (puede haber alguna sentencia que contenga varias operaciones al mismo tiempo, por ejemplo, lógica, comparación y de elemento):
/**
 * Tenemos el siguiente dataset sample_weather data con información de las condiciones climáticas en diferentes zonas. 
 * (Nota: Este dataset es un registro de datos meteorológicos en la fehca de 1984 por lo que he supuesto que ese año es el actual)
 */


/**
 * Imaginemos que tenemos una empresa de transporte aéreo que está organizando vuelos intercontinentales
 * Según esto debemos saber las siguientes cosas para operar de manera eficaz:
 */
//Al menos 2 con operaciones de comparación.

/**
 * La empresa desea evitar áreas de baja temperatura y viento fuerte cuando planea rutas intercontinentales. 
 * Por lo tanto, se busca obtener información de las estaciones donde la temperatura sea inferior a los -10°C y la velocidad del 
 * viento es mayor a 50 km/h.
 */
db.data.find({$and:[{"airTemperature.value": { $lt: -10 }},{"wind.speed.rate": { $gt: 50 }}]},{ _id: 0,"st": 1,"airTemperature.value": 1,"wind.speed.rate": 1,"position.coordinates": 1, "position.coordinates": 1})

/**
 *  La empresa desea saber áreas donde la presión es menor a 1000 hPa y la visibilidad es inferior a 500 metros para los
 *  aviones de carga. Para evitar accidentes y retrasos en las rutas.
*/
db.data.find({$and:[{"pressure.value": { $lt: 1000 }},{"visibility.distance.value": { $lt: 500 }}]},{_id: 0,"st": 1,"pressure.value": 1,"visibility.distance.value": 1, "position.coordinates": 1})

//Al menos 2 con operaciones lógicas.

/**
 * Obtener areas con temperaturas extremas (por encima de 40°C o por debajo de -20°C) y humedad superior al 80%
*/
db.data.find({$or: [{ "airTemperature.value": { $gte: 40 } },{ "airTemperature.value": { $lte: -20 } }],"dewPoint.quality": { $eq: "1" }},{_id: 0,"st": 1,"airTemperature.value": 1,"dewPoint.value": 1, "position.coordinates": 1})

/**
 * La emrpresa desea saber las áreas con condiciones optimas para vuelos intercontinentales, es decir,
 * Donde la velocidad del viento sea menor a 20 km/h O la visibilidad sea mayor a 10 km
 */
db.data.find(
  {
    $or: [
      { "wind.speed.rate": { $lt: 20 } },
      { "visibility.distance.value": { $gt: 10000 } }
    ]
  },
  {
    _id: 0,
    "st": 1,
    "wind.speed.rate": 1,
    "visibility.distance.value": 1,
    "position.coordinates": 1
  }
)


//Al menos 2 con operaciones sobre elementos y/o evaluación.

/**
 * Buscar registros que contengan la sección "AG1" y temperatura bajo cero
*/

db.data.find(
  {
    sections: "AG1",
    "airTemperature.value": { $lt: 0 }
  },
  {
    _id: 0,
    "st": 1,
    "airTemperature.value": 1,
    "sections": 1,
    "position.coordinates": 1 
  }
)

/**
 *  Identificar estaciones con datos de tipo de viento que contengan calidad "1" y con velocidad mayor a 30 km/h
 */

db.data.find(
  {
    "wind.direction.quality": "1",
    "wind.speed.rate": { $gt: 30 }
  },
  {
    _id: 0,
    "st": 1,
    "wind.direction.quality": 1,
    "wind.speed.rate": 1,
    "position.coordinates": 1
  }
)


//Al menos 3 con operaciones de agrupación (contar, ordenar,...).

/**
 * La empresa quiere monitorear registros recientes con visibilidad practicamente nula, para anular vuelos en esas zonas.
 */
db.data.find(
  { "visibility.distance.value": { $lt: 500 } },
  {
    _id: 0,
    st: 1,
    "visibility.distance.value": 1,
    "wind.speed.rate": 1,
    ts: 1,
    "position.coordinates": 1
  }
).sort({ ts: -1 }).count();

/**
 * La empresa de transporte aéreo quiere identificar áreas donde el techo de nubes es bajo y la visibilidad es limitada. 
 * Esto es crucial para decidir si es seguro realizar aterrizajes en ciertos aeropuertos. Se buscarán registros donde la altura 
 * de las nubes esté por debajo de los 500 metros y la visibilidad sea menor a 1000 metros.
 */
db.data.find(
  {
    "skyCondition.ceilingHeight.value": { $lt: 500 },
    "visibility.distance.value": { $lt: 1000 },
    "wind.direction.quality": "1",
    "airTemperature.value": { $gt: -10 }  
  },
  {
    _id: 0,
    st: 1,
    "position.coordinates": 1,
    "skyCondition.ceilingHeight.value": 1,
    "visibility.distance.value": 1,
    "wind.speed.rate": 1,
    "airTemperature.value": 1
  }
).sort({ "skyCondition.ceilingHeight.value": 1, "visibility.distance.value": 1 }).limit(10);

/**
 * La empresa necesita identificar áreas con alta altitud y presión para evaluar si estas condiciones podrían afectar 
 * la estabilidad del vuelo en rutas específicas. Esto es particularmente útil en zonas montañosas donde la combinación 
 * de alta altitud y presión puede aumentar la turbulencia. Además, se busca excluir condiciones en las que el cielo está 
 * despejado (cavok = "N") para centrarse en condiciones más complejas.
 */
db.data.find(
  {
    "pressure.value": { $gt: 1020 },
    "elevation": { $gt: 2000 }, 
    "skyCondition.cavok": "N", 
    "wind.speed.rate": { $gt: 30 } 
  },
  {
    _id: 0,
    st: 1,
    "position.coordinates": 1,
    elevation: 1,
    "pressure.value": 1,
    "wind.speed.rate": 1,
    "skyCondition.ceilingHeight.value": 1,
    ts: 1
  }
).sort({ "pressure.value": -1, "wind.speed.rate": -1 }).limit(5)

//Al menos 4 que tengan más de 3 condiciones clave-valor.

/**
 * La empresa quiere identificar áreas con condiciones atmosféricas que podrían indicar tormentas, 
 * especialmente en zonas de alta presión y humedad. Esto incluye temperaturas altas, alta humedad y baja visibilidad, 
 * condiciones potenciales para la formación de tormentas
 */
db.data.find(
  {
    "airTemperature.value": { $gt: 30 },         
    "pressure.value": { $gt: 1010 },             
    "dewPoint.value": { $lt: 20 },               
    "visibility.distance.value": { $lt: 1000 },  
    "skyCondition.cavok": "N"                    
  },
  {
    _id: 0,
    st: 1,
    "position.coordinates": 1,
    "airTemperature.value": 1,
    "pressure.value": 1,
    "dewPoint.value": 1,
    "visibility.distance.value": 1,
    "skyCondition.ceilingHeight.value": 1,
    ts: 1
  }
)

/**
 * La empresa desea evitar zonas en las que las condiciones ambientales puedan causar acumulación de hielo en los aviones, 
 * como temperaturas bajo cero, baja humedad, y cielos despejados. Esta consulta filtra áreas con bajas temperaturas, baja humedad y 
 * buena visibilidad, especialmente en regiones de baja presión.
 */

db.data.find(
  {
    "airTemperature.value": { $lt: -5 },         
    "dewPoint.value": { $gt: -10 },              
    "visibility.distance.value": { $gt: 10000 }, 
    "pressure.value": { $lt: 1010 }                 
  },
  {
    _id: 0,
    st: 1,
    "position.coordinates": 1,
    "airTemperature.value": 1,
    "dewPoint.value": 1,
    "visibility.distance.value": 1,
    "pressure.value": 1
  }
)

/**
 * La empresa necesita conocer las áreas de alta elevación y velocidad de viento, donde la turbulencia podría representar un riesgo. 
 * Esta consulta filtra las estaciones en zonas elevadas, con vientos fuertes y baja calidad de visibilidad.
 */

db.data.find(
  {
    "elevation": { $gt: 2000 },
    "wind.speed.rate": { $gt: 50 },
    "visibility.distance.value": { $lt: 3000 },
    "skyCondition.ceilingHeight.value": { $lt: 2000 }
  },
  {
    _id: 0,
    st: 1,
    elevation: 1,
    "wind.speed.rate": 1,
    "wind.direction.angle": 1,
    "visibility.distance.value": 1,
    "skyCondition.ceilingHeight.value": 1,
  }
)

/**
 * La empresa desea conocer las condiciones invernales extremas en el hemisferio norte (latitudes positivas), 
 * buscando áreas con baja temperatura, baja visibilidad, y alta presión atmosférica. Estas condiciones son comunes en regiones 
 * donde el riesgo de hielo o ventiscas es alto.
 */
db.data.find(
  {
    "position.coordinates.1": { $gt: 0 },
    "airTemperature.value": { $lt: -15 },
    "visibility.distance.value": { $lt: 2000 },
    "pressure.value": { $gt: 1020 },
    "precipitationEstimatedObservation.discrepancy": { $in: ["1", "2"] }
  },
  {
    _id: 0,
    st: 1,
    "position.coordinates": 1,
    "airTemperature.value": 1,
    "visibility.distance.value": 1,
    "pressure.value": 1,
    "precipitationEstimatedObservation.estimatedWaterDepth": 1,
  }
)


//Al menos 1 con tipo de dato fecha.

/**
 * La empresa desea revisar las estaciones que reportaron temperaturas extremas (por debajo de -10°C) y baja visibilidad 
 * en el mes de enero del año anterior, ya que estas condiciones podrían afectar los vuelos y aumentar el riesgo de hielo 
 * en las rutas invernales.
 */

db.data.find(
  {
    $and: [
      {"airTemperature.value": { $lt: -10 }},
      {"visibility.distance.value": { $lt: 500 }},
      {"ts": { $gte:new Date("1984-03-05T00:00:00Z"), $lt: new Date("1984-04-01T00:00:00Z") }}
    ]
  },
  {
    _id: 0,
    st: 1,
    "position.coordinates": 1,
    "airTemperature.value": 1,
    "visibility.distance.value": 1,
    "pressure.value": 1,
    ts: 1
  }
).sort({ ts: 1 })

//Al menos 2 con operaciones de geoposición (Opcional)


//Operaciones UPDATE
//Al menos 2 con operaciones de actualización de campos ($min, $max, $currentDate).

/**
 * Se desea actualizar el valor máximo de la velocidad del viento en las estaciones donde el tipo de viento es "9" a 999.99 km/h.
**/

db.data.find({ "wind.type": "9" },{_id:0, "wind": 1});

db.data.updateMany(
  { "wind.type": "9" },
  { $max: { "wind.speed.rate": 999.99 } }
)
db.data.find({ "wind.type": "9" },{_id:0, "wind": 1});

/**
 * Se desea actualizar el valor mínimo alcanzado de la temperatura del aire de -11°C en las estaciones a -14.50°C.
 */

db.data.find({"airTemperature.value" : -11}, {_id: 0, "airTemperature": 1});

db.data.updateOne(
  { "airTemperature.value": -11 },
  { $min: { "airTemperature.value": -14.50 } }
)
db.data.find({"airTemperature.value" : -14.50}, {_id: 0, "airTemperature": 1});

//Al menos 2 con operaciones de actualización de un array del documento (añadir o eliminar un elemento, cambiar la posición,...)

/**
 * Se desea añadir un nuevo elemento al array de secciones de la estación "AG1" con el valor "AG2".
 */

db.data.find({"sections" : "AG1"}, {_id: 0, "sections": 1});
db.data.updateOne(
  {},
  {
    $push: { "sections": "AG2" }
  }
)
db.data.find({"sections" : "AG1"}, {_id: 0, "sections": 1});

/**
 * Se desea eliminar el elemento del array de secciones de la estación "AG2".
 */

db.data.find({"sections" : "AG2"}, {_id: 0, "sections": 1});
db.data.updateOne(
  {},
  {
    $pull: { "sections": "AG2" }
  }
)
db.data.find({"sections" : "AG2"}, {_id: 0, "sections": 1});

//Al menos 2 con operaciones de modificación de actualización (Modifiers update operators) de un array del documento.

/**
 * Se desea rebajar en 1444 el valor de la altura del techo de nubes en las estaciones donde la calidad del techo de nubes es "9".
 */

db.data.find({"skyCondition.ceilingHeight.quality" : "9"}, {_id: 0, "skyCondition": 1}).count();
db.data.updateOne(
  {},
  {
    $set: { "skyCondition.0.ceilingHeight.value": 8500 }
  }
)
db.data.find({"skyCondition.ceilingHeight.quality" : "9"}, {_id: 0, "skyCondition": 1}).count();

/**
 * Se desea incrementar en 1 el valor del periodo de la atmosfera en las areas en las que las condiciones atmosféricas sean de calidad "1".
*/

db.data.find({"pastWeatherObservationManual.atmosphericCondition.quality" : "1"}, {_id: 0, "pastWeatherObservationManual": 1}).count();
db.updataOne(
  {"pastWeatherObservationManual.atmosphericCondition.quality" : "1"},
  {"pastWeatherObservationManual.period.value": 4}
);

//Al menos 2 que actualicen más de un documento simultáneamente

/**
 * Se desea actualizar las secciones de las areas que tengan la sección "AG1" a "AG4".
 */

db.data.find({"sections" : "AG1"}, {_id: 0, "sections": 1});
db.data.updateMany(
  {},
  {
    $push: { "sections": "AG4" }
  }
)
db.data.find({"sections" : "AG1"}, {_id: 0, "sections": 1});

/**
 * Se desea actualizar el valor mínimo de la temperatura del aire de -10°C a -12°C en las estaciones donde se haya registrado.
 */

db.data.find({"airTemperature.value" : -10}, {_id: 0, "airTemperature": 1});

db.data.updateOne(
  { "airTemperature.value": -10 },
  { $min: { "airTemperature.value": -12} }
)
db.data.find({"airTemperature.value" : -12}, {_id: 0, "airTemperature": 1});

//Operaciones DELETE
//Al menos 2 que borren un documento utilizando al menos 2 campos como condición
/**
 * Queremos eliminar una estación en la base de datos que esté a gran elevación (mayor a 3000 metros) y tenga un control de 
 * calidad marcado como "V020", que consideramos inadecuado.
 */
db.data.find({$and:[{"elevation": { $gt: 3000 }},{"qualityControlProcess": "V020"}]},{_id: 0, "st": 1, "elevation": 1, "qualityControlProcess": 1});
db.data.deleteOne({
  elevation: { $gt: 3000 },
  qualityControlProcess: "V020"
})
db.data.find({$and:[{"elevation": { $gt: 3000 }},{"qualityControlProcess": "V020"}]},{_id: 0, "st": 1, "elevation": 1, "qualityControlProcess": 1});
/**
 * Para mejorar la integridad de los datos, eliminaremos registros en las coordenadas específicas [-47.9, 47.6] 
 * donde la calidad del viento esté marcada como "9", indicando datos poco confiables.
 */
db.data.find({$and:[{"position.coordinates": [-47.9, 47.6]},{"wind.speed.quality": "9"}]},{_id: 0, "position.coordinates": 1, "wind.speed.quality": 1});
db.data.deleteOne({
  "position.coordinates": [-47.9, 47.6],
  "wind.speed.quality": "9"
})
db.data.find({$and:[{"position.coordinates": [-47.9, 47.6]},{"wind.speed.quality": "9"}]},{_id: 0, "position.coordinates": 1, "wind.speed.quality": 1});
//Al menos 2 que borren un documento por algún elemento de un array

/**
 * Las areascon la sección "MW1" ya no son relevantes para nuestros registros actuales, por lo que eliminaremos estos documentos.
 */
db.data.find({ "sections": "MW1" }, { _id: 0, "sections": 1 });
db.data.deleteOne({
  sections: "MW1"
})
db.data.find({ "sections": "MW1" }, { _id: 0, "sections": 1 });
/**
 * Si una estación tiene la sección "AG2" junto con otras secciones, eliminaremos el documento para simplificar la base de datos.
 */
db.data.find({ "sections": { $all: ["AG2"] } }, { _id: 0, "sections": 1 });
db.data.deleteOne({
  sections: { $all: ["AG2"] }
})
db.data.find({ "sections": { $all: ["AG2"] } }, { _id: 0, "sections": 1 });
//Al menos 1 que borren un documento por algún elemento de un objeto

/**
 * Los registros de presión con valor 999.9 y calidad "9" se consideran erróneos, por lo que eliminaremos estos documentos.
 */
db.data.find({ "pressure.value": 999.9, "pressure.quality": "9" }, { _id: 0, "pressure": 1 });
db.data.deleteOne({
  "pressure.value": 999.9,
  "pressure.quality": "9"
})
db.data.find({ "pressure.value": 999.9, "pressure.quality": "9" }, { _id: 0, "pressure": 1 });

//Al menos 2 que borren más de un documento simultáneamente

/**
 * Las estaciones con valores de visibilidad extremadamente altos (999999) están afectando la calidad de los análisis de datos
 *  y deben eliminarse.
 */
db.data.find({ "visibility.distance.value": 999999 }, { _id: 0, "visibility": 1 });
db.data.deleteMany({
  "visibility.distance.value": 999999
})
db.data.find({ "visibility.distance.value": 999999 }, { _id: 0, "visibility": 1 });
/**
 * Para mantener la calidad de datos, eliminaremos todas las areas con la sección "TFRB" donde la calidad de la temperatura del aire
 * esté marcada como "9".
 */
db.data.find({ "callLetters": "TFRB", "airTemperature.quality": "9" }, { _id: 0, "callLetters": 1, "airTemperature.quality": 1 });
db.data.deleteMany({
  "callLetters": "TFRB",
  "airTemperature.quality": "9"
})
db.data.find({ "callLetters": "TFRB", "airTemperature.quality": "9" }, { _id: 0, "callLetters": 1, "airTemperature.quality": 1 });
//Al menos 5 consultas AGGREGATE con al menos 3 condiciones diferentes. 
/**
   Debido a los últimos accidentes aereos en ciertas zonas donde el viento era fuerte y la visibilidad baja, se quiere saber
   la temperatura que hay en esas areas. Para identificar si la causa del accidente fueron convenciones de aire.
 */

db.data.aggregate([
  {
    $match: {
      "wind.speed.rate": { $gt: 50 }, 
      "visibility.distance.value": { $lt: 500 }  
    }
  },
  {
    $group: {
      _id: "$st", 
      averageTemperature: { $avg: "$airTemperature.value" }, 
      totalWindSpeed: { $avg: "$wind.speed.rate" },
      visibility: { $avg: "$visibility.distance.value" }
    }
  },
  {
    $project: {
      _id: 0,
      averageTemperature: 1,
      totalWindSpeed: 1,
      visibility: 1
    }
  }
])
/**
   La empresa quiere saber cuantas estaciones situadas a gran altura son afectadas por temperaturas extremadamente altas y la presión de estas.
   De esta manera podremos obtener el número de areas que son afectadas en verano por la temperatura y si hay peligro de vuelo cerca de estas.
 */

db.data.aggregate([
{
  $match: {
    "airTemperature.value": { $gt: 35 },
    "elevation": { $gt: 3000 }  
  }
},
{
  $group: {
    _id: null,
    totalStations: { $count: {} },
    averagePressure: { $avg: "$pressure.value" } 
  }
},
{
  $project: {
    _id: 0,
    totalStations: 1,
    averagePressure: 1
  }
}
])

/**
   La aerolínea desea encontrar estaciones con condiciones ideales para la planificación de vuelos: temperaturas moderadas, 
   viento bajo y visibilidad clara.
 */

db.data.aggregate([
{
  $match: {
    "airTemperature.value": { $gte: 10, $lte: 25 },
    "wind.speed.rate": { $lt: 30 },
    "visibility.distance.value": { $gt: 10000 } 
  }
},
{
  $group: {
    _id: "$st",
    averageTemperature: { $avg: "$airTemperature.value" },
    totalWindSpeed: { $sum: "$wind.speed.rate" },
    visibility: { $avg: "$visibility.distance.value" }
  }
},
{
  $project: {
    _id: 0,
    averageTemperature: 1,
    totalWindSpeed: 1,
    visibility: 1
  }
}
])

/**
   Queremos identificar de media las condiciones que pueden afectar al vuelo en temperaturas extremas
   para saber la distribución que siguen y hacer un analisis más profundo en el futuro.
   Nos fijaremos sobre todo en la presión, la altura y la distancia de visibilidad.
 */
db.data.aggregate([
{
  $match: {
    $or: [
      { "airTemperature.value": { $gt: 40 } },
      { "airTemperature.value": { $lt: -20 } } 
    ],
    "visibility.distance.value": { $lt: 2000 }, 
    $or: [
      { "pressure.value": { $gt: 1025 } },
      { "pressure.value": { $lt: 980 } }
    ]
  }
},
{
  $group: {
    _id: null,
    averagePressure: { $avg: "$pressure.value" }, 
    averageAltitude: { $avg: "$elevation" }, 
    averageDistance: { $avg: "$visibility.distance.value" }, 
    totalStations: { $count: {} } 
  }
},
{
  $project: {
    _id: 0,
    averagePressure: 1,
    averageAltitude: 1,
    averageDistance: 1,
    totalStations: 1
  }
}
])
