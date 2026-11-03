import React, { useState } from 'react';
import { PageName } from '../types/page';

export interface ForgotPasswordPageProps {
  onNavigate: (page: PageName) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Geçerli bir e-posta adresi girin.');
      setSent(false);
      return;
    }

    setError('');
    setSent(true);
  };

  return (
    <>
      <div className="auth-card-header">
        <span className="auth-card-icon" aria-hidden="true">
          🔑
        </span>
        <h2>Şifremi Unuttum</h2>
        <p>E-posta adresinizi girin, sıfırlama bağlantısı gönderelim.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-field">
          <label className="auth-label" htmlFor="forgot-email">
            E-posta <span aria-hidden="true">*</span>
          </label>
          <input
            id="forgot-email"
            name="email"
            type="email"
            className={`auth-input ${error ? 'has-error' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@kampus.edu.tr"
            autoComplete="email"
            aria-invalid={error ? true : undefined}
          />
          {error && <span className="auth-error" role="alert">{error}</span>}
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sıfırlama Bağlantısı Gönder
        </button>
      </form>

      {sent && (
        <div className="auth-alert auth-alert-success" role="status">
          <strong>{email}</strong> adresine sıfırlama bağlantısı gönderildi (demo). Lütfen
          gelen kutunuzu kontrol edin.
        </div>
      )}

      <p className="auth-switch">
        <button type="button" className="auth-link" onClick={() => onNavigate('login')}>
          ← Giriş sayfasına dön
        </button>
      </p>
    </>
  );
};

export default ForgotPasswordPage;
