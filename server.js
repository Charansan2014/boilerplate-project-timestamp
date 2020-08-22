// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?",(req, res)=>{//? is to specify the end of the string
  let date = new Date(req.params.date_string)
  
  if(date){
      if(date.toString() === "Invalid Date") {
      res.json({ error: "Invaid Date" });
      }else{
      const unixTimeStamp = date.getTime(); 
      const utcTimeStamp = date.toUTCString();
      res.json({"unix":unixTimeStamp, "utc": utcTimeStamp})
      }
   }
  else{
    let date = new Date().toString()
    const unixTimeStamp = new Date(date).getTime(); 
    const utcTimeStamp = new Date(date).toUTCString();
    res.json({"unix":unixTimeStamp, "utc": utcTimeStamp})
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
//{"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
