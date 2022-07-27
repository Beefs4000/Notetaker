const router = require('express').Router();
const { randomUUID } = require('crypto');
const { json } = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// This is the path to the db.json file
const dbPath = path.join(__dirname, '..', 'db', 'db.json')
function getNotes() {

    // read the content of json
    const content = fs.readFileSync(dbPath, 'utf-8');
    // return content or an empty array
    return JSON.parse(content) || [];

}
// title and text argumments are from the string in the db.json file 
function saveNote(title, text){

    const newNote = {
        id: uuid.v4(),
        title,
        text,
    }
    // add new note data into db.json file

    // retrive the exisiting note data using getNotes function
    const notes = getNotes();
    // push new note 
    notes.push(newNote);
    // resave - need to use JSON stringify to convert into a string 
    fs.writeFileSync(dbPath, JSON.stringify(notes), 'utf-8');
    return newNote;
}

function deleteNote(id){

    // get notes
    const notes = getNotes();
    // filter notes using given ID
    // if the note.ID is not equal to incoming ID
    const filter = notes.filter((note) => note.id !== id);
    // resave
    fs.writeFileSync(dbPath, JSON.stringify(filter), 'utf-8');
}

router.get('/notes', (req, res) => {

    const notes = getNotes();

    res.json(notes);

});

router.post('/notes', (req, res) => {

    // create new note
    // require the keys from the payload, title and text
    const created = saveNote(req.body.title, req.body.text);

    res.json(created);

})

router.delete('/notes/:id', (req, res) => {

    deleteNote(req.params.id);

    res.json({
        data: 'ok',
    })
    
})


module.exports = router;