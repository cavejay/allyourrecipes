const p = require("../../server_shared/loggerFactory")("graphql");
const mount = require("koa-mount");
const graphqlHTTP = require("koa-graphql");
const schema = require("./graphql/schema");

const initDB = require("./database");
initDB();

function graphqlInstaller(app) {
  p.info("Initiating the API hooks...");

  // Set up a logging middleware for /api
  async function graphqlEP(ctx, next) {
    p.info(`Caught request for: ${ctx.originalUrl} from ${ctx.ip}`);
    await next();
  }
  app.use(mount("/graphql", graphqlEP));

  app.use(
    mount(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        graphiql: true
      })
    )
  );

  /*********************************************************************
   *
   * For Web App
   *
   */

  p.info("graphql Hooks configured");
  return app;
}

module.exports = graphqlInstaller;
