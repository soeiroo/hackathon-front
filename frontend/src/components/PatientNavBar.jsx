import NavBarDefault from "./NavBarDefault";

export default function PatientNavBar({ user, onLogout }) {
  const links = [
    { label: "Meus Agendamentos", path: "/testpaciente" },
    { label: "Rotas", path: "/painel/rotas" },
  ];

  return <NavBarDefault logoImage="/images/medmovel-logo.png" links={links} user={user} onLogout={onLogout} />;
}
