// https://stackoverflow.com/questions/48800679/writing-client-side-api-libraries-for-nuxt-js

import wrapper from "axios-cache-plugin";

const apiFactory = (_axios, clientURL) => {
  // If we're a client instance then update the clientURL
  console.log(
    "creating API from factory",
    clientURL ? "this is a client instance" : "this is a server instance"
  );
  if (clientURL) {
    _axios.defaults.baseURL = clientURL;
    console.log("set baseURL as:", clientURL);
  }

  // apply axios cache
  let axios = wrapper(_axios, {
    maxCacheSize: 15
  });
  axios.__addFilter(/words\/after/);
  console.log("configured client cache");

  return {
    // request and cache this list.
    async getRecipeTemplate() {
      let { data } = await axios.get("/api/recipe/template");
      return data;
    }
  };
};

/*
 ** From: https://github.com/nuxt-community/axios-module/issues/101#issuecomment-365909923
 ** Executed by ~/.nuxt/index.js with context given
 ** This method can be asynchronous
 */
export default ({ $axios, app }, inject) => {
  // Inject `api` key
  // -> app.$api
  // -> this.$api in vue components
  // -> this.$api in store actions/mutations
  console.log(app.$env);
  const api = process.client
    ? apiFactory($axios, app.$env.CLIENT_URL || "http://localhost:3000")
    : apiFactory($axios);
  inject("api", api);
};
