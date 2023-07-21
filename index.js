// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
let bodyParser = require('body-parser');
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }),
  bodyParser.urlencoded({
    extended: false
  }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {

  res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res) => {
  const months = [
    "Jan", "Feb", "Mar","Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date;

  if(!req.params.date){
    date = new Date();
  }
  else{
    date = new Date(req.params.date);
  }

  
  console.log(date);

  if(date.toString() === "Invalid Date"){
    return res.json({
      erro: date.toString()
    })
  }

  

  let formattedDate = `${daysOfWeek[date.getUTCDay()]} ,${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} ${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}:${date.getUTCSeconds().toString().padStart(2, '0')}`
  res.json({
    unix: date.getTime(),
    utc: formattedDate
  })
})



// listen for requests :)
var listener = app.listen(3000, function () {

  console.log('Your app is listening on port ' + listener.address().port);
});
