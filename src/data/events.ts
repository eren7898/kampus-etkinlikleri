import { CampusEvent } from '../types/campus-event';

export const initialEvents: CampusEvent[] = [
  {
    id: 1,
    title: "Yapay Zeka ve Büyük Dil Modelleri Semineri",
    description: "Modern yapay zeka teknolojileri, derin öğrenme temelleri ve üretken yapay zeka modellerinin kampüs ve endüstrideki uygulamalarının inceleneceği kapsamlı seminer.",
    date: "2026-11-15",
    time: "14:00",
    location: "Mühendislik Fakültesi Konferans Salonu A",
    category: "Seminer",
    organizer: "Yapay Zeka ve Veri Bilimi Topluluğu",
    capacity: 150,
    image: "/afis.svg"
  },
  {
    id: 2,
    title: "React ve Modern Web Geliştirme Atölyesi",
    description: "TypeScript, modern React kancaları (hooks) ve performans optimizasyon tekniklerini uygulamalı olarak öğreneceğiniz interaktif kodlama atölyesi. Katılımcıların kendi dizüstü bilgisayarlarını getirmesi rica olunur.",
    date: "2026-11-18",
    time: "10:30",
    location: "Bilgisayar Laboratuvarı 204",
    category: "Atölye",
    organizer: "Yazılım Geliştirme Kulübü",
    capacity: 40,
    image: "/afis.svg"
  },
  {
    id: 3,
    title: "Girişimcilik ve Start-up Ekosistemi Söyleşisi",
    description: "Başarılı teknoloji girişimcileri ve melek yatırımcılar ile kampüs girişimciliği, fonlama süreçleri ve fikir doğrulama üzerine ilham verici bir sohbet.",
    date: "2026-11-20",
    time: "15:30",
    location: "Merkezi Amfi 1",
    category: "Söyleşi",
    organizer: "İnovasyon ve Girişimcilik Topluluğu",
    capacity: 200,
    image: "/afis.svg"
  },
  {
    id: 4,
    title: "Kampüs İnovasyon Hackathonu 2026",
    description: "24 saat sürecek maratonda kampüs yaşamını kolaylaştıracak yazılım ve donanım projeleri yarışıyor. Büyük ödüller ve staj imkanları katılımcıları bekliyor.",
    date: "2026-11-28",
    time: "09:00",
    location: "Teknokent Etkinlik Alanı",
    category: "Yarışma",
    organizer: "Mühendislik Öğrenci Konseyi",
    capacity: 100,
    image: "/afis.svg"
  },
  {
    id: 5,
    title: "Siber Güvenlik Temelleri ve Kariyer Yolları",
    description: "Ağ güvenliği, etik hackerlık, pentest yöntemleri ve siber güvenlik sektöründe kariyer basamakları üzerine uzman konuklarla gerçekleştirilecek seminer.",
    date: "2026-12-02",
    time: "13:00",
    location: "Fen Fakültesi Mavi Salon",
    category: "Seminer",
    organizer: "Siber Güvenlik Kulübü",
    capacity: 120,
    image: "/afis.svg"
  },
  {
    id: 6,
    title: "UI/UX Tasarım ve Kullanıcı Deneyimi Sprinti",
    description: "Kullanıcı araştırması, wireframe hazırlama ve Figma üzerinde hızlı prototipleme adımlarının ele alındığı yoğun ve pratik odaklı tasarım atölyesi.",
    date: "2026-12-05",
    time: "11:00",
    location: "Tasarım Stüdyosu 102",
    category: "Atölye",
    organizer: "Tasarım ve Görsel Sanatlar Topluluğu",
    capacity: 35,
    image: "/afis.svg"
  },
  {
    id: 7,
    title: "Algoritma ve Problem Çözme Maratonu",
    description: "Zorlu algoritma problemleri, veri yapıları optimizasyonları ve zaman karmaşıklığı testleriyle öğrencilerin kıyasıya mücadele edeceği kodlama yarışması.",
    date: "2026-12-12",
    time: "14:00",
    location: "Bilişim Merkezi Salon C",
    category: "Yarışma",
    organizer: "Yazılım Kulübü & ACM Öğrenci Kolu",
    capacity: 60,
    image: "/afis.svg"
  }
];
