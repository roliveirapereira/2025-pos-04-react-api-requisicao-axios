export type TarefaInterface = {
	id: number;
	title: string;
	completed: boolean;
	userId?: number; // Adicionando campo opcional para compatibilidade
  };
  
  const dados: Array<TarefaInterface> = [
	{ id: 1, title: "Comprar leite", completed: false },
	{ id: 2, title: "Estudar React", completed: false },
	{ id: 3, title: "Fazer exercícios", completed: true },
	{ id: 4, title: "Ler livro", completed: false },
	{ id: 5, title: "Pagar contas", completed: true },
  ];
  
  const carregar = (): Promise<TarefaInterface[]> => {
	return new Promise((resolve, reject) => {
	  const sucesso = true;
  
	  if (sucesso) {
		resolve(dados);
	  } else {
		reject(new Error("Erro 500: Falha ao carregar dados da API"));
	  }
	});
  };
  
  export { carregar };
  export default dados;