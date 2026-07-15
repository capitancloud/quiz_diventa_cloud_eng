export interface LeadData {
  name: string;
  email: string;
  tags: string[];
}

export async function submitLead(data: LeadData): Promise<void> {
  const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error('[submitLead] webhook error:', err);
    }
  }

  // Netlify Forms fallback via fetch (works alongside the static HTML detection)
  try {
    const body = new URLSearchParams({
      'form-name': 'quiz-lead',
      name: data.name,
      email: data.email,
      tags: data.tags.join(','),
    });
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
  } catch (err) {
    console.error('[submitLead] Netlify Forms error:', err);
  }
}
