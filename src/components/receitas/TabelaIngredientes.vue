<template>
  <div
    v-if="props.ingredientesReceita.length > 0"
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
        <tr v-for="ing in props.ingredientesReceita" :key="ing.id">
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
              @click="RemoveItem(ing.id, ing.preco)"
            >
              <i class="fas fa-times"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Ingrediente } from "@/api/interfacesReceita";
export default defineComponent({
  Name: "TabelaIngredientes",
  props: {
    ingredientesReceita: {
      type: Array as PropType<Ingrediente[]>,
      required: false
    }
  },
  setup(props) {
    return { props };
  }
});
</script>
