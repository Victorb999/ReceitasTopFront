<template>
  <div id="ingrediente">
    <h1>Olá, aqui vamos ver os ingredientes.</h1>
    <div class="row">
      <div
        v-for="ing in state.ingredientes.ingredientes"
        :key="ing.id"
        class="col-md-4 col-sm-6"
      >
        <div class="container-ingrediente">
          <div class="title-ingrediente">
            {{ ing.descricao.charAt(0) }}
          </div>
          <div class="break"></div>
          <h1>{{ ing.descricao }}</h1>
          <p>{{ ing.quantidade }} {{ ing.unidade }}</p>
          <p>R$ {{ ing.preco }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, onMounted } from "vue";
import ApiReceita from "@/api/apiReceita";
import { Ingrediente } from "@/api/interfacesReceita";

export default defineComponent({
  name: "Ingrediente",
  setup() {
    interface State {
      ingredientes: Array<Ingrediente>;
    }
    const state = reactive({
      ingredientes: [] as Array<Ingrediente>
    }) as State;

    async function retornaIngredientes() {
      const request = new ApiReceita();
      await request
        .getIngrediente()
        .then(response => {
          state.ingredientes = response;
        })
        .catch(err => {
          console.log(err);
        });
    }

    onMounted(() => {
      retornaIngredientes();
    });

    return { state };
  }
});
</script>
