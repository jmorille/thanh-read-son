const fs = require('fs');
const path = require('path');

//Config
const dataDirectory = path.join(__dirname, '..', 'data');
const logDirectory = path.join(__dirname, '..', 'output');
const jsonFormated = true;

// Write File


// Read Json File
function readJsonFileAsJsonFormat(data) {
    // console.log('line : ', Object.keys(line));
    console.log('* Read  : ', data.fullName, '(', data.email, ')');
    // console.log('line : ', Object.keys(cstData));

    // Template result
    const result = {
        email: data.username,
        nickname: data.username.slice(0, data.username.indexOf('@')),
        name: data.surname,
        app_metadata: {
            authorisation: {
                roles: []
            }
        },
        user_metadata: {
            companies: data.customData.companies
        }
    };

    // const keys = ['pom', 'psyco', 'tags'];
    const keys = Object.keys(data.customData)
        .filter(key => key.indexOf('_roles') > 1)
        .map(key => key.slice(0, key.indexOf('_roles')));

    const objResult = keys.reduce((acc, key) => {
        const dataKey = key + '_roles';
        if (data.customData[dataKey]) {
            const obj = JSON.parse(JSON.stringify(result));
            obj.app_metadata.authorisation.roles = data.customData[dataKey];
	    // obj.user_metadata.companies = data.customData[dataKey];
            acc[key] = obj;
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
const fileWriters = {};
const stats = {};
function getOrCreateWriters(key) {
    let writer = fileWriters[key];
    if (!writer) {
        writer = fs.createWriteStream(path.join(logDirectory, key + '.json'));
        fileWriters[key] = writer;
        writer.write('[' + '\r\n');
    } else {
        writer.write(',' + '\r\n');
    }
    return writer;
}

function closeWriters() {
    Object.keys(fileWriters).forEach(key => {
        let writer = fileWriters[key];
        writer.write('\r\n' + ']' + '\r\n');
        writer.end();
    });
}


// Read All File in the directory Data
dataFiles.forEach(file => {
    // Open File
    const data = JSON.parse(fs.readFileSync(path.join(dataDirectory, file), 'utf8'));
    // Parse File
    const resultJson = readJsonFileAsJsonFormat(data);
    Object.keys(resultJson).forEach(key => {
        const file = getOrCreateWriters(key);
        const line = stringifyResult(resultJson[key]);
        file.write(line);
        stats[key] = (stats[key] | 0) + 1;
    });
    console.log('------ Statistiques ------- ');
    console.log(JSON.stringify(stats, null, ' '))
});

closeWriters();

