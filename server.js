const express = require('express');
const app = express();
const path = require('path');

const api = require('./routes/noteRoutes');

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); //Can accept either JSON or URL encoded

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.use('/api', api); //This redirects all calls ending in api to the noteRoutes file

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);