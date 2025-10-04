import { useEffect, useState } from 'react';
import styles from '../styles/LoginForm.module.css';
import { useNavigate } from 'react-router';
import axios from 'axios';


function LoginRegisterForm (){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  }, [user, navigate]);


  if (loading) {
    return (
      <div className={styles['loader-wrapper']}>
        <div className={styles['newtons-cradle']}>
          <div className={styles['newtons-cradle__dot']}></div>
          <div className={styles['newtons-cradle__dot']}></div>
          <div className={styles['newtons-cradle__dot']}></div>
          <div className={styles['newtons-cradle__dot']}></div>
        </div>
      </div>
    );
  }


  const API_BASE = import.meta.env.VITE_API_BASE || '/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        const res = await axios.post(`${API_BASE}/auth/register`, { email, password });
        // assume API returns created user or message
        alert(res.data?.message || 'Cadastro realizado com sucesso');
        setIsRegister(false);
      } else {
        const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
        // assume API returns user data and token
        const returnedUser = res.data?.user || null;
        setUser(returnedUser);
        if (res.data?.token) {
          // store token in localStorage for authenticated requests
          localStorage.setItem('token', res.data.token);
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      const message = error?.response?.data?.message || error.message || 'Erro na autenticação';
      alert('Authentication error: ' + message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/auth/reset-password`, { email: resetEmail });
      alert(res.data?.message || 'E-mail de reset enviado!');
      setShowReset(false);
      setResetEmail('');
    } catch (error) {
      const message = error?.response?.data?.message || error.message || 'Erro ao enviar e-mail de reset';
      alert('Erro ao enviar e-mail de reset: ' + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {!showReset ? (
        <form onSubmit={handleSubmit} className={styles['login-box']}>
          <h2 className={styles['login-title']}>{isRegister ? "Criar Conta" : "Login"}</h2>
          <div className={styles['input-group']}>
            <label htmlFor='email'>Email:</label>
            <input 
              type='email' 
              id='email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className={styles['input']}
            />
          </div>
          <div className={styles['input-group']}>
            <label htmlFor='password'>Password:</label>
            <input 
              type='password' 
              id='password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className={styles['input']}
            />
          </div>
          <button type='submit' className={styles['login-button']}>
            {isRegister ? "Cadastrar" : "Entrar"}
          </button>
          <p className={styles['signup-text']}>
            {isRegister ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
            <span onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? "Entrar" : "Cadastrar"}
            </span>
          </p>
          <p className={styles['signup-text']}>
            <span onClick={() => setShowReset(true)}>Esqueceu a senha?</span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleReset} className={styles['login-box']}>
          <h2 className={styles['login-title']}>Resetar senha</h2>
          <div className={styles['input-group']}>
            <label htmlFor='resetEmail'>Digite seu e-mail:</label>
            <input
              type='email'
              id='resetEmail'
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
              required
              className={styles['input']}
            />
          </div>
          <button type='submit' className={styles['login-button']}>
            Enviar e-mail de reset
          </button>
          <p className={styles['signup-text']}>
            <span onClick={() => setShowReset(false)}>Voltar para login</span>
          </p>
        </form>
      )}
    </div>
  );
}

export default LoginRegisterForm;