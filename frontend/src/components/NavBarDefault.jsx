import { Link } from "react-router";
import styles from "../styles/Navbar.module.css";

export default function NavBarDefault({ logoText, links, user }) {
  // Função para gerar inicial do usuário
  const getInitial = () => {
    if (user?.name) return user.name[0].toUpperCase();
    return "U"; // Default se não houver nome
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src="/medmovel-logo.png" alt="Logo" className={styles.logoImage} />
      </Link>

      <div className={styles.navLinks}>
        {links.map((link) => (
          <Link key={link.path} to={link.path}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className={styles.userSection}>
        {user?.avatar ? (
          <img src={user.avatar} alt="Avatar do usuário" className={styles.avatar} />
        ) : (
          <div className={styles.avatar}>{getInitial()}</div>
        )}
        <Link to={"/login"}>
          <button className={styles.btnLogout}>Deslogar</button>
        </Link>
      </div>
    </nav>
  );
}
