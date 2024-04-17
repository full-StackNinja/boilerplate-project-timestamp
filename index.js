// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", (req, res) => {
  const date = req.params.date;
  // console.log('date', new Date(date))
  if (!date) {
    const utc = new Date().toUTCString();
    const unix = new Date().getTime();
    res.json({
      unix,
      utc,
    });
  } else if (date !== undefined) {
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;
    // Check is date is provided in unixFormat
    const dateAsNum = Number(date);
    if (!isNaN(dateAsNum)) {
      // console.log("date is in unix", isUnix)
      const utc = new Date(dateAsNum).toUTCString();
      res.json({
        unix: dateAsNum,
        utc,
      });
    }
    // If date is valid
    else if (date.match(dateRegex)) {
      // console.log("Date is valid")
      const dateFormatted = new Date(date);
      const unix = dateFormatted.getTime();
      const utc = dateFormatted.toUTCString();
      res.json({
        unix,
        utc,
      });
    }
    // Date is invalid
    else {
      // console.log("date is invalid")
      res.json({
        error: "Invalid Date",
      });
    }
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
