const cities = ['Sławno', 'Kwasowo', 'Sławsko'];
const population = [13000, 1000, 500];

function assignPopulationToCity() {
   const result = [];
  //  for(let i=0; i <= cities.length; i++){
   //     result.push(`${cities[i]}: ${population[i]}`);
   // }
   cities.forEach((city, index) => {
    result.push(`${city}: ${population[index]}`);
   })
    console.log(result);
}

function assignPopulationToCityUsingMap() {
    const result = cities.map((city, index) => {
        return `${city}: ${population[index]}`; 
    })
    console.log(result);
}

function showCityByNumber(number) {
    
    const city = cities[number - 1];
    const pop = population[number - 1];
    
    console.log(`${city}: ${pop}`);
}

assignPopulationToCity();
assignPopulationToCityUsingMap();
showCityByNumber(1);
showCityByNumber(2);
showCityByNumber(3);
//oczekiwany rezultat
// ['Sławno: 13000', 'Kwasowo: 1000', 'Sławsko: 500']
