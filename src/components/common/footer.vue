<template>
  <footer class="fixed bottom-0 left-0 right-0 bg-white px-3 py-2 text-center">
    <p class="text-blue-500">
      Get all pokemon data at one place. Powered by pokeAPI
    </p>
    <p class="text-gray-700 my-2">
      copyright@vuedex all rights reserved 2022
    </p>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  props: {
    msg: String,
  },
};
</script>
