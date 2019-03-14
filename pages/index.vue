<template>
  <div>
    <!-- temp button to dbpage -->
    <section class="container section is-small">
      <nav class="level">
        <nuxt-link id="dbbutton" class="level-item button is-primary" to="/db">
          Database list Page
        </nuxt-link>
      </nav>
    </section>
    <!-- This is the search bar -->
    <section class="container section">
      <ul v-if="badwords.length">
        <li v-for="badword in badwords.slice(0,3)" :key="badword">
          <b-message type="is-danger" class="" size="is-small">
            '{{badword}}' does not appear in the database of words
          </b-message>
        </li>
      </ul>
      <b-field>
          <!-- this component will only be rendered on client-side -->
          <b-autocomplete
            ref="autocomplete"
            v-model="sentence"
            :data="suggestions"
            placeholder="Hello everyone and welcome to another..."
            @input="getWordSuggestions"
            @select="selectSuggestion"
            keep-first
            size="is-large"
            expanded
            v-bind:clear-on-select="false">
            <template slot="empty">No results found</template>
            <template slot-scope="props">
              <div class="media">
                <div class="media-content">
                  {{ props.option }}
                </div>
              </div>
            </template>
          </b-autocomplete>
          <p class="control">
              <button class="button is-large is-primary" v-on:click="makeVideoRequest">GO!</button>
          </p>
      </b-field>
    </section>
    <section class="container section">
      <h2 class="title is-4">Todo:</h2>
      <div class="content">
        - Send the sentence to the server for forwarding to the batch server <br />
        - Move the user to a new page while waiting for the video to process <br />
        - If there is already a video saying the same thing, prompt the user to view that or create a new video <br />
        - List 'already created' sentences in the suggested list if they start/end/look similar to the sentence being made.<br />
        x !! Update API endpoint if we're a client instance (build once deploy everywhere) <br />
        x Client side cache for 'after' words - axios-cache-plugin to the rescue<br />
        x Make the suggestions be for _predictions_ <br />
        x Show an error if a word in the input doesn't exist in the back end <br />
        x Show an extra prompt if user attempts to submit with a bad word. <br />
        x Prevent clicking from replacing the entire text input -.- || Only fixed 'cause we show the whole input now. <br />
        - <strike>Show highlights for the non-first words like it does for the first word?</strike> <br />
        <br />
      </div>
    </section>
  </div>
</template>

<style scoped>
.smaller-section {
  padding: 0px 1.5rem;
}
</style>

<script>
import debounce from "debounce-async";
import _debounce from "lodash.debounce";

// sort list of strings by startpoint of substring
function sortbysubstr(array, substr) {
  let output = array.slice(0);
  output = output.sort((a, b) => {
    // if neither have the substr then sort alphabetically
    if (a.indexOf(substr) < 0 && b.indexOf(substr) < 0) {
      return a < b ? -1 : 1;
    } else if (a.indexOf(substr) < 0 && b.indexOf(substr) >= 0) {
      return 1;
    } else if (a.indexOf(substr) >= 0 && b.indexOf(substr) < 0) {
      return -1;
    } else {
      // if we contain the substring put it at the top.
      const val = a.indexOf(substr) - b.indexOf(substr);
      return val === 0 ? a.length - b.length : val;
    }
  });
  return output;
}

// Check the input (sentence structure) against the list of all words
function checkForMissingWords(allWords, input, backslice) {
  let split = input.toString().split(/\.?\s/);

  if (backslice) {
    split = split.slice(0, split.length - backslice);
  }

  // Filter the list just to words that are missing
  return split.filter(
    word => (word === "" ? false : allWords.indexOf(word.toLowerCase()) < 0)
  );
}

export default {
  async asyncData(ctx) {
    let data = await ctx.app.$api.getwordslist();
    return { wordlist: data };
  },
  data() {
    return {
      badwords: [],
      oldsentence: "",
      oldLastWord: "",
      sentence: "",
      suggestions: [],
      unfilteredSuggestions: [],
      lastsuggestedTime: 0
    };
  },
  methods: {
    // Predict what the next word should be based on the last word typed and filter the list based on the current word.
    // If it's the beginning of the input or a 'new sentence' (follows a period) then offer all know words
    async getWordSuggestions() {
      let that = this;
      await debounce(async () => {
        /**
         * Check that we actually want to run this by doing things
         */

        // If the only thing that's changed is white space, exit early
        if (
          this.sentence.trim() === this.oldsentence.trim() &&
          !this.sentence.match(/\s$/)
        ) {
          return;
        }
        this.oldsentence = this.sentence; // update the old sentence if something changed

        // Split the sentence on spaces // todo maybe '.'s to?
        const sentencesplit = this.sentence.toString().split(/\s+/);

        // Find the last word and the current word.
        // eg. 'Hello i_m jeff from the overwat' lastWord: 'the' - currentWord: 'overwat'
        // The Idea is that we find predictions based on the lastWord and filter based on the currentWord
        let currentWord = sentencesplit[sentencesplit.length - 1];
        let lastWord = sentencesplit[sentencesplit.length - 2];

        // The exception is if the sentence finishes on a space. We'd not filter and use the last word for the predictions
        if (this.sentence[this.sentence.length - 1] === " ") {
          lastWord = sentencesplit[sentencesplit.length - 2];
          currentWord = "";
        }

        // let sentences = this.sentence.split(".");
        // let

        let suggestions = [];

        // For no input or only the first word of input we want to support any possible word w/ filtering based on what is entered
        if (sentencesplit.length <= 1) {
          // console.log("only a short input. Not fetching prediction yet");
          suggestions = this.wordlist;
          this.suggestions = suggestions.filter(o => {
            return (
              o
                .toString()
                .toLowerCase()
                .indexOf(currentWord.toLowerCase()) >= 0
            );
          });

          // If it's the beginning of a new sentence then open up the suggestions to all the words again
        } else if (this.sentence.match(/\.\s+$/)) {
          this.suggestions = this.wordlist;

          // From now we want to be predicting on the last word and filtering on the current
        } else {
          // Only get new predictions if the word we're basing them on has changed
          if (this.oldLastWord !== lastWord) {
            this.unfilteredSuggestions = await that.$api.getwordsafter(
              lastWord.toLowerCase()
            );
            this.oldLastWord = lastWord;
          }

          // filter based on the current word.
          this.suggestions = this.unfilteredSuggestions.filter(o => {
            return (
              o
                .toString()
                .toLowerCase()
                .indexOf(currentWord.toLowerCase()) >= 0
            );
          });

          // if we eliminated all the words then show the wordslist but sorted
          if (this.suggestions.length === 0) {
            this.suggestions = this.wordlist;
          }

          // sort by the current word and then add what we already have to the front of the string
          this.suggestions = sortbysubstr(this.suggestions, currentWord).map(
            a =>
              this.sentence.slice(
                0,
                this.sentence.length - currentWord.length
              ) + a
          );
        }

        // console.log(this.suggestions);
      }, 500)();
    },
    selectSuggestion() {
      this.$refs.autocomplete.focus();
    },
    async makeVideoRequest() {
      // don't send an empty sentence or something with bad words.
      if (this.sentence === "") {
        return;
      }

      // Check for missing words
      const missingWords = checkForMissingWords(this.wordlist, this.sentence);

      // And alert if there are any
      if (missingWords.length > 0) {
        // Prepare the message
        const message = `Jeff Kaplan hasn't said everything yet!<br/> You should try to replace the following words:<br/> ${this.badwords
          .map(v => " <i>'" + v + "'</i>")
          .join(" ")}`;
        // extra prompt if there are bad words.
        this.$dialog.alert({
          title: "Invalid Words",
          message: message,
          type: "is-danger"
        });
        return;
      }

      // If it all looks good send the request, wait for a response and move to a new 'waiting' page.
      let res = await this.$api.makeVideoRequest(this.sentence);
      return res;
    }
  },
  watch: {
    sentence(val) {
      // Don't call this too often
      _debounce(() => {
        // Don't continue if there's no text or just whitespace
        if (this.sentence === "" || this.sentence.match(/^\s*$/)) {
          this.badwords = [];
          return;
        }

        this.badwords = checkForMissingWords(this.wordlist, this.sentence, 2);
      }, 500)();
    }
  }
};
</script>
