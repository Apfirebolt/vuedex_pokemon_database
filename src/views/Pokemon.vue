<template>
  <div class="hello sm:my-10">
    <spinner v-if="isLoading" :spacing="55" class="my-3" size="large" />
    <div v-if="count" class="my-3 flex justify-between items-center">
      <div class="container flex w-100">
        <t-input-group class="w-1/2">
          <t-input v-model="search" placeholder="Search here" type="text" name="search" class="w-50" />
        </t-input-group>
      </div>
      <t-button class="flex justify-center items-center mx-2" variant="secondary" @click="sortData()">
        <svg v-if="reverse" data-slot="icon" fill="none" stroke-width="1" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <svg v-else data-slot="icon" fill="none" stroke-width="1" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </t-button>
      <t-pagination
        v-model="currentPage"
        :total-items="count"
        :per-page="urlParams.limit"
        :limit="10"
      />
    </div>
    <t-table
      :headers="['Name', 'Pokemon Url', 'Actions']"
      :data="filteredList"
    >
      <template slot="row" slot-scope="props">
        <tr :class="[props.trClass, props.rowIndex % 2 === 0 ? 'bg-gray-100' : '']">
          <td :class="props.tdClass" class="text-red-400">
            {{ props.row.name|capitals }}
          </td>
          <td :class="props.tdClass">
            <a>{{ props.row.url }}</a>
          </td>
          <td class="flex justify-left p-3">
            <t-button variant="secondary" @click="changeUrl(props.row.name)">
              View
            </t-button>
          </td>
        </tr>
      </template>
    </t-table>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';

export default {
  name: 'Pokemon',
  components: {
    Spinner,
  },
  filters: {
    capitals(value) {
      if (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
      return value;
    },
  },
  data() {
    return {
      isLoading: false,
      search: '',
      currentPage: 1,
      reverse: false,
      pokemon: [],
      count: 0,
      urlParams: {
        offset: 0,
        limit: 20,
      },
    };
  },
  computed: {
    filteredList() {
      if (this.search) {
        return this.pokemon.filter((item) => item.name.toLowerCase().includes(this.search.toLowerCase()));
      } return this.pokemon;
    },
  },
  watch: {
    currentPage(val) {
      this.urlParams.offset = (val - 1) * this.urlParams.limit;
      this.getApiData();
    },
  },
  mounted() {
    this.getApiData();
  },
  methods: {
    async getApiData() {
      this.isLoading = true;
      const url = 'v2/pokemon';
      const pokemonData = await this.$http.get(url, { params: this.urlParams });
      if (pokemonData) {
        this.pokemon = pokemonData.results;
        this.count = pokemonData.count;
      }
      this.isLoading = false;
    },
    sortData() {
      if (this.reverse) {
        this.filteredList.sort((a, b) => a.name.localeCompare(b.name));
        this.reverse = false;
      } else {
        this.filteredList.sort((a, b) => b.name.localeCompare(a.name));
        this.reverse = true;
      }
      console.log(this.reverse);
    },
    changeUrl(pokemonName) {
      this.$router.push({ name: 'PokemonDetail', params: { id: pokemonName } });
    },
    closeSidebar() {
      this.showSidebar = false;
    },
  },
};
</script>
