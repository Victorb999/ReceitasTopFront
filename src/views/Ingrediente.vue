<template>
  <div id="ingrediente">
    <h1>Olá, aqui vamos ver os ingredientes.</h1>
    <div class="row">
      <button
        class="btn-mini btn-add ma-12"
        title="Clique para cadastrar um novo ingrediente."
        @click="showCadastro"
      >
        <i v-if="!state.cadastro" class="fas fa-plus"></i>
        <i v-else class="fas fa-minus"></i>
      </button>
      <input
        type="text"
        class="form-text ma-12 busca"
        placeholder="Procure aqui seu ingrediente."
        v-model="state.ingrediente"
      />
      <small v-if="state.erro != ''">
        {{ state.erro }}
      </small>
    </div>
    <transition name="slide-fade" mode="out-in">
      <div class="row" v-if="state.cadastro">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 ">
          <form-ingrediente @recarrega="Recarregar" :item="state.item" />
        </div>
        <div class="col-lg-4">
          <img src="./../assets/svg/illustration/form.svg" />
        </div>
      </div>
    </transition>
    <div class="row" v-if="state.erro == ''">
      <div
        v-for="ing in state.ingredientes"
        :key="ing.id"
        class="col-xs-6 col-sm-6 col-md-4 col-lg-2 mb-12"
      >
        <container-ingrediente
          :ing="ing"
          @recarrega="Recarregar"
          @update="Update"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, onMounted, watch } from "vue";
import ApiReceita from "@/api/apiReceita";
import { Ingrediente } from "@/api/interfacesReceita";
import FormIngrediente from "@/components/ingredientes/FormIngrediente.vue";
import ContainerIngrediente from "@/components/ingredientes/ContainerIngrediente.vue";

export default defineComponent({
  components: { ContainerIngrediente, FormIngrediente },
  name: "Ingrediente",
  setup() {
    interface State {
      ingredientes: Array<Ingrediente>;
      ingrediente: string;
      item?: number;
      erro: string;
      cadastro: boolean;
    }
    const state = reactive({
      ingredientes: [] as Array<Ingrediente>,
      ingrediente: "",
      item: undefined,
      erro: "",
      cadastro: false
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

    function filtraIgrediente() {
      console.log(state.ingrediente.length);
      if (state.ingrediente.length >= 3) {
        const filtroIngrediente = state.ingredientes.filter(nome => {
          return (
            nome.descricao
              .toLowerCase()
              .indexOf(state.ingrediente.toLowerCase()) > -1
          );
        });
        if (Object.keys(filtroIngrediente).length === 0) {
          state.erro =
            "Não encontramos esse ingrediente. Tente buscar novamente.";
        } else {
          state.ingredientes = filtroIngrediente;
        }
      } else if (state.ingrediente.length == 0) {
        state.erro = "";
        retornaIngredientes();
      }
    }

    function showCadastro() {
      state.item = undefined;
      state.cadastro = !state.cadastro;
    }

    function Recarregar(resp: boolean) {
      if (resp) retornaIngredientes();
    }

    function Update(item: Ingrediente) {
      state.item = item.id;
      state.cadastro = true;
    }

    onMounted(() => {
      retornaIngredientes();
    });

    watch(
      () => state.ingrediente,
      () => {
        filtraIgrediente();
      }
    );
    return { state, filtraIgrediente, showCadastro, Recarregar, Update };
  }
});
</script>
