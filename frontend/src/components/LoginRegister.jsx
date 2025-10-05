import { useEffect, useState } from 'react';
import styles from '../styles/LoginForm.module.css';
import { Navigate, useNavigate } from 'react-router';
import { addUser, loginByCpf } from '../utils/apiClient';
import { MOCK_DOCTOR, MOCK_PATIENT } from '../utils/mockUsers';

function LoginRegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const user = null;

  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/main');
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      if (isRegister) {
        const payload = { nome, email, cpf, phone, password };
        const res = await addUser(payload);
        setMessage(res?.message || 'Cadastro realizado com sucesso');
        setIsRegister(false);
        setNome(''); setCpf(''); setPhone(''); setEmail('');
      } else {
        const res = await loginByCpf(cpf, password);
        setMessage(res?.message || 'Login realizado.');
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Erro na autenticação';
      setError(msg);
    } finally { setLoading(false); }
  };

  const handleMockLogin = async (who) => {
    setLoading(true); setError(''); setMessage('');
    try {
      const creds = who === 'doctor' ? MOCK_DOCTOR : MOCK_PATIENT;
      setCpf(creds.cpf); setPassword(creds.password);
      const res = await loginByCpf(creds.cpf, creds.password);
      navigate(who === 'doctor' ? '/testmedico' : '/testpaciente');
      setMessage(res?.message || 'Login realizado (mock).');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Erro no login (mock)';
      setError(msg);
    } finally { setLoading(false); }
  };

  if (loading) return <div className={styles['loader-wrapper']}>Carregando...</div>;

  return (
    <div className={styles.container}>
      {message && <p className={styles['success-message']}>{message}</p>}
      {error && <p className={styles['error-message']}>{error}</p>}

      {!showReset ? (
        <form onSubmit={handleSubmit} className={styles['login-box']}>
          <h2 className={styles['login-title']}>{isRegister ? "Criar Conta" : "Login"}</h2>

          {isRegister && (
            <div className={styles['two-col']}>
              <div className={styles['input-group']}>
                <label htmlFor='nome'>Nome:</label>
                <input type='text' id='nome' value={nome} onChange={(e) => setNome(e.target.value)} required className={styles.input}/>
              </div>
              <div className={styles['input-group']}>
                <label htmlFor='cpf'>CPF:</label>
                <input type='text' id='cpf' value={cpf} onChange={(e) => setCpf(e.target.value)} required className={styles.input}/>
              </div>
              <div className={styles['input-group']}>
                <label htmlFor='phone'>Telefone:</label>
                <input type='tel' id='phone' value={phone} onChange={(e) => setPhone(e.target.value)} required className={styles.input}/>
              </div>
              <div className={styles['input-group']}>
                <label htmlFor='registerEmail'>Email:</label>
                <input type='email' id='registerEmail' value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.input}/>
              </div>
            </div>
          )}

          {!isRegister && (
            <div className={styles['input-group']}>
              <label htmlFor='cpf'>CPF:</label>
              <input type='text' id='cpf' value={cpf} onChange={(e) => setCpf(e.target.value)} required className={styles.input}/>
            </div>
          )}

          <div className={styles['input-group']}>
            <label htmlFor='password'>Senha:</label>
            <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.input}/>
          </div>

          <button type='submit' className={styles['login-button']}>
            {isRegister ? "Cadastrar" : "Entrar"}
          </button>

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button type='button' className={styles['login-button']} onClick={() => handleMockLogin('doctor')}>Médico</button>
            <button type='button' className={styles['login-button']} onClick={() => handleMockLogin('patient')}>Paciente</button>
          </div>

          <p className={styles['signup-text']}>
            {isRegister ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
            <span className={styles['signup-link']} onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? "Entrar" : "Cadastrar"}
            </span>
          </p>

          <p className={styles['signup-text']}>
            <span className={styles['signup-link']} onClick={() => setShowReset(true)}>Esqueceu a senha?</span>
          </p>
        </form>
      ) : (
        <form className={styles['login-box']} onSubmit={() => {}}>
          <h2 className={styles['login-title']}>Resetar senha</h2>
          <div className={styles['input-group']}>
            <label htmlFor='resetEmail'>Digite seu e-mail:</label>
            <input type='email' id='resetEmail' value={resetEmail} onChange={e => setResetEmail(e.target.value)} required className={styles.input}/>
          </div>
          <button type='submit' className={styles['login-button']}>Enviar e-mail de reset</button>
          <p className={styles['signup-text']}>
            <span className={styles['signup-link']} onClick={() => setShowReset(false)}>Voltar para login</span>
          </p>
        </form>
      )}
    </div>
  );
}

export default LoginRegisterForm;
