<template>
  <div class="">
    <h2 class="subtitle">
      Recipe Preview
    </h2>
    <!-- <h2 class="subtitle rName">{{ title }}</h2> -->
    <!-- <h4>Source: {{ source }}</h4> -->
    <div class="content">
      <div class="recipe" v-html="content"></div>
    </div>
  </div>
</template>

<style scoped>
h4,
.rName {
  color: darkgrey;
  font-style: italic;
}
</style>

<script>
export default {
  props: {
    content: { type: String, default: "What does your recipe need?" },
    title: { type: String, default: "Your Recipes's Title Here" },
    source: { type: String, default: "Where was this recipe from?" }
  }
};
</script>
