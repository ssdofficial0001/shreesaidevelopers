import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface EnquiryPayload {
  fullName?: string;
  name?: string;
  phone: string;
  email?: string;
  requirement?: string;
  requirementType?: string;
  preferredLocation?: string;
  propertyInterest?: string;
  propertyType?: string;
  bhk?: string;
  budget?: string;
  budgetOrArea?: string;
  area?: string;
  message?: string;
  source?: string;
}

export const DESTINATION_EMAIL = 'shreesaideveloper.in@gmail.com';
export const FAILURE_MESSAGE = 'Unable to save your enquiry. Please contact our advisory desk directly on WhatsApp or Call (+91 98674 78525).';
export const SSD_WHATSAPP_NUMBER = '919867478525';

export function formatWhatsAppEnquiryMessage(params: {
  name?: string;
  phone?: string;
  requirement?: string;
  location?: string;
  budget?: string;
}): string {
  const nameVal = params.name?.trim() || '';
  const phoneVal = params.phone?.trim() || '';
  const reqVal = params.requirement?.trim() || 'General Property Enquiry';
  const locVal = params.location?.trim() || 'Mumbai & MMR';
  const budgetVal = params.budget?.trim() || 'As per requirement';

  return `*New Property Enquiry*
Name: ${nameVal}
Mobile: ${phoneVal}
Requirement: ${reqVal}
Location: ${locVal}
Budget: ${budgetVal}`;
}

export function openWhatsAppEnquiry(params: {
  name?: string;
  phone?: string;
  requirement?: string;
  location?: string;
  budget?: string;
}): string {
  const message = formatWhatsAppEnquiryMessage(params);

  alert('Thank you! Redirecting to WhatsApp, please press SEND.');

  const waUrl = `https://wa.me/${SSD_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
  return waUrl;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://jjtmjtezwoljkikefpbq.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_MkBTRRY-eWPNaXGXhyv0tA_Auj2FhPF';

let clientSideSupabase: SupabaseClient | null = null;
function getClientSideSupabase(): SupabaseClient | null {
  if (!clientSideSupabase && SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      clientSideSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (err) {
      console.warn('[Supabase Client-Side Init Error]:', err);
    }
  }
  return clientSideSupabase;
}

async function insertDirectlyToSupabase(payload: EnquiryPayload, callerName: string, requirementClean: string) {
  const sb = getClientSideSupabase();
  if (!sb) {
    throw new Error('Supabase client unavailable');
  }

  const rowData: Record<string, any> = {
    name: callerName,
    phone: payload.phone,
    email: payload.email || null,
    requirement: requirementClean,
    location: payload.preferredLocation || null,
    property_type: payload.propertyType || payload.propertyInterest || null,
    bhk: payload.bhk || null,
    budget: payload.budget || payload.budgetOrArea || null,
    area: payload.area || null,
    message: payload.message || null,
    source: payload.source || 'Website',
  };

  const res = await sb.from('enquiries').insert([rowData]);
  if (res.error) {
    throw res.error;
  }
  return { success: true, enquiryId: 'SUBMITTED' };
}

export async function sendEnquiry(
  payload: EnquiryPayload
): Promise<{ success: boolean; message: string; method?: string; enquiryId?: string | number }> {
  const callerName = payload.fullName || payload.name || 'Website Visitor';
  const requirementClean = payload.requirement || payload.requirementType || 'General Property Enquiry';
  const subject = `New Property Enquiry [${requirementClean}] – ${callerName}`;

  // 1. Try server-side endpoint first (for Node/Express environments)
  try {
    const response = await fetch('/api/enquire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        fullName: callerName,
        requirement: requirementClean,
        destinationEmail: DESTINATION_EMAIL,
        subject,
      }),
    });

    if (response.ok) {
      const data = await response.json().catch(() => null);
      if (data && data.success === true) {
        return {
          success: true,
          message: data.message || 'Your enquiry has been registered in our database.',
          method: 'supabase_api',
          enquiryId: data.enquiryId,
        };
      }
    }
  } catch (err) {
    console.warn('[API Route Unavailable, falling back to direct Supabase]:', err);
  }

  // 2. Fallback to direct client-side Supabase insert (for static shared hosting like MonkeyHost cPanel)
  try {
    const directResult = await insertDirectlyToSupabase(payload, callerName, requirementClean);
    if (directResult.success) {
      return {
        success: true,
        message: 'Your enquiry has been registered in our database. Our advisory desk will contact you shortly.',
        method: 'supabase_direct',
        enquiryId: directResult.enquiryId,
      };
    }
  } catch (directErr: any) {
    console.error('[Direct Supabase Insert Error]:', directErr);
  }

  return {
    success: false,
    message: FAILURE_MESSAGE,
    method: 'fallback_failure',
  };
}

