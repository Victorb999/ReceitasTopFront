<template>
  <div class="all">
    <navbar />
    <router-view class="principal" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./components/Navbar.vue";

export default defineComponent({
  name: "App",
  components: { Navbar }
});
</script>
