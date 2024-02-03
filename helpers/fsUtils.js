const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

const writeToFile = (destination, content) => //only used within this function, so doesn't need to be exported
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
);

const deleteFromFile = (id, file) => {
  return new Promise((resolve, reject) => { //returns a promise so that I can better return as much info as possible and determine whether a 404 or 500 error occurred
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        } 
        else {
          const parsedData = JSON.parse(data);
          const index = parsedData.findIndex(
            (item) => item.id === id
          );
          if (index >= 0){
            parsedData.splice(index, 1);
            writeToFile(file, parsedData);
            resolve(true);
          } else resolve(false);
        }
      });
  })
};

module.exports = { readFromFile, readAndAppend, deleteFromFile };
