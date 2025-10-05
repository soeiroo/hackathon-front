import { Link } from "react-router";

export default function PatientNavBar() {
  return (
    <header className="bg-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/hcs-logo.png" alt="Hospital Logo" className="h-12 w-auto" />
          <span className="font-bold text-xl text-blue-700">Hospital Central</span>
        </div>

        {/* Links principais */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/patient" className="text-gray-700 hover:text-blue-700 font-medium">
            Início
          </Link>
          <Link to="/patient/appointments" className="text-gray-700 hover:text-blue-700 font-medium">
            Meus Agendamentos
          </Link>
          <Link to="/patient/history" className="text-gray-700 hover:text-blue-700 font-medium">
            Histórico
          </Link>
          <Link to="/patient/services" className="text-gray-700 hover:text-blue-700 font-medium">
            Serviços
          </Link>
          <Link to="/patient/contact" className="text-gray-700 hover:text-blue-700 font-medium">
            Contato / Ajuda
          </Link>
        </nav>

        {/* Portal */}
        <div>
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            Deslogar
          </Link>
        </div>
      </div>
    </header>
  );
}
