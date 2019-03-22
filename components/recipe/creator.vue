<template>
  <div>
    <h2 class="subtitle">
      Write the Recipe
    </h2>
    <EditorContent :editor="editor" />
  </div>
</template>

<style scoped></style>

<script>
// Import the editor
import { Editor, EditorContent } from "tiptap";

export default {
  components: {
    EditorContent
  },
  props: {
    template: { type: String }
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    this.editor = new Editor({
      content: this.template,
      onUpdate: ({ getHTML }) => {
        console.log("plz");
        this.$store.dispatch("recipeEditor/updateRecipeContent", getHTML());
      }
    });
    this.$store.dispatch("recipeEditor/updateRecipeContent", this.template);
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>
