const mongoose = require("mongoose");
const {MongoMemoryServer} = require('mongodb-memory-server')

let mongod;

// connect
module.exports.connect = async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize:50
    };
    await mongoose.connect(uri, mongooseOpts);
}

// disconnect
module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase;
  await mongoose.connection.close();
  await mongod.stop();
}

// clear db
module.exports.clearDatabase = async()=>{
    const collections = mongoose.connection.collections;
    for(const key in collections){
        const collection = collections[key];
        await collection.deleteMany();
    }
}
