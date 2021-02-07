<template>
  <div class="all" :class="state.themeDark ? 'theme-dark' : ''">
    <navbar />
    <router-view class="principal" />
    <button
      @click="state.themeDark = !state.themeDark"
      class="btn-adjust shadow-sm"
    >
      <i class="fas fa-adjust"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import Navbar from "./components/Navbar.vue";

export default defineComponent({
  name: "App",
  components: { Navbar },
  setup() {
    interface Util {
      themeDark: boolean;
    }
    const state = reactive({
      themeDark: false
    }) as Util;

    return { state };
  }
});
</script>
