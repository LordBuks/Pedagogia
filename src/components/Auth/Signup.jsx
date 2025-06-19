import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Signup = ({ onSwitchToLogin, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError('As senhas não coincidem');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      onSuccess();
    } catch (err) {
      setError('Falha ao criar conta: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-form-container">
      <h2>Cadastro</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password-confirm">Confirmar Senha:</label>
          <input
            type="password"
            id="password-confirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      <p>
        Já tem uma conta? <span className="link" onClick={onSwitchToLogin}>Faça login</span>
      </p>
    </div>
  );
};

export default Signup;


