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

// Select the database to use.
use('db_pract1');

//a. Obtén el número total de documentos que se han importado a la colección Restaurantes
db.Hosteleria.count();

//b. Mostrar los datos de todos los restaurantes de cocina española (valor “Spanish”). 
//¿Cuántos restaurantes de este tipo de cocina hay en la colección? 
//¿Cuántos restaurantes sobre el total suponen los restaurantes de cocina española?
db.Hosteleria.find({"cuisine" : "Spanish"});
db.Hosteleria.find({"cuisine" : "Spanish"}).count();
db.Hosteleria.find({ cuisine: 'Spanish' }).count() * 100 / db.Hosteleria.find({}).count()
//c. Mostrar los nombres de todos los restaurantes de cocina portuguesa 
//(valor “Portuguese”) que se encuentren en el barrio de “Queens”.
db.Hosteleria.find({"cuisine" : "Portuguese", "borough" : "Queens"}, {name: 1, _id: 0})

//d. Mostrar el nombre y la dirección de los restaurantes que tengan una valoración 
//mayor de 90 puntos.
db.Hosteleria.find({"grades.score" : {$gt:90}}, {_id: 0,name: 1,address: 1})

//e. ¿Cuántos restaurantes de cocina española tienen una puntuación menor a 50 puntos?
db.Hosteleria.find({$and:[{"cuisine" : "Spanish","grades.score" : {$lt:50}}]}).count();

//f. Mostrar el nombre y el tipo de cocina de los cinco restaurantes con mayor puntuación.
db.Hosteleria.find({},{_id: 0, name: 1, cuisine: 1}).sort({"grades.score": -1}).limit(5)

//g. Mostrar el nombre y el tipo de cocina de los cinco restaurantes con menor puntuación
db.Hosteleria.find({},{_id: 0, name: 1, cuisine: 1}).sort({"grades.score": 1}).limit(5)