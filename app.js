const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
var xyz;
app.get('/', function(req, res){
    res.render("index.html");
    //res.send("Connected");
})  
var sendNotification = function(data) {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic MzhiMDdjMzEtZWU4NC00OGQzLThjODgtMDQ3NGY5NmRjYmY2"
    };
    
    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };
    
    var https = require('https');
    var req = https.request(options, function(res) {  
      res.on('data', function(data) {
        console.log("Response:");
        console.log(JSON.parse(data));
        xyz = JSON.stringify(data);
      });
    });
    
    req.on('error', function(e) {
      console.log("ERROR:");
    });
    
    req.write(JSON.stringify(data));
    req.end();
    xyz = JSON.stringify(data);
  };
  
app.post("/", function(req, res){
    
  var message = { 
    app_id: "4ead16ec-4071-4058-9559-ab2cc84de376",
    contents: {"en": req.body.message},
    included_segments: ["Subscribed Users"]
  };
  xyz = {};
  console.log(req.body.message);
  sendNotification(message);
  res.send(xyz);
})

app.listen(3000, function(){
    console.log("Server Started");
})