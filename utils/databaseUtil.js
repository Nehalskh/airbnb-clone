const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

const MONGO_URL =
  "mongodb+srv://nehalshaikh8664_db_user:yPJDG8qPVlwskFZ4@nehalskhcluster.xtyv7bd.mongodb.net/?appName=NehalskhCluster";

  let _db;//used for interacting with Database

const mongoConnect = (callback) =>{
  MongoClient.connect(MONGO_URL).then(client => {
    callback();
    _db = client.db('airbnb') 
  }).catch(err => {
    console.log('Error while connecting to Mongo:', err);
  })
}

const getDB = () =>{
  if(!_db){
    throw new Error('Mongo not connected');
  }
  return _db;
} 
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;