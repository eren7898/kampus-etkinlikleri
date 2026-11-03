/**
 * YYYY-MM-DD biçimindeki tarihi Türkçe gün, ay ve yıl biçimine dönüştürür.
 * Örnek: "2026-11-15" -> "15 Kasım 2026"
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
