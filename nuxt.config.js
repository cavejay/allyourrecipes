module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000"
  },
  /*
   ** Headers of the page
   */
  head: {
    title: "Talking-Puppet",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Plugins
   */
  plugins: ["~plugins/api.js"],
  /*
   ** Modules for use in the app
   */
  modules: [
    // Awesome CSS
    "nuxt-buefy",
    "@nuxtjs/axios",
    [
      "nuxt-env",
      {
        keys: ["CLIENT_URL"]
      }
    ]
  ],
  /*
   ** Global CSS
   */
  css: ["~assets/css/main.css"],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    vendor: ["axios-cache-plugin"],

    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
