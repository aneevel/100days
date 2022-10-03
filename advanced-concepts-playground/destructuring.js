const input = ['Alec', 'Neevel'];

let firstName = input[0];
let lastName = input[1];

console.log(firstName);
console.log(lastName);

const [ first, last ] = input;

console.log(`${first} ${last}`);

const job = { title: 'Developer', location: 'New York' };

const { title: jTitle, location: jLocation } = job;
console.log(jTitle);
console.log(jLocation);