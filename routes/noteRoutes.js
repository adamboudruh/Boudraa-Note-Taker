const app = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend, deleteFromFile } = require('../helpers/fsUtils');

const db = './db/db.json';


app.get('/notes', (req, res) => {
    console.info(`${req.method} request received, returning notes`);
    readFromFile(db).then((data) => res.json(JSON.parse(data)));
});

app.post('/notes', (req, res) => {
    
    const {title, text} = req.body;
    console.info(`${req.method} request received, creating note titled ${title}`);

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid().toLowerCase(),
        };

        readAndAppend(newNote, db);
        res.status(200).json(newNote);
    }
    else res.status(500).json({errorMessage: 'Error in posting new note'})
});

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id.toLowerCase();
    console.info(`${req.method} request received, deleting note with id: ${id}`);
    deleteFromFile(id, db)
        .then(resolve => {
            if (resolve) res.json({ message: "Note found and deleted" })
            else res.status(404).json({ message: "Error: note with provided ID not found" });
        })
        .catch(reject => res.status(500).json(reject));
});

module.exports = app;