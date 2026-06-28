'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

interface ModalContextValue {
  isOpen: boolean;
  productSlug?: string;
  productName?: string;
  open: (opts?: { productSlug?: string; productName?: string }) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [productSlug, setProductSlug] = useState<string | undefined>();
  const [productName, setProductName] = useState<string | undefined>();

  const open = useCallback((opts?: { productSlug?: string; productName?: string }) => {
    setProductSlug(opts?.productSlug);
    setProductName(opts?.productName);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setProductSlug(undefined);
    setProductName(undefined);
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, productSlug, productName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside ModalProvider');
  return ctx;
}
