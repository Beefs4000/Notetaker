const express = require('express');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api')
const PORT = process.env.PORT || 3001;

app = express();


app.use(express.static('public'));
// middle ware required for JS to read content
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Load routes
app.use(webRoutes);
// global - all api routes will be prefixed using '/api' as first argument
app.use('/api', apiRoutes);





// wildcard endpoint to run at the end.
app.get('*', (req, res) =>{
    res.status(404).send('page not found');
})

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`);
})

