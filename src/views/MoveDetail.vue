<template>
  <spinner v-if="!moveData" :spacing="55" class="my-3" size="large" />
  <t-card v-else> 
  <p class="text-2xl text-gray-600 font-mono text-center my-2">
    {{ moveData.name|capitals }} ({{ moveData.type.name }})
  </p>
   <p class="text-2xl text-gray-600 font-mono text-center my-2">
    Accuracy - {{ moveData.accuracy }}, Power - {{ moveData.power }}, PP - {{ moveData.pp }}
  </p> 
  <p class="text-xl text-gray-800 font-mono text-center my-2">
    Generation - {{ moveData.generation.name }}
  </p>
  <p class="text-xl text-red-400 text-center my-2">
    Info - {{ moveData.effect_entries[0].effect }}
  </p>        
    <template v-slot:footer>
      <div class="flex justify-center">
        <t-button type="button" variant="error" @click="navigateBack">
          Return
        </t-button>
      </div>
    </template>
  </t-card>
</template>
<script>
import Spinner from 'vue-simple-spinner';
export default {
  name: 'MoveDetail',
  components: {
    Spinner,
  },
  data() {
    return {
      page: 0,
      moveData: null,
    }
  },
  filters: {
    capitals(value) {
      if (value) {
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  },
  mounted() {
    this.getApiData();
  },
  methods: {
    async getApiData() {
      const url = `v2/move/${this.$route.params.id}`;
      this.moveData = await this.$http.get(url);
      console.log('Move data ', this.moveData);
    },
    navigateBack() {
      this.$router.go(-1);
    },
  }
}
</script>

