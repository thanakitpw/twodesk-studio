export interface ImageGroup {
  label: string;
  images: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'cafe' | 'commercial' | 'residential' | 'others';
  location: string;
  year: string;
  area?: string;
  description: string;
  image: string;
  images?: string[];
  imageGroups?: ImageGroup[];
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
    id: 'hidden-sunken-hub',
    title: 'Hidden Sunken Hub',
    category: 'residential',
    location: 'Samut Prakan, Thailand',
    year: '2025',
    area: '100 sq.m.',
    description:
      'An architecture that revives the memory of a place through reinterpretation. Hidden Sunken Hub is a residential project built upon the context of a former school swimming pool — a space that once embodied joy, vibrancy, and inspiration during childhood. The design adopts the concept of Closed–Open Architecture, creating a delicate balance between enclosure and openness.',
    image: '/projects/hidden-sunken-hub/render/render-02.jpg',
    images: [
      '/projects/hidden-sunken-hub/render/render-01.jpg',
      '/projects/hidden-sunken-hub/render/render-02.jpg',
      '/projects/hidden-sunken-hub/render/render-03.jpg',
      '/projects/hidden-sunken-hub/render/render-04.jpg',
      '/projects/hidden-sunken-hub/render/render-05.jpg',
    ],
    imageGroups: [
      {
        label: 'Render 3D & Construction',
        images: [
          '/projects/hidden-sunken-hub/render/render-01.jpg',
          '/projects/hidden-sunken-hub/render/render-02.jpg',
          '/projects/hidden-sunken-hub/render/render-03.jpg',
          '/projects/hidden-sunken-hub/render/render-04.jpg',
          '/projects/hidden-sunken-hub/render/render-05.jpg',
          ...Array.from({ length: 16 }, (_, i) =>
            `/projects/hidden-sunken-hub/construction/photo-${String(i + 1).padStart(2, '0')}.jpg`
          ),
        ],
      },
    ],
  },
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
  {
    id: 'day-in-the-life',
    title: 'A Day in the Life at Two Desk Studio',
    category: 'Studio Life',
    date: 'Dec 2024',
    excerpt:
      'From morning coffee to late-night renders — a glimpse into how our team works together.',
    image:
      'https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/7SKG9HWSF8DXDA2H3V0RPN1XS2.jpg',
  },
  {
    id: 'material-palette',
    title: 'Material Palette: Wood, Concrete & Steel',
    category: 'Design Trends',
    date: 'Nov 2024',
    excerpt:
      'Why these three materials continue to define the look of modern Thai interiors.',
    image:
      'https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/6GMP96ZK01XVNNGBCTJWT2KXQK.jpg',
  },
  {
    id: 'office-sakaew-bts',
    title: 'From Blueprint to Build: Office Sakaew',
    category: 'Behind the Scenes',
    date: 'Oct 2024',
    excerpt:
      'The creative journey of transforming a blank canvas into a dynamic office space.',
    image:
      'https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/5X8HXKMAD0GWBEAV630BRTGVSY.jpg',
  },
  {
    id: 'small-space-condo',
    title: 'Small Space, Big Impact: Condo Design Guide',
    category: 'Tips',
    date: 'Sep 2024',
    excerpt:
      'Practical tips for making the most of compact living spaces without compromising on style.',
    image:
      'https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/0KATTQ0NYTF7T4QVKDX0QH44BC.jpg',
  },
];
