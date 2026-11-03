# Kampüs Etkinlikleri Yönetim Sistemi

Bu proje, üniversite kampüsündeki seminer, atölye, söyleşi ve yarışma gibi etkinliklerin takip edilmesi, filtrelenmesi, yeni etkinlik eklenmesi ve mevcut etkinliklerin güncellenmesi amacıyla geliştirilmiş modern bir web uygulamasıdır.

## 👨‍🎓 Öğrenci Bilgileri
- **Ad Soyad:** Eren Cem Çelik
- **Öğrenci Numarası:** `2321032014`

---

## 🔐 Giriş Sayfası (İsteğe Bağlı)

Uygulama doğrudan **Ana Sayfa** ile açılır; giriş zorunlu değildir. Giriş ekranına üst başlıktaki **Giriş Yap** butonundan ulaşılır. Giriş ekranında şu akışlar bulunur:

- **Giriş:** E-posta ve şifre doğrulaması (geçerli e-posta formatı, en az 6 karakter şifre), şifreyi göster/gizle.
- **Kayıt Ol:** Ad soyad, e-posta, şifre ve şifre tekrarı doğrulaması; kurallar onay kutusu.
- **Şifremi Unuttum:** E-posta doğrulaması ve demo sıfırlama bildirimi.
- **Giriş yapmadan devam et:** Giriş ekranını atlayıp doğrudan etkinliklere dönüş.
- **Çıkış Yap:** Giriş yaptıktan sonra üst başlıktaki buton ile oturum kapatılır.

> Demo giriş: herhangi bir geçerli e-posta adresi ve en az 6 karakterli bir şifre yeterlidir. Gerçek bir kimlik doğrulama servisi kullanılmaz.

---

## 🎨 Statik Renk ve Tipografi Yapılandırması

Renk ve tipografi değerleri `src/App.css` dosyasındaki `:root` bloğunda **statik (sabit)** olarak tanımlanmıştır. Tüm bileşenler bu değişkenleri kullanır; sayfa içinde sabit renk değeri kalmamıştır.

```css
:root {
  --no: 2321032014;
  --ton: 54;  /* mod(2321032014, 360) = 54 */
  --renk-ana: hsl(var(--ton) 65% 38%);
  --renk-zemin: hsl(var(--ton) 30% 97%);
  --font: Georgia, serif;
  --bosluk-s: 0.5rem;
  --bosluk-m: 1rem;
  --kose: 8px;
  --renk-hata: #dc2626;
}
```

- **Ton:** `54` → sarı ağırlıklı kurumsal palet (`2321032014 mod 360 = 54`)
- **Yazı Tipi:** `Georgia, serif` (numara son hanesi `4`)
- **Köşe Yuvarlaklığı:** `8px`
- **Hata Rengi:** `#dc2626`

---

## 📁 Proje Klasör Yapısı

```text
kampus-etkinlikleri-v2/
├── public/
│   └── afis.svg
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthLayout.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── events/
│   │   │   ├── EventCard.tsx
│   │   │   ├── EventList.tsx
│   │   │   ├── EventFilter.tsx
│   │   │   └── EventDetail.tsx
│   │   └── forms/
│   │       └── EventForm.tsx
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── ForgotPasswordPage.tsx
│   ├── data/
│   │   └── events.ts
│   ├── types/
│   │   ├── campus-event.ts
│   │   ├── page.ts
│   │   └── user.ts
│   ├── utils/
│   │   ├── filter-events.ts
│   │   └── format-date.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
└── README.md
```

---

## ✨ Özellikler

- **Giriş / Kayıt / Şifre sıfırlama:** Form doğrulamaları ve demo başarı mesajları
- **Ana sayfa:** Yaklaşan 2 etkinlik ve hızlı erişim
- **Etkinlikler:** Arama, kategori filtresi ve sıralama
- **Detay sayfası:** Etkinlik bilgileri, düzenleme ve silme (onaylı)
- **Yönetim:** Etkinlik ekleme ve güncelleme, kontenjan doğrulaması
- **Responsive tasarım:** Mobilde tek kolon giriş ekranı ve etkinlik kartları

---

## 🚀 Yerel Olarak Çalıştırma (Local Development)

Proje dizininde terminali açıp aşağıdaki komutları çalıştırabilirsiniz:

1. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

2. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```
   Tarayıcınızda açılan adrese (genellikle `http://localhost:5173`) giderek projeyi test edebilirsiniz.

3. **Üretim Derlemesi (Build Testi):**
   ```bash
   npm run build
   ```

---

## 🔒 Proje Kuralları ve Uyumluluk Notları
- Harici kütüphane (React Router, Redux, jQuery, localStorage vb.) kullanılmamış; tüm sayfa geçişleri, giriş akışı ve filtrelemeler saf **React State** ile yönetilmiştir.
- `map` fonksiyonlarında `key` değeri olarak kesinlikle `event.id` kullanılmıştır, `index` kullanılmamıştır.
- Diziler sıralanırken ve güncellenirken doğrudan mutasyon yapılmamış, immutability (`[...events]`) korunmuştur.
- Tema renkleri tek bir `:root` bloğundan (`--ton: 54`) beslenir; bileşenlerde sabit renk kullanılmaz.
