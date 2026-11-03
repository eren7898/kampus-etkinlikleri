import React from 'react';
import { User } from '../../types/user';

export interface HeaderProps {
  title: string;
  text?: string;
  user?: User | null;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, text, user, onLogin, onLogout }) => {
  return (
    <header className="app-header site-baslik">
      <div className="header-container">
        <div className="header-brand">
          <div className="header-logo" aria-hidden="true">
            🎓
          </div>
          <div className="header-title-block">
            <h1>{title}</h1>
            {text && <p>{text}</p>}
          </div>
        </div>

        <div className="header-user">
          <div className="student-badge">
            {user ? (
              <span>
                👤 {user.name} • 2321032014
              </span>
            ) : (
              <span>Öğrenci: Eren Cem Çelik • 2321032014</span>
            )}
          </div>
          {user && onLogout && (
            <button type="button" className="logout-btn" onClick={onLogout}>
              Çıkış Yap
            </button>
          )}
          {!user && onLogin && (
            <button type="button" className="logout-btn" onClick={onLogin}>
              Giriş Yap
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
