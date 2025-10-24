// ParticleSystem (ikinci dosya)
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ParticleSystem() {
  const [bubbles, setBubbles] = useState<Array<{
    id: number;
    left: number;
    delay: number;
    duration: number;
    size: number;
  }>>([]);

  // viewport yüksekliği: SSR ve ilk client render'da SABİT bir değer kullan
  const [vh, setVh] = useState(800); // SSR & 1. paint için aynı
  useEffect(() => {
    setVh(window.innerHeight); // mount'tan sonra gerçek değere güncellenir
  }, []);

  useEffect(() => {
    // random'lar sadece client'ta, mount'tan sonra üretildiği için SSR HTML'ini etkilemez
    setBubbles(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
        size: 6 + Math.random() * 14,
      }))
    );
  }, []);

  if (bubbles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.left}%`,
            bottom: '-50px',
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(46,196,182,0.3))',
            boxShadow: '0 0 20px rgba(46,196,182,0.5), inset -2px -2px 8px rgba(255,255,255,0.3)',
          }}
          animate={{
            y: [0, -vh - 100],    // ← artık window yok
            opacity: [0, 0.7, 0.9, 0.7, 0],
            scale: [0.5, 1, 1, 1.1, 0.9],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
