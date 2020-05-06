const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {Pool} = require('pg');

const PORT = process.env.PORT || 5000;
const pool = new Pool({connectionString: process.env.DATABASE_URL,ssl: true});

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json())
    .get('/:id', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))
    .get('/getBars/:id', getBars)
    .post('/addEvent', addEvent)
    .post('/setBar', setBar)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

async function getBars(req, res) {
    const id = req.params.id;
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM bars WHERE clientid = '${id}'`);
        const bars = result.rows;
        for(let i = 0; i < bars.length; i++) {
            let e = await client.query(`SELECT eventdate, picture FROM events WHERE barid = ${bars[i].barid} AND clientid = '${id}'`);
            bars[i].events = e.rows;
        }
        res.send(bars);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
}
async function setBar(req, res) {
    let bar = req.body;
    console.log(bar);
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT COUNT(*) FROM bars WHERE clientid = '${bar.clientid}' AND barid = ${bar.barid}`);
        const count = result.rows[0].count;
        if (count == 0) {
            let x = await client.query(`INSERT INTO bars (barid, clientid, startdate, enddate) VALUES (${bar.barid},'${bar.clientid}',${bar.startdate},${bar.enddate} )`);
        } else {
            let x = await client.query(`UPDATE bars SET startdate = ${bar.startdate}, enddate = ${bar.enddate} WHERE barId = ${bar.barid} AND clientId = '${bar.clientid}'`);
        }
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }

    res.send('success');

}

async function addEvent(req, res) {
    console.log(req.body);
    res.send('event added successfully');
}


