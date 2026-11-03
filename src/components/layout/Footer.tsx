import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-left">
          <p>
            <strong>Kampüs Etkinlikleri Yönetim Sistemi</strong> &copy; {new Date().getFullYear()} — Tüm hakları saklıdır.
          </p>
          <p>
            Geliştirici: <strong>Eren Cem Çelik</strong> (Öğrenci No: <code>2321032014</code>)
          </p>
        </div>

        <div className="footer-right">
          <span className="footer-tag">Ton: 54</span>
          <span className="footer-tag">Font: Georgia</span>
          <span className="footer-tag">Vite + React + TS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
