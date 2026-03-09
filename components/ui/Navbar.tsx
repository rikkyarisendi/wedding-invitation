'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '@/lib/config';

const links = [
  { href: '#story',   label: 'Kisah Cinta' },
  { href: '#event',   label: 'Acara' },
  { href: '#gallery', label: 'Galeri' },
  { href: '#rsvp',    label: 'RSVP' },
  { href: '#wishes',  label: 'Ucapan' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="fixed top-0 inset-x-0 z-40 transition-all duration-500"
      style={{
        background:   scrolled ? 'var(--card-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.button onClick={() => scrollTo('#hero')}
          className="text-xl leading-none gold-shimmer"
          style={{ fontFamily: 'var(--font-serif)' }}
          whileHover={{ scale: 1.05 }}
        >
          {weddingConfig.groom.nickname} & {weddingConfig.bride.nickname}
        </motion.button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <motion.button key={l.href} onClick={() => scrollTo(l.href)}
              className="text-xs tracking-[0.15em] uppercase relative group"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
              whileHover={{ color: 'var(--gold)' } as any}
            >
              {l.label}
              <motion.span className="absolute -bottom-0.5 left-0 h-px bg-gold w-0 group-hover:w-full"
                style={{ background: 'var(--gold)' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Hamburger */}
        <button className="md:hidden p-2 flex flex-col gap-1.5" onClick={() => setOpen(!open)}>
          {[0,1,2].map((i) => (
            <motion.span key={i} className="block w-5 h-px"
              style={{ background: 'var(--gold)' }}
              animate={open
                ? i === 1 ? { opacity: 0 } : i === 0 ? { rotate: 45, y: 6 } : { rotate: -45, y: -6 }
                : { rotate: 0, y: 0, opacity: 1 }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'var(--card-bg)', backdropFilter: 'blur(20px)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <button key={l.href} onClick={() => scrollTo(l.href)}
                  className="text-left text-xs tracking-[0.15em] uppercase py-2 border-b"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
