import axios, { AxiosInstance } from 'axios';

// Exact base URL requested
const BASE = 'https://supraorbital-unindemnified-ettie.ngrok-free.dev';

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
  try {
    const res = await api.post('/auth/login', { cpf, password });
    return res.data;
  } catch (err: any) {
    const msg = err?.response?.data?.message || err?.message || 'Erro no login';
    throw { message: msg, original: err };
  }
}

export async function resetPassword(email: string): Promise<any> {
  try {
    const res = await api.post('/auth/reset-password', { email });
    return res.data;
  } catch (err: any) {
    const msg = err?.response?.data?.message || err?.message || 'Erro no reset';
    throw { message: msg, original: err };
  }
}

export default api;


