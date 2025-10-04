import { Routes, Route, Link } from 'react-router';
import HomePage from './components/HomePage';
import LoginRegisterForm from './components/LoginRegister.jsx';
import DoctorPage from './components/DoctorPage.jsx';
import PacientPage from './components/PacientPage.jsx';

function App() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/paciente" element={<LoginRegisterForm />} />
        <Route path="/login/medico" element={<LoginRegisterForm />} />
        <Route path="/testmedico" element={<DoctorPage />}  />
        <Route path="/testpaciente" element={<PacientPage />} />
    </Routes>
  );
}


const LoginPage = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-4">
      <h1 className="text-white text-4xl md:text-5xl font-bold mb-12 text-center drop-shadow-lg">
        Escolha seu tipo de acesso
      </h1>

      <article className="flex flex-col md:flex-row gap-8 w-full max-w-3xl justify-center">
        <Link
          to="/login/paciente"
          className="flex-1 bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-lg text-center text-2xl font-semibold 
          transition transform hover:-translate-y-2 hover:shadow-2xl hover:bg-white"
        >
          <div className="mb-4 flex justify-center">
            {/* Espaço reservado para ícone ou imagem futuramente */}
            <span className="inline-block w-16 h-16 bg-blue-600 rounded-full"></span>
          </div>
          PACIENTE
        </Link>

        <Link
          to="/login/medico"
          className="flex-1 bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-lg text-center text-2xl font-semibold 
          transition transform hover:-translate-y-2 hover:shadow-2xl hover:bg-white"
        >
          <div className="mb-4 flex justify-center">
            {/* Espaço reservado para ícone ou imagem futuramente */}
            <span className="inline-block w-16 h-16 bg-green-600 rounded-full"></span>
          </div>
          MÉDICO
        </Link>
      </article>
    </section>
  );
};



export default App;
