'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface PopupModalProps {
  id: number;
  title: string;
  desktopImage: string;
  mobileImage: string;
  linkUrl?: string;
  linkText?: string;
  closeDelay: number;
  displayFrequency: 'once' | 'daily' | 'session' | 'always';
}

export default function PopupModal({
  id,
  title,
  desktopImage,
  mobileImage,
  linkUrl,
  linkText,
  closeDelay,
  displayFrequency,
}: PopupModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Mobil kontrolü
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Pop-up gösterilmeli mi kontrol et
    const shouldShow = checkShouldShow();
    
    if (shouldShow) {
      // Kısa bir gecikme ile aç (sayfa yüklendikten sonra)
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [id, displayFrequency]);

  useEffect(() => {
    // Otomatik kapanma
    if (isOpen && closeDelay > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, closeDelay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, closeDelay]);

  const checkShouldShow = (): boolean => {
    const storageKey = `popup_${id}_${displayFrequency}`;
    const now = Date.now();

    switch (displayFrequency) {
      case 'once':
        // Bir kez göster (localStorage'da varsa gösterme)
        const shownOnce = localStorage.getItem(storageKey);
        return !shownOnce;

      case 'daily':
        // Günlük göster
        const lastShownDaily = localStorage.getItem(storageKey);
        if (!lastShownDaily) return true;
        
        const lastDate = new Date(parseInt(lastShownDaily));
        const today = new Date();
        return lastDate.getDate() !== today.getDate();

      case 'session':
        // Her oturumda göster (sessionStorage)
        const shownSession = sessionStorage.getItem(storageKey);
        return !shownSession;

      case 'always':
        // Her zaman göster
        return true;

      default:
        return false;
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    saveCloseTime();
  };

  const saveCloseTime = () => {
    const storageKey = `popup_${id}_${displayFrequency}`;
    const now = Date.now();

    switch (displayFrequency) {
      case 'once':
        localStorage.setItem(storageKey, 'true');
        break;

      case 'daily':
        localStorage.setItem(storageKey, now.toString());
        break;

      case 'session':
        sessionStorage.setItem(storageKey, 'true');
        break;

      case 'always':
        // Always durumunda kaydetme
        break;
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const currentImage = isMobile && mobileImage ? mobileImage : desktopImage;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, type: 'spring', damping: 20 }}
            className="relative w-full max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Close popup"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Container */}
            <div className="relative w-full">
              {/* Desktop: landscape (4:3), Mobile: portrait (3:4) */}
              <div className={`relative ${isMobile ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                <Image
                  src={currentImage}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority
                />
              </div>

              {/* Link Overlay (if linkUrl exists) */}
              {linkUrl && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <Link
                    href={linkUrl}
                    onClick={handleClose}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-ocean-cyan hover:bg-ocean-cyan/90 text-ocean-deep font-semibold rounded-lg shadow-lg transition-all hover:scale-105"
                  >
                    <span>{linkText || 'Detayları Gör'}</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}