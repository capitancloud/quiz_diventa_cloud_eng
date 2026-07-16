export interface CookieConsent {
  analytics: boolean;
  marketing: boolean;
}

export type ConsentState = 'pending' | 'accepted_all' | 'rejected_all' | 'custom';

const STORAGE_KEY = 'cc_consent_v1';

export interface StoredConsent {
  state: ConsentState;
  preferences: CookieConsent;
  timestamp: number;
}

export function loadConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredConsent;
  } catch {
    return null;
  }
}

export function saveConsent(state: ConsentState, preferences: CookieConsent): StoredConsent {
  const stored: StoredConsent = { state, preferences, timestamp: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  return stored;
}

export function clearConsent(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/** Returns true only when the stored consent is recent enough (< 12 months). */
export function isConsentValid(stored: StoredConsent): boolean {
  const TWELVE_MONTHS_MS = 365 * 24 * 60 * 60 * 1000;
  return Date.now() - stored.timestamp < TWELVE_MONTHS_MS;
}
