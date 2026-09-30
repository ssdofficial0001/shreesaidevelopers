export interface ClientReview {
  id: string;
  initials: string;
  name: string;
  location: string;
  quote: string;
  date: string;
  genderHint?: 'male' | 'female';
  rating: number; // 5
  circleColor: {
    bg: string;
    text: string;
    border?: string;
  };
}

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'review-1',
    initials: 'RP',
    name: 'Rahul Patel',
    location: 'Evershine City, Vasai (E)',
    quote: 'Evershine me 1BHK ka best deal mila, pura loan process karwa diya',
    date: '2 weeks ago',
    genderHint: 'male',
    rating: 5,
    circleColor: {
      bg: 'bg-[#C5A869]',
      text: 'text-stone-950 font-extrabold',
      border: 'border-[#B39352]',
    },
  },
  {
    id: 'review-2',
    initials: 'AK',
    name: 'Amit Kadam',
    location: 'Evershine Global City, Virar (W)',
    quote: 'Global City me 2BHK ka rate sabse best mila yaha',
    date: '3 weeks ago',
    genderHint: 'male',
    rating: 5,
    circleColor: {
      bg: 'bg-emerald-600',
      text: 'text-white font-bold',
      border: 'border-emerald-700',
    },
  },
  {
    id: 'review-3',
    initials: 'VS',
    name: 'Vikas Singh',
    location: 'Vasai West, Papdi',
    quote: 'Vasai me property ka genuine rate, no brokerage hidden',
    date: '2 months ago',
    genderHint: 'male',
    rating: 5,
    circleColor: {
      bg: 'bg-blue-600',
      text: 'text-white font-bold',
      border: 'border-blue-700',
    },
  },
  {
    id: 'review-4',
    initials: 'PM',
    name: 'Pooja More',
    location: 'Evershine Avenue, Vasai (E)',
    quote: 'Evershine Avenue me flat liya, family ke liye perfect location',
    date: '1 month ago',
    genderHint: 'female',
    rating: 5,
    circleColor: {
      bg: 'bg-purple-600',
      text: 'text-white font-bold',
      border: 'border-purple-700',
    },
  },
  {
    id: 'review-5',
    initials: 'NT',
    name: 'Nilesh Thakur',
    location: 'Virar East, Manvelpada',
    quote: 'Virar East me 1BHK budget me mil gaya',
    date: '3 weeks ago',
    genderHint: 'male',
    rating: 5,
    circleColor: {
      bg: 'bg-orange-500',
      text: 'text-white font-bold',
      border: 'border-orange-600',
    },
  },
  {
    id: 'review-6',
    initials: 'SG',
    name: 'Sachin Gupta',
    location: 'Vasai East, Evershine City',
    quote: 'Investment ke liye liya Evershine me',
    date: '2 weeks ago',
    genderHint: 'male',
    rating: 5,
    circleColor: {
      bg: 'bg-teal-600',
      text: 'text-white font-bold',
      border: 'border-teal-700',
    },
  },
  {
    id: 'review-7',
    initials: 'RJ',
    name: 'Rajesh Jaiswal',
    location: 'Nalasopara West',
    quote: 'Nalasopara se Vasai shift hue, service best thi',
    date: '1 month ago',
    genderHint: 'male',
    rating: 5,
    circleColor: {
      bg: 'bg-rose-600',
      text: 'text-white font-bold',
      border: 'border-rose-700',
    },
  },
  {
    id: 'review-8',
    initials: 'SP',
    name: 'Sneha Patil',
    location: 'Virar West, Global City',
    quote: 'Virar me 2BHK lena tha, best society suggest ki',
    date: '3 weeks ago',
    genderHint: 'female',
    rating: 5,
    circleColor: {
      bg: 'bg-pink-600',
      text: 'text-white font-bold',
      border: 'border-pink-700',
    },
  },
  {
    id: 'review-9',
    initials: 'DK',
    name: 'Deepak Kulkarni',
    location: 'Evershine Global City Phase 2',
    quote: 'Global City Phase 2 me deal smooth ho gayi',
    date: '4 weeks ago',
    genderHint: 'male',
    rating: 5,
    circleColor: {
      bg: 'bg-emerald-900',
      text: 'text-white font-bold',
      border: 'border-emerald-950',
    },
  },
  {
    id: 'review-10',
    initials: 'MK',
    name: 'Manoj Keni',
    location: 'Vasai-Virar, Kaman',
    quote: 'Local knowledge solid hai, inse best koi nahi',
    date: '2 months ago',
    genderHint: 'male',
    rating: 5,
    circleColor: {
      bg: 'bg-[#78350f]',
      text: 'text-white font-bold',
      border: 'border-[#5c280b]',
    },
  },
];
