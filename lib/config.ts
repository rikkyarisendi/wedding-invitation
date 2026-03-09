// ============================================================
// 🌸 WEDDING CONFIG — Edit semua info nikahan kamu di sini
// ============================================================

export const weddingConfig = {
  // ---------- COUPLE ----------
  bride: {
    name:       'Dinda Intan Pratiwi',
    nickname:   'Dinda',
    fullName:   'Dinda Intan Pratiwi',
    parents:    'Putri dari Bapak & Ibu',
    photo:      '/images/bride.jpg',
    instagram:  '@dindaip',
  },
  groom: {
    name:       'Rikky Arisendi',
    nickname:   'Rikky',
    fullName:   'Rikky Arisendi',
    parents:    'Putra dari Bapak Sopandi & Ibu Yani Mulyani',
    photo:      '/images/groom.jpg',
    instagram:  '@rikkyarisendi',
  },

  // ---------- EVENT ----------
  event: {
    akad: {
      date:     '2026-12-12',
      time:     '08:00',
      endTime:  '10:00',
      venue:    'Masjid Al-Hikmah',
      address:  'Jl. Raya Bogor No. 45, Jakarta Timur',
      mapsUrl:  'https://maps.google.com/?q=-6.2088,106.8456',
      mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.8456!3d-6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMzEuNyJTIDEwNsKwNTAnNDQuMiJF!5e0!3m2!1sen!2sid!4v1234567890',
    },
    reception: {
      date:     '2026-12-12',
      time:     '11:00',
      endTime:  '15:00',
      venue:    'The Grand Ballroom — Hotel Mulia',
      address:  'Jl. Asia Afrika, Senayan, Jakarta Pusat',
      mapsUrl:  'https://maps.google.com/?q=-6.2297,106.7997',
      mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.7997!3d-6.2297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnNDYuOSJTIDEwNsKwNDcnNTguOSJF!5e0!3m2!1sen!2sid!4v1234567890',
    },
  },

  // ---------- STORY ----------
  story: [
    {
      year:        '2019',
      title:       'Pertama Bertemu',
      description: 'Kami bertemu pertama kali di acara seminar kampus. Sebuah pertemuan yang tidak disengaja namun penuh makna.',
      icon:        '🌱',
    },
    {
      year:        '2020',
      title:       'Mulai Dekat',
      description: 'Pandemi membawa kami lebih dekat. Percakapan malam yang panjang melalui telepon menjadi fondasi hubungan kami.',
      icon:        '💬',
    },
    {
      year:        '2021',
      title:       'Resmi Bersama',
      description: 'Di tepi danau Situ Gintung, Rikky mengungkapkan perasaannya. Dinda mengangguk, dan segalanya berubah.',
      icon:        '💑',
    },
    {
      year:        '2023',
      title:       'Lamaran',
      description: 'Dihadiri keluarga dari kedua belah pihak, kami resmi bertunangan dengan penuh kebahagiaan dan doa.',
      icon:        '💍',
    },
    {
      year:        '2025',
      title:       'Menuju Altar',
      description: 'Dengan restu Allah SWT dan kedua orang tua, kami siap melangkah ke babak baru kehidupan bersama.',
      icon:        '🕌',
    },
  ],

  // ---------- GALLERY ----------
  gallery: [
    { src: '/images/gallery-1.jpg', alt: 'Momen prewedding di taman' },
    { src: '/images/gallery-2.jpg', alt: 'Sunset bersama' },
    { src: '/images/gallery-3.jpg', alt: 'Lamaran' },
    { src: '/images/gallery-4.jpg', alt: 'Perjalanan ke Bali' },
    { src: '/images/gallery-5.jpg', alt: 'Momen spesial' },
    { src: '/images/gallery-6.jpg', alt: 'Prewedding outdoor' },
  ],

  // ---------- MUSIC ----------
  music: {
    title:  'A Thousand Years — Christina Perri',
    src:    '/audio/a-thousand-years.mp3',   // Taruh file mp3 di /public/audio/
    autoplay: true,
  },

  // ---------- DIGITAL ENVELOPE ----------
  digitalEnvelope: {
    enabled: true,
    accounts: [
      {
        bank:       'BCA',
        accountNo:  '1234567890',
        accountName:'Rikky Arisendi',
        logo:       '/images/bca.png',
      },
      {
        bank:       'Mandiri',
        accountNo:  '0987654321',
        accountName:'Dinda Intan Pratiwi',
        logo:       '/images/mandiri.png',
      },
    ],
    saweria: 'https://saweria.co/rikkydinda',   // Opsional
    gopay:   '08123456789',
  },

  // ---------- HASHTAG & SOCIAL ----------
  hashtag:   '#RikkyDinda2026',
  loveStory: 'Rikky & Dinda',

  // ---------- ADMIN ----------
  adminPassword: 'admin123',   // Ganti di production!
};
