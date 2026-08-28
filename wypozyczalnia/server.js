const express = require('express');
const db = require('./db/db.js');
const { selectCars, deleteCars, addCar } = require('./db/index.js');

const app = express();

// ⚠️ TO MUSI BYĆ PRZED WSZYSTKIMI ROUTAMI!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/cars', selectCars);
app.delete('/cars/:registration_number', deleteCars);
app.post('/cars', addCar);

// Testowy route - sprawdź czy body działa
app.post('/test', (req, res) => {
    console.log('Test body:', req.body);
    res.json({ received: req.body });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});