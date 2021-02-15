<template>
  <div id="form-cadastro">
    <h1>Oi, aqui vamos cadastrar os ingredientes</h1>
    <form @submit.prevent="CadastraIngrediente">
      <div class="row">
        <div class="col-md-12">
          <input
            v-model="state.descricao"
            type="text"
            class="form-text"
            placeholder="Descrição"
            maxlength="50"
            required
          />
        </div>
        <div class="col-md-4">
          <select
            v-model="state.unidade"
            class="form-text"
            placeholder="Unidade"
            required
          >
            <option value="" disabled selected>Unidade</option>
            <option value="KG">Kg</option>
            <option value="MG">mg</option>
            <option value="L">L</option>
            <option value="ML">ml</option>
            <option value="CX">caixa</option>
            <option value="U">unitário</option>
          </select>
        </div>
        <div class="col-md-4">
          <input
            v-model="state.quantidade"
            type="number"
            class="form-text"
            placeholder="Quantidade"
            required
          />
        </div>
        <div class="col-md-4">
          <input
            v-model="state.preco"
            type="number"
            step="any"
            class="form-text"
            placeholder="Preço"
            required
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <input type="submit" class="btn btn-pri" value="salvar" />
        </div>
        <div class="col-md-4">
          <input
            type="button"
            class="btn btn-sec"
            value="limpar"
            @click="resetaform()"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { Ingrediente } from "@/api/interfacesReceita";
import ApiReceita from "@/api/apiReceita";
export default defineComponent({
  Name: "CadastroIngrediente",
  setup(props, { emit }) {
    interface Cadastro {
      descricao: string;
      unidade: string;
      quantidade?: number;
      preco?: number;
    }
    const state = reactive({
      descricao: "",
      unidade: "",
      quantidade: undefined,
      preco: undefined
    }) as Cadastro;

    function resetaform() {
      state.descricao = "";
      state.unidade = "";
      state.quantidade = undefined;
      state.preco = undefined;
    }

    async function CadastraIngrediente() {
      const ingrediente: Ingrediente = {
        descricao: state.descricao,
        unidade: state.unidade,
        quantidade: state.quantidade,
        preco: state.preco
      };
      const request = new ApiReceita();
      await request
        .createIngrediente(ingrediente)
        .then(response => {
          resetaform();
          emit("recarrega", true);
          console.log(response);
        })
        .catch(err => {
          resetaform();
          console.log(err);
        });
    }

    return { state, CadastraIngrediente, resetaform };
  }
});
</script>
