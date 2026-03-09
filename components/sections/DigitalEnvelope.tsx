'use client';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { weddingConfig } from '@/lib/config';
import { GununganIcon, KawungRow, TruntumFlower, ParangDivider } from '@/components/ui/Ornaments';

export default function DigitalEnvelope() {
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });
  const [copiedId, setCopied] = useState<string | null>(null);

  if (!weddingConfig.digitalEnvelope.enabled) return null;

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}>

      <div className="absolute inset-0 kawung-bg opacity-40" />

      <div className="max-w-2xl mx-auto relative">
        {/* Header */}
        <motion.div ref={titleRef} className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <motion.div className="flex justify-center mb-4"
            animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <span className="text-4xl">💌</span>
          </motion.div>
          <p className="text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
            Hadiah Digital
          </p>
          <h2 className="text-5xl md:text-6xl gold-shimmer" style={{ fontFamily: 'var(--font-serif)' }}>
            Amplop Digital
          </h2>
          <div className="flex justify-center mt-3"><ParangDivider width={220} /></div>
          <p className="mt-6 text-sm leading-relaxed"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', maxWidth: '420px', margin: '1.5rem auto 0' }}>
            Kehadiran dan doa restu Anda adalah hadiah terbaik bagi kami.
            Namun jika ingin memberikan tanda kasih, kami menyediakan opsi di bawah ini.
          </p>
        </motion.div>

        {/* Bank cards */}
        <div className="space-y-4">
          {weddingConfig.digitalEnvelope.accounts.map((acc, i) => (
            <motion.div key={i}
              className="batik-card p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
              animate={titleInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.3 } }}
            >
              <div className="absolute inset-0 batik-bg opacity-20" />
              <div className="absolute top-2 right-2 opacity-10"><TruntumFlower size={24} /></div>

              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Bank badge */}
                  <motion.div
                    className="w-14 h-14 rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0"
                    style={{ background: 'var(--gold)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}
                    whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.4 } }}
                  >
                    {acc.bank.slice(0, 3)}
                  </motion.div>
                  <div>
                    <p className="text-xs tracking-widest uppercase mb-0.5"
                      style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>{acc.bank}</p>
                    <p className="text-xl"
                      style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {acc.accountNo}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                      a.n. {acc.accountName}
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={() => copy(acc.accountNo, `${i}`)}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase transition-all duration-200 flex-shrink-0"
                  style={{
                    border: '1px solid var(--border)',
                    color: copiedId === `${i}` ? 'var(--gold)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-body)',
                    background: copiedId === `${i}` ? 'rgba(200,146,42,0.1)' : 'transparent',
                  }}
                >
                  {copiedId === `${i}` ? <><Check className="w-3 h-3" /> Tersalin</> : <><Copy className="w-3 h-3" /> Salin</>}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Saweria */}
        {weddingConfig.digitalEnvelope.saweria && (
          <motion.div className="mt-6 text-center"
            initial={{ opacity: 0 }} animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}>
            <motion.a href={weddingConfig.digitalEnvelope.saweria} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(200,146,42,0.3)' }}
              className="inline-flex items-center gap-2 px-8 py-3 text-xs tracking-[0.2em] uppercase"
              style={{ border: '1px solid var(--border)', color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
              🎁 &nbsp;Kirim via Saweria
            </motion.a>
          </motion.div>
        )}

        {/* Bottom ornament */}
        <motion.div className="flex justify-center mt-10 gap-4 items-center"
          initial={{ opacity: 0 }} animate={titleInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
          <GununganIcon size={28} opacity={0.4} />
          <KawungRow count={5} width={120} />
          <GununganIcon size={28} opacity={0.4} />
        </motion.div>
      </div>
    </section>
  );
}
