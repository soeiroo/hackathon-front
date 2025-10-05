import NavBar from "./DoctorNavBar.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";

// --- Pacientes ---
const pacientsFetchInit = "PACIENTS_FETCH_INIT";
const pacientsFetchSuccess = "PACIENTS_FETCH_SUCCESS";
const pacientsFetchFailure = "PACIENTS_FETCH_FAILURE";
const PACIENTS_QUERY = "http://localhost:1441/agendamentos";

const pacientsReducer = (state, action) => {
  switch (action.type) {
    case pacientsFetchInit:
      return { ...state, isLoading: true, isError: false };
    case pacientsFetchSuccess:
      return { ...state, isLoading: false, isError: false, data: action.payload };
    case pacientsFetchFailure:
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

// --- Motoristas ---
const driversFetchInit = "drivers_FETCH_INIT";
const driversFetchSuccess = "drivers_FETCH_SUCCESS";
const driversFetchFailure = "drivers_FETCH_FAILURE";
const DRIVERS_QUERY = "http://localhost:1441/motorista";

const driversReducer = (state, action) => {
  switch (action.type) {
    case driversFetchInit:
      return { ...state, isLoading: true, isError: false };
    case driversFetchSuccess:
      return { ...state, isLoading: false, isError: false, data: action.payload };
    case driversFetchFailure:
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

// --- Mock de Rotas Sobral ---
const mockRotas = [
  { id: 1, origem: "Centro", destino: "Bonfim", horario: "08:00 - 08:30", motorista: "Carlos", status: "Disponível" },
  { id: 2, origem: "Pantanal", destino: "Sumaré", horario: "08:30 - 09:00", motorista: "Maria", status: "Em rota" },
  { id: 3, origem: "Junco", destino: "Cohab", horario: "09:00 - 09:30", motorista: "João", status: "Ocupado" },
  { id: 4, origem: "Bonfim", destino: "Taperuaba", horario: "09:30 - 10:00", motorista: "Ana", status: "Disponível" },
  { id: 5, origem: "Sumaré", destino: "Centro", horario: "10:00 - 10:30", motorista: "Pedro", status: "Disponível" },
  { id: 6, origem: "Cohab", destino: "Pantanal", horario: "10:30 - 11:00", motorista: "Lucas", status: "Em rota" },
  { id: 7, origem: "Taperuaba", destino: "Junco", horario: "11:00 - 11:30", motorista: "Fernanda", status: "Disponível" },
];

// --- Modal ---
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

// --- DoctorPage ---
export default function DoctorPage() {
  const [pacients, dispatchPacients] = React.useReducer(pacientsReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const [drivers, dispatchDrivers] = React.useReducer(driversReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [activeTab, setActiveTab] = useState("agendamentos");

  // --- Fetch Pacientes ---
  useEffect(() => {
    dispatchPacients({ type: pacientsFetchInit });
    axios
      .get(PACIENTS_QUERY, { headers: { "ngrok-skip-browser-warning": "1" } })
      .then((result) => {
        dispatchPacients({ type: pacientsFetchSuccess, payload: result.data });
      })
      .catch(() => dispatchPacients({ type: pacientsFetchFailure }));
  }, []);

  // --- Fetch Motoristas ---
  useEffect(() => {
    dispatchDrivers({ type: driversFetchInit });
    axios
      .get(DRIVERS_QUERY, { headers: { "ngrok-skip-browser-warning": "1" } })
      .then((result) => {
        dispatchDrivers({ type: driversFetchSuccess, payload: result.data });
      })
      .catch(() => dispatchDrivers({ type: driversFetchFailure }));
  }, []);

  // --- Escolher motorista ---
  const escolherMotorista = (driver) => {
    setIsOpen(false);
    setNotification(true);
    console.log(`Motorista escolhido: ${driver.nome}`);
    setTimeout(() => setNotification(false), 3000);
  };

  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Painel de Controle
          </h1>

          {/* --- Abas --- */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setActiveTab("agendamentos")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === "agendamentos"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Agendamentos
            </button>
            <button
              onClick={() => setActiveTab("rotas")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === "rotas"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Rotas
            </button>
          </div>

          {/* --- Conteúdo das abas --- */}
          {activeTab === "agendamentos" && (
            <>
              {pacients.isLoading ? (
                <p className="text-center text-gray-500">Carregando agendamentos...</p>
              ) : pacients.isError ? (
                <p className="text-center text-red-500">Erro ao carregar agendamentos.</p>
              ) : (
                <div className="space-y-5">
                  {pacients.data.slice(0, 7).map((pacient) => (
                    <div
                      key={pacient.id}
                      className="bg-white rounded-xl shadow-md px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-gray-100 hover:shadow-lg transition"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-lg text-gray-800">
                          {pacient.nomepaciente}
                        </span>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                          <p className="flex items-center gap-1">🕒 {pacient.horario || "08:30 - 09:30"}</p>
                          <p className="flex items-center gap-1">📍 {pacient.localidade || "Hospital Regional - Centro"}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 transition"
                      >
                        CONFIRMAR
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "rotas" && (
            <div className="space-y-4">
              {mockRotas.map((rota) => {
                let statusColor = "bg-green-500";
                if (rota.status === "Em rota") statusColor = "bg-yellow-500";
                if (rota.status === "Ocupado") statusColor = "bg-red-500";

                return (
                  <div
                    key={rota.id}
                    className="bg-white rounded-xl shadow-md px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-gray-100 hover:shadow-lg transition"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800 text-lg">
                        {rota.origem} → {rota.destino}
                      </span>
                      <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-600">
                        <p className="flex items-center gap-1">🕒 {rota.horario}</p>
                        <p className="flex items-center gap-1">🚗 {rota.motorista}</p>
                        <p className="flex items-center gap-1">
                          ⚡
                          <span className={`px-2 py-0.5 rounded text-white text-xs ${statusColor}`}>
                            {rota.status}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* --- Modal Motoristas --- */}
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h2 className="text-xl font-bold mb-4">MOTORISTAS DISPONÍVEIS</h2>
          <div className="space-y-3">
            {drivers.data.map((driver) => {
              let statusColor = "bg-green-500";
              if (driver.status === "Em rota") statusColor = "bg-yellow-500";
              if (driver.status === "Ocupado") statusColor = "bg-red-500";

              return (
                <div
                  key={driver.id}
                  className="bg-white rounded-xl shadow-md px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border border-gray-100"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{driver.nome}</span>
                    <span
                      className={`text-sm px-2 py-0.5 rounded text-white text-xs ${statusColor}`}
                    >
                      {driver.status || "Disponível"}
                    </span>
                  </div>
                  <button
                    onClick={() => escolherMotorista(driver)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 transition"
                  >
                    ESCOLHER
                  </button>
                </div>
              );
            })}
          </div>
        </Modal>

        {/* --- Notificação --- */}
        {notification && (
          <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
            Motorista escolhido com sucesso! 🚗
          </div>
        )}
      </main>
    </>
  );
}
