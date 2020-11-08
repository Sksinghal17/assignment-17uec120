const express = require("express");
const bodyParser = require('body-parser');
const redis = require('redis');
    
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 

 
app.get('/', function(req, res){
    res.sendFile('index.html', { root: __dirname })
    if (typeof (document) !== "undefined") {
    	var ip = document.getElementById('IP');
    	var host = document.getElementById('PORT');
   
	}

    
});


const client = redis.createClient({
	port : 6379,
	host : "127.0.0.1"
})

client.on('connect',()=>{
	console.log("client connected to redis....")
})

client.on('error',(err)=>{
	console.log(err.message)
})

client.on('end',()=>{
	console.log("client disconnected from redis")
})

process.on('SIGINT',()=>{
	client.quit();
})


module.exports = client
 
app.listen(8000, function() {
 console.log("Server running on port 8000");
});