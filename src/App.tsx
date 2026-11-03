import { useState, useMemo } from 'react';
import './App.css';
import { CampusEvent } from './types/campus-event';
import { PageName } from './types/page';
import { User } from './types/user';
import { initialEvents } from './data/events';
import { searchEvents, filterByCategory, findEventById } from './utils/filter-events';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import AuthLayout from './components/auth/AuthLayout';
import EventList from './components/events/EventList';
import EventFilter from './components/events/EventFilter';
import EventDetail from './components/events/EventDetail';
import EventForm from './components/forms/EventForm';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

const buildDisplayName = (email: string): string => {
  const raw = email.split('@')[0].replace(/[._-]+/g, ' ').trim();
  if (!raw) return 'Öğrenci';
  return raw
    .split(' ')
    .map((part) => part.charAt(0).toLocaleUpperCase('tr-TR') + part.slice(1))
    .join(' ');
};

export function App() {
  // Kimlik doğrulama durumu
  const [user, setUser] = useState<User | null>(null);
  const [authEmail, setAuthEmail] = useState<string>('');
  const [authNotice, setAuthNotice] = useState<string | undefined>(undefined);

  // State yönetimi
  const [page, setPage] = useState<PageName>('home');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [sortOption, setSortOption] = useState<string>('date-asc');
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);
  const [notification, setNotification] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'danger', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleNavigate = (targetPage: PageName, id?: number) => {
    if (id !== undefined) {
      setSelectedId(id);
    }
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Giriş / kayıt / şifre sıfırlama akışları
  const handleLogin = (email: string, _password: string) => {
    const name = buildDisplayName(email);
    setUser({ name, email });
    setAuthEmail('');
    setAuthNotice(undefined);
    setPage('home');
    setNotification({ type: 'success', message: `Hoş geldiniz, ${name}.` });
  };

  const handleRegister = (name: string, email: string) => {
    setAuthEmail(email);
    setAuthNotice(
      `Sayın ${name}, kayıt talebiniz alındı (demo). Şimdi ${email} adresiyle giriş yapabilirsiniz.`,
    );
    setPage('login');
  };

  const handleLogout = () => {
    setUser(null);
    setNotification(null);
    setAuthNotice(undefined);
    setAuthEmail('');
    setSelectedId(null);
    setPage('home');
  };

  const handleAddEvent = (eventData: Omit<CampusEvent, 'id'> | CampusEvent) => {
    const nextId = events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1;
    const newEvent: CampusEvent = { ...eventData, id: nextId };
    setEvents((prev) => [...prev, newEvent]);
    showNotification('success', `"${newEvent.title}" başarıyla eklendi.`);
    handleNavigate('events');
  };

  const handleUpdateEvent = (eventData: Omit<CampusEvent, 'id'> | CampusEvent) => {
    if (!('id' in eventData)) return;
    setEvents((prev) => prev.map((e) => (e.id === eventData.id ? (eventData as CampusEvent) : e)));
    showNotification('success', `"${eventData.title}" güncellendi.`);
    handleNavigate('detail', eventData.id);
  };

  const handleDeleteEvent = (id: number) => {
    const deleted = findEventById(events, id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
    showNotification('danger', `"${deleted?.title || 'Etkinlik'}" silindi.`);
    if (page === 'detail' || page === 'update') {
      handleNavigate('events');
    }
  };

  // Filtrelenmiş ve değişmez (immutable) kopyayla sıralanmış etkinlikler
  const displayedEvents = useMemo(() => {
    const searched = searchEvents(events, searchText);
    const filtered = filterByCategory(searched, selectedCategory);

    return [...filtered].sort((a, b) => {
      if (sortOption === 'date-asc') return a.date.localeCompare(b.date);
      if (sortOption === 'date-desc') return b.date.localeCompare(a.date);
      if (sortOption === 'title-asc') return a.title.localeCompare(b.title, 'tr-TR');
      if (sortOption === 'capacity-desc') return b.capacity - a.capacity;
      return 0;
    });
  }, [events, searchText, selectedCategory, sortOption]);

  // Ana sayfada yaklaşan etkinlikler
  const upcomingEvents = useMemo(() => {
    return [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  }, [events]);

  const currentEvent = selectedId !== null ? findEventById(events, selectedId) : undefined;

  // Sayfaya göre başlık ve alt yazı belirleme (Slide 6 & 13)
  const headerContent = useMemo(() => {
    switch (page) {
      case 'home':
        return {
          title: 'Kampüs Etkinlikleri',
          text: 'Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.',
        };
      case 'events':
        return {
          title: 'Tüm Etkinlikler',
          text: 'Ekim ayında kampüste düzenlenen etkinlikler.',
        };
      case 'detail':
        return {
          title: currentEvent ? currentEvent.title : 'Etkinlik Detayı',
          text: undefined,
        };
      case 'add':
        return {
          title: 'Etkinlik Ekle',
          text: 'Yeni bir kampüs etkinliği ekleyin.',
        };
      case 'update':
        return {
          title: 'Etkinliği Güncelle',
          text: 'Etkinlik bilgilerini güncelleyin.',
        };
      default:
        return { title: 'Kampüs Etkinlikleri', text: undefined };
    }
  }, [page, currentEvent]);

  // Giriş ekranı isteğe bağlıdır: uygulama doğrudan ana sayfa ile açılır.
  const isAuthPage = page === 'login' || page === 'register' || page === 'forgot';

  if (!user && isAuthPage) {
    return (
      <AuthLayout>
        {page === 'register' && (
          <RegisterPage onRegister={handleRegister} onNavigate={handleNavigate} />
        )}
        {page === 'forgot' && <ForgotPasswordPage onNavigate={handleNavigate} />}
        {page !== 'register' && page !== 'forgot' && (
          <LoginPage
            onLogin={handleLogin}
            onNavigate={handleNavigate}
            initialEmail={authEmail}
            notice={authNotice}
          />
        )}
      </AuthLayout>
    );
  }

  return (
    <div className="app-wrapper">
      {/* 1. Çerçeve: Header */}
      <Header
        title={headerContent.title}
        text={headerContent.text}
        user={user}
        onLogin={() => handleNavigate('login')}
        onLogout={user ? handleLogout : undefined}
      />

      {/* 2. Çerçeve: Navigation */}
      <Navigation
        current={page}
        onNavigate={handleNavigate}
        eventCount={events.length}
      />

      <main className="main-content">
        {notification && (
          <div className={`alert alert-${notification.type}`} role="alert">
            <span>{notification.message}</span>
            <button
              type="button"
              className="reset-btn"
              onClick={() => setNotification(null)}
              style={{ fontWeight: 'bold' }}
            >
              ✕
            </button>
          </div>
        )}

        {/* 1. ANA SAYFA KOŞULLU RENDER */}
        {page === 'home' && (
          <section className="home-view" aria-label="Ana Sayfa">
            <div className="section-header">
              <h2>Yaklaşan 2 Etkinlik</h2>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleNavigate('events')}
              >
                Tüm etkinlikleri gör
              </button>
            </div>

            <EventList
              events={upcomingEvents}
              onShowDetail={(id) => handleNavigate('detail', id)}
              onEdit={(id) => handleNavigate('update', id)}
              onDelete={handleDeleteEvent}
            />
          </section>
        )}

        {/* 2. ETKİNLİKLER KOŞULLU RENDER */}
        {page === 'events' && (
          <section className="events-view" aria-label="Etkinlikler">
            <EventFilter
              searchText={searchText}
              onSearchChange={setSearchText}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortOption={sortOption}
              onSortChange={setSortOption}
              onReset={() => {
                setSearchText('');
                setSelectedCategory('Tümü');
                setSortOption('date-asc');
              }}
              totalCount={events.length}
              filteredCount={displayedEvents.length}
            />

            <EventList
              events={displayedEvents}
              onShowDetail={(id) => handleNavigate('detail', id)}
              onEdit={(id) => handleNavigate('update', id)}
              onDelete={handleDeleteEvent}
              emptyText="Aradığınız kriterlere uygun etkinlik bulunamadı."
            />
          </section>
        )}

        {/* 3. DETAY KOŞULLU RENDER */}
        {page === 'detail' && currentEvent && (
          <EventDetail
            event={currentEvent}
            onBack={() => handleNavigate('events')}
            onEdit={(id) => handleNavigate('update', id)}
            onDelete={handleDeleteEvent}
          />
        )}

        {/* 4. EKLE KOŞULLU RENDER */}
        {page === 'add' && (
          <EventForm
            mode="add"
            onSubmit={handleAddEvent}
            onCancel={() => handleNavigate('events')}
          />
        )}

        {/* 5. GÜNCELLE KOŞULLU RENDER */}
        {page === 'update' && currentEvent && (
          <EventForm
            mode="update"
            initialEvent={currentEvent}
            onSubmit={handleUpdateEvent}
            onCancel={() => handleNavigate('detail', currentEvent.id)}
          />
        )}
      </main>

      {/* 3. Çerçeve: Footer */}
      <Footer />
    </div>
  );
}

export default App;
