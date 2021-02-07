<template>
  <transition name="slide-fade" mode="out-in">
    <div id="nav" v-if="!state.small" class="sidebar">
      <h1 class="title">ReceitasTop</h1>
      <router-link to="/">
        <img src="./../assets/svg/logo/logo.svg" alt="cupcake" />
      </router-link>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/ingrediente">
            <i class="fas fa-candy-cane"></i> Ingredientes
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/receita">
            <i class="fas fa-mug-hot"></i> Receitas
          </router-link>
        </li>
      </ul>
    </div>

    <div v-else class="sidebar mini-side">
      <router-link to="/" class="logo-link">
        <img src="./../assets/svg/logo/logo.svg" alt="cupcake" />
      </router-link>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/ingrediente">
            <i class="fas fa-candy-cane"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/receita">
            <i class="fas fa-mug-hot"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </transition>
  <button
    @click="state.small = !state.small"
    class="danwer shadow-sm"
    :class="state.small ? 'danwer-small' : 'danwer-big'"
  >
    <i
      class="fas"
      :class="state.small ? 'fa-chevron-right' : 'fa-chevron-left'"
    ></i>
  </button>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "Navbar",
  setup() {
    interface Nav {
      small: boolean;
    }
    const state = reactive({
      small: false
    }) as Nav;

    if (window.innerWidth < 500) {
      state.small = true;
    }

    return { state };
  }
});
</script>
