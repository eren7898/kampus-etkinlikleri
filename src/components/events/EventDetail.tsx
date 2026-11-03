import React from 'react';
import { CampusEvent } from '../../types/campus-event';
import { formatDate } from '../../utils/format-date';

export interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: number) => void;
  onDelete?: (id: number) => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({
  event,
  onBack,
  onEdit,
  onDelete,
}) => {
  return (
    <article className="detail-container">
      <img
        src={event.image || '/afis.svg'}
        alt={event.title}
        className="detail-banner"
      />

      <div className="detail-content">
        <div className="detail-header">
          <h2>{event.title}</h2>
          <span className={`category-tag tag-${event.category}`}>
            {event.category}
          </span>
        </div>

        <div className="detail-meta-grid">
          <div className="meta-box">
            <span className="meta-box-label">Tarih</span>
            <span className="meta-box-val">📅 {formatDate(event.date)}</span>
          </div>

          <div className="meta-box">
            <span className="meta-box-label">Saat</span>
            <span className="meta-box-val">⏰ {event.time}</span>
          </div>

          <div className="meta-box">
            <span className="meta-box-label">Mekan / Salon</span>
            <span className="meta-box-val">📍 {event.location}</span>
          </div>

          <div className="meta-box">
            <span className="meta-box-label">Kontenjan</span>
            <span className="meta-box-val">👥 {event.capacity} Katılımcı</span>
          </div>

          <div className="meta-box">
            <span className="meta-box-label">Düzenleyen Topluluk</span>
            <span className="meta-box-val">🏛️ {event.organizer}</span>
          </div>

          <div className="meta-box">
            <span className="meta-box-label">Kayıt Durumu</span>
            <span className="meta-box-val" style={{ color: 'var(--renk-basari)' }}>
              🟢 Kayıtlar Açık
            </span>
          </div>
        </div>

        <div className="detail-description">
          <h3 style={{ marginBottom: '0.75rem', color: 'var(--renk-ana-koyu)' }}>
            Etkinlik Hakkında
          </h3>
          <p>{event.description}</p>
        </div>

        <div className="detail-actions">
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            ← Listeye dön
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onEdit(event.id)}
            >
              Bu etkinliği güncelle
            </button>
            {onDelete && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  if (window.confirm(`"${event.title}" etkinliğini silmek istediğinize emin misiniz?`)) {
                    onDelete(event.id);
                  }
                }}
              >
                Sil
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default EventDetail;
