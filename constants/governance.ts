export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

export type GovernanceRecord = {
  name: string;
  region: Region;
  score: number;
  rank: number;
  change: number;
  brief: string;
  source: string;
};

export const governanceIndexRecords: GovernanceRecord[] = [
  {
    name: 'Denmark',
    region: 'Europe',
    score: 90,
    rank: 1,
    change: 0,
    brief:
      'Denmark retained the top CPI spot in 2023 with a score of 90. Transparency International credits consistent enforcement of whistleblower protections while warning lawmakers to close anti-money laundering loopholes exposed by the Danske Bank scandal.',
    source: 'Transparency International · Corruption Perceptions Index 2023 (published Jan 30, 2024)',
  },
  {
    name: 'Finland',
    region: 'Europe',
    score: 87,
    rank: 2,
    change: 0,
    brief:
      'Finland shares second place with high confidence in public institutions despite coalition debates over defence procurement transparency.',
    source: 'Transparency International · Corruption Perceptions Index 2023 (published Jan 30, 2024)',
  },
  {
    name: 'New Zealand',
    region: 'Oceania',
    score: 85,
    rank: 3,
    change: -2,
    brief:
      'New Zealand slipped two points amid ongoing Serious Fraud Office probes into political fundraising but remains the strongest performer in Oceania.',
    source: 'Transparency International · Corruption Perceptions Index 2023 (published Jan 30, 2024)',
  },
  {
    name: 'Norway',
    region: 'Europe',
    score: 84,
    rank: 4,
    change: 0,
    brief:
      'Norway’s score is unchanged; parliament backed stricter lobbying registers after scrutiny of energy-sector influence in 2023.',
    source: 'Transparency International · Corruption Perceptions Index 2023 (published Jan 30, 2024)',
  },
  {
    name: 'Singapore',
    region: 'Asia',
    score: 83,
    rank: 5,
    change: 0,
    brief:
      'Singapore leads Asia with a score of 83. The city-state expanded asset recovery rules following the S$3 billion money laundering probe involving foreign nationals.',
    source: 'Transparency International · Corruption Perceptions Index 2023 (published Jan 30, 2024)',
  },
  {
    name: 'Sweden',
    region: 'Europe',
    score: 82,
    rank: 6,
    change: -1,
    brief:
      'Sweden dropped one point as inquiries into procurement oversight for the COVID-19 response highlighted documentation gaps.',
    source: 'Transparency International · Corruption Perceptions Index 2023 (published Jan 30, 2024)',
  },
  {
    name: 'Canada',
    region: 'Americas',
    score: 74,
    rank: 12,
    change: 0,
    brief:
      'Canada remains the best performer in the Americas, with the Auditor General urging faster implementation of beneficial ownership registries for real-estate transactions.',
    source: 'Transparency International · Corruption Perceptions Index 2023 (published Jan 30, 2024)',
  },
  {
    name: 'Uruguay',
    region: 'Americas',
    score: 73,
    rank: 14,
    change: -1,
    brief:
      'Uruguay dropped a point amid debates on military procurement transparency, but civil society praises its access-to-information reforms.',
    source: 'Transparency International · Corruption Perceptions Index 2023 (published Jan 30, 2024)',
  },
  {
    name: 'United States',
    region: 'Americas',
    score: 69,
    rank: 24,
    change: 0,
    brief:
      'The United States holds steady at 69; 2023 watchdog reports focused on Supreme Court ethics disclosures and state-level voting rights rollbacks.',
    source: 'Transparency International · Corruption Perceptions Index 2023 (published Jan 30, 2024)',
  },
  {
    name: 'Seychelles',
    region: 'Africa',
    score: 71,
    rank: 20,
    change: 1,
    brief:
      'Seychelles is Africa’s highest scorer after creating a public register of beneficial owners and empowering its Anti-Corruption Commission with new prosecutorial powers.',
    source: 'Transparency International · Corruption Perceptions Index 2023 (published Jan 30, 2024)',
  },
  {
    name: 'Botswana',
    region: 'Africa',
    score: 59,
    rank: 39,
    change: -1,
    brief:
      'Botswana remains a regional leader but lost ground because of concerns about oversight of diamond revenue and state-owned enterprises.',
    source: 'Transparency International · Corruption Perceptions Index 2023 (published Jan 30, 2024)',
  },
  {
    name: 'Rwanda',
    region: 'Africa',
    score: 53,
    rank: 49,
    change: 2,
    brief:
      'Rwanda gained two points, with Transparency International highlighting continued digitalisation of public services and tender monitoring.',
    source: 'Transparency International · Corruption Perceptions Index 2023 (published Jan 30, 2024)',
  },
  {
    name: 'United Arab Emirates',
    region: 'Asia',
    score: 67,
    rank: 27,
    change: 0,
    brief:
      'The UAE maintained its 67 score while pushing new corporate transparency rules before hosting COP28, though NGOs call for stronger protections for whistleblowers.',
    source: 'Transparency International · Corruption Perceptions Index 2023 (published Jan 30, 2024)',
  },
  {
    name: 'Chile',
    region: 'Americas',
    score: 66,
    rank: 29,
    change: -1,
    brief:
      'Chile’s score edged down amid investigations into the “Convenios” public housing contracts scandal, prompting President Boric to announce tougher oversight in 2023.',
    source: 'Transparency International · Corruption Perceptions Index 2023 (published Jan 30, 2024)',
  },
  {
    name: 'South Korea',
    region: 'Asia',
    score: 63,
    rank: 32,
    change: 0,
    brief:
      'South Korea held steady as its Anti-Corruption and Civil Rights Commission rolled out new disclosure rules for senior officials following the 2022 stock-trading probe.',
    source: 'Transparency International · Corruption Perceptions Index 2023 (published Jan 30, 2024)',
  },
  {
    name: 'Costa Rica',
    region: 'Americas',
    score: 55,
    rank: 45,
    change: 1,
    brief:
      'Costa Rica ticked up thanks to digital procurement reforms and judicial transparency updates introduced after the “Cochinilla” construction bribery trials.',
    source: 'Transparency International · Corruption Perceptions Index 2023 (published Jan 30, 2024)',
  },
  {
    name: 'France',
    region: 'Europe',
    score: 71,
    rank: 21,
    change: -1,
    brief:
      'France slipped a point after Senate inquiries into foreign influence over infrastructure concessions pushed for wider lobbying disclosures.',
    source: 'Transparency International · Corruption Perceptions Index 2023 (published Jan 30, 2024)',
  },
];

export const governanceRegions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] as const;
