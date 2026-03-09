// components/ui/PetalAnimation.tsx

'use client'

import { useState, useEffect } from 'react';

// Pindahkan generate petals ke dalam useEffect
// biar hanya jalan di client, tidak di server

export default function PetalAnimation() {
  const [petals, setPetals] = useState<any[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: 14 }, (_, i) => ({
        id:        i,
        left:      Math.random() * 100,
        delay:     Math.random() * 12,
        duration:  Math.random() * 10 + 8,
        size:      Math.random() * 10 + 8,
        drift:     Math.random() * 80 - 40,
      }))
    );
  }, []);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {petals.map((p) => (
        <div key={p.id}
          className="absolute"
          style={{
            left:      `${p.left}%`,
            top:       `-${p.size * 2}px`,
            width:     p.size,
            height:    p.size * 1.3,
            animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          <svg viewBox="0 0 20 26" fill="none" className="w-full h-full">
            <path
              d="M10 1 C14 5 18 9 16 14 C14 19 12 24 10 25 C8 24 6 19 4 14 C2 9 6 5 10 1 Z"
              fill="var(--gold)" opacity="0.35"
            />
            <path d="M10 2 C10 10 10 18 10 25" stroke="var(--gold-light)" strokeWidth="0.4" opacity="0.5"/>
          </svg>
        </div>
      ))}
    </div>
  );
}