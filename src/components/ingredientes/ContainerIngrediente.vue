<template>
  <div class="container-ingrediente">
    <div class="title-ingrediente">
      {{ props.ing.descricao.charAt(0) }}
    </div>
    <div class="text-ingrediente">
      <h1>{{ props.ing.descricao }}</h1>
      <p>{{ props.ing.quantidade }} {{ props.ing.unidade }}</p>
      <p>
        {{
          new Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL"
          }).format(props.ing.preco)
        }}
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";
import { Ingrediente } from "@/api/interfacesReceita";
export default defineComponent({
  name: "Ingrediente",
  props: {
    ing: {
      type: Object as PropType<Ingrediente>,
      required: true
    }
  },
  setup(props) {
    return {
      props
    };
  }
});
</script>
