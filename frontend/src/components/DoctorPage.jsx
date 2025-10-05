import NavBar from "./DoctorNavBar.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaClock,
  FaMapMarkerAlt,
  FaCheck,
  FaCar,
  FaWheelchair,
  FaSearch,
  FaCheckCircle
} from "react-icons/fa";

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

// --- Modal ---
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg relative animate-fade-in">
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
  const [notification, setNotification] = useState(null);
  const [searchDriver, setSearchDriver] = useState("");
  const [selectedPacient, setSelectedPacient] = useState(null); // paciente selecionado

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

    if (selectedPacient) {
      setNotification(
        `Paciente ${selectedPacient.nomepaciente} com motorista ${driver.nome} escolhido!`
      );
      setSelectedPacient(null);
    }

    setTimeout(() => setNotification(null), 3000);
    console.log(`Motorista escolhido: ${driver.nome}`);
  };

  // --- Filtragem e ordenação dos motoristas ---
  const filteredDrivers = drivers.data
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

          {/* --- Agendamentos --- */}
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
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-lg text-[#1a3f6e]">
                      {pacient.nomepaciente}
                    </span>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <FaClock className="text-[#1a3f6e]" /> {pacient.horario || "08:30 - 09:30"}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#1a3f6e]" /> {pacient.localidade || "Hospital Regional - Centro"}
                      </p>
                      {pacient.acessivel && (
                        <p className="flex items-center gap-2">
                          <FaWheelchair className="text-[#1a3f6e]" /> Transporte acessível
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedPacient(pacient);
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
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
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

          {/* Lista de motoristas */}
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
                        <FaCar /> {driver.veiculo || "Padrão"}
                      </p>
                      <p className="text-gray-600 text-sm">Telefone: {driver.telefone || "N/A"}</p>
                    </div>
                    <span
                      className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-white text-sm font-medium ${statusColor}`}
                    >
                      {driver.status || "Disponível"}
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
        </Modal>

        {/* --- Notificação --- */}
        {notification && (
          <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in flex items-center gap-2">
            <FaCheckCircle /> {notification}
          </div>
        )}
      </main>
    </>
  );
}
