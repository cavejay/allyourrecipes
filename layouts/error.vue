<template>
  <section class="container">
    <h1 class="title">{{ error.statusCode }}</h1>
    <h2 class="info">{{ error.message }}</h2>
    <nuxt-link v-if="error.statusCode === 404" class="button" to="/">
      Homepage
    </nuxt-link>
  </section>
</template>

<script>
export default {
  props: ["error"]
};
</script>
