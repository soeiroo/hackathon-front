import { Routes, Route, Link } from 'react-router';
import HomePage from './components/HomePage';

function App() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
