import React from 'react';
import { PageName } from '../../types/page';

export interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
  eventCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({ current, onNavigate, eventCount }) => {
  return (
    <nav className="app-nav" aria-label="Ana Gezinti">
      <div className="nav-container">
        <button
          type="button"
          className={`nav-item ${current === 'home' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
        >
          <span>🏛️</span>
          <span>Ana Sayfa</span>
        </button>

        <button
          type="button"
          className={`nav-item ${current === 'events' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('events');
          }}
        >
          <span>📅</span>
          <span>Etkinlikler {eventCount !== undefined && `(${eventCount})`}</span>
        </button>

        <button
          type="button"
          className={`nav-item ${current === 'add' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('add');
          }}
        >
          <span>➕</span>
          <span>Etkinlik Ekle</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
