import { Resend } from 'resend';

// Lazy-initialize so missing env vars don't crash the build
function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? 'placeholder');
}
const notificationEmail = process.env.NOTIFICATION_EMAIL || 'sales@biovedahub.com';

export async function sendEnquiryNotification(data: {
  contactName: string;
  companyName: string;
  email: string;
  phone?: string;
  productNames?: string[];
  estimatedVolume?: string;
  message?: string;
  enquiryId: string;
}): Promise<void> {
  const products = data.productNames?.join(', ') || 'Not specified';
  await getResend().emails.send({
    from: 'BioVeda Hub <noreply@biovedahub.com>',
    to: notificationEmail,
    subject: `New Enquiry from ${data.companyName} — BioVeda Hub`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fafafa;padding:32px;border-radius:8px;">
        <h1 style="color:#22c55e;margin-bottom:24px;">New B2B Enquiry</h1>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#a3a3a3;width:140px;">Name</td><td style="padding:8px 0;">${data.contactName}</td></tr>
          <tr><td style="padding:8px 0;color:#a3a3a3;">Company</td><td style="padding:8px 0;">${data.companyName}</td></tr>
          <tr><td style="padding:8px 0;color:#a3a3a3;">Email</td><td style="padding:8px 0;">${data.email}</td></tr>
          <tr><td style="padding:8px 0;color:#a3a3a3;">Phone</td><td style="padding:8px 0;">${data.phone || 'N/A'}</td></tr>
          <tr><td style="padding:8px 0;color:#a3a3a3;">Products</td><td style="padding:8px 0;">${products}</td></tr>
          <tr><td style="padding:8px 0;color:#a3a3a3;">Volume</td><td style="padding:8px 0;">${data.estimatedVolume || 'N/A'}</td></tr>
          <tr><td style="padding:8px 0;color:#a3a3a3;">Message</td><td style="padding:8px 0;">${data.message || 'N/A'}</td></tr>
        </table>
        <p style="margin-top:24px;color:#525252;font-size:12px;">Enquiry ID: ${data.enquiryId}</p>
      </div>
    `,
  });
}

export async function sendEnquiryConfirmation(data: {
  contactName: string;
  email: string;
  companyName: string;
}): Promise<void> {
  await getResend().emails.send({
    from: 'BioVeda Hub <noreply@biovedahub.com>',
    to: data.email,
    subject: 'Your Enquiry Received — BioVeda Hub',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fafafa;padding:32px;border-radius:8px;">
        <h1 style="color:#22c55e;margin-bottom:16px;">Thank you, ${data.contactName}!</h1>
        <p style="color:#a3a3a3;line-height:1.6;">We've received your enquiry from <strong style="color:#fafafa;">${data.companyName}</strong> and our team will get back to you within 24 business hours.</p>
        <p style="margin-top:24px;color:#a3a3a3;line-height:1.6;">For urgent queries, reach us at <a href="mailto:sales@biovedahub.com" style="color:#22c55e;">sales@biovedahub.com</a></p>
        <hr style="border:none;border-top:1px solid #262626;margin:32px 0;" />
        <p style="color:#525252;font-size:12px;">BioVeda Hub — Premium Ayurvedic &amp; Herbal Extracts | Wholesale Raw Materials</p>
      </div>
    `,
  });
}
