
const PostgresUno = require('postgres-uno');
const parseArgs = require('minimist');
const dotenv = require('dotenv');

module.exports.handler = (event,context,callback) => {
  console.log("Start Lambda");
  asyncHandler(event,context,callback).then();
};

const asyncHandler = async (event,context,callback) => {
  console.log("Async Handler BEGIN");
  console.log(JSON.stringify(event));
};

module.exports.sensor = (value) => {
  console.log("Sensor Function");
  if (!Number.isInteger(value)) return undefined;
  return value + 1;
};