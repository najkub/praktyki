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
    const cars = await db.any('SELECT * FROM cars');
    // console.log(cars);
    // console.log('Database connection established.');
    res.json({cars});
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }};

module.exports = {
  selectCars
};