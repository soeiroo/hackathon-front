import '../styles/Footer.css';
import { Link } from 'react-router';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo e marca */}
        <div className="footer-brand">
          <img src="/medmovel-logo.png" alt="MedMóvel Logo" className="footer-logo" />
          <p className="footer-description">
            MedMóvel - Transporte de saúde com segurança e conforto.
          </p>
        </div>

        {/* Navegação */}
        <div className="footer-nav">
          <h4 className="footer-title">Links Rápidos</h4>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/services">Serviços</Link></li>
            <li><Link to="/about">Sobre</Link></li>
            <li><Link to="/login">Portal</Link></li>
            <li><Link to="/contact">Contato</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/terms">Termos de Uso</Link></li>
            <li><Link to="/privacy">Privacidade</Link></li>
          </ul>
        </div>

        {/* Contato */}
        <div className="footer-contact">
          <h4 className="footer-title">Contato</h4>
          <p>Av. Principal, 1234, Sobral - CE</p>
          <p>Tel: (88) 1234-5678</p>
          <p>Email: contato@medmovel.com.br</p>

          {/* Redes sociais */}
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MedMóvel. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
