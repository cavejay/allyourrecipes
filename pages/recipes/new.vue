<template>
  <section class="section columns">
    <div class="column">
      <rViewer />
    </div>
    <div class="column">
      <rCreator />
    </div>
  </section>
</template>

<style scoped></style>

<script>
import rViewer from "~/components/recipe/viewer.vue";
import rCreator from "~/components/recipe/creator.vue";

export default {
  components: {
    rViewer,
    rCreator
  }
};
</script>
