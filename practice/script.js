//we have tow arrays in which we have the ages of five dogs

const dogsJulia = [1, 3.4, 2.4, 4, 2];
const dogsKate = [2, 3.6, 2.5, 1, 5];

function checkAge(dogsAges, type = "") {
  const details =
    type === "julia" ? "julia's dogs details" : "Kate's dogs details";
  console.log(details);
  if (type === "julia") {
    dogsAges.pop();
    dogsAges.shift();
  }

  dogsAges.forEach((element, ind, arr) => {
    if (element > 3) {
      console.log(`dog No ${ind} is an adult and ${element} years ago`);
    } else {
      console.log(`dog No ${ind} is still a puppy`);
    }
  });
}
checkAge(dogsJulia, "julia");

checkAge(dogsKate);
///////////////////////////////
// This time, Julia and Kate are studying the activity levels of different dog breeds.

// YOUR TASKS:
// 1. Store the the average weight of a "Husky" in a variable "huskyWeight"
// 2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
// 3. Create an array "allActivities" of all the activities of all the dog breeds
// 4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
// 5. Many dog breeds like to swim. What other activities do these dogs like?
//  Store all the OTHER activities
//  these breeds like to do, in a unique array called "swimmingAdjacent".
// 6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
// 7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities.
//  Log to the console whether "true" or "false".

// BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

// TEST DATA:
// */

const breeds = [
  {
    breed: "German Shepherd",
    averageWeight: 32,
    activities: ["fetch", "swimming"],
  },
  {
    breed: "Dalmatian",
    averageWeight: 24,
    activities: ["running", "fetch", "agility"],
  },
  {
    breed: "Labrador",
    averageWeight: 28,
    activities: ["swimming", "fetch"],
  },
  {
    breed: "Beagle",
    averageWeight: 12,
    activities: ["digging", "fetch"],
  },
  {
    breed: "Husky",
    averageWeight: 26,
    activities: ["running", "agility", "swimming"],
  },
  {
    breed: "Bulldog",
    averageWeight: 36,
    activities: ["sleeping"],
  },
  {
    breed: "Poodle",
    averageWeight: 18,
    activities: ["agility", "fetch"],
  },
];
//1
const huskyWeight = breeds.find(
  (breed) => breed.breed === "Husky"
).averageWeight;
console.log(huskyWeight);
//2
const dogBreed = breeds.find(
  (breed) =>
    breed.activities.includes("fetch") && breed.activities.includes("running")
);
console.log(dogBreed);
//3
const allActivities = breeds.map((breed) => breed.activities);
console.log(allActivities);
const flated = allActivities.flat();
console.log(flated);
//4
const uniqueActivities = [...new Set(flated)];
console.log(uniqueActivities);
//6
const checkwight = breeds.every((breed) => breed.averageWeight > 10);
console.log(checkwight);
const checkActiviesLength = breeds.filter(
  (breed) => breed.activities.length >= 3
);
console.log(checkActiviesLength);

const fetchBreeds = breeds.filter((breed) =>
  breed.activities.includes("fetch")
);

console.log(fetchBreeds);

console.log(Math.max(...fetchBreeds.map((cur) => cur.averageWeight)));
