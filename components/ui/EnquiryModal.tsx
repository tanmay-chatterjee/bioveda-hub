'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { m, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { enquirySchema, type EnquirySchema } from '@/lib/validators';
import { COMPLIANCE_OPTIONS, VOLUME_OPTIONS } from '@/lib/constants';
import { useModal } from '@/components/providers/ModalContext';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { cn } from '@/lib/utils';

export function EnquiryModal() {
  const { isOpen, productName, productSlug, close } = useModal();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquirySchema>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      productSlugs: productSlug ? [productSlug] : [],
      productNames: productName ? [productName] : [],
      requiresCoa: false,
      requiresSample: false,
      complianceNeeds: [],
    },
  });

  async function onSubmit(data: EnquirySchema) {
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          productSlugs: productSlug ? [productSlug] : [],
          productNames: productName ? [productName] : [],
          sourcePage: window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
      reset();
    } catch {
      toast({ type: 'error', title: 'Something went wrong', description: 'Please try again or email us directly.' });
    }
  }

  function handleClose() {
    close();
    setTimeout(() => setSubmitted(false), 300);
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            {/* Overlay */}
            <Dialog.Overlay asChild>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            {/* Content */}
            <Dialog.Content asChild>
              <m.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-4 bottom-0 z-50 mx-auto max-w-lg rounded-t-2xl border border-surface-300 bg-surface-100 p-6 pb-8 md:inset-auto md:top-1/2 md:-translate-y-1/2 md:rounded-2xl max-h-[90vh] overflow-y-auto"
              >
                {/* Close */}
                <Dialog.Close asChild>
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 rounded-full p-2 text-text-dim hover:text-text hover:bg-surface-200 transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    /* ─── Success state ─── */
                    <m.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center py-8 gap-4"
                    >
                      <div className="rounded-full bg-primary-500/10 p-4">
                        <CheckCircle className="h-10 w-10 text-primary-400" />
                      </div>
                      <Dialog.Title className="text-xl font-bold text-text">
                        Enquiry Received!
                      </Dialog.Title>
                      <Dialog.Description className="text-sm text-text-muted">
                        Thank you! Our team will get back to you within 24 business hours.
                      </Dialog.Description>
                      <Button variant="secondary" onClick={handleClose} className="mt-2">
                        Close
                      </Button>
                    </m.div>
                  ) : (
                    /* ─── Form state ─── */
                    <m.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <Dialog.Title className="text-xl font-bold text-text mb-1">
                        {productName ? `Enquire about ${productName}` : 'Request a Quote'}
                      </Dialog.Title>
                      <Dialog.Description className="text-sm text-text-muted mb-6">
                        Fill in your details and our team will reach out with pricing and specifications.
                      </Dialog.Description>

                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Input
                            label="Full Name *"
                            placeholder="Dr. Priya Sharma"
                            error={errors.contactName?.message}
                            {...register('contactName')}
                          />
                          <Input
                            label="Company Name *"
                            placeholder="PharmaCo Ltd."
                            error={errors.companyName?.message}
                            {...register('companyName')}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Input
                            label="Email *"
                            type="email"
                            placeholder="you@company.com"
                            error={errors.email?.message}
                            {...register('email')}
                          />
                          <Input
                            label="Phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            {...register('phone')}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm text-text-muted">Company Type</label>
                            <select
                              className={cn(
                                'w-full rounded-lg border border-surface-300 bg-surface-200 px-3.5 py-2.5 text-sm text-text',
                                'focus:outline-none focus:ring-2 focus:ring-primary-500'
                              )}
                              {...register('companyType')}
                            >
                              <option value="">Select industry</option>
                              {['Pharmaceutical','Nutraceutical','Cosmetic','Food & Beverage','Veterinary'].map(v => (
                                <option key={v} value={v}>{v}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm text-text-muted">Estimated Volume</label>
                            <select
                              className={cn(
                                'w-full rounded-lg border border-surface-300 bg-surface-200 px-3.5 py-2.5 text-sm text-text',
                                'focus:outline-none focus:ring-2 focus:ring-primary-500'
                              )}
                              {...register('estimatedVolume')}
                            >
                              <option value="">Select volume</option>
                              {VOLUME_OPTIONS.map(v => (
                                <option key={v} value={v}>{v}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Compliance needs */}
                        <div>
                          <p className="text-sm text-text-muted mb-2">Compliance Requirements</p>
                          <div className="flex flex-wrap gap-2">
                            {COMPLIANCE_OPTIONS.map((opt) => (
                              <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  value={opt.value}
                                  {...register('complianceNeeds')}
                                  className="rounded border-surface-300 bg-surface-200 accent-primary-500"
                                />
                                <span className="text-xs text-text-muted">{opt.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <Textarea
                          label="Message / Specific Requirements"
                          placeholder="Tell us about your formulation needs, target specifications, or any other details..."
                          rows={3}
                          {...register('message')}
                        />

                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          loading={isSubmitting}
                          className="w-full"
                        >
                          <Send className="h-4 w-4" />
                          Send Enquiry
                        </Button>

                        <p className="text-center text-xs text-text-dim">
                          We typically respond within 24 business hours. All enquiries are strictly confidential.
                        </p>
                      </form>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
