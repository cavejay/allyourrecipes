const Nuxt = require("nuxt").Nuxt;
const Builder = require("nuxt").Builder;
const p = require("../server_shared/loggerFactory.js")("NUXT");

module.exports = async function start(app) {
  p.info("Installing Nuxt server code");

  // Import and Set Nuxt.js options
  let config = require("../nuxt.config.js");
  config.dev = !(process.env.NODE_ENV === "production");

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  app.use(async (ctx, next) => {
    await next();
    ctx.status = 200; // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on("close", resolve);
      ctx.res.on("finish", resolve);
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject);
      });
    });
  });

  p.info("Completed Nuxt Setup/Install");
  return app;
};
