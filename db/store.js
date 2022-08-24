const Server = require("../server");
const util = require("util")
const fs = require("fs")

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsynce = util.promisify(fs.writeFile;)

class Store {
    read() {
        return readFileAsync('/db.json', 'utf8')
    }
}