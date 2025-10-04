import { Routes, Route, Link } from 'react-router';

const App = () => {
    return (
     <>
        <SideBar />

        <Routes>
            <Route path="paciente" element={<Paciente />} />
            <Route path="doutor" element={<Doutor />} />
        </Routes>
    </>
    )
}


const SideBar = () => {
    return (
        <nav>
            <Link to="/paciente">Paciente</Link>
            <Link to="/doutor">Doutor</Link>
        </nav>
    )
}

export default App;
