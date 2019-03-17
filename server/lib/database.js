// const Datastore = require("nedb");
const Datastore = require("nedb-promise");
const p = require("../../server_shared/loggerFactory")("Database");

// todo should pass in the process.env.dbFile
let db = {};
db.raw = new Datastore({
  filename: process.env.dbFile || "./TalkingPuppetDB.db",
  autoload: true
});

db.getWord = async function(id) {
  p.info(`attempting to fetch word by id: ${id}`);
  const res = await db.raw.findOne({ _id: id });
  return res;
};

module.exports = db;
