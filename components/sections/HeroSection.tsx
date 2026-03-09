'use client'

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { weddingConfig } from '@/lib/config';
import { formatDate } from '@/lib/utils';
import { GununganIcon, MegaMendung, ParangDivider } from '@/components/ui/Ornaments';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Parallax transforms
  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="hero" ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Parallax background ── */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image src="/images/hero-bg.jpg" alt="Hero" fill className="object-cover" priority />
        {/* Layered overlays */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(22,15,5,0.55) 0%, rgba(22,15,5,0.65) 55%, var(--bg-primary) 100%)' }}/>
        {/* Batik texture overlay */}
        <div className="absolute inset-0 batik-bg opacity-30" style={{ mixBlendMode: 'overlay' }} />
      </motion.div>

      {/* ── Mega Mendung (cloud) bottom border ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden">
        <MegaMendung width={typeof window !== 'undefined' ? window.innerWidth + 100 : 1500} opacity={0.25} />
      </div>

      {/* ── Corner Gunungan decorations ── */}
      <motion.div className="absolute bottom-20 left-4 md:left-12"
        initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <GununganIcon size={60} opacity={0.2} color="var(--gold-light)" />
      </motion.div>
      <motion.div className="absolute bottom-20 right-4 md:right-12 scale-x-[-1]"
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <GununganIcon size={60} opacity={0.2} color="var(--gold-light)" />
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        style={{ y: contentY, opacity }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="text-xs tracking-[0.45em] uppercase mb-8"
          style={{ color: 'rgba(232,184,75,0.9)', fontFamily: 'var(--font-body)' }}
        >
          ✦ &nbsp;The Wedding of&nbsp; ✦
        </motion.p>

        {/* Groom name */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="leading-none text-white mb-3"
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 10vw, 6.5rem)' }}
        >
          {weddingConfig.groom.nickname}
        </motion.h1>

        {/* Parang divider */}
        <motion.div className="flex justify-center my-4"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.9 }}
        >
          <ParangDivider width={240} />
        </motion.div>

        {/* Bride name */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.0, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="leading-none text-white mb-10"
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 10vw, 6.5rem)' }}
        >
          {weddingConfig.bride.nickname}
        </motion.h1>

        {/* Date & venue pill */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="inline-flex flex-col items-center gap-2 px-8 py-4"
          style={{ border: '1px solid rgba(232,184,75,0.4)', background: 'rgba(22,15,5,0.4)', backdropFilter: 'blur(8px)' }}
        >
          <p className="text-sm tracking-[0.18em]"
            style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)' }}>
            {formatDate(weddingConfig.event.akad.date)}
          </p>
          <div className="w-24 h-px" style={{ background: 'var(--gold)', opacity: 0.5 }} />
          <p className="text-xs tracking-widest"
            style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-body)' }}>
            {weddingConfig.event.akad.venue}
          </p>
        </motion.div>

        {/* Scroll mouse indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
            style={{ borderColor: 'rgba(232,184,75,0.4)' }}
          >
            <div className="w-1 h-2 rounded-full" style={{ background: 'var(--gold)' }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
