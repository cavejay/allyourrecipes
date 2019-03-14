// const Datastore = require("nedb");
const Datastore = require("nedb-promise");
const p = require("../../server_shared/loggerFactory")("Database");

// todo should pass in the process.env.dbFile
let db = {};
db.raw = new Datastore({
  filename: process.env.dbFile || "./TalkingPuppetDB.db",
  autoload: true
});

db.insertWord = async function(word_object) {
  p.info(`inserting word: ${word_object._id}`);
  // Should we do some checks first?
  const res = await db.raw.insert(word_object);
  return res;
};

db.updateWord = async function(id, word_object) {
  p.info(`updating word with id ${id}`);

  return await db.raw.update({ _id: id }, word_object);
};

db.getWord = async function(id) {
  p.info(`attempting to fetch word by id: ${id}`);
  const res = await db.raw.findOne({ _id: id });
  return res;
};

db.getAllWordsFull = async function() {
  p.info("Returning all words in database with all information");
  return await db.raw.find({});
};

db.getAllWords = async function() {
  p.info("Returning all words w/ no context");
  const res = await db.raw.find({}, { word: 1, _id: 0 });
  // return a deduped list
  return Array.from(new Set(res.map(a => a.word)));
};

db.findWordNeighbours = async function(dir, word) {
  p.info("Finding words that come after " + word);
  let wordids = [];
  if (dir === "before") {
    wordids = await db.raw.find({ word: word }, { prev_id: 1, _id: 0 });
  } else if (dir === "after") {
    wordids = await db.raw.find({ word: word }, { next_id: 1, _id: 0 });
  }
  return wordids.map(id => id.next_id.split(".")[0]);
};

module.exports = db;
