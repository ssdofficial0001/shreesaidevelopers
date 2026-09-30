/**
 * Form Validation Utilities
 */

export function cleanPhoneNumber(phone: string): string {
  let cleaned = phone.trim().replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('+91')) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }
  return cleaned;
}

export function validateName(name: string): string | null {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    return 'Name is required.';
  }
  if (trimmed.length < 3) {
    return 'Name must be at least 3 characters.';
  }
  return null;
}

export function validatePhone(phone: string): string | null {
  const trimmed = (phone || '').trim();
  if (!trimmed) {
    return 'Phone number is required.';
  }
  const cleaned = cleanPhoneNumber(trimmed);
  // Phone must be exactly 10 digits starting with 6-9
  if (!/^[6-9]\d{9}$/.test(cleaned)) {
    return 'Phone must be 10 digits starting with 6-9.';
  }
  return null;
}
