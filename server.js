const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const port = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const locations = require("./location_model");


app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: false}));



app.post("/addNewLocation", async(req, res) => {
  try {
    const addNew = await new locations(req.body).save();
    console.log(addNew);
    if(addNew !== null) {
      res.status(200).json({done: true});
    }
    else {
      res.json({err: "Location didn't inserted successfully"});
    }
  } catch(err) {
    res.json({err});
  }
});

app.get("/getLocations", async(req, res) => {
  const locs = await locations.find();
  res.send(locs);
})

app.get("/usersLocations", async(req, res) => {
  res.sendFile(path.join(__dirname, "getLocations.html"));
})

app.get("/userLocation", async(req, res) => {
  res.sendFile(path.join(__dirname, "show_location.html"));
})

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

mongoose.connect('mongodb+srv://farghaly:farghaly_93@cluster0.kagup.mongodb.net/geoLocations?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
  console.log('Connected successfully to database...');
  server.listen(process.env.PORT || port, () => {
    console.log('Server started and connected to port: '+port);
  });
}).catch(e => {
  console.log('Connection failed....');
  console.log(e);
});
