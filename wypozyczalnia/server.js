const express = require('express');
const db = require('./db/db.js');
const { selectCars, deleteCars, addCar, generateCars } = require('./db/index.js');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/cars', selectCars);
app.delete('/cars/:registration_number', deleteCars);
app.post('/cars', addCar);
app.get('/cars/generate/:count', generateCars);

app.post('/test', (req, res) => {
    console.log('Test body:', req.body);
    res.json({ received: req.body });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});