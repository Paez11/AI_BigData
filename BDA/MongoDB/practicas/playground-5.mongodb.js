use('db_pract4')

//En todas las operaciones hay que trabajar con los array y/o objetos que tengan los documentos.
//Realiza operaciones READ. Estás se pueden combinar (puede haber alguna sentencia que contenga varias operaciones al mismo tiempo, por ejemplo, lógica, comparación y de elemento):
/**
 * Tenemos el siguiente dataset con información de países, estados y ciudades.
 */
//https://www.kaggle.com/datasets/tanweerulhaque/countries-states-cities-dataset/data

/**
 * Imaginemos que tenemos una empresa de transporte aéreo que está organizando vuelos intercontinentales
 * Según esto debemos saber las siguientes cosas para operar de manera eficaz:
 */
//Al menos 2 con operaciones de comparación.
/**
 * Necesitamos programar las salidas y llegadas para los vuelos de larga distancia como estos suelen cruzar varias zonas horarias, 
 * es crucial conocer los países cuya zona horaria tiene un desfase horario elevado (más de 10 horas) respecto al GMT, para ajustar 
 * horarios y conexiones en estas ubicaciones.
 */
db.countries.find({"timezones.gmtOffset" : {$gt : 36000}}, {_id: 0, "name" : 1, "capital" : 1, "region" : 1, "timezones" : {$elemMatch: {gmtOffset : {$gt: 36000}}}});
/**
 * La empresa tiene que planificar vuelos desde europa central (CET) a groenlandia (GMT-3) y necesita saber los países que se encuentran
 * en la misma franja horaria que greenlandia. Para planificar las conexiones y horarios de los vuelos.
 */
db.countries.find({$and:[{"timezones.gmtOffset" : {$gte : -7200}},{"timezones.gmtOffset" : {$lte : 1}}]}, {_id: 0, "name" : 1, "capital" : 1, "region" : 1, "timezones" : { $elemMatch: {gmtOffset : { $gt : -10000}, gmtOffset : {$lt : 1}}}});

//Al menos 2 con operaciones lógicas.

/**
 * La empresa necesita saber los paises que tienen entre 5 y 10 estados, para planificar las rutas y conexiones de los vuelos. 
 */
db.countries.find({$and:[{"states.5": { $exists: true }},{"states.9": { $exists: false }}]}, {_id: 0, "name" : 1, "capital" : 1, "region" : 1, "states" : 1});

/**
 * Nuestra empresa está desarrollando una nueva plataforma de reservas para expandirse en mercados estaunidenses y latinoamericanos. 
 * Para personalizar la experiencia de los usuarios, es fundamental identificar aquellos países que cuentan con traducciones de nombres 
 * en inglés(nl) o español (es). Deberemos saber el codigo de telefono y la moneda para identificarlos en nuestra plataforma.
 */
db.countries.find({$or:[{"translations.nl" : { $exists: true }},{"translations.es" : { $exists: true }}]}, {_id: 0, "name" : 1, "capital" : 1, "region" : 1, "currency" : 1, "phone_code" : 1});

//Al menos 2 con operaciones sobre elementos y/o evaluación.
/**
*
 */

//Al menos 3 con operaciones de agrupación (contar, ordenar,...).



//Al menos 4 que tengan más de 3 condiciones clave-valor.
//Al menos 1 con tipo de dato fecha.
//Al menos 2 con operaciones de geoposición (Opcional)
//Operaciones UPDATE
//Al menos 2 con operaciones de actualización de campos ($min, $max, $currentDate).
//Al menos 2 con operaciones de actualización de un array del documento (añadir o eliminar un elemento, cambiar la posición,...)
//Al menos 2 con operaciones de modificación de actualización (Modifiers update operators) de un array del documento.
//Al menos 2 que actualicen más de un documento simultáneamente
//Comprueba el resultado en cada una de ellas. Es decir, muestra el estado antes y después de la modificación.
//Operaciones DELETE
//Al menos 2 que borren un documento utilizando al menos 2 campos como condición
//Al menos 2 que borren un documento por algún elemento de un array
//Al menos 1 que borren un documento por algún elemento de un objeto
//Al menos 2 que borren más de un documento simultáneamente
//Comprueba el resultado en cada una de ellas
//Al menos 5 consultas AGGREGATE con al menos 3 condiciones diferentes. 
//Se valorará cuanto mayor sea el número diferente de operadores de agregación usados.