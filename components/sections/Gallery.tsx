'use client'

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { X } from 'lucide-react';
import { weddingConfig } from '@/lib/config';
import { GununganIcon, KawungRow, ParangDivider } from '@/components/ui/Ornaments';

export default function Gallery() {
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const slides = weddingConfig.gallery.map((g) => ({ src: g.src, alt: g.alt }));

  // Masonry pattern: index 0 and 3 are tall (2 rows), rest are square
  const sizes = [
    'row-span-2', '', '', 'row-span-2', '', '',
  ];

  return (
    <section id="gallery" className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}>

      {/* Kawung BG */}
      <div className="absolute inset-0 kawung-bg opacity-50" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div ref={titleRef} className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div className="flex justify-center mb-4">
            <GununganIcon size={38} />
          </div>
          <p className="text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
            Momen Berharga Kami
          </p>
          <h2 className="text-5xl md:text-6xl gold-shimmer"
            style={{ fontFamily: 'var(--font-serif)' }}>
            Galeri Foto
          </h2>
          <div className="flex justify-center mt-3">
            <ParangDivider width={240} />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {weddingConfig.gallery.map((photo, index) => {
            const ref    = useRef(null);
            const inView = useInView(ref, { once: true, margin: '-40px' });

            return (
              <motion.div
                key={index} ref={ref}
                className={`relative cursor-pointer overflow-hidden group ${sizes[index] ?? ''}`}
                style={{ borderRadius: '0.75rem' }}
                initial={{ opacity: 0, scale: 0.88, filter: 'blur(6px)' }}
                animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setLightboxIndex(index)}
              >
                <Image src={photo.src} alt={photo.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-108" />
                {/* Batik overlay on hover */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-end pb-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ background: 'linear-gradient(to top, rgba(22,15,5,0.75) 0%, rgba(22,15,5,0.2) 60%, transparent 100%)' }}
                >
                  <div className="flex justify-center mb-2">
                    <KawungRow count={3} width={60} />
                  </div>
                  <p className="text-xs tracking-widest text-white uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                    Lihat Foto
                  </p>
                </motion.div>
                {/* Gold corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24"><path d="M2 2 L10 2 M2 2 L2 10" stroke="var(--gold)" strokeWidth="1.5"/></svg>
                </div>
                <div className="absolute top-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24"><path d="M22 2 L14 2 M22 2 L22 10" stroke="var(--gold)" strokeWidth="1.5"/></svg>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxIndex >= 0}
          index={lightboxIndex}
          slides={slides}
          close={() => setLightboxIndex(-1)}
          styles={{ container: { backgroundColor: 'rgba(22,15,5,0.95)' } }}
        />
      </div>
    </section>
  );
}
