'use client'

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { weddingConfig } from '@/lib/config';
import { formatDate } from '@/lib/utils';
import { GununganIcon, KawungRow, TruntumFlower, ParangDivider } from '@/components/ui/Ornaments';

export default function RSVPForm() {
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });
  const formRef     = useRef(null);
  const formInView  = useInView(formRef, { once: true, margin: '-40px' });

  const [form, setForm] = useState({ name: '', phone: '', attendance: 'attend', guests: 1, message: '' });
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.phone) { toast.error('Nama dan nomor wajib diisi.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setSubmitted(true); toast.success('Konfirmasi terkirim! 💕'); }
      else toast.error('Gagal mengirim, coba lagi.');
    } catch { toast.error('Terjadi kesalahan.'); }
    finally { setLoading(false); }
  };

  const inputStyle = {
    width: '100%', background: 'transparent',
    borderBottom: '1px solid var(--border)',
    padding: '0.5rem 0', outline: 'none',
    color: 'var(--text-primary)', fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
  } as React.CSSProperties;

  const labelStyle = {
    display: 'block', fontSize: '0.7rem', letterSpacing: '0.2em',
    textTransform: 'uppercase' as const, marginBottom: '0.4rem',
    color: 'var(--gold)', fontFamily: 'var(--font-body)',
  };

  return (
    <section id="rsvp" className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div ref={titleRef} className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div className="flex justify-center mb-4">
            <TruntumFlower size={38} />
          </div>
          <p className="text-xs tracking-[0.35em] uppercase mb-2"
            style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
            Mohon konfirmasi sebelum {formatDate(weddingConfig.event.reception.date)}
          </p>
          <h2 className="text-5xl md:text-6xl gold-shimmer"
            style={{ fontFamily: 'var(--font-serif)' }}>
            RSVP
          </h2>
          <div className="flex justify-center mt-3"><ParangDivider width={220} /></div>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="success"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="batik-card p-14 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 kawung-bg opacity-40" />
              <div className="relative">
                <motion.div className="flex justify-center mb-4"
                  animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                  <TruntumFlower size={56} />
                </motion.div>
                <h3 className="text-3xl mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                  Terima Kasih!
                </h3>
                <KawungRow count={7} width={160} />
                <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                  Konfirmasi Anda telah kami terima. Kami tidak sabar bertemu Anda!
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" ref={formRef}
              className="batik-card p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 batik-bg opacity-30" />
              <div className="absolute top-3 right-3 opacity-10"><TruntumFlower size={32} /></div>

              <div className="relative space-y-6">
                {/* Name */}
                <div>
                  <label style={labelStyle}>Nama Lengkap *</label>
                  <input value={form.name} onChange={(e) => set('name', e.target.value)}
                    placeholder="Masukkan nama Anda" style={inputStyle}
                    className="focus:border-gold-500 transition-colors duration-200 placeholder:text-muted" />
                </div>

                {/* Phone */}
                <div>
                  <label style={labelStyle}>Nomor WhatsApp *</label>
                  <input value={form.phone} onChange={(e) => set('phone', e.target.value)}
                    placeholder="08xxxxxxxxxx" style={inputStyle}
                    className="focus:border-gold-500 transition-colors duration-200" />
                </div>

                {/* Attendance */}
                <div>
                  <label style={labelStyle}>Kehadiran *</label>
                  <div className="flex gap-3 mt-1">
                    {[{ val: 'attend', label: '✓  Hadir' }, { val: 'notAttend', label: '✗  Tidak Hadir' }].map(({ val, label }) => (
                      <motion.button key={val}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => set('attendance', val)}
                        className="flex-1 py-2.5 text-xs tracking-wider uppercase transition-all duration-300"
                        style={{
                          fontFamily: 'var(--font-body)',
                          border: '1px solid',
                          borderColor: form.attendance === val ? 'var(--gold)' : 'var(--border)',
                          background:  form.attendance === val ? 'var(--gold)' : 'transparent',
                          color:       form.attendance === val ? 'var(--text-primary)' : 'var(--text-muted)',
                        }}
                      >
                        {label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {form.attendance === 'attend' && (
                    <motion.div key="attend-fields"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5 }}
                      className="overflow-hidden space-y-6"
                    >
                      {/* Guests */}
                      <div>
                        <label style={labelStyle}>Jumlah Tamu</label>
                        <select value={form.guests} onChange={(e) => set('guests', Number(e.target.value))} style={inputStyle}
                          className="cursor-pointer">
                          {[1,2,3,4].map((n) => (
                            <option key={n} value={n} style={{ background: 'var(--bg-primary)' }}>{n} orang</option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Ucapan & Doa (Opsional)</label>
                  <textarea value={form.message} onChange={(e) => set('message', e.target.value)}
                    placeholder="Tuliskan doa dan ucapan untuk pengantin..."
                    rows={3} style={{ ...inputStyle, resize: 'none' }} />
                </div>

                {/* Submit */}
                <motion.button
                  onClick={handleSubmit} disabled={loading}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(200,146,42,0.35)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 text-xs tracking-[0.25em] uppercase transition-all duration-300 disabled:opacity-50 relative overflow-hidden"
                  style={{ background: 'var(--gold)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}
                >
                  <motion.span
                    className="absolute inset-0"
                    style={{ background: 'var(--gold-light)', originX: 0 }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="relative z-10">
                    {loading ? 'Mengirim...' : 'Kirim Konfirmasi'}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
