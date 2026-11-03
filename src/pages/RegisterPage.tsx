import React, { useState } from 'react';
import { PageName } from '../types/page';

export interface RegisterPageProps {
  onRegister: (name: string, email: string) => void;
  onNavigate: (page: PageName) => void;
}

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
  terms?: string;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found: RegisterErrors = {};

    if (name.trim().length < 3) {
      found.name = 'Ad soyad en az 3 karakter olmalıdır.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      found.email = 'Geçerli bir e-posta adresi girin.';
    }

    if (password.length < 6) {
      found.password = 'Şifre en az 6 karakter olmalıdır.';
    }

    if (password2 !== password) {
      found.password2 = 'Şifreler birbiriyle aynı değil.';
    }

    if (!terms) {
      found.terms = 'Devam etmek için kuralları kabul etmelisiniz.';
    }

    setErrors(found);

    if (Object.keys(found).length === 0) {
      onRegister(name.trim(), email.trim());
    }
  };

  return (
    <>
      <div className="auth-card-header">
        <span className="auth-card-icon" aria-hidden="true">
          📝
        </span>
        <h2>Kayıt Ol</h2>
        <p>Kampüs etkinliklerini takip etmek için hesap oluşturun.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-field">
          <label className="auth-label" htmlFor="register-name">
            Ad Soyad <span aria-hidden="true">*</span>
          </label>
          <input
            id="register-name"
            name="name"
            type="text"
            className={`auth-input ${errors.name ? 'has-error' : ''}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınız ve soyadınız"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
          />
          {errors.name && <span className="auth-error" role="alert">{errors.name}</span>}
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="register-email">
            E-posta <span aria-hidden="true">*</span>
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            className={`auth-input ${errors.email ? 'has-error' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@kampus.edu.tr"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
          />
          {errors.email && <span className="auth-error" role="alert">{errors.email}</span>}
        </div>

        <div className="auth-grid">
          <div className="auth-field">
            <label className="auth-label" htmlFor="register-password">
              Şifre <span aria-hidden="true">*</span>
            </label>
            <input
              id="register-password"
              name="password"
              type="password"
              className={`auth-input ${errors.password ? 'has-error' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="En az 6 karakter"
              autoComplete="new-password"
              aria-invalid={errors.password ? true : undefined}
            />
            {errors.password && <span className="auth-error" role="alert">{errors.password}</span>}
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="register-password2">
              Şifre (tekrar) <span aria-hidden="true">*</span>
            </label>
            <input
              id="register-password2"
              name="password2"
              type="password"
              className={`auth-input ${errors.password2 ? 'has-error' : ''}`}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Şifreyi tekrar girin"
              autoComplete="new-password"
              aria-invalid={errors.password2 ? true : undefined}
            />
            {errors.password2 && <span className="auth-error" role="alert">{errors.password2}</span>}
          </div>
        </div>

        <div className="auth-field">
          <label className="auth-checkbox">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              aria-invalid={errors.terms ? true : undefined}
            />
            <span>Kampüs etkinlik kurallarını kabul ediyorum.</span>
          </label>
          {errors.terms && <span className="auth-error" role="alert">{errors.terms}</span>}
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Kayıt Ol
        </button>
      </form>

      <p className="auth-switch">
        Zaten hesabınız var mı?{' '}
        <button type="button" className="auth-link" onClick={() => onNavigate('login')}>
          Giriş yapın
        </button>
      </p>
    </>
  );
};

export default RegisterPage;
