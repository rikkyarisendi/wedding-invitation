'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { Suspense } from 'react';

function CheckInContent() {
  const params  = useSearchParams();
  const token   = params.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already'>('loading');
  const [guest,  setGuest]  = useState<{ name: string; guests: number } | null>(null);
  const [message, setMsg]   = useState('');

  useEffect(() => {
    if (!token) { setStatus('error'); setMsg('Token tidak ditemukan'); return; }

    fetch(`/api/checkin?token=${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) {
          setStatus('success');
          setGuest(data.guest);
        } else if (data.error === 'Already checked in') {
          setStatus('already');
          setGuest(data.guest);
          setMsg('Tamu ini sudah check-in sebelumnya');
        } else {
          setStatus('error');
          setMsg(data.error || 'QR Code tidak valid');
        }
      })
      .catch(() => { setStatus('error'); setMsg('Terjadi kesalahan'); });
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-primary)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-10 max-w-sm w-full text-center"
      >
        {status === 'loading' && (
          <>
            <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-gold" />
            <p style={{ fontFamily: 'var(--font-lato)', color: 'var(--text-muted)' }}>Memverifikasi...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            </motion.div>
            <h2 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-great-vibes)', color: 'var(--text-primary)' }}>
              Selamat Datang!
            </h2>
            <p className="text-lg mb-1" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--text-primary)', fontWeight: 600 }}>
              {guest?.name}
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-lato)' }}>
              {guest?.guests} tamu · Check-in berhasil ✓
            </p>
          </>
        )}

        {status === 'already' && (
          <>
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--gold)', fontWeight: 600 }}>
              Sudah Check-in
            </h2>
            <p style={{ fontFamily: 'var(--font-lato)', color: 'var(--text-muted)' }}>{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
            <h2 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--text-primary)', fontWeight: 600 }}>
              QR Tidak Valid
            </h2>
            <p style={{ fontFamily: 'var(--font-lato)', color: 'var(--text-muted)' }}>{message}</p>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function CheckInPage() {
  return (
    <Suspense>
      <CheckInContent />
    </Suspense>
  );
}
