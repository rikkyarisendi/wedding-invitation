'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Calendar, ExternalLink } from 'lucide-react';
import { weddingConfig } from '@/lib/config';
import { formatDate, getCountdownValues } from '@/lib/utils';
import { GununganIcon, KawungRow, TruntumFlower, ParangDivider } from '@/components/ui/Ornaments';

function CountdownUnit({ value, label, delay }: { value: number; label: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      className="batik-card px-5 py-4 text-center min-w-[72px] relative overflow-hidden"
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.7, type: 'spring', stiffness: 120 }}
    >
      <div className="absolute top-1 right-1 opacity-10"><TruntumFlower size={16} /></div>
      <AnimatePresence mode="wait">
        <motion.p key={value}
          className="text-4xl md:text-5xl leading-none gold-shimmer"
          style={{ fontFamily: 'var(--font-serif)' }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {String(value).padStart(2, '0')}
        </motion.p>
      </AnimatePresence>
      <p className="text-xs tracking-[0.2em] uppercase mt-1"
        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
        {label}
      </p>
    </motion.div>
  );
}

function EventCard({ data, label, icon, delay }: {
  data: typeof weddingConfig.event.akad; label: string; icon: string; delay: number;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const addToCalendar = () => {
    const start = new Date(`${data.date}T${data.time}:00`);
    const end   = new Date(`${data.date}T${data.endTime}:00`);
    const fmt   = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    window.open(
      `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(label)}&dates=${fmt(start)}/${fmt(end)}&location=${encodeURIComponent(data.address)}`,
      '_blank'
    );
  };

  return (
    <motion.div ref={ref}
      className="batik-card p-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 kawung-bg opacity-40" />

      {/* Corner gunungan */}
      <div className="absolute -top-2 -right-2 opacity-15 scale-x-[-1]">
        <GununganIcon size={60} />
      </div>

      <div className="relative">
        <div className="text-center mb-6">
          <span className="text-3xl">{icon}</span>
          <h3 className="text-2xl mt-2"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
            {label}
          </h3>
          <div className="flex justify-center mt-2">
            <KawungRow count={5} width={120} />
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {[
            { icon: <Calendar className="w-4 h-4" />, label: 'Tanggal', value: formatDate(data.date) },
            { icon: <Clock className="w-4 h-4" />,    label: 'Waktu',   value: `${data.time} – ${data.endTime} WIB` },
            { icon: <MapPin className="w-4 h-4" />,   label: 'Lokasi',  value: data.venue, sub: data.address },
          ].map(({ icon: ic, label: lb, value, sub }, i) => (
            <motion.div key={i} className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: delay + 0.15 * i, duration: 0.6 }}
            >
              <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }}>{ic}</span>
              <div>
                <p className="text-xs tracking-widest uppercase mb-0.5"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                  {lb}
                </p>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                  {value}
                </p>
                {sub && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>{sub}</p>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map embed */}
        <div className="rounded-lg overflow-hidden mb-4" style={{ border: '1px solid var(--border)' }}>
          <iframe src={data.mapsEmbed} width="100%" height="180" style={{ border: 0 }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={label}/>
        </div>

        <div className="flex gap-3">
          <a href={data.mapsUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs tracking-widest uppercase transition-all duration-200 hover:opacity-80"
            style={{ border: '1px solid var(--border)', color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
            <ExternalLink className="w-3 h-3" /> Buka Maps
          </a>
          <button onClick={addToCalendar}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs tracking-widest uppercase transition-all duration-200 hover:opacity-80"
            style={{ background: 'var(--gold)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
            <Calendar className="w-3 h-3" /> Kalender
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventDetails() {
  const titleRef   = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });
  const [cd, setCd] = useState(getCountdownValues(weddingConfig.event.akad.date));

  useEffect(() => {
    const t = setInterval(() => setCd(getCountdownValues(weddingConfig.event.akad.date)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="event" className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div ref={titleRef} className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div className="flex justify-center mb-4">
            <TruntumFlower size={40} />
          </div>
          <p className="text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
            Kami Menantikan Kehadiran Anda
          </p>
          <h2 className="text-5xl md:text-6xl gold-shimmer"
            style={{ fontFamily: 'var(--font-serif)' }}>
            Detail Acara
          </h2>
          <div className="flex justify-center mt-3">
            <ParangDivider width={260} />
          </div>
        </motion.div>

        {/* Countdown */}
        <div className="flex justify-center gap-3 mb-14 flex-wrap">
          {[
            { value: cd.days, label: 'Hari',  delay: 0 },
            { value: cd.hours, label: 'Jam',  delay: 0.1 },
            { value: cd.minutes, label: 'Menit', delay: 0.2 },
            { value: cd.seconds, label: 'Detik', delay: 0.3 },
          ].map((u) => <CountdownUnit key={u.label} {...u} />)}
        </div>

        {/* Event cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <EventCard data={weddingConfig.event.akad}      label="Akad Nikah"         icon="🕌" delay={0} />
          <EventCard data={weddingConfig.event.reception} label="Resepsi Pernikahan"  icon="🎉" delay={0.15} />
        </div>
      </div>
    </section>
  );
}
