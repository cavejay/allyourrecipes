const p = require("../../server_shared/loggerFactory")("API");
const mount = require("koa-mount");
const {
  ValidateRequest_RegisterVideoSnippet,
  ValidateResponse_NewVideo
} = require("../../server_shared/apiSchema");
const Response = require("cottage").Response;
const db = require("./database.js");
const batchserver = require("axios").create({
  baseURL: process.env.BATCH_API || "http://localhost:3001"
});

function apiInstaller(app) {
  p.info("Initiating the API hooks...");

  // Set up a logging middleware for /api
  async function api(ctx, next) {
    p.info(`Caught request for: ${ctx.originalUrl} from ${ctx.ip}`);
    await next();
  }
  app.use(mount("/api", api));

  /*********************************************************************
   *
   * For Batch Processing
   *
   */

  // todo need serious auth around this endpoint or some way to lock it to localhost.
  app.post("/api/register/:word", async ctx => {
    // convert the body to json
    p.info(`New request to register a word: '${ctx.request.params.word}'`);

    // check that the body contains the expected json
    if (!ValidateRequest_RegisterVideoSnippet(ctx.request.body)) {
      p.warn("Could not validate the json body");
      return new Response(400, "Bad request");
    }

    // Check if the id is already in the db
    const tmp = await db.getWord(ctx.request.body._id);
    if (tmp !== null) {
      p.info("Word ID already exists. Will be updated");

      // set response to show it's being updated
      ctx.response.status = 202;

      // update word and return previous version
      await db.updateWord(ctx.request.body._id, ctx.request.body);

      // return
      return { status: "updated id", previousInstance: tmp };
    }

    // Set 'created' response
    ctx.response.status = 201;

    // add the word to the database w/ error handling
    try {
      const r = await db.insertWord(ctx.request.body);
    } catch (e) {
      p.error("Failed to insert request into Database. Please check");
      return new Response(500, "database insert fail: " + e);
    }

    return "OK";
  });

  /*********************************************************************
   *
   * For Web App
   *
   */

  app.get("/api/words/", async () => "api end point");

  app.get("/api/words/list", async () => await db.getAllWords());

  app.get("/api/words/list/full", async () => await db.getAllWordsFull());

  app.get("/api/words/after/:word", async ctx => {
    p.info(`found request for words after: ${ctx.request.params.word}`);
    const wordneighbours = await db.findWordNeighbours(
      "after",
      ctx.request.params.word
    );
    const wc = wordneighbours.reduce(function(acc, curr) {
      acc[curr] ? acc[curr]++ : (acc[curr] = 1);
      return acc;
    }, {});
    let res = Array.from(new Set(wordneighbours));
    res.sort((a, b) => wc.a - wc.b);
    return res;
  });

  app.post("/api/video/", async ctx => {
    p.info("Asked to create: '" + ctx.request.body.sentence + "'");

    // Check that the sentence is valid.
    // todo - should this be offloaded to the batch server?

    // find the best path through the words.
    // todo - should this be offloaded to the batch server?

    p.info("probably do some processing here and pass it to the batch server");

    // send the request to batch server: post: /video/new
    let res = await batchserver.post("/api/video/new", {
      sentence: ctx.request.body.sentence
    });

    p.info("Recieved response from batch server: " + res.status);

    // check formatting of response against schema
    if (!ValidateResponse_NewVideo(res.data)) {
      p.warn("Batch server responded in illegal format");
      return new Response(500, "Internal System Error");
    }

    // once the batch server has returned with an id for the job, return that to client with 200 OK.
    ctx.response.status = 200;

    return Object.assign({}, res.data); // return what we got from the batch server
  });

  p.info("API Hooks configured");
  return app;
}

module.exports = apiInstaller;
