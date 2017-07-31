const fs = require('fs');
const path = require('path');

//Config
const dataDirectory = path.join(__dirname, '..', 'data');
const logDirectory = path.join(__dirname, '..', 'output');
const jsonFormated = true;

// Write File

// const txtFile = fs.createWriteStream(path.join(logDirectory, 'dataFile.txt'));

// Supprime les colones suivantes
const filterCstKeys = ['id', 'href', 'createdAt', 'modifiedAt'];



// Read Json File
function readJsonFileAsJsonFormat(data) {
    // console.log('line : ', Object.keys(line));
    console.log('* Read  : ', data.fullName, '(', data.email, ')');
    // console.log('line : ', Object.keys(cstData));

    // Template result
    const result = {
        email: data.username,
        username: data.username.slice(0,data.username.indexOf('@') ),
        surname: data.surname,
        app_metadata: {
            authorisation: {
                roles: []
            }
        }
    };

    // const keys = ['pom', 'psyco', 'tags'];
    const keys = Object.keys(data.customData)
        .filter(key => key.indexOf('_roles')>1 )
        .map(key => key.slice(0, key.indexOf('_roles') ));

    const objResult = keys.reduce((acc, key) => {
        const dataKey = key + '_roles';
        if (data.customData[dataKey]) {
            const obj = JSON.parse(JSON.stringify(result));
            obj.app_metadata.authorisation.roles = data.customData[dataKey];
            acc[key] =  obj ;
        }
        return acc;
    }, {});
    return objResult;
}

function stringifyResult(result) {
    if (jsonFormated) {
        return JSON.stringify(result, null, ' ');  // Formater
    } else {
        return JSON.stringify(result); // Une line
    }
}

// List directory file
const dataFiles = fs.readdirSync(dataDirectory);

// pom: fs.createWriteStream(path.join(logDirectory, 'pomFile.json')),
//     psyco: fs.createWriteStream(path.join(logDirectory, 'psycoFile.json')),
//     tags: fs.createWriteStream(path.join(logDirectory, 'tagsFile.json'))
const fileWriters = {};

function getOrCreateWriters(key) {
    let writer = fileWriters[key];
    if (!writer) {
        writer = fs.createWriteStream(path.join(logDirectory, key+'File.json'));
        fileWriters[key] = writer;
    }
    return writer;
}


// Read All File in the directory Data
dataFiles.forEach(file => {
    console.log('------- ', file, '-----------');
    // Open File
    const data = JSON.parse(fs.readFileSync(path.join(dataDirectory, file), 'utf8'));
    // Parse File
    const resultJson = readJsonFileAsJsonFormat(data);
    Object.keys(resultJson).forEach(key => {
        getOrCreateWriters(key).write(stringifyResult(resultJson[key]) + '\r\n');
    });
});


