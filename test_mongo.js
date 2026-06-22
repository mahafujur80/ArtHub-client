const { MongoClient } = require('mongodb');

const uri = "mongodb://ArtHub-User:IeLBnA1wOMxHzEld@ac-biqujq0-shard-00-00.iecj7sn.mongodb.net:27017,ac-biqujq0-shard-00-01.iecj7sn.mongodb.net:27017,ac-biqujq0-shard-00-02.iecj7sn.mongodb.net:27017/?ssl=true&replicaSet=atlas-ncr7d1-shard-0&authSource=admin&retryWrites=true&w=majority&appName=betterAuthCluster";

async function run() {
  try {
    console.log('Connecting to non-SRV URI...');
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Connected successfully to MongoDB");
    await client.close();
  } catch (error) {
    console.error("Connection failed:", error);
  }
}
run();
