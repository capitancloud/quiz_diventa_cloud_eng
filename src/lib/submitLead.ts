export interface LeadData {
  name: string;
  email: string;
  tags: string[];
  source: string;
}

export async function submitLead(data: LeadData): Promise<void> {
  await Promise.allSettled([
    submitToMailerLite(data),
    submitToWebhook(data),
    submitToNetlifyForms(data),
  ]);
}

async function submitToMailerLite({ name, email, tags, source }: LeadData): Promise<void> {
  const apiKey = import.meta.env.VITE_MAILERLITE_API_KEY as string | undefined;
  if (!apiKey) return;

  const groupId = import.meta.env.VITE_MAILERLITE_GROUP_ID as string | undefined;

  const body: Record<string, unknown> = {
    email,
    fields: {
      name,
      provenienza: source,
    },
    ...(tags.length > 0 && { tags }),
    ...(groupId && { groups: [groupId] }),
  };

  await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });
}

async function submitToWebhook({ name, email, tags, source }: LeadData): Promise<void> {
  const url = import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined;
  if (!url) return;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, tags, source }),
  });
}

async function submitToNetlifyForms({ name, email, tags, source }: LeadData): Promise<void> {
  await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      'form-name': 'quiz-lead',
      name,
      email,
      tags: tags.join(','),
      source,
    }).toString(),
  });
}
