const pets = [{
    owner: 12345,
    species: 'dog',
    name: 'Leo',
    ageInYears: 6,
},
{
    owner: 12345,
    species: 'cat',
    name: 'Cat',
    ageInYears: 5,
},
{
    owner: 54321,
    species: 'dog',
    name: 'Max',
    ageInYears: 10,
},
{
    owner: 54321,
    species: 'hamster',
    name: 'Gryzoń',
    ageInYears: 1,
},
]

const owners = [
{
    id: 12345,
    name: 'Jan',
    surname: "Nowak",
    ageInYears: 26,
},
{
    id: 54321,
    name: 'Karol',
    surname: 'Nawrocki',
    ageInYears: 17,
}
]

//Zadanie 1.
//utwórz funkcję, która przyporządkuje zwierzęta do właścicieli

function assignPetsToOwners() {
    const result = [];
    
    for (let i = 0; i < owners.length; i++) {
        const currentOwner = owners[i];
        const ownerPets = [];
        
        for (let j = 0; j < pets.length; j++) {
            if (pets[j].owner == currentOwner.id) {
                ownerPets.push(pets[j]);
            }
        }
        
        const ownerWithPets = {
            id: currentOwner.id,
            name: currentOwner.name,
            surname: currentOwner.surname,
            pets: ownerPets
        };
        
        result.push(ownerWithPets);
    }
    
    return result;
}

function displayOwnersWithPets(ownersWithPets) {
    for (let i = 0; i < ownersWithPets.length; i++) {
        const owner = ownersWithPets[i];
        
        console.log(`${owner.name} ${owner.surname} :`);
        
        for (let j = 0; j < owner.pets.length; j++) {
            const pet = owner.pets[j];
            console.log(`  - ${pet.name}`);
        }
        
    }
}

const result = assignPetsToOwners();
displayOwnersWithPets(result);
//Zadanie 2.
//Utwórz funkcję, która filtruje wynik poprzedniej funkcji i zwraca tylko tych właścicieli, którze posiadają podany gatunek zwierzęcia

function displayOnlyPetsBySpecies(ownersWithPets, species) {
    const foundPets = [];
    
    for (let i = 0; i < ownersWithPets.length; i++) {
        const owner = ownersWithPets[i];
        
        for (let j = 0; j < owner.pets.length; j++) {
            const pet = owner.pets[j];
            if (pet.species == species) {
                foundPets.push({
                    ownerName: `${owner.name} ${owner.surname}`,
                    pet: pet
                });
            }
        }
    }
       if (foundPets.length === 0) {
        console.log(`Nie znaleziono zwierząt gatunku: "${species}"`);
        return;
    }
    
    console.log(`\nZwierzęta gatunku: "${species}"`);
    
    for (let i = 0; i < foundPets.length; i++) {
        const item = foundPets[i];
        console.log(`${item.ownerName}: ${item.pet.name}`);
    }
}
function getSpeciesFromUser() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Podaj gatunek zwierzęcia (np. dog, cat, hamster): ', (species) => {
        const cleanedSpecies = species.trim().toLowerCase();
        
        const ownersWithPets = assignPetsToOwners();
        
        displayOnlyPetsBySpecies(ownersWithPets, cleanedSpecies);
        
        readline.close();
    });
}
getSpeciesFromUser();