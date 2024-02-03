const express = require('express');
const app = express();
const path = require('path');

const api = require('./routes/noteRoutes');

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.use('/api', api);

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);