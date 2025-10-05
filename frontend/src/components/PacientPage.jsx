import React, { useEffect } from "react";
import NavBar from "./PatientNavBar.jsx";
import axios from "axios";

const agendamentosFetchInit = "AGENDAMENTOS_FETCH_INIT";
const agendamentosFetchSuccess = "AGENDAMENTOS_FETCH_SUCCESS";
const agendamentosFetchFailure = "AGENDAMENTOS_FETCH_FAILURE";
const AGENDAMENTOS_QUERY = "http://localhost:1441/agendamentos";

const agendamentosReducer = (state, action) => {
  switch (action.type) {
    case agendamentosFetchInit:
      return { ...state, isLoading: true, isError: false };
    case agendamentosFetchSuccess:
      return { ...state, isLoading: false, isError: false, data: action.payload };
    case agendamentosFetchFailure:
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

export default function PacientPage() {
  const [agendamentos, dispatchAgendamentos] = React.useReducer(agendamentosReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    dispatchAgendamentos({ type: agendamentosFetchInit });
    axios
      .get(AGENDAMENTOS_QUERY, { headers: { "ngrok-skip-browser-warning": "1" } })
      .then((result) => {
        dispatchAgendamentos({ type: agendamentosFetchSuccess, payload: result.data });
      })
      .catch(() => {
        dispatchAgendamentos({ type: agendamentosFetchFailure });
      });
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">
        {/* Formulário de Agendamento */}
        <form className="flex-1 bg-white shadow-lg rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">Agende sua Corrida</h2>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Data</label>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Hora</label>
            <input
              type="time"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Motivo</label>
            <input
              type="text"
              placeholder="Ex: Consulta, Exame..."
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Justificativa</label>
            <textarea
              placeholder="Explique o motivo do agendamento"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Agendar
          </button>
        </form>

        {/* Lista de Agendamentos */}
        <section className="flex-1 bg-gray-100 shadow-lg rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">Seus Agendamentos</h2>
          <p className="text-center text-gray-600">Confira abaixo todos os seus agendamentos recentes</p>

          <div className="space-y-4 mt-6">
            {agendamentos.isLoading && <p className="text-center text-gray-500">Carregando agendamentos...</p>}
            {agendamentos.isError && <p className="text-center text-red-500">Erro ao carregar agendamentos.</p>}
            {!agendamentos.isLoading &&
              !agendamentos.isError &&
              agendamentos.data.slice(0, 5).map((agendamento) => (
                <div
                  key={agendamento.key}
                  className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-800">{agendamento.motivo}</span>
                    <span className="text-gray-500 text-sm">
                      {agendamento.data} às {agendamento.hora}
                    </span>
                    <span className="text-gray-500 text-sm">{agendamento.localidade}</span>
                  </div>
                  <button className="mt-2 md:mt-0 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition">
                    Confirmar
                  </button>
                </div>
              ))}
          </div>
        </section>
      </main>
    </>
  );
}
