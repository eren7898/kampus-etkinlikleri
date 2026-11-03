import React from 'react';
import { CampusEvent } from '../../types/campus-event';
import { EventCard } from './EventCard';

export interface EventListProps {
  events: CampusEvent[];
  onViewDetail?: (id: number) => void;
  onShowDetail?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  emptyText?: string;
}

export const EventList: React.FC<EventListProps> = ({
  events,
  onViewDetail,
  onShowDetail,
  onEdit,
  onDelete,
  emptyText = 'Aradığınız kriterlere uygun herhangi bir etkinlik bulunmamaktadır.',
}) => {
  if (events.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <h3>Etkinlik Bulunamadı</h3>
        <p className="sonuc">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="events-grid">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onViewDetail={onViewDetail}
          onShowDetail={onShowDetail}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EventList;
