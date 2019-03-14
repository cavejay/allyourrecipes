// const mqtt = require("mqtt");
const p = require("../server_shared/loggerFactory")("index");
const apiInstaller = require("./lib/api.js");

const Cottage = require("cottage");
const bodyParser = require("koa-bodyparser");
const nuxtInstaller = require("./nuxtInstaller");

p.info("App Start");

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

// Create the webserver
var app = new Cottage();
app.use(bodyParser());

// Pass it to the nuxt setup
(async () => {
  // Pass it to the APIinit function
  // This could probably be another Koa app that's mounted on /api. Would make more sense later.
  app = apiInstaller(app); // probably don't need to return it

  // do the NuxtStuff
  await nuxtInstaller(app);

  p.info(`Server listening on ${host}:${port}`);
  app.listen(port, host);
})();
