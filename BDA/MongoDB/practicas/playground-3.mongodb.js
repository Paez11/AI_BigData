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
use('db_pract2');

//Ejercicio 2: Sobre la base de datos "db_pract2" realizar las siguientes consultas sobre la colección "Organizaciones":
//Obtén el número total de documentos que se han importado a la colección Organizaciones.

db.Organizaciones.count();

//Muestra los datos de todas las organizaciones que se encuentran en la provincia de Burgos. 
//¿Cuántas organizaciones podemos encontrar ubicadas en la capital de la provincia?

db.Organizaciones.find({"fields.provincia" : "BURGOS"});
db.Organizaciones.find({$and:[{"fields.provincia" : "BURGOS", "fields.localidad": "BURGOS"}]}).count();

//Busca todas las organizaciones que se encuentren en la ciudad de Ponferrada cuyo email de contacto pertenezca al dominio Gmail.

db.Organizaciones.find({$and:[{"fields.localidad" : "PONFERRADA", "fields.email": /gmail.com/}]});

//Extrae todas las organizaciones que se encuentren en la provincia de Valladolid o Soria.

db.Organizaciones.find({$or:[{"fields.provincia" : "VALLADOLID", "fields.provincia" : "SORIA"}]});

//Ejercicio 3: Añade a la base de datos "db_pract2" una colección con nombre “Veterinarios” 
//en la que importes el contenido del archivo dataset_veterinarios.json

//Ejercicio 4. Sobre la colección “Veterinarios” realizar las siguientes consultas:

//Obtén el número total de veterinarios no jubilados en Andalucía.

db.Veterinarios.find({$and:[{"Nombre" : /Andalucía/, "MetaData.Nombre" : /no jubilados/}]}).count();

//Extrae un listado de comunidades autónomas, ordenando los resultados de forma descendente y usando 
//como campo de ordenación el número de colegiados no jubilados (campo Data).

db.Veterinarios.find({Nombre:{$regex:"Colegiados no jubilados, Total$"}}, {_id : 0, "Data.Valor" : 1}).sort({"Data.Valor": -1});
db.Veterinarios.aggregate([
    {
        $match: {"MetaData.1.Codigo": "colegiadosnojubilados"}
    },
    {
        $project: {_id:0, Nombre: {$slice:["$MetaData.Nombre", 1]}}
    },
    {
        $sort: {"Data.Valor": -1}
    }
]);

//Muestra un listado de provincias con más de 50 profesionales en activo. Deberá aparecer ordenado de forma ascendente

db.Veterinarios.find({"Data.Valor": {$gt: 50}}).sort({"Data.Valor": 1});
db.Veterinarios.aggregate([
    {
        $match: {
            $and: [
                { "MetaData.0.Variable.Codigo": "PROV" },
                { "Data.Valor": { $gt: 50 } },
                { "MetaData.1.Codigo": "colegiadosnojubilados" },
            ]
        }
    },
    {
        $sort: { "MetaData.0.Nombre": 1 }
    },
    {
        $project:{_id:0, Nombre: {$slice:["$MetaData.Nombre", 1]}}
    }
]);