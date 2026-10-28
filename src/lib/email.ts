export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

/** Keep the existing EmailJS template field names unchanged. */
export async function sendContact(message: ContactMessage, request: typeof fetch = fetch) {
  const response = await request('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(15000),
    body: JSON.stringify({
      service_id: 'service_syronxp',
      template_id: 'template_tilc503',
      user_id: '8WechvJQ6H6bEuOAx',
      template_params: message,
    }),
  });
  if (!response.ok) throw new Error('Email delivery failed');
}
