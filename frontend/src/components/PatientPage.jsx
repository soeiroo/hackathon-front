import React, { useEffect, useReducer, useState } from "react";
import PatientNavBar from "./PatientNavBar";
import {
  FaCalendarAlt,
  FaClock,
  FaFileMedical,
  FaMapMarkerAlt,
  FaClipboard,
  FaTrash,
  FaInfoCircle,
} from "react-icons/fa";

const initialState = {
  loading: false,
  error: false,
  data: [],
};

function agendamentosReducer(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: false };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: true };
    case "REMOVE_AGENDAMENTO":
      return {
        ...state,
        data: state.data.filter((a) => a.id !== action.payload),
      };
    default:
      return state;
  }
}

export default function PacientPage() {
  const [agendamentos, dispatchAgendamentos] = useReducer(
    agendamentosReducer,
    initialState
  );
  const [form, setForm] = useState({
    data: "",
    hora: "",
    motivo: "",
    observacoes: "",
    localidade: "Hospital Regional - Centro",
  });
  const [detalheAberto, setDetalheAberto] = useState(null); // ID do agendamento aberto

  const patientName = "Úrsula"; // nome mockado

  // Carrega agendamentos do localStorage
  useEffect(() => {
    dispatchAgendamentos({ type: "FETCH_INIT" });
    const stored = JSON.parse(localStorage.getItem("agendamentos")) || [];
    const withStatus = stored.map((item) => ({
      ...item,
      nomepaciente: patientName,
      confirmado: item.confirmado || false,
    }));
    dispatchAgendamentos({ type: "FETCH_SUCCESS", payload: withStatus });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novo = {
      id: Date.now(),
      ...form,
      nomepaciente: patientName,
      confirmado: false,
    };
    const stored = JSON.parse(localStorage.getItem("agendamentos")) || [];
    localStorage.setItem("agendamentos", JSON.stringify([novo, ...stored]));
    dispatchAgendamentos({
      type: "FETCH_SUCCESS",
      payload: [novo, ...agendamentos.data],
    });
    setForm({
      data: "",
      hora: "",
      motivo: "",
      observacoes: "",
      localidade: "Hospital Regional - Centro",
    });
  };

  const handleCancelar = (id) => {
    const stored = JSON.parse(localStorage.getItem("agendamentos")) || [];
    const updated = stored.filter((a) => a.id !== id);
    localStorage.setItem("agendamentos", JSON.stringify(updated));
    dispatchAgendamentos({ type: "REMOVE_AGENDAMENTO", payload: id });
    setDetalheAberto(null); // fecha modal se estiver aberto
  };

  return (
    <>
      <PatientNavBar />
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row gap-8 p-6">
        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 bg-white shadow rounded-2xl p-8 space-y-6 border border-gray-200 max-w-md mx-auto"
        >
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Olá, {patientName}! Agende seu transporte
          </h1>

          {/* Data */}
          <div className="flex items-center border rounded-lg px-3 py-2 gap-2">
            <FaCalendarAlt className="text-gray-500" />
            <input
              type="date"
              value={form.data}
              onChange={(e) => setForm({ ...form, data: e.target.value })}
              className="flex-1 outline-none text-gray-700"
              required
            />
          </div>

          {/* Hora */}
          <div className="flex items-center border rounded-lg px-3 py-2 gap-2">
            <FaClock className="text-gray-500" />
            <input
              type="time"
              value={form.hora}
              onChange={(e) => setForm({ ...form, hora: e.target.value })}
              className="flex-1 outline-none text-gray-700"
              required
            />
          </div>

          {/* Motivo */}
          <div className="flex items-center border rounded-lg px-3 py-2 gap-2">
            <FaFileMedical className="text-gray-500" />
            <input
              type="text"
              placeholder="Motivo da consulta"
              value={form.motivo}
              onChange={(e) => setForm({ ...form, motivo: e.target.value })}
              className="flex-1 outline-none text-gray-700"
              required
            />
          </div>

          {/* Localidade */}
          <div className="flex items-center border rounded-lg px-3 py-2 gap-2">
            <FaMapMarkerAlt className="text-gray-500" />
            <select
              value={form.localidade}
              onChange={(e) => setForm({ ...form, localidade: e.target.value })}
              className="flex-1 outline-none bg-transparent text-gray-700"
            >
              <option>Hospital Regional - Centro</option>
              <option>Posto de Saúde - Zona Norte</option>
              <option>Clínica Popular - Zona Sul</option>
            </select>
          </div>

          {/* Observações */}
          <div className="flex items-start border rounded-lg px-3 py-2 gap-2">
            <FaClipboard className="text-gray-500 mt-1" />
            <textarea
              placeholder="Observações adicionais"
              value={form.observacoes}
              onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
              className="flex-1 outline-none text-gray-700 resize-none"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Confirmar Agendamento
          </button>
        </form>

        {/* Lista de agendamentos */}
        <div className="flex-1 bg-white shadow rounded-2xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Meus Agendamentos
          </h2>

          {agendamentos.loading ? (
            <p>Carregando...</p>
          ) : agendamentos.data.length === 0 ? (
            <p className="text-gray-500">Nenhum agendamento ainda.</p>
          ) : (
            <ul className="space-y-3">
              {agendamentos.data.map((item) => (
                <li
                  key={item.id}
                  className="border rounded-lg p-3 flex flex-col md:flex-row justify-between items-center gap-2"
                >
                  {/* Resumo */}
                  <div className="flex flex-col">
                    <p className="font-medium">
                      {item.data} às {item.hora}
                    </p>
                    <p className="text-sm text-gray-600">{item.motivo}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        item.confirmado
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.confirmado ? "Confirmado" : "A Confirmar"}
                    </span>

                    {/* Botão detalhes */}
                    <button
                      onClick={() => setDetalheAberto(item)}
                      className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 border border-blue-600 rounded-lg transition flex items-center gap-1"
                    >
                      <FaInfoCircle /> <span>Detalhes</span>
                    </button>

                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal de detalhes */}
      {detalheAberto && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setDetalheAberto(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Detalhes do Agendamento</h2>
            <p><strong>Paciente:</strong> {detalheAberto.nomepaciente}</p>
            <p><strong>Data:</strong> {detalheAberto.data}</p>
            <p><strong>Hora:</strong> {detalheAberto.hora}</p>
            <p><strong>Motivo:</strong> {detalheAberto.motivo}</p>
            <p><strong>Localidade:</strong> {detalheAberto.localidade}</p>
            <p><strong>Observações:</strong> {detalheAberto.observacoes || "-"}</p>

            <button
              onClick={() => handleCancelar(detalheAberto.id)}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Cancelar Agendamento
            </button>
          </div>
        </div>
      )}
    </>
  );
}
