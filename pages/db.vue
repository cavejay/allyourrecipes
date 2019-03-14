<template>
  <div>
    <section class="container section is-small">
      <p> This is a list of all the words currently being stored in the Talking-Puppet Database.</p>
      <p> There are currently {{ fulldata.length }} words in the database. </p>
    </section>
    <nav class="container is-small">
      <b-field label="Search" custom-class="is-large">
            <b-input v-model.lazy="searchstr" v-on: size="is-large"></b-input>
      </b-field>
    </nav>
    <section class="section container is-small">
      <b-table :data="data" :columns="columns" :striped=true :paginated=true :per-page=100 :pagination-simple=true></b-table>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData(ctx) {
    let wordData = await ctx.app.$api.wordslistfull();
    wordData = wordData.map(l => {
      l.date_created = new Date(l.date_created).toDateString();
      return l;
    });
    return { fulldata: wordData, data: wordData };
  },
  data() {
    return {
      searchstr: "",
      columns: [
        {
          field: "_id",
          label: "ID"
        },
        {
          field: "word",
          label: "Word",
          sortable: true
        },
        {
          field: "source_uuid",
          label: "Source Video",
          sortable: true
        },
        {
          field: "date_created",
          label: "Date",
          centered: true
        },
        {
          field: "next_id",
          label: "Next word"
        },
        {
          field: "prev_id",
          label: "Previous word"
        }
      ]
    };
  },
  watch: {
    searchstr: {
      handler(val) {
        this.data = this.fulldata.filter(a => {
          return a.word.includes(val);
        });
      },
      deep: true
    }
  }
};
</script>

<style scoped>
</style>
