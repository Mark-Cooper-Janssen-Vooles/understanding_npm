const moment = require("moment");
const semver = require("semver")

const a = 10;

const day = moment().format("dddd")

console.log(day)

const valid = semver.valid('3.1.2');
console.log(valid)

const greaterThan = semver.gt('1.2.3', '3.2.1')
console.log(greaterThan)