import { Routes, Route, Link } from 'react-router';
import HomePage from './components/HomePage';
import LoginRegisterForm from './components/LoginRegister.jsx';
import DoctorPage from './components/DoctorPage.jsx';
import PacientPage from './components/PacientPage.jsx';

function App() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginRegisterForm />} />
        <Route path="/testmedico" element={<DoctorPage />}  />
        <Route path="/testpaciente" element={<PacientPage />} />
    </Routes>
  );
}






export default App;
