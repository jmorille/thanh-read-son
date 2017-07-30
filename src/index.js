const fs = require('fs');
const path = require('path');

//Config
const dataDirectory = path.join(__dirname, '..', 'data');
const logDirectory = path.join(__dirname, '..', 'output');


// Write File

const logger = fs.createWriteStream(path.join(logDirectory, 'dataFile.txt'));
// Supprime les colones suivantes
const filterCstKeys = ['id', 'href', 'createdAt', 'modifiedAt'];

// Read Json File
function readJsonFile(data) {
    // console.log('line : ', Object.keys(line));
    console.log('* Read  : ', data.fullName, '(', data.email, ')');
    const identity = data.fullName + ';' + data.username;
    // console.log('customData : ', line.customData);
    const cstData = data.customData;
    // console.log('line : ', Object.keys(cstData));
    const cstKeys = Object.keys(cstData);
    const cstLines = cstKeys
        .filter(key => !filterCstKeys.some(elt => elt === key))
        .map(key => {
            const cstValue = cstData[key];
            const cstLine = key + ';' + (Array.isArray(cstValue) ? cstValue.join(',') : cstValue);
            return cstLine;
        }).join(';');
    logger.write(identity + ';' + cstLines + '\r\n');
    // Ne sert à rien dans ton cas, juste renvoie les nouvelles valeur dans la variable results        return cstLines;
    return cstLines;
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


