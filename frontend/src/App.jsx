import { Routes, Route, Link } from 'react-router';
import HomePage from './components/HomePage';
import LoginRegisterForm from './components/LoginRegister.jsx';

function App() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginRegisterForm />} />
    </Routes>
  );
}

export default App;
