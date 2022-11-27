const path =require('path');
const fs = require('fs');

var uniquid =  require('uniquid');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });

    app.post('/api/notes', (req, res) => {
        let data  =  fs.readFileSync('db/db.json');
        data = JSON.parse(data);
        res.json(data);

        let theNotes  =  {
            title: req.body.title,
            text: req.body.text,
            id: uniquid(),
        };

        data.push(theNotes);
        fs.writeFileSync('db/db.json', JSON.stringify(data));
        res.json(data);
    });

    app.delete('/api/notes/:id', (req, res) => {
        let data = JSON.parse(fs.readFileSync('db/db.json'))
        let deleteNote = data.filter(item => item.id !== req.params.id);
        fs.writeFileSync('db/db.json', JSON.stringify(deleteNote));
        res.json(deleteNote);
    })
}; 