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
use("airbnb");

// Insert a few documents into the sales collection.
const homes = db.getCollection("homes").find({}).toArray();

//Print the results
console.log("All homes in collection");
console.log(JSON.stringify(homes, null, 2));

//print total count
const totalHomes = db.getCollection("homes").countDocuments();
console.log(`Total number of homes: ${totalHomes}`);
