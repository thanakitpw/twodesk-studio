export interface Project {
  id: string;
  title: string;
  category: 'cafe' | 'commercial' | 'residential' | 'others';
  location: string;
  year: string;
  description: string;
  image: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: 'flow-the-hub',
    title: 'Flow the Hub',
    category: 'cafe',
    location: 'Bangkok, Thailand',
    year: '2024',
    description:
      'A modern cafe hub designed to blend the energy of urban life with the calm of nature. The space features open-plan seating, natural materials, and a carefully curated palette of warm neutrals that invite guests to linger. Every detail — from the custom lighting fixtures to the handcrafted wooden counters — was designed to create an atmosphere that feels both polished and welcoming.',
    image:
      'https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/6GMP96ZK01XVNNGBCTJWT2KXQK.jpg',
  },
  {
    id: 'office-sakaew',
    title: 'Office Sakaew',
    category: 'commercial',
    location: 'Sakaew, Thailand',
    year: '2024',
    description:
      'A modern office space that balances professionalism with comfort. Located in the heart of Sakaew, this project transforms a conventional workspace into a dynamic environment that promotes creativity and collaboration. The design incorporates flexible meeting areas, private focus zones, and communal spaces that adapt to the evolving needs of the team.',
    image:
      'https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/5X8HXKMAD0GWBEAV630BRTGVSY.jpg',
  },
  {
    id: 'bbambbm-cafe',
    title: 'Bbambbm Cafe',
    category: 'cafe',
    location: 'Bangkok, Thailand',
    year: '2023',
    description:
      'A cozy brick cafe that celebrates the beauty of raw materials and honest construction. The interior features exposed brickwork, steel accents, and warm timber details that create an inviting, industrial-chic atmosphere. The layout was designed to maximize natural light while maintaining intimate seating areas for guests who want a quiet corner to enjoy their coffee.',
    image:
      'https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/0KATTQ0NYTF7T4QVKDX0QH44BC.jpg',
  },
  {
    id: 'mm-bridal-house',
    title: 'MM Bridal House',
    category: 'residential',
    location: 'Bangkok, Thailand',
    year: '2023',
    description:
      'A luxurious bridal house that combines elegance with functionality. The design creates a refined, serene environment where brides-to-be can prepare for their special day in comfort and style. Soft lighting, premium materials, and thoughtful spatial planning come together to form a space that feels both grand and intimately personal.',
    image:
      'https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/7SKG9HWSF8DXDA2H3V0RPN1XS2.jpg',
  },
];

export const articles: Article[] = [
  {
    id: '5-interior-trends',
    title: "5 Interior Trends Shaping Bangkok's Cafe Scene",
    category: 'Design Trends',
    date: 'Mar 2025',
    excerpt:
      "From raw concrete to biophilic design — what's next for the city's most creative spaces.",
    image:
      'https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/03TSGYRBYJSNM6QFJ9AKVSMD9G.jpg',
  },
  {
    id: 'flow-the-hub-bts',
    title: 'How We Designed Flow the Hub from Scratch',
    category: 'Behind the Scenes',
    date: 'Feb 2025',
    excerpt:
      'A behind-the-scenes look at one of our most ambitious cafe projects.',
    image:
      'https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/2RWM1AZK3SASHZ0FDT0YJF33MV.jpg',
  },
  {
    id: 'hiring-design-studio',
    title: 'What to Prepare Before Hiring a Design Studio',
    category: 'Tips',
    date: 'Jan 2025',
    excerpt:
      'Essential questions, budgets, and references you should gather before the first meeting.',
    image:
      'https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/2R9N3369092A7S0HFYXFY63TN7.jpg',
  },
];
