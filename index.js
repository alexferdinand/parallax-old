const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const PORT = process.env.PORT || 5000;
const mongoClient = new MongoClient(process.env.MONGODB_URI, {useNewUrlParser: true});

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json())
    .get('/getScale', getScale)
    .get('/:id', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

async function getScale(req, res) {
    const id = req.params.id;
    mongoClient.connect(function (err, client) {
        const db = client.db("heroku_wvvx3cb8");
        const collection = db.collection("scales");
        const details = {"uuid": "kkZ4pO2t"}
        collection.findOne(details, function (err, scale) {
            if (err) {
                return console.log(err);
            }
            res.send(scale);
            client.close();
        });
    });
}




