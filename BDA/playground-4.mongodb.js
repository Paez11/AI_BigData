/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

//14,15,16,17,19 se han usado agregaciones

use('sample_mflix');

//Encuentra todas las películas con información completa que tengan una duración superior a 120 minutos.

db.movies.find({"runtime" : {$gt: 120}});

//Encuentra todas las películas con información completa que tengan el género "Short".

db.movies.find({"genres" : "Short"});

//Lista todas las películas con información completa y han recibido más de 1000 votos en IMDb.

db.movies.find({"imdb.votes" : {$gt: 1000}});

//Lista todas las películas y tengan una calificación de IMDb superior a 7.

db.movies.find({"imdb.rating" : {$gt: 7}}, {_id : 0, "title" : 1, "imdb.rating" : 1});

//Recupere todas las películas y una calificación de espectador superior a 4 en Tomatoes.

db.movies.find({"tomatoes.viewer.rating" : {$gt: 4}}, {_id : 0, "title" : 1, "tomatoes.viewer.rating" : 1});

//Lista todas las películas que hayan recibido al menos un premio.

db.movies.find({"awards.wins" : {$gt: 0}}, {_id: 0, "title" : 1, "awards.wins" : 1});

//Muestra las películas sólo con título, idiomas, estreno, directores, 
//escritores, premios, año, géneros, duración, 
//reparto, países que tengan al menos una nominación.

db.movies.find({"awards.nominations" : {$gt : 0}}, {_id: 0, "tittle" : 1, "languages": 1, "released" : 1, "directors" : 1, "writers" : 1, "awards" : 1, "year" : 1, "genres" : 1, "runtime" : 1, "cast" : 1, "countries" : 1});

//Muestra las películas sólo con título, idiomas, estreno, directores, escritores y países de la colección de 
//'películas' que se estrenaron después del 2014.

db.movies.find({"year" : {$gt : 2014}}, {_id: 0, "title" : 1, "languages" : 1, "released" : 1, "directors" : 1, "writers" : 1, "countries" : 1});

//Lista las películas sólo con título, idiomas, estreno, directores, escritores y países que tengan la palabra "scene" en el título.

db.movies.find({"title" : {$regex : /scene/i}}, {_id: 0, "title" : 1, "languages" : 1, "released" : 1, "directors" : 1, "writers" : 1, "countries" : 1}).count();

//Lista las películas sólo con título, idiomas, estreno, directores, espectadores, 
//escritores y países que tengan una calificación de espectadores de al menos 3 y menos de 4 en Tomatoes.

db.movies.find({"tomatoes.viewer.rating" : {$gte : 3, $lt : 4}}, {_id: 0, "title" : 1, "languages" : 1, "released" : 1, "directors" : 1, "tomatoes.viewer.numReviews": 1, "writers" : 1, "countries" : 1});

//Lista las películas sólo con título, idiomas, estreno, año, directores, escritores y países que se estrenaron antes del año 1900.



//Muestra las películas sólo con título, idiomas, estreno, duración, directores, escritores, 
//países que tengan una duración entre 60 y 90 minutos.

//Muestra las películas sólo con título, idiomas, estreno, tiempo de ejecución, directores, escritores, 
//países, imdb para las 5 películas con las calificaciones más altas de IMDb.

//Lista las películas con el tiempo de ejecución promedio de las películas estrenadas en cada país.

//Muestra el género más común entre las películas y cuenta cuantas veces aparece.

//Encuentra los/as 10 directores/as con más películas

//Desarrolla una consulta para encontrar la calificación promedio de IMDb para películas con diferentes 
//calificaciones (por ejemplo, 'PG', 'R', 'G')

//Desarrolla una consulta encontrar la película más antigua ganadora de un premio

//Encuentra la película con la calificación de IMDb más alta y de ellas, la que tenga la calificación de espectadores más altas en Tomatoes