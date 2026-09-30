import { ProjectPhoto, ShowcaseProject } from '../types';

export const BUSINESS_INFO = {
  companyName: 'Shree Sai Developers (Builders & Developers)',
  shortName: 'Shree Sai Developers',
  tagline: 'Builders & Developers',
  subTagline: 'Your Property. Our Priority.',
  website: 'shreesaideveloper.in',
  websiteUrl: 'https://shreesaideveloper.in',
  email: 'shreesaideveloper.in@gmail.com',
  emailUrl: 'mailto:shreesaideveloper.in@gmail.com',
  phoneDisplay: '+91 98674 78525',
  phoneRaw: '+919867478525',
  callUrl: 'tel:+919867478525',
  whatsappRaw: '919867478525',
  whatsappUrl: 'https://wa.me/919867478525',
  serviceArea: 'Mumbai & MMR',
};

// Official Brochure for Shree Sai Apartment (4.png)
export const OFFICIAL_BROCHURE: ProjectPhoto = {
  id: 'sai-brochure',
  title: 'Official Project Brochure — SHREE SAI APARTMENT',
  category: 'evershine_vasai',
  categoryLabel: 'Official Project Brochure',
  src: '/4.png',
  alt: 'SHREE SAI APARTMENT Official Project Brochure',
  description: 'Official project brochure for SHREE SAI APARTMENT, Evershine, Vasai Verified Development.',
};

// Original Project Photos (1.png through 10.png)
export const ALL_PROJECT_PHOTOS: ProjectPhoto[] = [
  // Boisar Property (Photos 1.png & 2.png - White Building)
  {
    id: 'boisar-1',
    title: 'Boisar Property',
    category: 'boisar',
    categoryLabel: 'Boisar Verified Development',
    src: '/1.png',
    alt: 'Boisar Property in Boisar',
    description: 'Boisar Verified Development — direct developer development with verified structural clearance and clear titles.',
  },
  {
    id: 'boisar-2',
    title: 'Boisar Property',
    category: 'boisar',
    categoryLabel: 'Boisar Verified Development',
    src: '/2.png',
    alt: 'Boisar Property exterior in Boisar',
    description: 'Boisar Verified Development — ready-to-move residential property with clear titles.',
  },

  // SHREE SAI APARTMENT — Evershine, Vasai (Front Elevation: 3.png)
  {
    id: 'vasai-1',
    title: 'SHREE SAI APARTMENT',
    category: 'evershine_vasai',
    categoryLabel: 'Evershine, Vasai Verified Development',
    src: '/3.png',
    alt: 'SHREE SAI APARTMENT - Evershine, Vasai Verified Development',
    description: 'SHREE SAI APARTMENT — Evershine, Vasai Verified Development. Direct developer developments with verified structural clearance and clear titles.',
  },

  // Ongoing Construction Site Images (5.png, 6.png, 7.png, 8.png, 9.png, 10.png)
  {
    id: 'vasai-2',
    title: 'Ongoing Construction Site',
    category: 'evershine_vasai',
    categoryLabel: 'Evershine, Vasai Verified Development',
    src: '/5.png',
    alt: 'SHREE SAI APARTMENT Ongoing Construction Site - Structural Columns & Beams',
    description: 'Ongoing Construction Site — reinforced structural column and beam casting at Evershine, Vasai.',
  },
  {
    id: 'vasai-3',
    title: 'Ongoing Construction Site',
    category: 'evershine_vasai',
    categoryLabel: 'Evershine, Vasai Verified Development',
    src: '/6.png',
    alt: 'SHREE SAI APARTMENT Ongoing Construction Site - R.C.C. Framework',
    description: 'Ongoing Construction Site — verified structural clearance and framework engineering.',
  },
  {
    id: 'vasai-4',
    title: 'Ongoing Construction Site',
    category: 'evershine_vasai',
    categoryLabel: 'Evershine, Vasai Verified Development',
    src: '/7.png',
    alt: 'SHREE SAI APARTMENT Ongoing Construction Site - Slab Casting',
    description: 'Ongoing Construction Site — concrete slab casting with verified quality inspections.',
  },
  {
    id: 'vasai-5',
    title: 'Ongoing Construction Site',
    category: 'evershine_vasai',
    categoryLabel: 'Evershine, Vasai Verified Development',
    src: '/8.png',
    alt: 'SHREE SAI APARTMENT Ongoing Construction Site - Brickwork Elevation',
    description: 'Ongoing Construction Site — outer brickwork elevation and masonry construction.',
  },
  {
    id: 'vasai-6',
    title: 'Ongoing Construction Site',
    category: 'evershine_vasai',
    categoryLabel: 'Evershine, Vasai Verified Development',
    src: '/9.png',
    alt: 'SHREE SAI APARTMENT Ongoing Construction Site - Internal Structural Framing',
    description: 'Ongoing Construction Site — structural framing and utilities coordination.',
  },
  {
    id: 'vasai-7',
    title: 'Ongoing Construction Site',
    category: 'evershine_vasai',
    categoryLabel: 'Evershine, Vasai Verified Development',
    src: '/10.png',
    alt: 'SHREE SAI APARTMENT Ongoing Construction Site - Foundation & Ground Development',
    description: 'Ongoing Construction Site — ground-level development and structural clearance.',
  },
];

// Confirmed Properties with Real Photographs
export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'shree-sai-apartment',
    name: 'Shree Sai Apartment',
    location: 'Evershine, Vasai',
    tagline: 'Evershine, Vasai Development',
    status: 'Available',
    description: 'Residential development located in Evershine, Vasai. Available for Buy / Rent / Heavy Deposit enquiries directly from the developer.',
    coverImage: '/3.png',
    images: ALL_PROJECT_PHOTOS.filter((p) => p.category === 'evershine_vasai'),
    highlights: [
      'Direct Developer Representation',
      'Available for Buy / Rent / Heavy Deposit',
      'Evershine, Vasai Location',
      'Completed Residential Building',
    ],
    configurations: ['Residential Space'],
  },
  {
    id: 'boisar-property',
    name: 'Boisar Property',
    location: 'Boisar',
    tagline: 'Boisar Development',
    status: 'Available',
    description: 'Residential development located in Boisar. Available for Buy / Rent / Heavy Deposit enquiries directly from the developer.',
    coverImage: '/1.png',
    images: ALL_PROJECT_PHOTOS.filter((p) => p.category === 'boisar'),
    highlights: [
      'Direct Developer Representation',
      'Available for Buy / Rent / Heavy Deposit',
      'Boisar Suburban Location',
      'Completed Residential Building',
    ],
    configurations: ['Residential Space'],
  },
];

// WhatsApp URL Generators with pre-filled messages
export const getWhatsAppUrl = (type: 'BUY' | 'SELL' | 'RENT' | 'PROJECT' | 'GENERAL' | 'SAI_APARTMENT' | 'BOISAR_PROPERTY' | 'CUSTOM', customText?: string) => {
  let message = '';

  switch (type) {
    case 'SAI_APARTMENT':
      message = 'Hi Shree Sai Developers, I am interested in Shree Sai Apartment, Evershine, Vasai. Please share the available property details.';
      break;
    case 'BOISAR_PROPERTY':
      message = 'Hi Shree Sai Developers, I am interested in the Boisar Property. Please share the available property details.';
      break;
    case 'BUY':
      message = 'Hi Shree Sai Developers, I am looking to buy a property in Mumbai & MMR. Please share available options.';
      break;
    case 'SELL':
      message = 'Hi Shree Sai Developers, I want to sell my property. Please contact me regarding the selling process.';
      break;
    case 'RENT':
      message = 'Hi Shree Sai Developers, I am looking to rent a property in Mumbai & MMR. Please share suitable options.';
      break;
    case 'PROJECT':
      message = 'Hi Shree Sai Developers, I am interested in this property. Please share the available property details.';
      break;
    case 'GENERAL':
      message = 'Hi Shree Sai Developers, I am looking for a property in Mumbai & MMR. I would like assistance with my requirement.';
      break;
    case 'CUSTOM':
      message = customText || 'Hi Shree Sai Developers, I am looking for a property in Mumbai & MMR. I would like assistance with my requirement.';
      break;
  }

  return `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(message)}`;
};

export const generateProjectWhatsAppUrl = (projectName: string, location?: string) => {
  if (projectName.toLowerCase().includes('sai')) {
    return getWhatsAppUrl('SAI_APARTMENT');
  }
  if (projectName.toLowerCase().includes('boisar')) {
    return getWhatsAppUrl('BOISAR_PROPERTY');
  }
  const text = `Hi Shree Sai Developers, I am interested in ${projectName}${location ? `, ${location}` : ''}. Please share the available property details.`;
  return `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
};

export const generateBuyWhatsAppUrl = (data: {
  name: string;
  phone: string;
  email?: string;
  preferredLocation: string;
  propertyType: string;
  bhk: string;
  budget: string;
  additionalRequirements?: string;
}) => {
  const text = `Hi Shree Sai Developers,

I am interested in BUYING a property.

Name: ${data.name || 'Customer'}
Phone: ${data.phone || 'N/A'}
${data.email ? `Email: ${data.email}\n` : ''}Preferred Location: ${data.preferredLocation || 'Mumbai & MMR'}
Property Type: ${data.propertyType || 'Apartment / Flat'}
Configuration: ${data.bhk || 'Any'}
Budget: ${data.budget || 'As discussed'}
${data.additionalRequirements ? `Additional Notes: ${data.additionalRequirements}\n` : ''}
Please share suitable available options.`;

  return `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
};

export const generateSellWhatsAppUrl = (data: {
  ownerName: string;
  phone: string;
  email?: string;
  propertyLocation: string;
  propertyType: string;
  bhk: string;
  approximateArea?: string;
  expectedPrice: string;
  additionalDetails?: string;
}) => {
  const text = `Hi Shree Sai Developers,

I want to SELL my property.

Owner Name: ${data.ownerName || 'Property Owner'}
Phone: ${data.phone || 'N/A'}
${data.email ? `Email: ${data.email}\n` : ''}Property Location: ${data.propertyLocation || 'Mumbai & MMR'}
Property Type: ${data.propertyType || 'Apartment / Flat'}
Configuration: ${data.bhk || 'N/A'}
${data.approximateArea ? `Approx Area: ${data.approximateArea}\n` : ''}Expected Price: ${data.expectedPrice || 'Open to discussion'}
${data.additionalDetails ? `Details: ${data.additionalDetails}\n` : ''}
Please contact me regarding the selling process.`;

  return `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
};

export const generateRentWhatsAppUrl = (data: {
  name: string;
  phone: string;
  email?: string;
  preferredLocation: string;
  propertyType: string;
  bhk: string;
  monthlyBudget: string;
  additionalRequirements?: string;
}) => {
  const text = `Hi Shree Sai Developers,

I am looking to RENT a property.

Name: ${data.name || 'Tenant'}
Phone: ${data.phone || 'N/A'}
${data.email ? `Email: ${data.email}\n` : ''}Preferred Location: ${data.preferredLocation || 'Mumbai & MMR'}
Property Type: ${data.propertyType || 'Apartment / Flat'}
Configuration: ${data.bhk || 'Any'}
Monthly Budget: ${data.monthlyBudget || 'As discussed'}
${data.additionalRequirements ? `Additional Notes: ${data.additionalRequirements}\n` : ''}
Please share suitable rental options.`;

  return `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
};

export const generateSearchWhatsAppUrl = (filters: {
  requirement: string;
  location: string;
  propertyType: string;
  budget: string;
}) => {
  const text = `Hi Shree Sai Developers,

I searched on your website for:
Requirement: ${filters.requirement}
Location: ${filters.location || 'Mumbai & MMR'}
Property Type: ${filters.propertyType || 'Any'}
Budget: ${filters.budget || 'Any'}

Please assist me in finding a suitable property matching these requirements.`;

  return `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
};

export const GOOGLE_MAPS_LINKS = {
  evershine_vasai: 'https://www.google.com/maps/search/?api=1&query=Evershine+City+Vasai+East+Maharashtra',
  boisar: 'https://www.google.com/maps/search/?api=1&query=Boisar+Maharashtra',
};

export const POPULAR_MUMBAI_LOCATIONS = [
  'Evershine, Vasai',
  'Vasai East / West',
  'Virar East / West',
  'Boisar / Palghar',
  'Mira Road / Bhayandar',
  'Borivali / Kandivali',
  'Malad / Goregaon',
  'Andheri / Jogeshwari',
  'Thane West / Majiwada',
  'Navi Mumbai (Vashi / Kharghar / Panvel)',
  'Central Mumbai (Dadar / Sion)',
  'Other Mumbai / MMR Region',
];

export const PREFERRED_LOCATIONS = [
  'Vasai',
  'Nalasopara',
  'Virar',
  'Boisar',
  'Mira Road',
  'Bhayandar',
  'Thane',
  'Borivali',
  'Kandivali',
  'Malad',
  'Goregaon',
  'Andheri',
  'Jogeshwari',
  'Bandra',
  'Mumbai — Other',
  'Other Location',
] as const;
