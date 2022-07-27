const router = require('express').Router();

//need the path module to set a path the html files 
const path = require('path');

// global varible with path to public folder contain html's
const publicPath = path.join(__dirname, '..', 'public');
// * `GET /` should return the `index.html` file.
router.get('/', (req, res) => {

    res.sendFile(path.join(publicPath, 'index.html'));

});

// * `GET /notes` should return the `notes.html` file.
router.get('/notes', (req, res) => {

    res.sendFile(path.join(publicPath, 'notes.html'));

});



module.exports = router;