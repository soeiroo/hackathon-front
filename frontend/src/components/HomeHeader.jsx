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
          <div className='PortalSection'>
            <Link to="/login" className='PortalButton'>
              Portal
            </Link>
          </div>
        </ul>
      </div>
      <div className='HeaderLine'></div>
    </header>
  );
}

export default HomeHeader;
