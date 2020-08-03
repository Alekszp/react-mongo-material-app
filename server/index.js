const express = require('express')
const router = require('./src/router.js')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://127.0.0.1:27017/cars', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json());
app.use(cors())

router(app) 

app.listen(7001, () => {
    console.log('Server is up to running on 7001 port');
});