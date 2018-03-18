const _map = require('./scripts/bi-map');
const noteLookup = require('./scripts/note-lookup');
const modeLookup = require('./scripts/keys-and-modes');

const http = require('http');
const url = require("url");
const MongoClient = require('mongodb').MongoClient

const express = require('express');
const app = express();


const NoteLookup = noteLookup.NoteLookup;
const ModeLookup = modeLookup.ModeLookup;

// console.log(ModeLookup.getMode("A","ionian"));

app.get('/', (req, res) => {
  console.log(req.query);
  let chord = mbm.get(req.query.chordType);
  console.log(chord);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  res.json({chordInterval : chord});
  res.send();
  }
);

app.get('/notes',(req,res) => {
  console.log(req.query);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if(req.query.noteName){
    res.json({
      noteName : req.query.noteName,
      toneValue : NoteLookup.getToneForNoteName(req.query.noteName),
      frequency : NoteLookup.getFrequencyForNoteName(req.query.noteName)
    });
  }

  else if(req.query.toneValue){
    res.json({
      noteName : NoteLookup.getNoteName(req.query.toneValue,true),
      toneValue : req.query.toneValue,
      frequency : NoteLookup.getFrequencyForTone(req.query.toneValue)
    });    
  }

  else if(req.query.frequency){
    res.json({
      noteName : NoteLookup.getNoteNameForFrequency(req.query.frequency,true),
      toneValue : NoteLookup.getToneForFrequency(req.query.frequency),
      frequency : req.query.frequency
    })
  }

  res.send();
})

app.listen(3000, () => console.log('Example app listening on port 3000!'));


// MongoClient.connect('link-to-mongodb', (err, database) => {})

// let getResponseData = (req) =>{
//   return url.parse(req.url, true).query;
// }