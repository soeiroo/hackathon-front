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
        <Route path="/login/medico" element={<LoginRegisterForm />} />
        <Route path="/testmedico" element={<DoctorPage />}  />
        <Route path="/testpaciente" element={<PacientPage />} />
    </Routes>
  );
}

const LoginPage = () => {
    return (
        <section className="max-w-lg m-auto mt-60">
            <article className="flex flex-col md:flex-row  gap-8">
                <Link to="/login/paciente" className="bg-white p-20 rounded-lg text-center text-2xl">
                    <img src="" />
                    PACIENTE
                </Link>
                <Link to="/login/medico" className="bg-white p-20 rounded-lg text-center text-2xl">
                    <img src=""/>
                    MÉDICO
                </Link>
            </article>
        </section>
    )
}


export default App;
