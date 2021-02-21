<template>
  <div id="receita" class="container-receita">
    <h1>Olá, aqui vamos ver as receitas.</h1>
    <div class="row">
      <button
        class="btn-mini btn-add ma-12"
        title="Clique para cadastrar uma nova receita."
        @click="showCadastro"
      >
        <i v-if="!state.cadastro" class="fas fa-plus"></i>
        <i v-else class="fas fa-minus"></i>
      </button>
      <input
        type="text"
        class="form-text ma-12 busca"
        placeholder="Procure aqui sua receita."
        v-model="state.receita"
      />
      <small v-if="state.erro != ''">
        {{ state.erro }}
      </small>
    </div>

    <transition name="slide-fade" mode="out-in">
      <div class="row" v-if="state.cadastro">
        <form-receita @recarrega="Recarregar" :item="state.item" />
      </div>
    </transition>
    <div class="row" v-if="state.erro == ''">
      <div
        v-for="rec in state.receitas"
        :key="rec.id"
        class="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-12"
      >
        <container-receita :rec="rec" @recarrega="Recarregar" />
      </div>
    </div>
    <div class="row" v-if="state.load">
      <h4>Aguarde...</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";
import ApiReceita from "@/api/apiReceita";
import { Receita } from "@/api/interfacesReceita";
import ContainerReceita from "@/components/receitas/ContainerReceita.vue";
import FormReceita from "@/components/receitas/FormReceita.vue";
export default defineComponent({
  components: { ContainerReceita, FormReceita },
  name: "Receita",
  setup() {
    interface State {
      receitas: Receita[];
      receita: string;
      erro: string;
      item?: number;
      cadastro: boolean;
      load: boolean;
    }
    const state = reactive({
      receitas: [] as Receita[],
      receita: "",
      erro: "",
      item: undefined,
      cadastro: false,
      load: false
    });

    async function retornaReceitas() {
      state.load = true;
      const request = new ApiReceita();
      await request
        .getReceitas()
        .then(response => {
          state.receitas = response;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          state.load = false;
        });
    }
    function Recarregar(resp: boolean) {
      if (resp) retornaReceitas();
    }
    function filtraReceita() {
      if (state.receita.length >= 3) {
        const filtroReceita = state.receitas.filter(nome => {
          return (
            nome.descricao.toLowerCase().indexOf(state.receita.toLowerCase()) >
            -1
          );
        });
        if (Object.keys(filtroReceita).length === 0) {
          state.erro = "Não encontramos essa receita. Tente buscar novamente.";
        } else {
          state.receitas = filtroReceita;
        }
      } else if (state.receita.length == 0) {
        state.erro = "";
        retornaReceitas();
      }
    }
    function showCadastro() {
      state.item = undefined;
      state.cadastro = !state.cadastro;
    }

    onMounted(() => {
      retornaReceitas();
    });

    watch(
      () => state.receita,
      () => {
        filtraReceita();
      }
    );

    return { state, retornaReceitas, Recarregar, filtraReceita, showCadastro };
  }
});
</script>
