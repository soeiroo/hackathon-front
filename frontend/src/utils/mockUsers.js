// Small mock users for quick local testing
export const MOCK_DOCTOR = {
  id: 'doc-1',
  role: 'doctor',
  nome: 'Dr. Mock',
  cpf: '12345678900',
  email: 'dr.mock@example.com',
  password: 'doctor123'
};

export const MOCK_PATIENT = {
  id: 'user-1',
  role: 'patient',
  nome: 'Paciente Mock',
  cpf: '98765432100',
  email: 'patient.mock@example.com',
  password: 'patient123'
};

export default { MOCK_DOCTOR, MOCK_PATIENT };
