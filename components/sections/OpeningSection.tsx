'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { weddingConfig } from '@/lib/config';
import { GununganIcon, KawungRow, TruntumFlower, BatikFrame } from '@/components/ui/Ornaments';

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function OpeningSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="section-padding kawung-bg max-w-5xl mx-auto px-6 md:px-8">
      {/* ── Bismillah ── */}
      <FadeUp>
        <div className="text-center mb-10">
          <motion.p
            className="text-4xl md:text-5xl mb-6 leading-loose"
            style={{ fontFamily: 'Georgia, serif', color: 'var(--gold)', direction: 'rtl' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </motion.p>
          <div className="flex justify-center">
            <KawungRow count={9} width={220} />
          </div>
        </div>
      </FadeUp>

      {/* ── Quranic verse ── */}
      <FadeUp delay={0.1}>
        <div className="batik-card p-8 md:p-12 text-center mb-14 relative overflow-hidden">
          {/* Background truntum flowers */}
          <div className="absolute top-3 left-3 opacity-20"><TruntumFlower size={28} /></div>
          <div className="absolute top-3 right-3 opacity-20"><TruntumFlower size={28} /></div>
          <div className="absolute bottom-3 left-3 opacity-20"><TruntumFlower size={28} /></div>
          <div className="absolute bottom-3 right-3 opacity-20"><TruntumFlower size={28} /></div>

          <p className="text-lg md:text-xl italic leading-relaxed mb-5"
            style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--text-primary)', fontStyle: 'italic' }}>
            "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu
            dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan
            di antaramu rasa kasih dan sayang."
          </p>
          <p className="text-sm tracking-widest" style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
            QS. Ar-Rum: 21
          </p>
        </div>
      </FadeUp>

      {/* ── Intro text ── */}
      <FadeUp delay={0.15}>
        <p className="text-center text-base md:text-lg leading-relaxed mb-14"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-cormorant)', maxWidth: '560px', margin: '0 auto 3.5rem', fontSize: '1.15rem' }}>
          Dengan memohon rahmat dan ridho Allah SWT serta restu kedua orang tua,
          kami bermaksud menyelenggarakan pernikahan kami.
        </p>
      </FadeUp>

      {/* ── Couple cards ── */}
      <div ref={ref} className="grid md:grid-cols-2 gap-8 mt-8">
        {[
          { ...weddingConfig.groom, role: 'Mempelai Pria' },
          { ...weddingConfig.bride, role: 'Mempelai Wanita' },
        ].map((person, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: i === 0 ? -50 : 50, filter: 'blur(6px)' }}
            animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="batik-card p-8 text-center h-full group">
              {/* Octagonal photo frame */}
              <div className="relative mx-auto mb-5" style={{ width: 150, height: 150 }}>
                {/* Rotating border ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: '2px dashed var(--gold)', opacity: 0.4 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full overflow-hidden"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image src={person.photo} alt={person.name} fill className="object-cover" />
                </motion.div>
                {/* Corner flowers */}
                {[0, 90, 180, 270].map((angle) => (
                  <div key={angle}
                    className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      top: `${50 - 48 * Math.cos(angle * Math.PI / 180)}%`,
                      left: `${50 + 48 * Math.sin(angle * Math.PI / 180)}%`,
                    }}
                  >
                    <TruntumFlower size={14} />
                  </div>
                ))}
              </div>

              <p className="text-xs tracking-[0.25em] uppercase mb-2"
                style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
                {person.role}
              </p>
              <h2 className="text-3xl mb-1 gold-shimmer"
                style={{ fontFamily: 'var(--font-serif)' }}>
                {person.nickname}
              </h2>
              <p className="text-base mb-2"
                style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--text-primary)' }}>
                {person.fullName}
              </p>
              <div className="flex justify-center my-3">
                <KawungRow count={5} width={120} />
              </div>
              <p className="text-xs leading-relaxed"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                {person.parents}
              </p>
              {person.instagram && (
                <p className="mt-2 text-xs" style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
                  {person.instagram}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom ornament */}
      <FadeUp delay={0.3}>
        <div className="flex justify-center mt-12 gap-6 items-center">
          <GununganIcon size={30} opacity={0.4} />
          <KawungRow count={5} width={120} />
          <GununganIcon size={30} opacity={0.4} />
        </div>
      </FadeUp>
    </section>
  );
}
