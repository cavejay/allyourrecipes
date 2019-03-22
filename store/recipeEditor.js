export const state = () => ({
  recipeContent: "",
  recipeContentHistory: [],
  recipeTitle: "",
  recipeSource: ""
});

export const mutations = {
  addHistory(state, newHistory) {
    state.recipeContentHistory.push(newHistory);
  },
  setRecipeContent(state, content) {
    state.recipeContent = content;
  }
};

export const actions = {
  updateRecipeContent({ commit }, newContent) {
    commit("addHistory", newContent);
    commit("setRecipeContent", newContent);
  }
};
