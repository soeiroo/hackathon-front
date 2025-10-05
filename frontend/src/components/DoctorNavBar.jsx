import { useState } from "react";
import { Link } from "react-router";
import { HiOutlineSearch, HiMenu, HiX } from "react-icons/hi";

export default function DoctorNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/hcs-logo.png"
            alt="Hospital Logo"
            className="h-12 w-auto"
          />
          <span className="text-white font-bold text-xl">HCS Sistema</span>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-white font-semibold hover:text-gray-200 transition"
          >
            Início
          </Link>
          <Link
            to="/agendamentos"
            className="text-white font-semibold hover:text-gray-200 transition"
          >
            Agendamentos
          </Link>
          <Link
            to="/rotas"
            className="text-white font-semibold hover:text-gray-200 transition"
          >
            Rotas
          </Link>
          <Link
            to="/servicos"
            className="text-white font-semibold hover:text-gray-200 transition"
          >
            Serviços
          </Link>
          <Link
            to="/contato"
            className="text-white font-semibold hover:text-gray-200 transition"
          >
            Contato
          </Link>

          {/* Pesquisa */}
          <div className="flex items-center bg-white rounded-full px-3 py-1 gap-2">
            <HiOutlineSearch className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="outline-none text-sm w-40 sm:w-60"
            />
          </div>

          {/* Portal */}
          <Link
            to="/login"
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Portal
          </Link>
        </nav>

        {/* Menu Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Menu Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-blue-500 text-white px-6 py-4 space-y-4 shadow-inner">
          <Link
            to="/"
            className="block font-semibold hover:text-gray-200 transition"
            onClick={() => setMenuOpen(false)}
          >
            Início
          </Link>
          <Link
            to="/agendamentos"
            className="block font-semibold hover:text-gray-200 transition"
            onClick={() => setMenuOpen(false)}
          >
            Agendamentos
          </Link>
          <Link
            to="/rotas"
            className="block font-semibold hover:text-gray-200 transition"
            onClick={() => setMenuOpen(false)}
          >
            Rotas
          </Link>
          <Link
            to="/servicos"
            className="block font-semibold hover:text-gray-200 transition"
            onClick={() => setMenuOpen(false)}
          >
            Serviços
          </Link>
          <Link
            to="/contato"
            className="block font-semibold hover:text-gray-200 transition"
            onClick={() => setMenuOpen(false)}
          >
            Contato
          </Link>

          <div className="flex items-center bg-white text-blue-600 rounded-full px-3 py-1 gap-2">
            <HiOutlineSearch className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="outline-none text-sm w-full"
            />
          </div>

          <Link
            to="/login"
            className="block bg-white text-blue-600 font-semibold px-4 py-2 rounded-full text-center hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(false)}
          >
            Deslogar
          </Link>
        </div>
      )}
    </header>
  );
}