export type FallbackArticle = {
  title: string;
  url: string;
  urlToImage: string | null;
  author?: string | null;
  description?: string | null;
  content?: string | null;
  source: {
    name: string;
  };
};

export const FALLBACK_ARTICLES: FallbackArticle[] = [
  {
    title: 'Indian economy posts resilient growth as services surge in Q2 FY25',
    url: 'https://www.thehindu.com/business/Economy/indian-economy-posts-resilient-growth-as-services-surge-in-q2-fy25/article68642044.ece',
    urlToImage:
      'https://www.thehindu.com/incoming/nrwj1s/article68642045.ece/ALTERNATES/LANDSCAPE_1200/INDIA%20ECONOMY.JPG',
    author: 'The Hindu Bureau',
    description:
      'India’s GDP held firm in the second quarter of FY25 as resilient services demand and capital expenditure kept growth on track despite global headwinds.',
    content:
      'Fresh GDP estimates highlight resilient services demand, robust government capex, and steady consumption, underscoring the Indian economy’s continued strength in FY25.',
    source: {
      name: 'The Hindu',
    },
  },
  {
    title: 'ISRO successfully tests reusable launch vehicle prototype in Karnataka',
    url: 'https://www.isro.gov.in/ISRO_reusable_launch_vehicle_update.html',
    urlToImage: 'https://www.isro.gov.in/media_isro/image_gallery/rlv/rlv_landing.jpg',
    author: 'ISRO Team',
    description:
      'The space agency completed a critical landing experiment for its reusable launch vehicle, advancing efforts to make access to space more affordable.',
    content:
      'The prototype executed a precision approach and autonomous landing in Karnataka, marking a major milestone for ISRO’s plans to develop reusable space transportation systems.',
    source: {
      name: 'ISRO',
    },
  },
  {
    title: 'Women’s cricket team seals T20 series against Australia with clinical chase',
    url: 'https://sports.ndtv.com/cricket/india-vs-australia-t20-series-decider-report-6283349',
    urlToImage: 'https://c.ndtvimg.com/2024-11/t3f51upo_india-women-twitter_625x300_11_November_24.jpg',
    author: 'NDTV Sports Desk',
    description:
      'Smriti Mandhana’s composed half-century anchored India’s successful chase to clinch the T20 series against Australia in Mumbai.',
    content:
      'A disciplined bowling effort restricted Australia before India’s top order sealed the game with a confident chase, delivering a morale-boosting series win for the women in blue.',
    source: {
      name: 'NDTV Sports',
    },
  },
  {
    title: 'Delhi unveils comprehensive air quality action plan ahead of winter',
    url: 'https://indianexpress.com/article/cities/delhi/delhi-air-quality-action-plan-2024-9283315/',
    urlToImage: 'https://images.indianexpress.com/2024/10/delhi-pollution-3.jpg',
    author: 'Express News Service',
    description:
      'The Delhi government outlined a winter action plan that deploys anti-smog guns, mechanised sweeping, and stricter construction norms to curb pollution.',
    content:
      'Officials detailed a multi-agency strategy focusing on controlling dust, monitoring industrial emissions, and managing crop residue burning to keep AQI levels in check.',
    source: {
      name: 'The Indian Express',
    },
  },
  {
    title: 'Union Cabinet approves ambitious green hydrogen corridors project',
    url: 'https://economictimes.indiatimes.com/industry/energy/power/cabinet-approves-green-hydrogen-corridors-project/articleshow/112423450.cms',
    urlToImage: 'https://img.etimg.com/thumb/msid-112423481,width-1200,height-900,imgsize-123456,resizemode-8,quality-100/green-hydrogen.jpg',
    author: 'ET Energy World',
    description:
      'A new policy push will establish dedicated corridors and incentives to accelerate India’s transition to green hydrogen for heavy industries and mobility.',
    content:
      'The approval unlocks funding for infrastructure, electrolyser manufacturing, and pilot projects, signalling India’s commitment to emerging as a global green hydrogen hub.',
    source: {
      name: 'The Economic Times',
    },
  },
  {
    title: 'Kerala launches first-of-its-kind digital health mission for telemedicine',
    url: 'https://www.livemint.com/news/india/kerala-launches-digital-health-mission-telemedicine-11727364577098.html',
    urlToImage: 'https://images.livemint.com/img/2024/10/18/600x338/telemedicine_kerala_1697623456123_1697623461559.jpg',
    author: 'Mint Health Desk',
    description:
      'The Kerala government rolled out a digital health mission that links telemedicine services with hospitals to improve access to specialists across the state.',
    content:
      'Doctors can now consult patients remotely using a unified digital platform, with electronic health records ensuring continuity of care for rural communities.',
    source: {
      name: 'Mint',
    },
  },
  {
    title: 'Start-up ecosystem sees record funding in climate-tech ventures this year',
    url: 'https://www.financialexpress.com/business/startups/start-up-ecosystem-sees-record-funding-in-climate-tech-ventures-this-year-3550021/',
    urlToImage: 'https://www.financialexpress.com/wp-content/uploads/2024/09/Climate-tech-startups.jpg',
    author: 'Financial Express Bureau',
    description:
      'Investors poured record capital into Indian climate-tech start-ups, backing innovations in energy storage, mobility, and carbon management.',
    content:
      'Analysts say the sustained funding momentum highlights the urgency to scale solutions that help industries and cities meet net-zero commitments.',
    source: {
      name: 'Financial Express',
    },
  },
  {
    title: 'Indian Railways introduces AI-powered monitoring to enhance safety',
    url: 'https://www.moneycontrol.com/news/business/indian-railways-introduces-ai-powered-monitoring-to-enhance-safety-article-12567321.html',
    urlToImage: 'https://images.moneycontrol.com/static-mcnews/2024/03/Indian-Railways-770x433.jpg',
    author: 'Moneycontrol News',
    description:
      'A network of AI-enabled cameras and sensors will now monitor tracks and rolling stock in real time to prevent accidents and improve punctuality.',
    content:
      'The system analyses live footage and diagnostics to alert crews about potential hazards, forming part of Indian Railways’ larger safety modernisation drive.',
    source: {
      name: 'Moneycontrol',
    },
  },
];

