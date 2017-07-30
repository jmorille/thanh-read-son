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
        console.log('line : ', Object.keys(cstData));
        const cstKeys = Object.keys(cstData);
        const cstLines = cstKeys.map(key => {
            const cstValue = cstData[key];
            const cstLine = key + ';' + (Array.isArray(cstValue)?cstValue.join(','): cstValue);
            return cstLine;
        }).map(line => {
            logger.write(line + '\n');
            return line;
        });
        // Ne sert à rien dans ton cas, juste renvoie les nouvelles valeur dans la variable results        return cstLines;
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


