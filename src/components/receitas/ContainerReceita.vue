<template>
  <div class="container-ingrediente">
    <div class="title-ingrediente">
      {{ props.rec.descricao.toUpperCase().charAt(0) }}
    </div>
    <div class="text-ingrediente">
      <h1>{{ props.rec.descricao }}</h1>
      <p>
        Valor total:
        {{
          new Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL"
          }).format(props.rec.valor_total)
        }}
      </p>
      <button
        class="btn-mini delete mr-6"
        title="deletar"
        @click="deleteReceita"
      >
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Receita } from "@/api/interfacesReceita";
import ApiReceita from "@/api/apiReceita";
export default defineComponent({
  Name: "ContainerReceita",
  props: {
    rec: {
      type: Object as PropType<Receita>,
      required: true
    }
  },
  setup(props, { emit }) {
    async function deleteReceita() {
      const request = new ApiReceita();
      const id = props.rec.id == null ? 0 : props.rec.id;
      if (confirm("Tem certeza que deseja deletar?")) {
        await request
          .deleteReceita(id)
          .then(() => {
            alert("Deletamos essa receita pra você.");
            emit("recarrega", true);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }

    return {
      deleteReceita,
      props
    };
  }
});
</script>
