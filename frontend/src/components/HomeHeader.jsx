import '../styles/HomeHeader.css';
import { Link } from 'react-router';

function HomeHeader() {
  return (
    <header>
      <div className='TopHeader'>
        <div className='LogoSection'>
          <img src='medmovel-logo.png' alt='Medmóvel Logo' />
        </div>
        <ul>
          {/* <div className='SearchSection'>
            <form>
              <input type="text" placeholder="Pesquisar..." />
              <button type="submit">Buscar</button>
            </form>
          </div> */}
          
          <div className='PortalSection'>
            <Link to="/login" className='PortalButton'>
              Portal
            </Link>
          </div>
        </ul>
      </div>
      {/* <nav>
        <ul className='NavLinks'>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/services">Serviços</Link></li>
            <li><Link to="/how-it-works">Como Funciona</Link></li>
            <li><Link to="/plans">Planos & Preços</Link></li>
            <li><Link to="/testimonials">Cases</Link></li>
            <li><Link to="/contact">Contato Comercial</Link></li>
        </ul>
      </nav> */}
      <div className='HeaderLine'></div>
    </header>
  );
}

export default HomeHeader;