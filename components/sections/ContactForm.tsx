'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { enquirySchema, type EnquirySchema } from '@/lib/validators';
import { VOLUME_OPTIONS } from '@/lib/constants';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';

export function ContactForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquirySchema>({
    resolver: zodResolver(enquirySchema),
  });

  async function onSubmit(data: EnquirySchema) {
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, sourcePage: '/contact' }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      reset();
    } catch {
      toast({
        type: 'error',
        title: 'Submission failed',
        description: 'Please email us directly at sales@biovedahub.com',
      });
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-surface-300 bg-surface-100 p-12 text-center">
        <div className="rounded-full bg-primary-500/10 p-4">
          <CheckCircle className="h-10 w-10 text-primary-400" />
        </div>
        <h3 className="text-xl font-bold text-text">Enquiry Received!</h3>
        <p className="text-text-muted max-w-sm">
          Our team will contact you within 24 business hours with pricing and availability.
        </p>
        <Button variant="secondary" onClick={() => setSubmitted(false)}>
          Submit Another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-surface-300 bg-surface-100 p-8 space-y-5"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-text-muted">Company Type</label>
          <select
            className={cn(
              'w-full rounded-lg border border-surface-300 bg-surface-200 px-3.5 py-2.5',
              'text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary-500'
            )}
            {...register('companyType')}
          >
            <option value="">Select industry</option>
            {['Pharmaceutical', 'Nutraceutical', 'Cosmetic', 'Food & Beverage', 'Veterinary'].map(
              (v) => <option key={v} value={v}>{v}</option>
            )}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-text-muted">Estimated Volume</label>
          <select
            className={cn(
              'w-full rounded-lg border border-surface-300 bg-surface-200 px-3.5 py-2.5',
              'text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary-500'
            )}
            {...register('estimatedVolume')}
          >
            <option value="">Select volume</option>
            {VOLUME_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      </div>
      <Input
        label="Products of Interest"
        placeholder="e.g., Turmeric Curcumin 95%, Ashwagandha, Neem Extract"
        {...register('customRequirement')}
      />
      <Textarea
        label="Message / Specifications"
        placeholder="Describe your formulation requirements, target standardization, compliance needs..."
        rows={4}
        {...register('message')}
      />
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting}
        className="w-full"
      >
        Send Enquiry
      </Button>
    </form>
  );
}
