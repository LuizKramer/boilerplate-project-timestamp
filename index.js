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
  let date_string = req.params.date;
  let date;
  if (!req.params.date) {
    date = new Date();
  }
  else {
    date = new Date((date_string));
  }
  if (date.toString() === "Invalid Date") {
    date = new Date(parseInt(date_string));
    if (date.toString() === "Invalid Date") {
      return res.json({
        error: date.toString()
      })
    }

  }
  let newDate = date.toUTCString();
  console.log(newDate)
  console.log(req.path);

  console.log({
    unix: Date.parse(newDate),
    utc: newDate
  })


  res.json({
    unix: Date.parse(date.toUTCString()),
    utc: date.toUTCString()
  })

})



// listen for requests :)
var listener = app.listen(3000, function () {

  console.log('Your app is listening on port ' + listener.address().port);
});
