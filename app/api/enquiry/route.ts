import { NextRequest, NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/validators';
import { createAdminClient } from '@/lib/supabase.admin';
import { sendEnquiryNotification, sendEnquiryConfirmation } from '@/lib/email';

// Simple in-memory rate limiter (resets on serverless cold start)
const rateLimitMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;
  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  // Parse and validate body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Sanitise
  const email = data.email.toLowerCase().trim();
  const contactName = data.contactName.trim();
  const companyName = data.companyName.trim();

  // UTM params from URL (if sent via body)
  const utmSource = req.nextUrl.searchParams.get('utm_source') || undefined;
  const utmMedium = req.nextUrl.searchParams.get('utm_medium') || undefined;
  const utmCampaign = req.nextUrl.searchParams.get('utm_campaign') || undefined;

  // Insert into Supabase
  const supabase = createAdminClient();
  const { data: inserted, error: dbError } = await supabase
    .from('enquiries')
    .insert({
      contact_name: contactName,
      company_name: companyName,
      email,
      phone: data.phone || null,
      country: data.country || null,
      company_type: data.companyType || null,
      company_website: data.companyWebsite || null,
      product_slugs: data.productSlugs || [],
      product_names: data.productNames || [],
      custom_requirement: data.customRequirement || null,
      estimated_volume: data.estimatedVolume || null,
      frequency: data.frequency || null,
      requires_coa: data.requiresCoa || false,
      requires_sample: data.requiresSample || false,
      compliance_needs: data.complianceNeeds || [],
      message: data.message || null,
      source: 'website_contact',
      source_page: data.sourcePage || null,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
    })
    .select('id')
    .single();

  if (dbError) {
    console.error('Supabase insert error:', dbError.message);
    return NextResponse.json({ error: 'Failed to save enquiry' }, { status: 500 });
  }

  const enquiryId = inserted?.id as string;

  // Insert product interest rows
  if (data.productSlugs && data.productSlugs.length > 0) {
    await supabase.from('product_interest').insert(
      data.productSlugs.map((slug, i) => ({
        product_slug: slug,
        product_name: data.productNames?.[i] || slug,
        enquiry_id: enquiryId,
      }))
    );
  }

  // Send emails (fire-and-forget — don't fail the response if email fails)
  Promise.all([
    sendEnquiryNotification({
      contactName,
      companyName,
      email,
      phone: data.phone,
      productNames: data.productNames,
      estimatedVolume: data.estimatedVolume,
      message: data.message,
      enquiryId,
    }),
    sendEnquiryConfirmation({ contactName, email, companyName }),
  ]).catch((err) => console.error('Email send error:', err));

  return NextResponse.json({ success: true, enquiryId }, { status: 201 });
}
