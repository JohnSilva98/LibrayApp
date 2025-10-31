import React, {useState} from 'react';

// /c:/Projetos/LibrayApp/src/components/login/LoginScreen.js

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Por favor, preencha email e senha.');
      return;
    }
    setError('');
    // perform auth here if needed, then route to HomeScreen
    navigate('/home');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Login</h2>

        <label style={styles.label}>
          Email
          <input
            type="e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
            placeholder="you@example.com"
          />
        </label>

        <label style={styles.label}>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Password"
          />
        </label>

        {error && <div style={styles.error}>{error}</div>}

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f5f5f5',
  },
  form: {
    width: 320,
    padding: 24,
    borderRadius: 8,
    background: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 14,
  },
  input: {
    marginTop: 6,
    padding: '8px 10px',
    fontSize: 14,
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  button: {
    marginTop: 6,
    padding: '10px 12px',
    fontSize: 16,
    borderRadius: 4,
    border: 'none',
    background: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  error: {
    color: '#b00020',
    fontSize: 13,
  },
};
