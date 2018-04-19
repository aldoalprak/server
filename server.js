'use strict';

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const admin = require('firebase-admin');
const serviceAccount = require('./treki-3747e62f1093.json');
const cors = require('cors');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://treki-hacktiv8-2018.firebaseio.com"
});

const trekiRouter = require('./routers/treki');
const usersRouter = require('./routers/users');

const app = express();

const PORT = process.env.PORT || 3000
require('dotenv').config();

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/treki', trekiRouter);

app.get('/', (req, res) => {
  res.status(200).json({message: 'Treki API'})
})

app.listen(PORT, () => {
  console.log('Treki API listening on PORT 3000..')
})
