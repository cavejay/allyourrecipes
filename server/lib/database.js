const p = require("../../server_shared/loggerFactory")("Database");
const { db } = require("../../config");

const mongoose = require("mongoose");

const initDB = () => {
  const con = `mongodb://${db.user}:${db.password}@${db.address}:${
    db.port
  }/allyourrecipes`;
  p.info(`Attempting connection to: ${con}`);
  mongoose.connect(con, {
    useNewUrlParser: true
  });

  mongoose.connection.once("open", () => {
    p.info("connected to database");
  });
};

module.exports = initDB;
