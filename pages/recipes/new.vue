<template>
  <div>
    <div id="editPage" class="container is-wide">
      <div class="columns is-multiline">
        <div class="column is-full">
          <nav id="editBar" class="level navbar">
            <div class="buttons has-addons">
              <button class="button is-success">
                Save changes
              </button>
              <button class="button">
                Cancel
              </button>
              <button class="button is-danger">
                Delete post
              </button>
            </div>
          </nav>
        </div>
        <div class="column is-half">
          <rCreator :template="template" />
        </div>
        <div class="column is-half">
          <rViewer
            :title="this.$store.state.recipeEditor.title"
            :content="renderedContent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#editPage {
  padding-top: 2rem;
  padding-bottom: 10rem;
}

#editBar {
  z-index: 0;
}
</style>

<script>
import rViewer from "~/components/recipe/viewer.vue";
import rCreator from "~/components/recipe/creator.vue";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

export default {
  components: {
    rViewer,
    rCreator
  },
  data: function() {
    return {
      recipe: "Thjis is the recipe"
    };
  },
  computed: {
    renderedContent() {
      return md.render(
        this.$store.state.recipeEditor.recipeContent
          .slice(3, -4)
          .split("</p><p>")
          .join("\n")
      );
    }
  },
  async asyncData(ctx) {
    const tplate = await ctx.app.$api.getRecipeTemplate();
    console.log(tplate);
    return {
      template: tplate
    };
  }
};
</script>
