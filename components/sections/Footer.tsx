'use client'

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { weddingConfig } from '@/lib/config';
import { GununganIcon, KawungRow, TruntumFlower, MegaMendung } from '@/components/ui/Ornaments';

export default function Footer() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <footer className="relative overflow-hidden py-20 px-6 text-center"
      style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>

      {/* Batik background */}
      <div className="absolute inset-0 batik-bg opacity-50" />
      <div className="absolute inset-0 kawung-bg opacity-30" />

      {/* Mega Mendung top border */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ transform: 'rotate(180deg)' }}>
        <MegaMendung width={2000} opacity={0.2} />
      </div>

      {/* Corner gunungan */}
      <div className="absolute bottom-0 left-0 opacity-10">
        <GununganIcon size={100} />
      </div>
      <div className="absolute bottom-0 right-0 opacity-10 scale-x-[-1]">
        <GununganIcon size={100} />
      </div>

      <motion.div ref={ref} className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Rotating truntum */}
        <motion.div className="flex justify-center mb-6"
          animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
          <TruntumFlower size={48} />
        </motion.div>

        <p className="text-xs tracking-[0.4em] uppercase mb-5"
          style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
          ✦ &nbsp;Dengan Cinta&nbsp; ✦
        </p>

        {/* Names */}
        <h2 className="gold-shimmer mb-4"
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: 1.2 }}>
          {weddingConfig.groom.nickname}
          <span className="mx-3 text-3xl" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>&</span>
          {weddingConfig.bride.nickname}
        </h2>

        <div className="flex justify-center mb-6"><KawungRow count={9} width={200} /></div>

        <p className="text-sm mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
          Bagikan momen spesial dengan hashtag
        </p>
        <motion.p className="text-2xl md:text-3xl mb-10"
          style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
          whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}
        >
          {weddingConfig.hashtag}
        </motion.p>

        {/* Bottom ornament trio */}
        <div className="flex justify-center items-center gap-6">
          <GununganIcon size={26} opacity={0.45} />
          <div className="h-px w-16" style={{ background: 'var(--border-strong)' }} />
          <TruntumFlower size={24} />
          <div className="h-px w-16" style={{ background: 'var(--border-strong)' }} />
          <GununganIcon size={26} opacity={0.45} />
        </div>

        <p className="mt-8 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', letterSpacing: '0.1em' }}>
          Dibuat dengan ♥ untuk momen yang tak terlupakan
        </p>
      </motion.div>
    </footer>
  );
}
