const fs = require('fs');
const path = require('path');
const data = require('./T01.json');



const dataDirectory = path.join(__dirname, '..', 'data');
// console.log('dataDirectory', dataDirectory);

// const data = fs.readFileSync(path.join(dataDirectory, 'T01.json'));
// const data = fs.readFileSync( './T01.json');

var logger = fs.createWriteStream(path.join(dataDirectory, 'myFile.json'), {
    flags: 'a' // 'a' means appending (old data will be preserved)
})

console.log('data', data);



data.map(line => {
    // console.log('line : ', Object.keys(line));
    console.log('Read  : ', line.fullName, '(', line.email, ')');
    console.log('customData : ', line.customData);
    const cstData = line.customData;
    const line1 = 'pom_prod_roles,'+ cstData.pom_prod_roles.join(',');
    const line2 = 'psyco_prod_roles,'+cstData.psyco_prod_roles.join(',');
    const line3 = 'tags_prod_roles,'+cstData.tags_prod_roles.join(',');
    logger.write(line1+'\n');
    logger.write(line2+'\n');
    logger.write(line3+'\n');
});

