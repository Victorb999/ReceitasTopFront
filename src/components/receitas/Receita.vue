<template>
  <div
    id="receita"
    class="container-receita"
    v-if="Object.keys(state.receita).length > 0"
  >
    <h1 class="capitalize">{{ state.receita.receita.descricao }}</h1>
    <h1 v-if="state.receita.receita.valor_total > 0" class="mt-12">
      Preço total da receita é de :
      {{
        new Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL"
        }).format(state.receita.receita.valor_total)
      }}
    </h1>
    <tabela-ingredientes :ingredientesReceita="state.receita.ingredientes" />
    <div class="ma-18">
      <router-link to="/receita">
        <i class="fas fa-arrow-left"></i> voltar
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { IngredienteReceita } from "@/api/interfacesReceita";
import ApiReceita from "@/api/apiReceita";
import toast from "@/core/toast";
import TabelaIngredientes from "./TabelaIngredientes.vue";

export default defineComponent({
  components: { TabelaIngredientes },
  Name: "Receitas",
  setup() {
    const route = useRoute();

    interface Receita {
      receita: IngredienteReceita;
    }

    const state = reactive({
      receita: {} as IngredienteReceita
    }) as Receita;

    async function GetReceita() {
      const request = new ApiReceita();
      const id = parseInt(route.params.id.toString());
      if (id > 0) {
        await request
          .getReceita(id)
          .then(response => {
            state.receita = response;
          })
          .catch(err => {
            toast.error(err, "Ops");
          });
      }
    }

    onMounted(() => {
      GetReceita();
    });

    return { state };
  }
});
</script>
