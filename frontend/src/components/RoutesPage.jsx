import NavBar from "./DoctorNavBar.jsx";
import { FaClock, FaUserTie, FaBolt } from "react-icons/fa";

// --- Mock de Rotas ---
const mockRotas = [
  { id: 1, origem: "Bonfim", destino: "Pantanal", horario: "08:00 - 08:30", motorista: "Carlos", status: "Disponível" },
  { id: 2, origem: "Pantanal", destino: "Junco", horario: "08:30 - 09:00", motorista: "Maria", status: "Em rota" },
  { id: 3, origem: "Junco", destino: "Cohab", horario: "09:00 - 09:30", motorista: "João", status: "Ocupado" },
  { id: 4, origem: "Taperuaba", destino: "Sumaré", horario: "09:30 - 10:00", motorista: "Ana", status: "Disponível" },
  { id: 5, origem: "Sumaré", destino: "Bonfim", horario: "10:00 - 10:30", motorista: "Pedro", status: "Disponível" },
  { id: 6, origem: "Cohab", destino: "Pantanal", horario: "10:30 - 11:00", motorista: "Lucas", status: "Em rota" },
  { id: 7, origem: "Taperuaba", destino: "Junco", horario: "11:00 - 11:30", motorista: "Fernanda", status: "Disponível" },
];

export default function RoutesPage() {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Rotas de Transporte
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Visualize todas as rotas entre distritos para transporte de pacientes.
          </p>

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
                      <p className="flex items-center gap-1">
                        <FaClock className="text-gray-500" /> {rota.horario}
                      </p>
                      <p className="flex items-center gap-1">
                        <FaUserTie className="text-gray-500" /> {rota.motorista}
                      </p>
                      <p className="flex items-center gap-1">
                        <FaBolt className="text-gray-500" />
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
        </div>
      </main>
    </>
  );
}
