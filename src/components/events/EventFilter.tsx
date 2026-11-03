import React from 'react';
import { EventCategory } from '../../types/campus-event';

export interface EventFilterProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOption?: string;
  onSortChange?: (sort: string) => void;
  onReset?: () => void;
  totalCount?: number;
  filteredCount?: number;
}

const CATEGORIES: (EventCategory | 'Tümü')[] = [
  'Tümü',
  'Seminer',
  'Atölye',
  'Söyleşi',
  'Yarışma',
];

export const EventFilter: React.FC<EventFilterProps> = ({
  searchText,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortOption = 'date-asc',
  onSortChange,
  onReset,
  totalCount,
  filteredCount,
}) => {
  return (
    <section className="filter-card" aria-label="Etkinlik Filtreleri">
      <div className="filter-row">
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Etkinlik ara (örn. seminer, atölye)..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Etkinlik ara"
          />
        </div>

        {onSortChange && (
          <div className="sort-box">
            <select
              className="sort-select"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sıralama seçeneği"
            >
              <option value="date-asc">Tarihe Göre (Yakından Uzağa)</option>
              <option value="date-desc">Tarihe Göre (Uzaktan Yakına)</option>
              <option value="title-asc">Başlığa Göre (A-Z)</option>
              <option value="capacity-desc">Kontenjana Göre (En Yüksek)</option>
            </select>
          </div>
        )}
      </div>

      <div className="filter-row">
        <div className="category-pills">
          <span className="category-label">Kategori:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-footer">
        <span>
          {totalCount !== undefined && filteredCount !== undefined ? (
            <>
              Toplam <strong>{totalCount}</strong> etkinlikten <strong>{filteredCount}</strong> tanesi listeleniyor
            </>
          ) : (
            `${filteredCount ?? ''} etkinlik listeleniyor.`
          )}
        </span>
        {onReset && (searchText || selectedCategory !== 'Tümü' || sortOption !== 'date-asc') && (
          <button type="button" className="reset-btn" onClick={onReset}>
            Filtreleri Temizle
          </button>
        )}
      </div>
    </section>
  );
};

export default EventFilter;
