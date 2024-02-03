const express = require('express');

const PORT = 3001;
const db = require('./db/db.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);