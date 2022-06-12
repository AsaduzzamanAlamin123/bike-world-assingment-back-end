const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors())
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mycluster.k9hdqqy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log('db connected');

async function run(){
    await client.connect();
        const bikeCollection = client.db("Bike").collection("BikeInformation");
    try{

        app.get('/bikes', async(req , res)=>{
            const query = {};
            const cursor = bikeCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);

        })
        

    }
    finally{

    }

}
run().catch(console.dir);




app.get('/', (req , res)=>{
    res.send('my assingmnet server')

});
app.listen(port , (req , res)=>{
    console.log('running my port ',port);
})

// dbuser3
// 52QaSe30T9evsOMh