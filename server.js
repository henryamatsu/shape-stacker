const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config();

var db, collection;

// const url = `mongodb+srv://henryamatsu:${process.env.MONGODB_PASSKEY}@cluster0.aejyj1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const url = `mongodb+srv://henryamatsu:Vw0Aml0jLB6fOc1A@cluster0.aejyj1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const dbName = "personal-express-app";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', async (req, res) => {

  const shapes = await db.collection('shapes').find().toArray();
  const details = await db.collection('details').find().toArray();

  res.render('index.ejs', {shapes, details: details[0]})
})

app.get('/createShape', async (req, res) => {
  const red = Math.round(Math.random() * 255);
  const green = Math.round(Math.random() * 255);
  const blue = Math.round(Math.random() * 255);
  const size = Math.round(Math.random() * 150 + 50) + "px";
  const top = Math.round(Math.random() * 500) + "px";
  const left = Math.round(Math.random() * 500) + "px";
  const borderRadius = Math.random() > .5 ? "50%" : "0";
  
  try {
    const shapeCount = await db.collection('shapes').countDocuments();

    if (shapeCount > 10) {
      await db.collection('shapes').findOneAndDelete({});
    }

    const detailsUpdate = await db.collection('details').findOneAndUpdate({}, {
      $inc: {
        highestZ: 1,
        highestId: 1
      }
    });

    const shape = {
      color: `rgb(${red},${green},${blue})`,
      size,
      top,
      left,
      borderRadius,
      zIndex: detailsUpdate.value.highestZ + 1,
      id: detailsUpdate.value.highestId + 1
    }

   db.collection('shapes').insertOne(shape);

    res.redirect('/');
    // res.send({ shapesUpdate, detailsUpdate });
  }
  catch (err) {
    res.status(500).send(err);
  }
})

app.put('/moveShape', async (req, res) => {
  try {
    const shapesUpdate = await db.collection('shapes').findOneAndUpdate({ id: +req.body.id }, {
      $set: { 
        top: req.body.top,
        left: req.body.left, 
        zIndex: +req.body.zIndex 
      }
    },
    {
      sort: { _id: -1 },
      upsert: true
    });

    const detailsUpdate = await db.collection('details').findOneAndUpdate({}, {
      $set: {
        highestZ: +req.body.zIndex
      }
    },
    {
      sort: { _id: -1 },
      upsert: true
    });

    res.send({ shapesUpdate, detailsUpdate });
  }
  catch (err) {
    res.status(500).send(err);
  }
});