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
}

export default ApiReceita;
