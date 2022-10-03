let greetUser = (greetingPrefix, userName = 'user') => {
    console.log(`${greetingPrefix} ${userName}!`);
}

greetUser('Hi', 'Alec');
greetUser('Leave me alone');

let sumUp = (...numbers) => {
    let result = 0;

    for (const number of numbers) {
        result += number;
    }

    return result;
}

const inputNumbers = [1, 5, 10, 11, 20, 31];

console.log(sumUp(...inputNumbers));

console.log(sumUp);