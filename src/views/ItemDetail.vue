<template>
  <spinner v-if="!itemData" :spacing="55" class="my-3" size="large" />
  <div class="container" v-else>
    <p class="text-2xl text-gray-600 text-center my-2">
     {{ itemData.name }} ({{ itemData.category.name }})
    </p> 
    <p class="text-2xl text-gray-600 text-center my-2">
     Cost - {{ itemData.cost }}
    </p> 
    <p class="text-xl text-red-400 text-center my-2">
     Info - {{ itemData.effect_entries[0].effect }}
    </p>        
    <div class="flex justify-center p-3">
      <t-button type="button" variant="error" @click="navigateBack">
        Return
      </t-button>
    </div>  
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';
export default {
  name: 'ItemDetail',
  components: {
    Spinner,
  },
  data() {
    return {
      page: 0,
      itemData: null,
    }
  },
  mounted() {
    this.getApiData();
  },
  methods: {
    async getApiData() {
      const url = `v2/item/${this.$route.params.id}`;
      this.itemData = await this.$http.get(url);
    },
    navigateBack() {
      this.$router.go(-1);
    },
  }
}
</script>
