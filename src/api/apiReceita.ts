import axios from "axios";
import { Ingrediente } from "@/api/interfacesReceita";

class ApiReceita {
  async getIngrediente() {
    let ingredientes = [] as Array<Ingrediente>;
    await axios({
      method: "get",
      baseURL: process.env.VUE_APP_API_ENDPOINT,
      url: `ingrediente`
    })
      .then(response => {
        ingredientes = response.data.ingredientes;
      })
      .catch(() => {
        return false;
      });
    return ingredientes;
  }

  async createIngrediente(ingrediente: Ingrediente) {
    await axios({
      method: "post",
      baseURL: process.env.VUE_APP_API_ENDPOINT,
      url: `ingrediente`,
      data: ingrediente
    })
      .then(response => {
        return response;
      })
      .catch(() => {
        return false;
      });
  }

  async updateIngrediente(ingrediente: Ingrediente, id: number) {
    let idZ = 0;
    await axios({
      method: "put",
      baseURL: process.env.VUE_APP_API_ENDPOINT,
      url: `ingrediente/${id}`,
      data: ingrediente
    })
      .then(response => {
        idZ = response.data.id;
      })
      .catch(() => {
        return false;
      });
    return idZ;
  }

  async deleteIngreditente(id: number) {
    await axios({
      method: "delete",
      baseURL: process.env.VUE_APP_API_ENDPOINT,
      url: `ingrediente/${id}`
    })
      .then(response => {
        return response;
      })
      .catch(() => {
        return false;
      });
  }

  async buscaIngrediente(id: number) {
    let ingrediente = {} as Ingrediente;
    await axios({
      method: "get",
      baseURL: process.env.VUE_APP_API_ENDPOINT,
      url: `ingrediente/${id}`
    })
      .then(response => {
        ingrediente = response.data.ingrediente;
      })
      .catch(() => {
        return false;
      });
    return ingrediente;
  }
}

export default ApiReceita;
