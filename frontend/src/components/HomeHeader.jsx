import '../styles/HomeHeader.css';
import { Link } from 'react-router';

function HomeHeader() {
  return (
    <header>
      <div className='TopHeader'>
        <div className='LogoSection'>
          <img src='hcs-logo.png' alt='Healthcare Systems Logo' />
        </div>
        <ul>
          <div className='SearchSection'>
            <form>
              <input type="text" placeholder="Pesquisar..." />
              <button type="submit">Buscar</button>
            </form>
          </div>
          <li>Pesquisa</li>
          <li>Educação & Treinamento</li>
          <li>Contato</li>
          <li>Ajuda</li>
          <div className='PortalSection'>
            <Link to="/login" className='PortalButton'>
              Portal
            </Link>
          </div>
        </ul>
      </div>
      <nav>
        <ul className='NavLinks'>
          <li><Link to="/donate">Doar Agora</Link></li>
          <li><Link to="/about">Sobre Câncer & Tratamento</Link></li>
          <li><Link to="/">Agendar Consulta</Link></li>
          <li><Link to="/services">Serviços</Link></li>
        </ul>
      </nav>
      <div className='HeaderLine'></div>
    </header>
  );
}

export default HomeHeader;