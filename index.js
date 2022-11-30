let fs=require('fs');
let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 7800;
let mongo=require('mongodb');
const { response } = require('express');
let MongoClient = mongo.MongoClient;
let mongoUrl=process.env.LiveMongo;
let db;
let bodyparser=require('body-parser');
const bodyParser = require('body-parser');
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyParser.json())


//Assignment4 statement3

app.get('/widget',(req,res)=>{
    fs.readFile('mealtype.json','utf-8',(err,data)=>{
        if(err) throw err
        res.send(data);
    })
   
})

//Assignment4 statement1

app.get('/location',(req,res)=>{
    fs.readFile('location.json','utf-8',(err,data)=>{
        if(err) throw err
        res.send(data);
    })
   
})


//Assignment4 statement2

app.get('/:city',(req,res)=>{
    let city=req.params.city;
    db.collection('restaurantdata').find({city_name:city}).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })

})







MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error while connecting');
    db = client.db('zomato');
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })

})
