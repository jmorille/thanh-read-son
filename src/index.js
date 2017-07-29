const fs = require('fs');
const path = require('path');
const data = require('./T01.json');



const dataDirectory = path.join('..', 'data');
console.log('dataDirectory', dataDirectory);

// const data = fs.readFileSync(path.join(dataDirectory, 'T01.json'));
// const data = fs.readFileSync( './T01.json');

// console.log('data', data);
data.map(line => {
    console.log('line : ', line);
    console.log('customData : ', data.customData);
});

