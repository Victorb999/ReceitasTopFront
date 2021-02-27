<template>
  <div id="form-cadastro">
    <h1 v-if="state.update">
      <i class="far fa-edit"></i> Carregamos o {{ state.item.descricao }} para
      você atualizar.
    </h1>
    <h1 v-else>Oi, aqui vamos cadastrar os ingredientes</h1>
    <form
      @submit.prevent="
        state.update ? UpdateIngrediente() : CadastraIngrediente()
      "
    >
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
            <option value="" disabled selected>Medida</option>
            <option value="KG">Kg</option>
            <option value="MG">mg</option>
            <option value="L">L</option>
            <option value="ML">ml</option>
            <option value="CX">caixa</option>
            <option value="U">Unidade</option>
          </select>
        </div>
        <div class="col-md-4">
          <input
            v-model="state.quantidade"
            type="number"
            step="any"
            min="0"
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
            min="0"
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
import { defineComponent, reactive, watch } from "vue";
import { Ingrediente } from "@/api/interfacesReceita";
import ApiReceita from "@/api/apiReceita";
import toast from "@/core/toast";
export default defineComponent({
  Name: "FormIngrediente",
  props: {
    item: {
      type: Number,
      required: false
    }
  },
  setup(props, { emit }) {
    interface Cadastro {
      descricao: string;
      unidade?: string;
      quantidade?: number;
      preco?: number;
      update: boolean;
      item: Ingrediente;
    }
    const state = reactive({
      descricao: "",
      unidade: "",
      quantidade: undefined,
      preco: undefined,
      update: false,
      item: {} as Ingrediente
    }) as Cadastro;

    function resetaform() {
      state.descricao = "";
      state.unidade = "";
      state.quantidade = undefined;
      state.preco = undefined;
      state.update = false;
    }

    async function BuscaIngrediente() {
      const request = new ApiReceita();
      const id = props.item == null ? 0 : props.item;
      if (id > 0) {
        await request
          .buscaIngrediente(id)
          .then(response => {
            state.item = response;
          })
          .catch(err => {
            toast.error(err, "Ops");
          });
      }
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
        .then(() => {
          resetaform();
          toast.success("Cadastramos esse ingrediente pra você.", "Ótimo");
          emit("recarrega", true);
        })
        .catch(err => {
          resetaform();
          toast.error(err, "Ops");
        });
    }

    async function UpdateIngrediente() {
      state.item.descricao = state.descricao;
      state.item.quantidade = state.quantidade;
      state.item.preco = state.preco;
      state.item.unidade = state.unidade;
      const request = new ApiReceita();
      const id = state.item.id == null ? 0 : state.item.id;
      await request
        .updateIngrediente(state.item, id)
        .then(() => {
          toast.success("Atualizamos esse ingrediente pra você.", "Ótimo");
          emit("recarrega", true);
        })
        .catch(err => {
          toast.error(err, "Ops");
        })
        .finally(() => {
          resetaform();
        });
    }

    if (typeof props.item != "undefined") {
      BuscaIngrediente();
    } else {
      resetaform();
    }

    watch(
      () => props.item,
      () => {
        if (typeof props.item != "undefined") {
          BuscaIngrediente();
        } else {
          resetaform();
        }
        //console.log(props.item, state.update);
      }
    );

    watch(
      () => state.item,
      () => {
        if (typeof props.item != undefined) {
          state.descricao = state.item.descricao;
          state.quantidade = state.item.quantidade;
          state.preco = state.item.preco;
          state.unidade = state.item.unidade;
          state.update = true;
        }
      }
    );

    return {
      state,
      CadastraIngrediente,
      resetaform,
      BuscaIngrediente,
      UpdateIngrediente
    };
  }
});
</script>
