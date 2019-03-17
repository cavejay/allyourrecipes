const p = require("../../server_shared/loggerFactory")("API");
const mount = require("koa-mount");

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
   * For Web App
   *
   */

  app.get("/api/words/", async () => "api end point");

  p.info("API Hooks configured");
  return app;
}

module.exports = apiInstaller;
