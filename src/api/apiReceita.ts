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
        ingredientes = response.data;
      })
      .catch(() => {
        return false;
      });
    return ingredientes;
  }
}

export default ApiReceita;
