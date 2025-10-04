import { Routes, Route, Link } from 'react-router';
import HomePage from './components/HomePage';

function App() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/medico" element={<DoctorPage />} />
        <Route path="/login/paciente" element={<PacientPage />} />
        <Route path="/testpaciente" />
        <Route path="/testmedico" element={<DoctorPage />}  />
        <Route path="/testmedico" element={<PacientPage />} />
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

const DoctorPage = () => {
    return (
        <NavBar />
    )
}

const PacientPage = () => {
    return (
        <NavBar />
    )
}

const NavBar = () => {
    return (
        <nav>
        </nav>
    )
}

export default App;
