import Footer from "./HomeFooter";
import HomeHeader from "./HomeHeader";
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div>
      <HomeHeader />
      <div className="HomeContent">
        <h1>Transporte seguro e acessível para pacientes e hospitais.</h1>
        <p>Conectamos hospitais e pacientes com motoristas treinados, garantindo deslocamentos confiáveis, confortáveis e pontuais. Nosso sistema facilita agendamentos, otimiza rotas e promove maior eficiência no atendimento hospitalar.</p>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;