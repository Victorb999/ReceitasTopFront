<template>
  <div id="nav" class="sidebar">
    <h1 class="title">ReceitasTop</h1>
    <img src="./../assets/svg/logo/logo.svg" alt="cupcake" />
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link to="/">
          <i class="fas fa-candy-cane"></i> Ingredientes
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about">
          <i class="fas fa-mug-hot"></i> Receitas
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navbar"
});
</script>
