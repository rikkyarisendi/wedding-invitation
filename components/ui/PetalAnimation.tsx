'use client';
import { useMemo } from 'react';

interface Petal {
  id: number; left: number; delay: number; duration: number;
  size: number; drift: number; rotateEnd: number;
}

export default function PetalAnimation() {
  const petals: Petal[] = useMemo(() => (
    Array.from({ length: 14 }, (_, i) => ({
      id:        i,
      left:      Math.random() * 100,
      delay:     Math.random() * 12,
      duration:  Math.random() * 10 + 8,
      size:      Math.random() * 10 + 8,
      drift:     Math.random() * 80 - 40,
      rotateEnd: Math.random() * 720 - 360,
    }))
  ), []);

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
            transform: `translateX(${p.drift}px) rotate(${Math.random() * 360}deg)`,
          }}
        >
          {/* Jasmine / melati petal shape */}
          <svg viewBox="0 0 20 26" fill="none" className="w-full h-full">
            <path
              d="M10 1 C14 5 18 9 16 14 C14 19 12 24 10 25 C8 24 6 19 4 14 C2 9 6 5 10 1 Z"
              fill="var(--gold)" opacity="0.35"
            />
            {/* Vein */}
            <path d="M10 2 C10 10 10 18 10 25" stroke="var(--gold-light)" strokeWidth="0.4" opacity="0.5"/>
          </svg>
        </div>
      ))}
    </div>
  );
}
