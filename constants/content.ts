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
    url: 'https://youtu.be/OlIFXpCQH6w?si=u27T1SF-G82eckdA',
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
    url: 'https://youtu.be/GjkKi6uXxYw?si=KypUI2UntCbJP4HW',
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
    url: 'https://youtu.be/fZcYLBzG7FM?si=ypMJfv6rYH0tziNO',
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
    url: 'https://youtu.be/n_LwI2OQHh8?si=nbSvPtyTB6yZqVuK',
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
    url: 'https://youtu.be/OboT09uRw6M?si=aHibvvgTcFHT_c9G',
    tags: ['urban innovation', 'energy'],
  },
];

export const newsBriefs: NewsBrief[] = [
  {
    slug: 'arctic-cable',
    headline: 'Arctic data cable goes live, bringing low-latency internet to circumpolar towns',
    source: 'Timeline Desk',
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
    source: 'Timeline Policy Lab',
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
    source: 'Timeline Science Lens',
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
    source: 'Timeline Impact Brief',
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
    slug: 'reject-finance-bill-kenya',
    movement: '#RejectFinanceBill protests',
    location: 'Nairobi, Kenya',
    status: 'Mobilisations ongoing',
    update: 'President William Ruto withdrew the 2024 finance bill on 26 June; civic groups now monitor follow-up budget talks.',
    severity: 0.85,
    summary:
      'Youth-led networks and civil society organisations held nationwide marches against new tax increases, citing Finance Bill 2024 provisions on fuel, salaries, and digital transactions. The Kenya National Commission on Human Rights reported at least 39 protest-related deaths.',
    timeline: [
      {
        date: '18 Jun 2024',
        title: '“Occupy Parliament” begins',
        detail: 'Thousands gathered in Nairobi, Mombasa, and Kisumu to oppose the finance bill as police deployed tear gas and water cannons.',
      },
      {
        date: '25 Jun 2024',
        title: 'Parliament stormed',
        detail: 'Demonstrators briefly entered the National Assembly before security forces opened fire, leaving at least 23 dead that day according to Reuters.',
      },
      {
        date: '26 Jun 2024',
        title: 'Finance bill withdrawn',
        detail: 'President Ruto announced he would not sign the bill and would consult on alternative fiscal measures after the unrest.',
      },
    ],
    links: [
      { label: 'Reuters live updates', url: 'https://www.reuters.com/world/africa/kenya-finance-bill-protests-2024-06-26/' },
      { label: 'Amnesty International statement', url: 'https://www.amnesty.org/en/latest/news/2024/06/kenya-government-must-end-violent-crackdown-on-protesters/' },
    ],
  },
  {
    slug: 'argentina-universities-funding',
    movement: 'Universities defend public funding',
    location: 'Buenos Aires, Argentina',
    status: 'Mass march concluded',
    update: 'Rectors entered negotiations with the Milei administration after the 23 April demonstrations over frozen budgets.',
    severity: 0.68,
    summary:
      'Students, faculty, and alumni filled Buenos Aires and provincial capitals demanding updated operating funds as inflation surged above 270% year-on-year.',
    timeline: [
      {
        date: '10 Apr 2024',
        title: 'Rectors warn about shutdowns',
        detail: 'The National Inter-University Council said campuses could not pay utility bills beyond May without revised transfers.',
      },
      {
        date: '23 Apr 2024',
        title: 'Federal march fills Plaza de Mayo',
        detail: 'Hundreds of thousands rallied in Buenos Aires; Reuters reported 200,000 participants while organisers cited more than half a million nationwide.',
      },
      {
        date: '24 Apr 2024',
        title: 'Government agrees to talks',
        detail: 'The education ministry announced working groups on budget adjustments and energy subsidies after the protest.',
      },
    ],
    links: [
      { label: 'Reuters coverage', url: 'https://www.reuters.com/world/americas/hundreds-thousands-protest-argentina-over-university-budget-cuts-2024-04-23/' },
      { label: 'New York Times report', url: 'https://www.nytimes.com/2024/04/23/world/americas/argentina-university-protests.html' },
    ],
  },
  {
    slug: 'india-farmers-2024',
    movement: 'Delhi Chalo farmers march',
    location: 'Punjab–Haryana border, India',
    status: 'Negotiations stalled',
    update: 'Farm unions paused their advance toward Delhi on 21 February pending a legal guarantee on minimum support prices.',
    severity: 0.72,
    summary:
      'Thousands of farmers from Punjab and Haryana marched toward the capital seeking legally guaranteed crop prices, debt relief, and pension schemes. Police used drones to drop tear gas as protesters camped at border checkpoints.',
    timeline: [
      {
        date: '13 Feb 2024',
        title: 'March begins',
        detail: 'Farmers attempted to cross barricades at the Shambhu border; authorities fired tear gas shells and closed key highways.',
      },
      {
        date: '18 Feb 2024',
        title: 'Fourth round of talks',
        detail: 'Union ministers offered contracts for five crops but no blanket MSP law, leading unions to continue their agitation.',
      },
      {
        date: '21 Feb 2024',
        title: 'Pause announced',
        detail: 'Farm leaders halted the “Delhi Chalo” march for two days while awaiting a written proposal, keeping encampments in place.',
      },
    ],
    links: [
      { label: 'Al Jazeera explainer', url: 'https://www.aljazeera.com/news/2024/2/21/india-farmers-protest-explained' },
      { label: 'BBC timeline', url: 'https://www.bbc.com/news/world-asia-india-68294657' },
    ],
  },
];

export const governanceSpotlight: GovernanceSpotlight[] = [
  { country: 'Denmark', score: 90, change: 0 },
  { country: 'Singapore', score: 83, change: 0 },
  { country: 'Canada', score: 74, change: 0 },
  { country: 'Seychelles', score: 71, change: 1 },
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
