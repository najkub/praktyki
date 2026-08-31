const pgp = require('pg-promise')(/* options */);



// db.any('SELECT * FROM cars')
//   .then((data) => {
//     console.log('DATA:', data);
//   })
//   .catch((error) => {
//     console.log('ERROR:', error);
//   });
 
  
const selectCars = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    const { color } = req.query;

    let query = 'SELECT * FROM cars';
    let countQuery = 'SELECT COUNT(*) FROM cars';
    const params = [];

    if (color) {
      query += ' WHERE color ILIKE $1';
      countQuery += ' WHERE color ILIKE $1';
      params.push(`%${color}%`);
    }

    query += ' ORDER BY model';
    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const cars = await db.any(query, params);
    
    const totalResult = await db.one(countQuery, params.slice(0, -2));
    const total = parseInt(totalResult.count);
    const totalPages = Math.ceil(total / limit);

    res.json({
      cars: cars,
      pagination: {
        page: page,
        totalPages: totalPages,
        limit: limit,
        totalItems: total
      },
      activeFilter: color || 'brak'
    });

  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
};

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

    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Body type:', typeof req.body);

    
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

const generateRandomCarData = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const colors = ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 'Orange'];
  const fuelTypes = ['Petrol', 'Diesel', 'Hybrid'];
  
  let model = '';
  const modelLength = Math.floor(Math.random() * 8);
  for (let j = 0; j < modelLength; j++) {
    model += chars[Math.floor(Math.random() * chars.length)];
  }
  
  let reg = '';
  for (let j = 0; j < 3; j++) {
    reg += chars[Math.floor(Math.random() * chars.length)];
  }
  const num = Math.floor(Math.random() * 90000) + 10000;
  const registration_number = `${reg} ${num}`;
  
  const daily_price = Math.floor(Math.random() * 1000) + 50;
  const monthly_price = daily_price * (Math.floor(Math.random() * 30) + 10);
  
  return {
    model,
    registration_number,
    color: colors[Math.floor(Math.random() * colors.length)],
    daily_price,
    monthly_price,
    seats: Math.floor(Math.random() * 7) + 1,
    fuel_type: fuelTypes[Math.floor(Math.random() * fuelTypes.length)],
    horsepower: Math.floor(Math.random() * 500) + 50
  };
};

const generateAndAddOneCar = async () => {
  const carData = generateRandomCarData();
  
  try {
    await db.one(
      `INSERT INTO cars 
       (model, registration_number, color, daily_price, monthly_price, seats, fuel_type, horsepower) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [carData.model, carData.registration_number, carData.color, 
       carData.daily_price, carData.monthly_price, carData.seats, 
       carData.fuel_type, carData.horsepower]
    );
    return true;
  } catch (error) {
    if (error.code === '23505') {
      console.log('Duplikat numeru:', carData.registration_number);
      return false;
    }
    throw error;
  }
};

const generateMultipleCars = async (count) => {
  let added = 0;
  
  for (let i = 0; i < count; i++) {
    try {
      const success = await generateAndAddOneCar();
      if (success) added++;
    } catch (error) {
      console.error('Błąd podczas dodawania samochodu:', error);
    }
  }
  
  return added;
};

const generateCars = async (req, res) => {
  try {
    const { count } = req.params;
    const n = parseInt(count) || 1;

    const added = await generateMultipleCars(n);

    res.json({ 
      message: `Added ${added} of ${n} cars!`,
      added,
      totalRequested: n
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

  module.exports = {
  selectCars,
  deleteCars,
  addCar,
  generateCars
};