use('db_pract4')

//En todas las operaciones hay que trabajar con los array y/o objetos que tengan los documentos.
//Realiza operaciones READ. Estás se pueden combinar (puede haber alguna sentencia que contenga varias operaciones al mismo tiempo, por ejemplo, lógica, comparación y de elemento):
//Al menos 2 con operaciones de comparación.

//Encontrar todos los países los cuales su zona horaria contenga una zona en la que su diferencia horaria con UTC sea más de 36000 segundos.
//Indicar solo el nombre, la capital, la región y la zona horaria solo de los que lo cumplan.
db.countries.find({"timezones.gmtOffset" : {$gt : 36000}}, {_id: 0, "name" : 1, "capital" : 1, "region" : 1, "timezones" : {$elemMatch: {gmtOffset : {$gt: 36000}}}});
//Encontrar los 5 primeros países que tengan su zona horaria en la que su diferencia horaria con UTC sea más de -10000 segundos y menos de 0 incluidos.
//Indicar solo el nombre, la capital, la región y la zona horaria.
db.countries.find({$and:[{"timezones.gmtOffset" : {$gt : -10000}},{"timezones.gmtOffset" : {$lt : 1}}]}, {_id: 0, "name" : 1, "capital" : 1, "region" : 1, "timezones" : { $elemMatch: {gmtOffset : { $gt : -10000}, gmtOffset : {$lt : 1}}}}).limit(5);

//Al menos 2 con operaciones lógicas.

//Encontrar todos los países que tengan más de 5 estados y menos de 10. Dar solo el nombre, la capital, la región y los estados.
db.countries.find({$and:[{"states.5": { $exists: true }},{"states.9": { $exists: false }}]}, {_id: 0, "name" : 1, "capital" : 1, "region" : 1, "states" : 1});
//Encontrar todos los países que tengan español o ingles de traducción. Dar solo el nombre, la capital, la región, la moneda y el prefijo telefónico.
db.countries.find({$or:[{"translations.nl" : { $exists: true }},{"translations.es" : { $exists: true }}]}, {_id: 0, "name" : 1, "capital" : 1, "region" : 1, "currency" : 1, "phone_code" : 1});

//Al menos 2 con operaciones sobre elementos y/o evaluación.



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