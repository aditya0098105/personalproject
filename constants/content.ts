export type Documentary = {
  slug: string;
  title: string;
  duration: string;
  summary: string;
  image: string;
  url: string;
  tags: string[];
};

export type NewsBrief = {
  slug: string;
  headline: string;
  source: string;
  time: string;
  summary: string;
  image: string;
  url: string;
};

export type ProtestDeepDive = {
  slug: string;
  movement: string;
  location: string;
  status: string;
  update: string;
  severity: number;
  summary: string;
  timeline: { date: string; title: string; detail: string }[];
  links: { label: string; url: string }[];
};

export type GovernanceSpotlight = {
  country: string;
  score: number;
  change: number;
};

export const documentaryLibrary: Documentary[] = [
  {
    slug: 'himalayan-melt',
    title: 'Himalayan Melt: Water Towers at Risk',
    duration: '47 min · Documentary',
    summary:
      'A high-altitude expedition follows Nepali glaciologists as they race to protect Himalayan communities from the threat of outburst floods.',
    image:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
    url: 'https://www.youtube.com/watch?v=1m3G6hQvY6c',
    tags: ['climate', 'himalayas', 'water security'],
  },
  {
    slug: 'amazon-guardians',
    title: 'Guardians of the Amazon Canopy',
    duration: '52 min · Investigative film',
    summary:
      'Indigenous forest rangers across Brazil and Peru deploy open-source tools to document illegal logging in real time.',
    image:
      'https://images.unsplash.com/photo-1509098681029-b45e9c845022?auto=format&fit=crop&w=1600&q=80',
    url: 'https://www.youtube.com/watch?v=X1eK5RK5Sg8',
    tags: ['biodiversity', 'indigenous leadership'],
  },
  {
    slug: 'delta-defenders',
    title: 'Delta Defenders',
    duration: '44 min · Docuseries',
    summary:
      'As cyclones intensify, community engineers in Bangladesh design amphibious schools and clinics to keep learning alive.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    url: 'https://www.youtube.com/watch?v=1WmNXEVia8I',
    tags: ['resilience', 'education'],
  },
  {
    slug: 'atlantic-sound',
    title: 'Atlantic Sound: The Ocean Listens Back',
    duration: '58 min · Documentary',
    summary:
      'Marine biologists from Senegal to Portugal collaborate on an acoustic map that reveals the health of the Atlantic Ocean.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    url: 'https://www.youtube.com/watch?v=VQmWpCj9zNE',
    tags: ['oceans', 'science'],
  },
  {
    slug: 'city-of-light',
    title: 'City of Light: Lagos After Dark',
    duration: '39 min · Short film',
    summary:
      'A portrait of the organisers turning Lagos night markets into hubs for clean energy and safe commutes.',
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
    url: 'https://www.youtube.com/watch?v=uO4-9lYX_8w',
    tags: ['urban innovation', 'energy'],
  },
];

export const newsBriefs: NewsBrief[] = [
  {
    slug: 'arctic-cable',
    headline: 'Arctic data cable goes live, bringing low-latency internet to circumpolar towns',
    source: 'Studio Signal',
    time: '2h ago',
    summary:
      'The new fiber corridor spans 7,000 km and was co-funded by an alliance of Inuit nations to prioritize community-owned bandwidth.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    url: 'https://www.youtube.com/watch?v=a8s8eK2TqVQ',
  },
  {
    slug: 'circular-cities',
    headline: 'Ten cities commit to circular construction codes with open procurement data',
    source: 'Signal Policy Desk',
    time: '4h ago',
    summary:
      'Mayors from Lagos, Helsinki, and Quito will publish all public works tenders with zero-waste requirements starting next quarter.',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
    url: 'https://www.youtube.com/watch?v=o0KQl7O0zS4',
  },
  {
    slug: 'coral-engineers',
    headline: 'Robotics labs unveil coral nurseries that grow reefs four times faster',
    source: 'Science Lens',
    time: 'Today',
    summary:
      'Engineers in Jakarta and Honolulu use low-voltage mineral accretion frames to regenerate devastated coral habitats.',
    image:
      'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&w=1400&q=80',
    url: 'https://www.youtube.com/watch?v=AM0CEhfzS9k',
  },
  {
    slug: 'youth-climate-bonds',
    headline: 'Youth-led climate bonds raise $3.2B for coastal defense projects',
    source: 'Impact Finance Brief',
    time: 'Yesterday',
    summary:
      'Student cooperatives in Manila and Rotterdam co-designed the securities to fund mangrove expansion and early warning systems.',
    image:
      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1400&q=80',
    url: 'https://www.youtube.com/watch?v=Y9fSL9dS8tY',
  },
];

export const protestDeepDives: ProtestDeepDive[] = [
  {
    slug: 'education-equity-chile',
    movement: 'Education Equity Coalition',
    location: 'Santiago, Chile',
    status: 'Peaceful sit-ins ongoing',
    update: 'Government to host national dialogue on tuition reform this Friday.',
    severity: 0.62,
    summary:
      'Students, teachers, and parents are occupying public squares to demand tuition caps, rural broadband access, and transparent scholarship funds.',
    timeline: [
      {
        date: 'Mon · 08:30',
        title: 'Citywide teach-ins',
        detail: 'Over 220 classrooms streamed digital rights seminars with union lawyers and civic technologists.',
      },
      {
        date: 'Wed · 19:00',
        title: 'Ministry roundtable',
        detail: 'Education minister invites coalition delegates and opposition parties to negotiate long-term funding commitments.',
      },
      {
        date: 'Fri · 12:00',
        title: 'National dialogue',
        detail: 'Live broadcast of policy workshop featuring regional governors and student-led policy prototypes.',
      },
    ],
    links: [
      { label: 'Coalition charter', url: 'https://www.youtube.com/watch?v=ZoSXg0a5T-4' },
      { label: 'Community livestream', url: 'https://www.youtube.com/watch?v=66tu4G3oGxQ' },
    ],
  },
  {
    slug: 'future-of-media-poland',
    movement: 'Future of Media Alliance',
    location: 'Warsaw, Poland',
    status: 'Journalist march planned',
    update: 'Independent press clubs request EU mediation on new licensing bill.',
    severity: 0.48,
    summary:
      'Media outlets and civil society groups coordinate a march to defend independent broadcasting licenses and whistleblower protections.',
    timeline: [
      {
        date: 'Tue · 10:00',
        title: 'Press freedom forum',
        detail: 'Regional correspondents share legal resources for newsroom safety and anti-surveillance protocols.',
      },
      {
        date: 'Thu · 17:00',
        title: 'March rehearsal',
        detail: 'Organisers walk the planned downtown route to map police liaison checkpoints and accessibility ramps.',
      },
      {
        date: 'Sat · 14:00',
        title: 'Alliance march',
        detail: 'Live reporting teams partner with citizen journalists for real-time documentation.',
      },
    ],
    links: [
      { label: 'Media safety toolkit', url: 'https://www.youtube.com/watch?v=l0U7SxXHkPY' },
      { label: 'EU rights explainer', url: 'https://www.youtube.com/watch?v=9Auq9mYxFEE' },
    ],
  },
  {
    slug: 'blue-air-nigeria',
    movement: 'Blue Air Coalition',
    location: 'Lagos, Nigeria',
    status: 'Evening demonstrations',
    update: 'City pledges transparent pollution data release before weekend.',
    severity: 0.71,
    summary:
      'Neighbourhood clean-air networks are publishing DIY sensor data to demand immediate regulation of diesel generators and port traffic.',
    timeline: [
      {
        date: 'Mon · 06:00',
        title: 'Sensor calibration',
        detail: 'Volunteers calibrate 500+ low-cost PM2.5 monitors across the Lagos Lagoon district.',
      },
      {
        date: 'Thu · 20:00',
        title: 'Night market canvass',
        detail: 'Health workers staff pop-up clinics to provide respiratory screenings and collect impact testimonies.',
      },
      {
        date: 'Sun · 16:30',
        title: 'City hall forum',
        detail: 'Coalition negotiates with port authorities on emission caps tied to community-owned solar microgrids.',
      },
    ],
    links: [
      { label: 'Air quality dashboard', url: 'https://www.youtube.com/watch?v=HJa33J30qQA' },
      { label: 'Health impact report', url: 'https://www.youtube.com/watch?v=mcixldqDIEQ' },
    ],
  },
];

export const governanceSpotlight: GovernanceSpotlight[] = [
  { country: 'Finland', score: 92, change: +2 },
  { country: 'New Zealand', score: 89, change: +3 },
  { country: 'Canada', score: 84, change: +1 },
  { country: 'Costa Rica', score: 81, change: 0 },
];

export const protestWatchHighlights = protestDeepDives.map(({ movement, location, status, update, severity, slug }) => ({
  movement,
  region: location,
  status,
  update,
  severity,
  slug,
}));

export const documentarySpotlight = documentaryLibrary.slice(0, 3);
