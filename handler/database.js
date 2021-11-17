require("dotenv").config();
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);



/**
 *  @param {Database} db
 */


    const credential = require("./../credential.json");
    const databaseURL = "https://adverto-920e9-default-rtdb.asia-southeast1.firebasedatabase.app/"
    const Database = require("quick-firebase");
    const db = new Database(databaseURL, credential);

    module.exports = { db }