import React, { useState } from 'react';
import { PageName } from '../types/page';

export interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onNavigate: (page: PageName) => void;
  initialEmail?: string;
  notice?: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  onNavigate,
  initialEmail = '',
  notice,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found: LoginErrors = {};

    if (!email.trim()) {
      found.email = 'E-posta adresi zorunludur.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      found.email = 'Geçerli bir e-posta adresi girin.';
    }

    if (!password) {
      found.password = 'Şifre zorunludur.';
    } else if (password.length < 6) {
      found.password = 'Şifre en az 6 karakter olmalıdır.';
    }

    setErrors(found);

    if (Object.keys(found).length === 0) {
      onLogin(email.trim(), password);
    }
  };

  return (
    <>
      <div className="auth-card-header">
        <span className="auth-card-icon" aria-hidden="true">
          🔐
        </span>
        <h2>Giriş Yap</h2>
        <p>Hesabınıza giriş yaparak etkinlikleri görüntüleyin.</p>
      </div>

      {notice && (
        <div className="auth-alert auth-alert-success" role="status">
          {notice}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-field">
          <label className="auth-label" htmlFor="login-email">
            E-posta <span aria-hidden="true">*</span>
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            className={`auth-input ${errors.email ? 'has-error' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@kampus.edu.tr"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
          />
          {errors.email && (
            <span className="auth-error" id="login-email-error" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="login-password">
            Şifre <span aria-hidden="true">*</span>
          </label>
          <div className="auth-input-group">
            <input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className={`auth-input ${errors.password ? 'has-error' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="En az 6 karakter"
              autoComplete="current-password"
              aria-invalid={errors.password ? true : undefined}
              aria-describedby={errors.password ? 'login-password-error' : undefined}
            />
            <button
              type="button"
              className="auth-input-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
            >
              {showPassword ? 'Gizle' : 'Göster'}
            </button>
          </div>
          {errors.password && (
            <span className="auth-error" id="login-password-error" role="alert">
              {errors.password}
            </span>
          )}
        </div>

        <div className="auth-form-row">
          <span className="auth-hint">Demo giriş: herhangi bir e-posta ve 6+ karakterli şifre.</span>
          <button
            type="button"
            className="auth-link"
            onClick={() => onNavigate('forgot')}
          >
            Şifremi unuttum
          </button>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Giriş Yap
        </button>
      </form>

      <p className="auth-switch">
        Hesabınız yok mu?{' '}
        <button type="button" className="auth-link" onClick={() => onNavigate('register')}>
          Kayıt olun
        </button>
      </p>

      <p className="auth-skip">
        <button type="button" className="auth-link" onClick={() => onNavigate('home')}>
          Giriş yapmadan devam et →
        </button>
      </p>
    </>
  );
};

export default LoginPage;
