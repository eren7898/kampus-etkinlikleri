import React, { useState, useEffect } from 'react';
import { CampusEvent, EventCategory } from '../../types/campus-event';

export interface EventFormProps {
  mode?: 'add' | 'update';
  initialEvent?: CampusEvent;
  onSubmit: (eventData: Omit<CampusEvent, 'id'> | CampusEvent) => void;
  onCancel?: () => void;
}

const CATEGORIES: EventCategory[] = ['Seminer', 'Atölye', 'Söyleşi', 'Yarışma'];

export const EventForm: React.FC<EventFormProps> = ({
  mode = 'add',
  initialEvent,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<EventCategory>('Seminer');
  const [organizer, setOrganizer] = useState('');
  const [capacity, setCapacity] = useState<number>(50);
  const [image, setImage] = useState('/afis.svg');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === 'update' && initialEvent) {
      setTitle(initialEvent.title);
      setDescription(initialEvent.description);
      setDate(initialEvent.date);
      setTime(initialEvent.time);
      setLocation(initialEvent.location);
      setCategory(initialEvent.category);
      setOrganizer(initialEvent.organizer);
      setCapacity(initialEvent.capacity);
      setImage(initialEvent.image || '/afis.svg');
    } else {
      setTitle('');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
      setTime('14:00');
      setLocation('');
      setCategory('Seminer');
      setOrganizer('');
      setCapacity(50);
      setImage('/afis.svg');
    }
    setErrors({});
  }, [mode, initialEvent]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!title.trim()) {
      errs.title = 'Etkinlik adı zorunludur.';
    } else if (title.trim().length < 5) {
      errs.title = 'Etkinlik adı en az 5 karakter olmalıdır.';
    }

    if (!description.trim()) {
      errs.description = 'Açıklama zorunludur.';
    }

    if (!date) {
      errs.date = 'Tarih seçimi zorunludur.';
    }

    if (!time) {
      errs.time = 'Saat seçimi zorunludur.';
    }

    if (!location.trim()) {
      errs.location = 'Mekan / Yer bilgisi zorunludur.';
    }

    if (!capacity || capacity <= 0) {
      errs.capacity = 'Kontenjan 0\'dan büyük olmalıdır.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === 'update' && initialEvent) {
      onSubmit({
        ...initialEvent,
        title: title.trim(),
        description: description.trim(),
        date,
        time,
        location: location.trim(),
        category,
        organizer: organizer.trim() || 'Kampüs Topluluğu',
        capacity: Number(capacity),
        image: image || '/afis.svg',
      });
    } else {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        date,
        time,
        location: location.trim(),
        category,
        organizer: organizer.trim() || 'Kampüs Topluluğu',
        capacity: Number(capacity),
        image: image || '/afis.svg',
      });
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>{mode === 'add' ? 'Etkinlik Ekle' : 'Etkinliği Güncelle'}</h2>
        <p>
          {mode === 'add'
            ? 'Yeni bir kampüs etkinliği ekleyin.'
            : 'Mevcut etkinliğin detaylarını düzenleyin ve kaydedin.'}
        </p>
      </div>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-group full-width">
            <label className="form-label" htmlFor="title">
              Etkinlik Adı *
            </label>
            <input
              id="title"
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn. Kariyer Günleri 2026"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="category">
              Kategori *
            </label>
            <select
              id="category"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value as EventCategory)}
            >
              <option value="">Seçiniz</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="organizer">
              Düzenleyen Topluluk
            </label>
            <input
              id="organizer"
              type="text"
              className="form-input"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              placeholder="Örn. Bilişim Kulübü"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="date">
              Tarih *
            </label>
            <input
              id="date"
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="time">
              Saat *
            </label>
            <input
              id="time"
              type="time"
              className="form-input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            {errors.time && <span className="error-message">{errors.time}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="location">
              Yer *
            </label>
            <input
              id="location"
              type="text"
              className="form-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Örn. A Blok Konferans Salonu"
            />
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="capacity">
              Kontenjan *
            </label>
            <input
              id="capacity"
              type="number"
              min="1"
              max="5000"
              className="form-input"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
            />
            {errors.capacity && <span className="error-message">{errors.capacity}</span>}
          </div>

          <div className="form-group full-width">
            <label className="form-label" htmlFor="description">
              Açıklama *
            </label>
            <textarea
              id="description"
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Etkinlik açıklaması..."
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
        </div>

        <div className="form-actions">
          {onCancel && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              İptal
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {mode === 'add' ? 'Kaydet' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
