const pgp = require('pg-promise')(/* options */);
const db = pgp('postgres://postgres:Pomidor222@localhost:5432/car_rental');
// db.any('SELECT * FROM cars')
//   .then((data) => {
//     console.log('DATA:', data);
//   })
//   .catch((error) => {
//     console.log('ERROR:', error);
//   });
 
  
const selectCars = async (req, res) => {
  try {
    const cars = await db.any('SELECT * FROM cars');
    // console.log(cars);
    // console.log('Database connection established.');
    res.json({cars});
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }};

const deleteCars = async (req, res) => {
  try {
    const { registration_number } = req.params;
    const result = await db.any('DELETE FROM cars WHERE registration_number = $1 RETURNING *', [registration_number]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json({ message: 'Car deleted successfully', deletedCar: result[0] });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const addCar = async (req, res) => {
  try {
    // DEBUG - zobacz co przychodzi
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Body type:', typeof req.body);

    // Sprawdź czy body istnieje
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        message: 'Request body is empty',
        hint: 'Make sure you set Content-Type: application/json in headers'
      });
    }

    const { 
      model, 
      registration_number, 
      color, 
      daily_price, 
      monthly_price, 
      seats, 
      fuel_type, 
      horsepower 
    } = req.body;

    // Walidacja
    if (!model || !registration_number || !color || !daily_price || 
        !monthly_price || !seats || !fuel_type || !horsepower) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['model', 'registration_number', 'color', 'daily_price', 'monthly_price', 'seats', 'fuel_type', 'horsepower'],
        received: req.body
      });
    }

    const newCar = await db.one(
      `INSERT INTO cars 
       (model, registration_number, color, daily_price, monthly_price, seats, fuel_type, horsepower) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [model, registration_number, color, daily_price, monthly_price, seats, fuel_type, horsepower]
    );


    res.status(201).json({ 
      message: 'Car added successfully', 
      car: newCar 
    });

  } catch (error) {
    console.error('Error adding car:', error);
    
    if (error.code === '23505') {
      return res.status(409).json({ 
        message: 'Car with this registration number already exists' 
      });
    }
    
    res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
};


  module.exports = {
  selectCars,
  deleteCars,
  addCar
};