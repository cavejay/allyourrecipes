<template>
  <div class="main-container has-navbar-fixed-top">
    <MyHeader></MyHeader>
    <nuxt />
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyFooter from "~/components/footer.vue";
import MyHeader from "~/components/header.vue";

export default {
  components: {
    MyFooter,
    MyHeader
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

*:before,
*:after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  position: relative;
}

.main-container {
  min-height: 100vh; /* will cover the 100% of viewport */
  overflow: hidden;
  display: block;
  position: relative;
  padding-bottom: 145px; /* height of your footer */
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
