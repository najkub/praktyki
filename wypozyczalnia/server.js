const express = require('express');
const db = require('./db/db.js');
const { selectCars } = require('./db/index.js');
const app = express();


app.get('/cars', selectCars);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});