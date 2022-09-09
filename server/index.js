//const mongo = require('./db/index');

const express = require('express');
const axios = require('axios');
//const http = require('http'); // we probably won't need this lol
const app = express();
const path = require('path')
const PORT = 8080;
const url = `localhost:${PORT}`;

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve('client', 'dist')));
app.use(express.json());

//const index = '../client/dist/index.html'

app.get('/', (req, res)=> {
  console.log('heyyyyyyyyyyyyyyyyyyyyyyyyy');
  res.render('index');
});


app.listen(PORT, () => {
  console.log(`server totally listening @ port:${PORT}`);
});
