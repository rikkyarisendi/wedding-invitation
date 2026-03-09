'use client'

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { weddingConfig } from '@/lib/config';
import { TruntumFlower } from '@/components/ui/Ornaments';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing,  setPlaying]  = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [muted,    setMuted]    = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true; audio.volume = 0.35;
    const tryPlay = () => { audio.play().then(() => setPlaying(true)).catch(() => {}); document.removeEventListener('click', tryPlay); };
    document.addEventListener('click', tryPlay);
    return () => document.removeEventListener('click', tryPlay);
  }, []);

  const togglePlay = () => {
    const a = audioRef.current; if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => {}); }
  };
  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted; setMuted(!muted);
  };

  return (
    <>
      <audio ref={audioRef} src={weddingConfig.music.src} preload="metadata" />
      <motion.div className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: 'spring', stiffness: 150 }}
      >
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.85 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.85 }} transition={{ duration: 0.3 }}
              className="glass-card mb-3 p-4 flex items-center gap-3"
              style={{ minWidth: 220, border: '1px solid var(--border)' }}
            >
              <motion.div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--gold)' }}
                animate={{ rotate: playing ? 360 : 0 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear', paused: !playing }}
              >
                <TruntumFlower size={16} color="var(--text-primary)" />
              </motion.div>
              <p className="flex-1 text-xs truncate" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                {weddingConfig.music.title}
              </p>
              <button onClick={toggleMute} style={{ color: 'var(--gold)' }}>
                {muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => { setExpanded(!expanded); togglePlay(); }}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative"
          style={{ background: 'var(--gold)' }}
        >
          {/* Pulse ring */}
          {playing && (
            <motion.div className="absolute inset-0 rounded-full"
              style={{ background: 'var(--gold)', opacity: 0.5 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <span className="relative z-10" style={{ color: 'var(--text-primary)' }}>
            {playing ? <Pause className="w-5 h-5" /> : <Music className="w-5 h-5" />}
          </span>
        </motion.button>
      </motion.div>
    </>
  );
}
