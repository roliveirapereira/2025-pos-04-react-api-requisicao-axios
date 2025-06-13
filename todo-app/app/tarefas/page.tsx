"use client";

import type React from "react";
import Link from "next/link";

import { useEffect, useState } from "react";
import axios from "axios";
import Cabecalho from "@/componentes/Cabecalho";
import ModalTarefa from "@/componentes/ModalTarefa";

interface TarefaInterface {
  id: number;
  title: string;
  completed: boolean;
}

interface TarefaProps {
  titulo: string;
  concluido?: boolean;
}

const Tarefa: React.FC<TarefaProps> = ({ titulo, concluido }) => {
  const [estaConcluido, setEstaConcluido] = useState(concluido);

  const classeCard = `p-3 mb-3 rounded-lg shadow-md hover:cursor-pointer hover:border ${
    estaConcluido
      ? "bg-gray-800 hover:border-gray-800"
      : "bg-gray-400 hover:border-gray-400"
  }`;

  const classeCorDoTexto = estaConcluido ? "text-amber-50" : "";

  const escutarClique = () => {
    console.log(`A tarefa '${titulo}' foi clicada!`);
    setEstaConcluido(!estaConcluido);
  };

  return (
    <div className={classeCard} onClick={() => escutarClique()}>
      <h3 className={`text-xl font-bold ${classeCorDoTexto}`}>{titulo}</h3>
      <p className={`text-sm ${classeCorDoTexto}`}>
        {estaConcluido ? "Concluída" : "Pendente"}
      </p>
    </div>
  );
};

const Tarefas: React.FC<{ dados: TarefaInterface[] }> = ({ dados }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {dados.map((tarefa) => (
        <Tarefa
          key={tarefa.id}
          titulo={tarefa.title}
          concluido={tarefa.completed}
        />
      ))}
    </div>
  );
};

const Home = () => {
  const [tarefas, setTarefas] = useState<TarefaInterface[]>([]); // começa vazio
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    const carregarTarefas = async () => {
      try {
        const resposta = await axios.get("https://dummyjson.com/todos");
        setTarefas(resposta.data.todos);
      } catch (erro) {
        console.error("Erro ao carregar tarefas:", erro);
      }
    };

    carregarTarefas();
  }, []);

  const adicionarTarefa = (titulo: string) => {
    const novaTarefa: TarefaInterface = {
      id: tarefas.length + 1,
      title: titulo,
      completed: false,
    };
    setTarefas([...tarefas, novaTarefa]);
  };

  return (
    <div className="container mx-auto p-4">
      <Cabecalho />
      <Link href="/" className="text-blue-600 hover:underline mt-4 block">
        Voltar para Home <br /> <br />
      </Link>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setModalAberto(true)}
      >
        Nova Tarefa
      </button>

      <Tarefas dados={tarefas} />

      {modalAberto && (
        <ModalTarefa
          aoAdicionar={adicionarTarefa}
          aoFechar={() => setModalAberto(false)}
        />
      )}
    </div>
  );
};

export default Home;