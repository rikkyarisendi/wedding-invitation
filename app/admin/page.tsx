'use client';
import { useState, useEffect } from 'react';
import { Users, Heart, CheckCircle, XCircle, QrCode, Download } from 'lucide-react';
import QRCode from 'react-qr-code';

interface RSVP {
  id:         string;
  name:       string;
  phone:      string;
  attendance: string;
  guests:     number;
  session:    string;
  message:    string;
  createdAt:  string;
}

export default function AdminPage() {
  const [authed, setAuthed]   = useState(false);
  const [password, setPassword] = useState('');
  const [rsvps, setRsvps]     = useState<RSVP[]>([]);
  const [tab, setTab]         = useState<'rsvp' | 'qr'>('rsvp');
  const [qrToken, setQrToken] = useState('');

  const login = () => {
    // Simple client-side check — in production use NextAuth
    if (password === 'wedding2025admin') setAuthed(true);
    else alert('Password salah');
  };

  useEffect(() => {
    if (!authed) return;
    fetch('/api/rsvp').then((r) => r.json()).then((d) => setRsvps(d.rsvps || []));
  }, [authed]);

  const attending    = rsvps.filter((r) => r.attendance === 'attend');
  const notAttending = rsvps.filter((r) => r.attendance === 'notAttend');
  const totalGuests  = attending.reduce((s, r) => s + r.guests, 0);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-primary)' }}>
        <div className="glass-card p-8 w-full max-w-sm text-center">
          <h1 className="text-3xl mb-6" style={{ fontFamily: 'var(--font-great-vibes)', color: 'var(--gold)' }}>
            Admin Dashboard
          </h1>
          <input
            type="password"
            placeholder="Password admin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            className="w-full bg-transparent border-b border-gold/30 pb-2 outline-none text-sm mb-6"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-lato)' }}
          />
          <button
            onClick={login}
            className="w-full py-3 text-xs tracking-widest uppercase"
            style={{ background: 'var(--gold)', color: '#1a1612', fontFamily: 'var(--font-lato)' }}
          >
            Masuk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-10" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl mb-8" style={{ fontFamily: 'var(--font-great-vibes)', color: 'var(--gold)' }}>
          Admin Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Users className="w-5 h-5" />, label: 'Total RSVP',     value: rsvps.length },
            { icon: <CheckCircle className="w-5 h-5" />, label: 'Hadir',    value: attending.length },
            { icon: <XCircle className="w-5 h-5" />, label: 'Tidak Hadir',  value: notAttending.length },
            { icon: <Heart className="w-5 h-5" />, label: 'Total Tamu',     value: totalGuests },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <div className="text-gold flex justify-center mb-2">{stat.icon}</div>
              <p className="text-2xl font-light mb-1" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--text-primary)' }}>
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-lato)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {(['rsvp', 'qr'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-6 py-2 text-xs tracking-widest uppercase border transition-colors duration-200"
              style={{
                fontFamily:  'var(--font-lato)',
                background:  tab === t ? 'var(--gold)' : 'transparent',
                borderColor: 'var(--border)',
                color:       tab === t ? '#1a1612' : 'var(--text-muted)',
              }}
            >
              {t === 'rsvp' ? 'Daftar RSVP' : 'QR Generator'}
            </button>
          ))}
        </div>

        {tab === 'rsvp' && (
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                  {['Nama', 'Telepon', 'Status', 'Tamu', 'Sesi', 'Waktu'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs tracking-wider uppercase"
                        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-lato)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rsvps.map((r) => (
                  <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="px-4 py-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-lato)' }}>{r.name}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-muted)',    fontFamily: 'var(--font-lato)' }}>{r.phone}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded"
                        style={{
                          background: r.attendance === 'attend' ? 'rgba(212,168,23,0.15)' : 'rgba(200,50,50,0.1)',
                          color:      r.attendance === 'attend' ? 'var(--gold)' : '#e55',
                          fontFamily: 'var(--font-lato)',
                        }}>
                        {r.attendance === 'attend' ? '✓ Hadir' : '✗ Tidak'}
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-lato)' }}>{r.guests}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-lato)' }}>{r.session}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-lato)' }}>
                      {new Date(r.createdAt).toLocaleDateString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'qr' && (
          <div className="glass-card p-8 max-w-md">
            <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--text-primary)', fontWeight: 600 }}>
              Generate QR Code Tamu
            </h3>
            <input
              placeholder="Token / ID tamu"
              value={qrToken}
              onChange={(e) => setQrToken(e.target.value)}
              className="w-full bg-transparent border-b border-gold/30 pb-2 outline-none text-sm mb-6"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-lato)' }}
            />
            {qrToken && (
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-white rounded-lg">
                  <QRCode
                    value={`${typeof window !== 'undefined' ? window.location.origin : ''}/checkin?token=${qrToken}`}
                    size={180}
                  />
                </div>
                <p className="text-xs text-center" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-lato)' }}>
                  QR ini bisa dikirim ke tamu untuk check-in
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
