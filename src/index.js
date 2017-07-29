const fs = require('fs');
const path = require('path');

//Config
const dataDirectory = path.join(__dirname, '..', 'data');
const logDirectory = path.join(__dirname, '..', 'output');


// Write File
const logger = fs.createWriteStream(path.join(logDirectory, 'myFile.txt'), {
    flags: 'a' // 'a' means appending (old data will be preserved)
});

// Read Json File
function readJsonFile(data) {
    return data.map(line => {
        // console.log('line : ', Object.keys(line));
        console.log('* Read  : ', line.fullName, '(', line.email, ')');
        // console.log('customData : ', line.customData);
        const cstData = line.customData;
        const line1 = 'pom_prod_roles,' + cstData.pom_prod_roles.join(',');
        const line2 = 'psyco_prod_roles,' + cstData.psyco_prod_roles.join(',');
        const line3 = 'tags_prod_roles,' + cstData.tags_prod_roles.join(',');
        logger.write(line1 + '\n');
        logger.write(line2 + '\n');
        logger.write(line3 + '\n');
        // Ne sert à rien dans ton cas, juste renvoie les nouvelles valeur dans la variable results
        return {
            pom: cstData.pom_prod_roles.join(','),
            psyco: +cstData.psyco_prod_roles.join(','),
            tags: cstData.tags_prod_roles.join(',')
        };
    });
}

// List directory file
const dataFiles = fs.readdirSync(dataDirectory);

// Read All File in the directory Data
dataFiles.forEach(file => {
    console.log('------- ', file, '-----------');
    // Open File
    const data = JSON.parse(fs.readFileSync(path.join(dataDirectory, file), 'utf8'));
    // Parse File
    const results = readJsonFile(data);
    console.log(results);
});


