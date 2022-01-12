<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="relative">
    <transition
      enter-active-class="transition ease-in-out duration-300 transform"
      enter-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition ease-in-out duration-300 transform"
      leave-class="translate-x-0"
      leave-to-class="-translate-x-full bg-green-600"
    >
      <div
        v-if="showSidebar"
        class="fixed inset-0 flex z-40 md:hidden"
        role="dialog"
        aria-modal="true"
      >
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" />

        <div class="relative flex-1 flex flex-col max-w-xs w-full bg-indigo-700">
          <!--
        Close button, show/hide based on off-canvas menu state.

        Entering: "ease-in-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in-out duration-300"
          From: "opacity-100"
          To: "opacity-0"
      -->
          <div class="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              @click="closeSidebar"
            >
              <span class="sr-only">Close sidebar</span>
              <!-- Heroicon name: outline/x -->
              <svg
                class="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <mobile-menu />
        </div>

        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </transition>
    <div class="mx-auto px-2 sm:px-6 fixed top-0 left-0 right-0 bg-white">
      <div
        class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
      >
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="#">
            <span class="sr-only">Workflow</span>
            <img
              class="h-8 w-auto sm:h-10"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/320px-International_Pok%C3%A9mon_logo.svg.png"
              alt=""
            >
          </a>
        </div>
        <nav class="hidden md:flex space-x-10">
          <router-link
            :to="{ name: 'Home' }"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Home
          </router-link>
          <router-link
            :to="{ name: 'PokemonList' }"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Pokemon
          </router-link>
          <router-link
            :to="{ name: 'MovesList' }"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Moves
          </router-link>
          <router-link
            :to="{ name: 'ItemsList' }"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Items
          </router-link>
        </nav>
        <t-button class="md:hidden flex items-center justify-around" @click="openSidebar">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
          Menu
        </t-button>
      </div>
    </div>
  </div>
</template>

<script>
import MobileMenu from './mobile-menu.vue';

export default {
  name: 'HeaderComponent',
  components: {
    MobileMenu,
  },
  data() {
    return {
      showSidebar: false,
    };
  },
  methods: {
    openSidebar() {
      this.showSidebar = true;
    },
    closeSidebar() {
      this.showSidebar = false;
    },
  },
};
</script>
