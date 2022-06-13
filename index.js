const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        });

        app.get('/bike/:id' , async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await bikeCollection.findOne(query);
            res.send(result);
        });
        app.post('/bike', async(req , res)=>{
            const newInformation = req.body;
            const result = await bikeCollection.insertOne(newInformation);
            res.send(result)
        })
        
        app.put('/bikee/:id' , async(req , res)=>{
            const id = req.params.id;
            const updateQuantity = req.body;
            const filter = {_id: ObjectId(id)};
            const options = {upsert: true};
            const updatedDoc = {
                $set:{updateQuantity}
            }
            const result = await bikeCollection.updateOne(filter , updatedDoc , options);
            res.send(result)

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