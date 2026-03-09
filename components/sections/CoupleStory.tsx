'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { weddingConfig } from '@/lib/config';
import { GununganIcon, KawungRow, ParangDivider, TruntumFlower } from '@/components/ui/Ornaments';

function TimelineItem({ item, index }: { item: typeof weddingConfig.story[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-start gap-6 mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'} md:items-center`}
      initial={{ opacity: 0, x: isLeft ? -60 : 60, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Card */}
      <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'} md:max-w-[42%]`}>
        <div className="batik-card p-6 relative overflow-hidden group">
          {/* Truntum corner */}
          <div className={`absolute top-2 ${isLeft ? 'right-2' : 'left-2'} opacity-15`}>
            <TruntumFlower size={20} />
          </div>

          <p className="text-xs tracking-[0.25em] uppercase mb-1"
            style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
            {item.year}
          </p>
          <h3 className="text-xl mb-2"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
            {item.title}
          </h3>
          <div className={`flex ${isLeft ? 'justify-end' : 'justify-start'} my-2`}>
            <KawungRow count={4} width={80} />
          </div>
          <p className="text-sm leading-relaxed"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
            {item.description}
          </p>
        </div>
      </div>

      {/* Center icon node */}
      <motion.div
        className="flex-shrink-0 flex flex-col items-center z-10"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 200 }}
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl relative"
          style={{ background: 'var(--bg-accent)', border: '2px solid var(--gold)' }}>
          {item.icon}
          {/* Glow ring */}
          <motion.div className="absolute inset-0 rounded-full"
            style={{ border: '1px solid var(--gold)', opacity: 0.4 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
          />
        </div>
      </motion.div>

      {/* Empty spacer */}
      <div className="flex-1 hidden md:block md:max-w-[42%]" />
    </motion.div>
  );
}

export default function CoupleStory() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="story" ref={sectionRef} className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}>

      {/* Parang pattern sides */}
      <div className="absolute left-0 inset-y-0 w-16 parang-bg opacity-30" />
      <div className="absolute right-0 inset-y-0 w-16 parang-bg opacity-30 scale-x-[-1]" />

      <div className="max-w-4xl mx-auto relative">
        {/* ── Section header ── */}
        <motion.div ref={titleRef} className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div className="flex justify-center mb-4">
            <GununganIcon size={42} />
          </div>
          <p className="text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
            Perjalanan Cinta Kami
          </p>
          <h2 className="text-5xl md:text-6xl gold-shimmer"
            style={{ fontFamily: 'var(--font-serif)' }}>
            Kisah Kita
          </h2>
          <div className="flex justify-center mt-4">
            <ParangDivider width={280} />
          </div>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Animated center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block overflow-hidden"
            style={{ background: 'var(--border)' }}>
            <motion.div className="w-full origin-top" style={{ height: lineHeight, background: 'var(--gold)' }} />
          </div>

          {weddingConfig.story.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>

        {/* Bottom ornament */}
        <motion.div className="flex justify-center mt-8 gap-4 items-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
        >
          <KawungRow count={7} width={180} />
        </motion.div>
      </div>
    </section>
  );
}
