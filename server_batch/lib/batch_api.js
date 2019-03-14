const p = require("../../server_shared/loggerFactory.js")("BatchAPI");
const mount = require("koa-mount");
const Response = require("cottage").Response;
const db = require("./batch_db.js");
const { uuid } = require("../../server_shared/helpFunctions");

// pull out the schema we need
const { ValidateRequest_NewVideo } = require("../../server_shared/apiSchema");

function apiInstaller(app, mountpoint) {
  p.info("Initiating the API hooks...");

  // Set up a logging middleware for /api
  async function apiLogger(ctx, next) {
    p.info(`Caught request for: ${ctx.originalUrl} from ${ctx.ip}`);
    await next();
  }
  app.use(mount(mountpoint, apiLogger));

  /*********************************************************************
   *
   * For Batch Processing
   *
   */

  // - Take a sentence
  // - Check the sentence
  // - return the api call with yay/nay
  // - track the current sentence instance with a db id.
  // - Prepare the sentence for processing
  // - Spin off thing for pwsh processing
  // - track the pwsh processing
  // - capture the pwsh processing
  // - return any requests for the status with the best guess of the status that we can come up with.
  // - Clean up any pwsh processing for tasks

  // take requests for new videos
  app.post(`${mountpoint}/video/new`, async ctx => {
    p.info(`Request to start processing video.`);

    // validate payload
    if (!ValidateRequest_NewVideo(ctx.request.body)) {
      p.warn("Could not validate the json body");
      return new Response(400, "Bad Request");
    }

    p.info(uuid());

    // create an id for the this case
    // create an instance in the db with the 'created' status
    // run checks and/or processing on the sentence to get the best way forward and/or check if legit
    // send the sentence to powershell

    ctx.response.status = 201; // Set 'created' response
    return { status: "Started", id: "123123" }; // todo finish id
  });

  p.info("API Hooks configured");
  return app;
}

module.exports = apiInstaller;
