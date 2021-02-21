<template>
  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 ">
    <div id="form-cadastro">
      <h1>Oi, aqui vamos cadastrar os Receitas</h1>
      <form @submit.prevent="AddIngrediente">
        <div class="row">
          <div class="col-md-12">
            <input
              v-model="state.descricao"
              type="text"
              class="form-text"
              placeholder="Descrição"
              maxlength="50"
            />
          </div>
          <div class="col-md-7">
            <select
              v-model="state.ingrediente"
              class="form-text"
              placeholder="Unidade"
              required
            >
              <option value="0" disabled selected>Ingrediente</option>
              <option
                v-for="ing in state.ingredientes"
                :key="ing.id"
                :value="ing.id"
                >{{ ing.descricao }}
              </option>
            </select>
          </div>
          <div class="col-md-4">
            <input
              v-model="state.quantidade"
              type="number"
              min="0"
              step="any"
              class="form-text"
              placeholder="Quantidade"
              required
            />
          </div>
          <div class="col-md-1">
            <span> {{ state.unidade }} </span>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <button type="submit" class="btn btn-pri" value="salvar">
              <i class="fas fa-plus"></i>
            </button>
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
  </div>
  <div
    v-if="state.ingredientesReceita.length > 0"
    class="col-xs-12 col-sm-12 col-md-12 col-lg-4"
  >
    <table>
      <thead>
        <tr>
          <th>Ingrediente</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Remover</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ing in state.ingredientesReceita" :key="ing.id">
          <td>{{ ing.descricao }}</td>
          <td>{{ ing.quantidade }} {{ ing.unidade }}</td>
          <td>
            {{
              new Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL"
              }).format(ing.preco)
            }}
          </td>
          <td>
            <button
              class="btn-mini-table btn-delete"
              @click="removeItem(ing.id)"
            >
              <i class="fas fa-times"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h1 v-if="state.precoTotal > 0" class="mt-12">
    Preço total da receita é de :
    {{
      new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL"
      }).format(state.precoTotal)
    }}
  </h1>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";
import { IngredienteReceita, Ingrediente } from "@/api/interfacesReceita";
import ApiReceita from "@/api/apiReceita";
import toast from "@/core/toast";

export default defineComponent({
  Name: "FormReceita",
  props: {
    item: {
      type: Number,
      required: false
    }
  },
  setup(props) {
    interface Cadastro {
      descricao: string;
      quantidade?: number;
      preco?: number;
      precoTotal: number;
      unidade: string;
      update: boolean;
      item: IngredienteReceita;
      ingrediente: number;
      ingredientes: Ingrediente[];
      ingredientesReceita: Ingrediente[];
    }
    const state = reactive({
      descricao: "",
      unidade: "",
      quantidade: undefined,
      preco: undefined,
      precoTotal: 0,
      update: false,
      item: {} as IngredienteReceita,
      ingrediente: 0,
      ingredientes: [] as Ingrediente[],
      ingredientesReceita: [] as Ingrediente[]
    }) as Cadastro;

    function resetaform() {
      //state.descricao = "";
      state.unidade = "";
      state.quantidade = undefined;
      state.preco = undefined;
      state.update = false;
      state.ingrediente = 0;
    }

    async function retornaIngredientes() {
      const request = new ApiReceita();
      await request
        .getIngrediente()
        .then(response => {
          state.ingredientes = response;
        })
        .catch(err => {
          toast.error(err, "Ops");
        });
    }

    async function BuscaReceita() {
      const request = new ApiReceita();
      const id = props.item == null ? 0 : props.item;
      if (id > 0) {
        await request
          .getReceita(id)
          .then(response => {
            state.item = response;
          })
          .catch(err => {
            toast.error(err, "Ops");
          });
      }
    }
    function AddIngrediente() {
      const ingSelected = state.ingredientes.filter(nome => {
        return nome.id == state.ingrediente;
      });
      if (
        state.quantidade &&
        ingSelected[0].preco &&
        ingSelected[0].quantidade
      ) {
        const valor =
          (state.quantidade * ingSelected[0].preco) / ingSelected[0].quantidade;

        state.ingredientesReceita.push({
          descricao: ingSelected[0].descricao,
          unidade: ingSelected[0].unidade,
          quantidade: state.quantidade,
          id: ingSelected[0].id,
          preco: valor
        });

        state.precoTotal += valor;
        resetaform();
      }
    }

    function removeItem(id: number) {
      state.ingredientesReceita.splice(
        state.ingredientesReceita.findIndex(v => v.id === id),
        1
      );
    }

    if (typeof props.item != "undefined") {
      BuscaReceita();
    } else {
      resetaform();
    }

    onMounted(() => {
      retornaIngredientes();
    });

    watch(
      () => props.item,
      () => {
        if (typeof props.item != "undefined") {
          BuscaReceita();
        } else {
          resetaform();
        }
        // console.log(props.item, state.update);
      }
    );

    watch(
      () => state.ingrediente,
      () => {
        if (state.ingrediente > 0) {
          const ingSelected = state.ingredientes.filter(nome => {
            return nome.id == state.ingrediente;
          });
          state.unidade = ingSelected[0].unidade ? ingSelected[0].unidade : "";
        }
      }
    );

    return {
      state,
      resetaform,
      AddIngrediente,
      removeItem
    };
  }
});
</script>
