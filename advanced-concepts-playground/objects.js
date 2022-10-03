class Job {
    constructor(title, location, salary) {
        this.title = title;
        this.location = location;
        this.salary = salary;
    }

    describe() {
        console.log(`I'm a ${this.title}, I work in ${this.location}, and I earn ${this.salary}.`);
    }

}

const developer = new Job('Developer', 'New York', 50000);
const cook = new Job('Cook', 'Munich', 35000);

developer.describe();