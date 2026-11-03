import React from 'react';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-shell">
        <aside className="auth-brand" aria-label="Kampüs Etkinlikleri Tanıtım">
          <div className="auth-brand-top">
            <div className="auth-brand-logo" aria-hidden="true">
              🎓
            </div>
            <div>
              <p className="auth-brand-kicker">Kampüs Etkinlikleri</p>
              <h1 className="auth-brand-title">Öğrenci Paneli</h1>
            </div>
          </div>

          <p className="auth-brand-text">
            Fakültedeki seminer, atölye, söyleşi ve yarışmaları tek yerden takip edin;
            etkinlikleri yönetin ve güncel programı kaçırmayın.
          </p>

          <ul className="auth-brand-list">
            <li>
              <span aria-hidden="true">📅</span>
              Yaklaşan etkinlikleri takip et
            </li>
            <li>
              <span aria-hidden="true">🔎</span>
              Kategoriye ve tarihe göre filtrele
            </li>
            <li>
              <span aria-hidden="true">➕</span>
              Yeni etkinlik ekle ve düzenle
            </li>
          </ul>

          <div className="auth-brand-footer">
            <span className="auth-brand-tag">Ton: 54</span>
            <span className="auth-brand-tag">Georgia</span>
            <span className="auth-brand-tag">Vite + React + TS</span>
          </div>
        </aside>

        <main className="auth-card">{children}</main>
      </div>

      <p className="auth-copyright">
        © {new Date().getFullYear()} Kampüs Etkinlikleri Yönetim Sistemi — Eren Cem Çelik
        (2321032014)
      </p>
    </div>
  );
};

export default AuthLayout;
