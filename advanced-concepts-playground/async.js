const fs = require('fs/promises');

async function readFile() {

    //fs.readFile('data.txt', (error, fileData) => {
    //    console.log(fileData.toString());
    //});

    let fileData = await fs.readFile('data.txt')

    console.log(fileData.toString());
    
    console.log("Hi there!");
}

readFile();