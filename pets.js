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

const assignPetsToOwners = (pets, owners) => {
  return owners.map(owner => {
    const ownerPets = [];
    pets.forEach(pet => {
      if (pet.owner == owner.id) {
        ownerPets.push(pet);
      }
    })
    return ownerPets;
  })
}
const result = assignPetsToOwners(pets, owners);
console.log(result);
//Zadanie 2.
//Utwórz funkcję, która filtruje wynik poprzedniej funkcji i zwraca tylko tych właścicieli, którze posiadają podany gatunek zwierzęcia
