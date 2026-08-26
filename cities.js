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

function showCityByNumber() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.question('Wybierz numer miasta (1-3): ', (answer) => {
        const numberChoice = parseInt(answer);
        
        if (isNaN(numberChoice) || numberChoice < 1 || numberChoice > 3) {
            console.log('nieprawidłowy wybór wybierz liczbe od 1 do 3 ');
            rl.close();
            return;
        }
        
        const city = cities[numberChoice - 1];
        const pop = population[numberChoice - 1];
        
        console.log(`${city}: ${pop}`);
        rl.close();
    })
}

assignPopulationToCity();
assignPopulationToCityUsingMap();
showCityByNumber();
//oczekiwany rezultat
// ['Sławno: 13000', 'Kwasowo: 1000', 'Sławsko: 500']
