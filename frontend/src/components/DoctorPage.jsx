import NavBar from "./DoctorNavBar.jsx";
import React, { useEffect, useReducer, useState } from "react";
import {
  FaClock,
  FaMapMarkerAlt,
  FaCheck,
  FaCar,
  FaWheelchair,
  FaSearch,
  FaCheckCircle,
} from "react-icons/fa";

// --- Agendamentos ---
const agendamentosReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: false };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default function DoctorPage() {
  const [agendamentos, dispatchAgendamentos] = useReducer(agendamentosReducer, {
    data: [],
    loading: false,
    error: false,
  });

  const [drivers, setDrivers] = useState([
    // Motoristas mockados
    { id: 1, nome: "João", veiculo: "Carro Padrão", telefone: "9999-0000", status: "Disponível" },
    { id: 2, nome: "Maria", veiculo: "Van", telefone: "8888-1111", status: "Em rota" },
    { id: 3, nome: "Carlos", veiculo: "Carro Padrão", telefone: "7777-2222", status: "Ocupado" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchDriver, setSearchDriver] = useState("");
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);

  // Carrega agendamentos do localStorage
  useEffect(() => {
    dispatchAgendamentos({ type: "FETCH_INIT" });
    const stored = JSON.parse(localStorage.getItem("agendamentos")) || [];
    // Adiciona nome da paciente "Úrsula" a cada agendamento
    const withPatientName = stored.map((item) => ({ ...item, nomepaciente: "Úrsula" }));
    dispatchAgendamentos({ type: "FETCH_SUCCESS", payload: withPatientName });
  }, []);

  const escolherMotorista = (driver) => {
    setIsOpen(false);
    if (selectedAgendamento) {
      setNotification(
        `Paciente ${selectedAgendamento.nomepaciente} com motorista ${driver.nome} escolhido!`
      );
      setSelectedAgendamento(null);
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredDrivers = drivers
    .filter((d) => d.nome.toLowerCase().includes(searchDriver.toLowerCase()))
    .sort((a, b) => {
      const statusOrder = { "Disponível": 0, "Em rota": 1, "Ocupado": 2 };
      return (statusOrder[a.status] || 3) - (statusOrder[b.status] || 3);
    });

  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#e0e7ef] py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-[#1a3f6e] mb-8 text-center">
            Painel de Controle
          </h1>

          {agendamentos.loading ? (
            <p className="text-center text-gray-500">Carregando agendamentos...</p>
          ) : agendamentos.error ? (
            <p className="text-center text-red-500">Erro ao carregar agendamentos.</p>
          ) : (
            <div className="space-y-5">
              {agendamentos.data.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-gray-100 hover:shadow-lg transition"
                >
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-lg text-[#1a3f6e]">{item.nomepaciente}</span>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <FaClock className="text-[#1a3f6e]" /> {item.data} às {item.hora}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#1a3f6e]" /> {item.localidade}
                      </p>
                      {item.acessivel && (
                        <p className="flex items-center gap-2">
                          <FaWheelchair className="text-[#1a3f6e]" /> Transporte acessível
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedAgendamento(item);
                    }}
                    className="bg-[#00aaff] hover:bg-[#008ecc] text-white rounded-lg px-6 py-2 font-semibold transition flex items-center justify-center"
                  >
                    CONFIRMAR
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- Modal Motoristas --- */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg relative animate-fade-in">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center text-[#1a3f6e]">
                Motoristas Disponíveis
              </h2>

              {/* Pesquisa */}
              <div className="flex items-center gap-2 mb-4">
                <FaSearch className="text-gray-500" />
                <input
                  type="text"
                  value={searchDriver}
                  onChange={(e) => setSearchDriver(e.target.value)}
                  placeholder="Pesquisar motorista..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00aaff]"
                />
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredDrivers.map((driver) => {
                  let statusColor = "bg-green-500 animate-pulse";
                  if (driver.status === "Em rota") statusColor = "bg-yellow-400 animate-pulse";
                  if (driver.status === "Ocupado") statusColor = "bg-red-500";

                  return (
                    <div
                      key={driver.id}
                      className="bg-[#e6f2ff] rounded-xl shadow-md px-5 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-gray-200 hover:shadow-lg transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div>
                          <span className="font-semibold text-gray-800 text-lg">{driver.nome}</span>
                          <p className="text-gray-600 text-sm flex items-center gap-1">
                            <FaCar /> {driver.veiculo}
                          </p>
                          <p className="text-gray-600 text-sm">Telefone: {driver.telefone}</p>
                        </div>
                        <span
                          className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-white text-sm font-medium ${statusColor}`}
                        >
                          {driver.status}
                        </span>
                      </div>
                      <button
                        onClick={() => escolherMotorista(driver)}
                        className="bg-[#00aaff] hover:bg-[#008ecc] text-white rounded-lg px-6 py-2 transition flex items-center gap-2"
                      >
                        <FaCheck /> ESCOLHER
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Notificação */}
        {notification && (
          <div className="fixed top-5 z-[9999] right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in flex items-center gap-2">
            <FaCheckCircle /> {notification}
          </div>
        )}
      </main>
    </>
  );
}
