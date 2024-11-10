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
/*
use('clase');


db.inventory.find({ status: "A", qty: {$lt:30}})

db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } )

db.inventory.find( { $and: [ { status: "A" }, { qty: { $lt: 30 } } ] } )

db.inventory.find( {
    status: "A",
    $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
   } )

//db.inventory.find({$and:[ {status: "A"}, {$or: [{qty: {$lt:30}}, {item: /^p/}}]}])
//db.inventory.deleteMany({})
db.inventory.insertMany( [
    { item: "canvas", qty: 100, size: { h: 28, w: 35.5, uom: "cm" }, status: "A" },
    { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
    { item: "mat", qty: 85, size: { h: 27.9, w: 35.5, uom: "cm" }, status: "A" },
    { item: "mousepad", qty: 25, size: { h: 19, w: 22.85, uom: "cm" }, status: "P" },
    { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
    { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
    { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
    { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
    { item: "sketchbook", qty: 80, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
    { item: "sketch pad", qty: 95, size: { h: 22.85, w: 30.5, uom: "cm" }, status: "A" }
 ] );

db.inventory.updateOne({item: "paper"},
    {$set: {"size.uom": "cm", status: "P"}},
    {currentDay: {lastModified: true}}
)

db.inventory.replaceOne(
    { item: "paper" },
    { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 40 } ] }
 )
*/
 db.inventory.deleteMany({})

 db.inventory.insertMany( [
    { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
    { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
    { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
    { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
    { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
 ] );

db.orders.deleteMany({})

 db.orders.insertMany( [
    { _id: 0, name: "Pepperoni", size: "small", price: 19,
      quantity: 10, date: ISODate( "2021-03-13T08:14:30Z" ) },
    { _id: 1, name: "Pepperoni", size: "medium", price: 20,
      quantity: 20, date : ISODate( "2021-03-13T09:13:24Z" ) },
    { _id: 2, name: "Pepperoni", size: "large", price: 21,
      quantity: 30, date : ISODate( "2021-03-17T09:22:12Z" ) },
    { _id: 3, name: "Cheese", size: "small", price: 12,
      quantity: 15, date : ISODate( "2021-03-13T11:21:39.736Z" ) },
    { _id: 4, name: "Cheese", size: "medium", price: 13,
      quantity:50, date : ISODate( "2022-01-12T21:23:13.331Z" ) },
    { _id: 5, name: "Cheese", size: "large", price: 14,
      quantity: 10, date : ISODate( "2022-01-12T05:08:13Z" ) },
    { _id: 6, name: "Vegan", size: "small", price: 17,
      quantity: 10, date : ISODate( "2021-01-13T05:08:13Z" ) },
    { _id: 7, name: "Vegan", size: "medium", price: 18,
      quantity: 10, date : ISODate( "2021-01-13T05:10:13Z" ) }
 ] )

 db.orders.aggregate( [

    // Etapa 1: Filtramos los documentos por el tamaño de la pizza
    {
       $match: { size: "medium" }
    },
 
    // Etapa 2: Agrupe los documentos restantes por nombre de pizza y calcule la cantidad total
    {
       $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
    }
 
 ] )

 db.orders.aggregate( [

    // Etapa 1: Filtramos los documentos de pedidos de pizza por rango de fecha
    {
       $match:
       {
          "date": { $gte: new ISODate( "2020-01-30" ), $lt: new ISODate( "2022-01-30" ) }
       }
    },
 
    // Etapa 2: Agrupamos los documentos recibidos por $match por fecha y calculamos los resultados
    {
       $group:
       {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalOrderValue: { $sum: { $multiply: [ "$price", "$quantity" ] } },
          averageOrderQuantity: { $avg: "$quantity" }
       }
    },
 
    // Etapa 3: Ordenamos los documentos por por totalOrderValue en orden descendente
    {
       $sort: { totalOrderValue: -1 }
    }
 
  ] )

  

