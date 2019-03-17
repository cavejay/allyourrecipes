const Ajv = require("ajv");

// do something to make this an object. It would be nicer.
const schemas = [
  {
    name: "Request_NewVideo",
    schema: {
      properties: {
        sentence: { type: "string" }
      }
    }
  },
  {
    name: "Response_NewVideo",
    schema: {
      properties: {
        status: { type: "string" },
        id: { type: "string" }
      }
    }
  },
  {
    name: "Request_RegisterVideoSnippet",
    schema: {
      properties: {
        _id: { type: "string" },
        word: { type: "string" },
        source_uuid: { type: "string" },
        date_created: { type: "number" },
        next_id: { type: "string" },
        prev_id: { type: "string" }
      }
    }
  },
  {
    name: "Document_VideoEntry",
    schema: {
      properties: {
        _id: { type: "string" } // todo please fill
      }
    }
  }
];

// turn this into an object with compiled Ajv checkers
module.exports = schemas.reduce((acc, v) => {
  acc["validate" + v.name] = new Ajv().compile(v.schema);
  return acc;
}, {});
