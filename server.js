const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://demo:demo@cluster0.lca33.mongodb.net/emotionTracker?retryWrites=true&w=majority";
const dbName = "emotionTracker";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
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

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('data').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('data').save({
    date: req.body.date,
    emotion: req.body.emotion,
    entry: req.body.entry,
    // emotionEntry: "000000"
    }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/update', (req, res) => {
  db.collection('data').updateMany({date: req.body.date, emotion: req.body.emotion, entry: req.body.entry}, {
    $set: {
      // emotionEntry: "#FFD300"
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/messages', (req, res) => {
  db.collection('data').findOneAndDelete({date: req.body.date, emotion: req.body.emotion, entry: req.body.entry}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
