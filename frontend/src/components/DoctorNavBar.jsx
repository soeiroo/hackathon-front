import NavBarDefault from "./NavBarDefault";

export default function DoctorNavBar({ user, onLogout }) {
  const links = [
    { label: "Agendamentos", path: "/testmedico" },
    { label: "Rotas", path: "/painel/rotas" },
    { label: "Pacientes", path: "/medico/pacientes" },
  ];

  return <NavBarDefault logoText="Hospital ABC" links={links} user={user} onLogout={onLogout} />;
}
