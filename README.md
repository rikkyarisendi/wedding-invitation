# 🌸 Wedding Invitation — Next.js Template

Template undangan pernikahan digital lengkap dengan semua fitur modern.

## ✨ Fitur

| Fitur | Status | Tech Stack |
|-------|--------|------------|
| Hero Section | ✅ | Framer Motion |
| Opening Gate | ✅ | Framer Motion + animation |
| Couple Story | ✅ | Timeline component |
| Event Details | ✅ | Countdown timer + Google Maps embed |
| RSVP Form | ✅ | Next.js API Routes |
| Guest List | ✅ | Admin dashboard |
| QR Code Check-in | ✅ | react-qr-code + validation API |
| Photo Gallery | ✅ | Lightbox + Next.js Image optimization |
| Wishes/Comments | ✅ | Polling API (upgrade ke Supabase realtime) |
| Music Player | ✅ | HTML Audio + autoplay |
| Dark/Light Mode | ✅ | next-themes |
| Multi-language | ✅ | next-intl (ID/EN) |
| Digital Envelope | ✅ | Copy to clipboard + Saweria link |
| Petal Animation | ✅ | CSS animation |

---

## 🚀 Setup

### 1. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Konfigurasi wedding details

Edit `lib/config.ts` — semua data pernikahan ada di sini:
- Nama pengantin & orang tua
- Tanggal & lokasi acara
- Kisah cinta
- Rekening bank
- Kontak sosial media

### 3. Tambahkan asset

Taruh file-file berikut di folder `/public`:

\`\`\`
public/
  images/
    hero-bg.jpg      ← Foto background hero (rekomendasi 1920x1080)
    bride.jpg        ← Foto mempelai wanita (square, min 400x400)
    groom.jpg        ← Foto mempelai pria (square, min 400x400)
    gallery-1.jpg    ← Foto galeri 1-6
    gallery-2.jpg
    ...
    gallery-6.jpg
    og-image.jpg     ← Open Graph image (1200x630)
  audio/
    a-thousand-years.mp3   ← File musik (atau ubah di config.ts)
\`\`\`

### 4. Environment variables

\`\`\`bash
cp .env.example .env.local
# Edit .env.local dengan nilai yang sesuai
\`\`\`

### 5. Jalankan development server

\`\`\`bash
npm run dev
\`\`\`

Buka http://localhost:3000 — akan redirect ke http://localhost:3000/id

---

## 🗄️ Database Setup (Opsional tapi direkomendasikan)

Template ini menggunakan in-memory store secara default (data hilang saat restart).
Untuk production, hubungkan ke database:

### PostgreSQL + Prisma

\`\`\`bash
# Install Prisma
npm install prisma @prisma/client

# Setup database URL di .env.local
DATABASE_URL="postgresql://..."

# Generate & migrate
npx prisma migrate dev --name init
npx prisma generate
\`\`\`

Kemudian update `app/api/rsvp/route.ts` dan `app/api/wishes/route.ts` dengan Prisma queries.

### Supabase (untuk real-time wishes)

\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

Update `.env.local` dengan Supabase credentials, lalu update `app/api/wishes/route.ts`.

---

## 📱 Halaman & Routes

| Route | Deskripsi |
|-------|-----------|
| `/` | Redirect ke `/id` |
| `/id` | Undangan (Bahasa Indonesia) |
| `/en` | Undangan (English) |
| `/admin` | Dashboard admin |
| `/checkin?token=XXX` | QR Code check-in |

---

## 🎨 Kustomisasi Tema

Edit `styles/globals.css` untuk mengubah warna:

\`\`\`css
:root {
  --bg-primary:   #faf6f1;   /* Background utama */
  --bg-secondary: #f0e8df;   /* Background sekunder */
  --text-primary: #2c2c2c;   /* Teks utama */
  --gold:         #d4a817;   /* Warna aksen emas */
}
\`\`\`

---

## 🌐 Deploy ke Vercel

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

Tambahkan environment variables di Vercel dashboard.

---

## 📋 Checklist Sebelum Go Live

- [ ] Edit semua data di `lib/config.ts`
- [ ] Tambahkan foto-foto ke `/public/images/`
- [ ] Tambahkan file musik ke `/public/audio/`
- [ ] Setup database (PostgreSQL/MongoDB/Supabase)
- [ ] Test RSVP form
- [ ] Test QR check-in
- [ ] Test di mobile
- [ ] Setup domain kustom
- [ ] Enable analytics (optional)

---

Made with ♥ for your special day 🌸
