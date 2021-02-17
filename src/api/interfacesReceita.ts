export interface Ingrediente {
  id?: number;
  descricao: string;
  unidade?: string;
  quantidade?: number;
  preco?: number;
  data?: Date;
}

export interface Receita {
  id?: number;
  descricao: string;
  valor_total?: number;
  data?: Date;
}

export interface IngredienteReceita {
  receita: Receita;
  ingredientes: Ingrediente[];
}