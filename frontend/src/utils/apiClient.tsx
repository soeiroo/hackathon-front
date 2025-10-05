import axios, { AxiosInstance } from 'axios';
import { MOCK_DOCTOR, MOCK_PATIENT } from './mockUsers';
import { Link } from 'react-router';

// Exact base URL requested (kept for other API calls like register/reset)
const BASE = 'localhost:1441';

const api: AxiosInstance = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
});

type UserData = {
  nome?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  password?: string;
  [k: string]: any;
};


export const addUser = async (userData: UserData): Promise<any> => {
  try {
    const res = await api.post('/addUser', userData);
    return res.data;
  } catch (err: any) {
    // If the server does not have /addUser, try the alternative /users/add
    const status = err?.response?.status;
    if (status === 404) {
      try {
        const res2 = await api.post('/users/add', userData);
        return res2.data;
      } catch (err2: any) {
        const msg2 = err2?.response?.data?.message || err2?.message || 'Erro ao criar usuário (fallback)';
        throw { message: msg2, original: err2, body: err2?.response?.data };
      }
    }
    const msg = err?.response?.data?.message || err?.message || 'Erro ao criar usuário';
    throw { message: msg, original: err, body: err?.response?.data };
  }
};



/**
 * Login by CPF (credential-only)
 */
export async function loginByCpf(cpf: string, password: string): Promise<any> {
  // Use only mock credentials for login to avoid calling the backend/database.
  // This intentionally bypasses any network request and returns a local user object.
  const candidates = [MOCK_DOCTOR, MOCK_PATIENT];
  const found = candidates.find((u) => u.cpf === cpf && u.password === password);
  console.log(found);
  if (found) {
    // Return a copy without password
    const { password, ...userNoPass } = found;
    return userNoPass;
  }
  // Keep error shape simple; callers typically read error.message
  throw new Error('CPF ou senha inválidos');
}



export default api;


