'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '@/lib/config';
import { GununganIcon, KawungRow } from '@/components/ui/Ornaments';

// ─────────────────────────────────────────────
// Flow:
//  'idle'    → background redup, konten fade-in masuk
//  'closing' → konten fade-out keluar (300ms)
//  'opening' → pintu slide kiri-kanan (1.4s)
//  'gone'    → seluruh gate unmount, main content muncul
// ─────────────────────────────────────────────

export default function OpeningGate() {
  const [phase, setPhase] = useState<'idle' | 'closing' | 'opening' | 'gone'>('idle');

  const handleClick = () => {
    // Step 1 — fade out konten teks
    setPhase('closing');

    // Step 2 — setelah teks selesai fade out, brighten background lalu buka pintu
    setTimeout(() => setPhase('opening'), 500);

    // Step 3 — setelah pintu selesai slide, tampilkan main content
    setTimeout(() => {
      setPhase('gone');
      const main = document.getElementById('main-content');
      if (main) { main.style.opacity = '1'; main.style.pointerEvents = 'auto'; }
    }, 500 + 1600);
  };

  const isContentVisible = phase === 'idle';
  const doorsOpen        = phase === 'opening' || phase === 'gone';

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          {/* ── LEFT DOOR ─────────────────────────────────── */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
            style={{ background: 'var(--bg-secondary)', transformOrigin: 'left center' }}
            animate={doorsOpen
              ? { x: '-102%', transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.05 } }
              : {}
            }
          >
            {/* Batik texture */}
            <div className="absolute inset-0 batik-bg opacity-70" />
            <div className="absolute inset-0 parang-bg" />

            {/* ── FASE IDLE: overlay gelap untuk bikin background lebih redup ── */}
            <motion.div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.52)' }}
              animate={phase === 'opening' ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Gunungan dekoratif di pojok pintu — GANTI ukuran/posisi sesuai selera */}
            <div className="absolute bottom-10 right-10 opacity-15 pointer-events-none">
              {/* SVG: GununganIcon — lihat Ornaments.tsx baris ~10 */}
              <GununganIcon size={90} opacity={1} />
            </div>
          </motion.div>

          {/* ── RIGHT DOOR ────────────────────────────────── */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
            style={{ background: 'var(--bg-secondary)', transformOrigin: 'right center' }}
            animate={doorsOpen
              ? { x: '102%', transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.05 } }
              : {}
            }
          >
            <div className="absolute inset-0 batik-bg opacity-70 scale-x-[-1]" />
            <div className="absolute inset-0 parang-bg scale-x-[-1]" />

            <motion.div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.52)' }}
              animate={phase === 'opening' ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.4 }}
            />

            <div className="absolute bottom-10 left-10 opacity-15 scale-x-[-1] pointer-events-none">
              {/* SVG: GununganIcon (mirror) — lihat Ornaments.tsx baris ~10 */}
              <GununganIcon size={90} opacity={1} />
            </div>
          </motion.div>

          {/* ── CENTER CONTENT ────────────────────────────── */}
          {/* AnimatePresence untuk fade-out teks saat closing */}
          <AnimatePresence>
            {isContentVisible && (
              <motion.div
                key="gate-content"
                className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.35, ease: 'easeIn' } }}
              >
                <div className="text-center px-6 max-w-xs pointer-events-auto">

                  {/* SVG: GununganIcon atas — GANTI size di prop size={} */}
                  <motion.div className="flex justify-center mb-3"
                    initial={{ opacity: 0, scale: 0.6, y: -16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7, type: 'spring', stiffness: 130 }}
                  >
                    <GununganIcon size={50} />
                  </motion.div>

                  {/* Label eyebrow */}
                  <motion.p
                    className="text-xs uppercase mb-4 tracking-[0.35em]"
                    style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.7 }}
                  >
                    Undangan Pernikahan
                  </motion.p>

                  {/* SVG: KawungRow atas — GANTI count & width */}
                  <motion.div className="flex justify-center mb-5"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.65, duration: 0.7 }}
                  >
                    <KawungRow count={7} width={180} />
                  </motion.div>

                  {/* Nama Pengantin Pria */}
                  <motion.h1
                    className="text-5xl md:text-6xl gold-shimmer leading-tight"
                    style={{ fontFamily: 'var(--font-serif)' }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {weddingConfig.groom.nickname}
                  </motion.h1>

                  {/* Separator & */}
                  <motion.div className="my-3 flex items-center justify-center gap-3"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 1.05, duration: 0.6 }}
                  >
                    <div className="h-px flex-1 max-w-[50px]" style={{ background: 'var(--gold)' }} />
                    <span className="text-xl italic" style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)' }}>
                      &amp;
                    </span>
                    <div className="h-px flex-1 max-w-[50px]" style={{ background: 'var(--gold)' }} />
                  </motion.div>

                  {/* Nama Pengantin Wanita */}
                  <motion.h1
                    className="text-5xl md:text-6xl gold-shimmer leading-tight"
                    style={{ fontFamily: 'var(--font-serif)' }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {weddingConfig.bride.nickname}
                  </motion.h1>

                  {/* SVG: KawungRow bawah — GANTI count & width */}
                  <motion.div className="flex justify-center mt-4 mb-6"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.7 }}
                  >
                    <KawungRow count={7} width={180} />
                  </motion.div>

                  {/* Tombol CTA */}
                  <motion.button
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.7 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(200,146,42,0.5)' }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleClick}
                    className="relative px-10 py-3 text-xs tracking-[0.3em] uppercase overflow-hidden"
                    style={{ border: '1px solid var(--gold)', color: 'var(--gold)', fontFamily: 'var(--font-body)' }}
                  >
                    Buka Undangan
                  </motion.button>

                  {/* Keterangan tamu */}
                  <motion.p
                    className="mt-4 text-xs"
                    style={{ color: 'rgba(245,223,160,0.65)', fontFamily: 'var(--font-body)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                  >
                    Kepada Yth. Bapak / Ibu / Saudara/i
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
