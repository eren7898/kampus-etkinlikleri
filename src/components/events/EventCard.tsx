import React from 'react';
import { CampusEvent } from '../../types/campus-event';
import { formatDate } from '../../utils/format-date';

export interface EventCardProps {
  event: CampusEvent;
  onViewDetail?: (id: number) => void;
  onShowDetail?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onViewDetail,
  onShowDetail,
  onEdit,
  onDelete,
}) => {
  const handleDetail = () => {
    if (onShowDetail) onShowDetail(event.id);
    else if (onViewDetail) onViewDetail(event.id);
  };

  return (
    <article className="event-card" aria-label={event.title}>
      <div className="card-top">
        <img 
          src={event.image || '/afis.svg'} 
          alt={event.title} 
          className="card-top-bg" 
          loading="lazy" 
        />
        <span className={`category-tag tag-${event.category}`}>
          {event.category}
        </span>
      </div>

      <div className="card-body">
        <h3 className="card-title">{event.title}</h3>
        <p className="card-desc">{event.description}</p>

        <ul className="card-meta-list">
          <li className="card-meta-item">
            <span>📅</span>
            <span>{formatDate(event.date)} — {event.time}</span>
          </li>
          <li className="card-meta-item">
            <span>📍</span>
            <span>{event.location}</span>
          </li>
          <li className="card-meta-item">
            <span>👥</span>
            <span>Kontenjan: {event.capacity} kişi</span>
          </li>
          <li className="card-meta-item">
            <span>🏛️</span>
            <span>{event.organizer}</span>
          </li>
        </ul>

        <div className="card-actions">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleDetail}
          >
            Detayları Gör
          </button>
          {onEdit && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => onEdit(event.id)}
            >
              Düzenle
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              className="btn btn-danger-outline btn-sm"
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
    </article>
  );
};

export default EventCard;
