import { CampusEvent } from '../types/campus-event';

/**
 * Arama metnine göre etkinlikleri filtreleyen saf fonksiyon.
 * Başlık, açıklama, mekan veya organizatör içinde arama yapar.
 */
export function searchEvents(events: readonly CampusEvent[], searchText: string): CampusEvent[] {
  const trimmed = searchText.trim().toLocaleLowerCase('tr-TR');
  if (!trimmed) {
    return [...events];
  }

  return events.filter((event) => {
    const titleMatch = event.title.toLocaleLowerCase('tr-TR').includes(trimmed);
    const descMatch = event.description.toLocaleLowerCase('tr-TR').includes(trimmed);
    const locMatch = event.location.toLocaleLowerCase('tr-TR').includes(trimmed);
    const orgMatch = event.organizer.toLocaleLowerCase('tr-TR').includes(trimmed);
    return titleMatch || descMatch || locMatch || orgMatch;
  });
}

/**
 * Belirli bir kategoriye göre etkinlikleri filtreleyen saf fonksiyon.
 * Kategori 'Tümü' veya boş ise tüm listeyi döndürür.
 */
export function filterByCategory(events: readonly CampusEvent[], category: string): CampusEvent[] {
  if (!category || category === 'Tümü' || category === 'all') {
    return [...events];
  }

  return events.filter((event) => event.category === category);
}

/**
 * ID değerine göre etkinliği bulan saf fonksiyon.
 */
export function findEventById(events: readonly CampusEvent[], id: number): CampusEvent | undefined {
  return events.find((event) => event.id === id);
}
