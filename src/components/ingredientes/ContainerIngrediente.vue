<template>
  <div class="container-ingrediente">
    <div class="title-ingrediente">
      {{ props.ing.descricao.toUpperCase().charAt(0) }}
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
      <button class="btn-mini edit mr-6" title="editar" @click="updateItem">
        <i class="far fa-edit"></i>
      </button>
      <button class="btn-mini delete mr-6" title="deletar" @click="deleteItem">
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";
import { Ingrediente } from "@/api/interfacesReceita";
import ApiReceita from "@/api/apiReceita";
import toast from "@/core/toast";

export default defineComponent({
  name: "Ingrediente",
  props: {
    ing: {
      type: Object as PropType<Ingrediente>,
      required: true
    }
  },
  setup(props, { emit }) {
    async function deleteItem() {
      const request = new ApiReceita();
      const id = props.ing.id == null ? 0 : props.ing.id;
      if (confirm("Tem certeza que deseja deletar?")) {
        await request
          .deleteIngreditente(id)
          .then(() => {
            toast.success("Deletamos esse ingrediente pra você.", "Ótimo");
            emit("recarrega", true);
          })
          .catch(err => {
            toast.error(err, "Ops");
          });
      }
    }

    function updateItem() {
      const el = document.getElementById("app");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          window.scrollBy(0, 40);
        }, 500);
      }
      emit("update", props.ing);
    }

    return {
      props,
      deleteItem,
      updateItem
    };
  }
});
</script>
