import React, { useEffect } from "react";
import NavBar from "./PatientNavBar.jsx";
import axios from "axios";
import { FaCalendarAlt, FaClock, FaNotesMedical } from "react-icons/fa";

const AGENDAMENTOS_QUERY = "http://localhost:1441/agendamentos";

const agendamentosReducer = (state, action) => {
  switch (action.type) {
    case "AGENDAMENTOS_FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "AGENDAMENTOS_FETCH_SUCCESS":
      return { ...state, isLoading: false, isError: false, data: action.payload };
    case "AGENDAMENTOS_FETCH_FAILURE":
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
    dispatchAgendamentos({ type: "AGENDAMENTOS_FETCH_INIT" });
    axios
      .get(AGENDAMENTOS_QUERY, { headers: { "ngrok-skip-browser-warning": "1" } })
      .then((result) => dispatchAgendamentos({ type: "AGENDAMENTOS_FETCH_SUCCESS", payload: result.data }))
      .catch(() => dispatchAgendamentos({ type: "AGENDAMENTOS_FETCH_FAILURE" }));
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className="min-h-screen bg-slate-50 px-6 py-12 flex flex-col lg:flex-row gap-10">
        {/* Formulário de Agendamento */}
        <form className="flex-1 bg-white shadow rounded-2xl p-8 space-y-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
            Agendamento de Transporte
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <FaCalendarAlt className="text-blue-500" /> Data
              </label>
              <input type="date" className="mt-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
            </div>

            <div className="flex flex-col">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <FaClock className="text-blue-500" /> Hora
              </label>
              <input type="time" className="mt-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
            </div>

            <div className="flex flex-col">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <FaNotesMedical className="text-blue-500" /> Motivo
              </label>
              <input type="text" placeholder="Ex: Consulta, Exame..." className="mt-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Observações</label>
              <textarea placeholder="Detalhes do agendamento" className="mt-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none" rows={3} />
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
            Agendar
          </button>
        </form>

        {/* Lista de Agendamentos */}
        <section className="flex-1 bg-white shadow rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Seus Agendamentos</h2>
          <p className="text-gray-500 text-sm mb-4">Visualize os próximos transportes agendados.</p>

          <div className="space-y-4">
            {agendamentos.isLoading && <p className="text-center text-gray-500">Carregando...</p>}
            {agendamentos.isError && <p className="text-center text-red-500">Erro ao carregar agendamentos.</p>}
            {!agendamentos.isLoading && !agendamentos.isError && agendamentos.data.slice(0, 5).map((a) => (
              <div key={a.key} className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center border-l-4 border-blue-500 hover:shadow-md transition">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-800">{a.motivo}</span>
                  <span className="text-gray-500 text-sm">{a.data} às {a.hora}</span>
                  <span className="text-gray-500 text-sm">{a.localidade}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
