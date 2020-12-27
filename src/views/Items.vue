<template>
  <div class="hello">
    <spinner v-if="isLoading" :spacing="55" class="my-3" size="large" />
    <div v-if="count" class="my-3 flex justify-between">
      <div class="container flex w-100">
        <t-input-group class="w-1/2">
          <t-input v-model="search" placeholder="Search here" type="text" name="search" class="w-50" />
        </t-input-group>
      </div>
      <t-pagination
        v-model="currentPage"
        :total-items="count"
        :per-page="urlParams.limit"
        :limit="10"
      />
    </div>
    <t-table
      :headers="['Name', 'Item Url', 'Actions']"
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
            <t-button variant="secondary" @click="changeUrl(props.row.name)">View</t-button>
          </td>
        </tr>
      </template>
    </t-table>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';
export default {
  name: 'Home',
  components: {
    Spinner,
  },
  data() {
    return {
      search: '',
      isLoading: false,
      currentPage: 1,
      items: [],
      count: 0,
      urlParams: {
        offset: 0,
        limit: 20,
      }
    }
  },
  computed: {
   filteredList() {
     if (this.search) {
      return this.items.filter(item => {
       return item.name.toLowerCase().includes(this.search.toLowerCase())
     })
    } else return this.items;
   }
  },
  mounted() {
    this.getApiData();
  },
  watch: {
    currentPage: function(val) {
      this.urlParams.offset = (val - 1) * this.urlParams.limit;
      this.getApiData();
    },
  },
  filters: {
    capitals(value) {
      if (value) {
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  },
  methods: {
    async getApiData() {
      this.isLoading = true;
      const url = 'v2/item';
      const itemData = await this.$http.get(url, { params: this.urlParams });
      if (itemData) {
        this.items = itemData.results;
        this.count = itemData.count;
      }
      this.isLoading = false;
    },
    changeUrl(item_name) {
      this.$router.push({ name: 'ItemDetail', params: { id: item_name } });
    },
  }
}
</script>

