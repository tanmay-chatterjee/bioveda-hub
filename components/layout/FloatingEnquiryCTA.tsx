'use client';

import { m, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useModal } from '@/components/providers/ModalContext';

export function FloatingEnquiryCTA() {
  const [visible, setVisible] = useState(false);
  const { open } = useModal();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) setVisible(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => open()}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-primary-500 px-5 py-3 text-sm font-semibold text-surface shadow-[0_0_24px_rgba(34,197,94,0.4)] hover:bg-primary-400 transition-colors"
          aria-label="Open enquiry form"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Enquire Now</span>
        </m.button>
      )}
    </AnimatePresence>
  );
}
