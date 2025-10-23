export type FallbackArticle = {
  title: string;
  url: string;
  urlToImage: string | null;
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
    source: {
      name: 'The Hindu',
    },
  },
  {
    title: 'ISRO successfully tests reusable launch vehicle prototype in Karnataka',
    url: 'https://www.isro.gov.in/ISRO_reusable_launch_vehicle_update.html',
    urlToImage: 'https://www.isro.gov.in/media_isro/image_gallery/rlv/rlv_landing.jpg',
    source: {
      name: 'ISRO',
    },
  },
  {
    title: 'Women’s cricket team seals T20 series against Australia with clinical chase',
    url: 'https://sports.ndtv.com/cricket/india-vs-australia-t20-series-decider-report-6283349',
    urlToImage: 'https://c.ndtvimg.com/2024-11/t3f51upo_india-women-twitter_625x300_11_November_24.jpg',
    source: {
      name: 'NDTV Sports',
    },
  },
  {
    title: 'Delhi unveils comprehensive air quality action plan ahead of winter',
    url: 'https://indianexpress.com/article/cities/delhi/delhi-air-quality-action-plan-2024-9283315/',
    urlToImage: 'https://images.indianexpress.com/2024/10/delhi-pollution-3.jpg',
    source: {
      name: 'The Indian Express',
    },
  },
  {
    title: 'Union Cabinet approves ambitious green hydrogen corridors project',
    url: 'https://economictimes.indiatimes.com/industry/energy/power/cabinet-approves-green-hydrogen-corridors-project/articleshow/112423450.cms',
    urlToImage: 'https://img.etimg.com/thumb/msid-112423481,width-1200,height-900,imgsize-123456,resizemode-8,quality-100/green-hydrogen.jpg',
    source: {
      name: 'The Economic Times',
    },
  },
  {
    title: 'Kerala launches first-of-its-kind digital health mission for telemedicine',
    url: 'https://www.livemint.com/news/india/kerala-launches-digital-health-mission-telemedicine-11727364577098.html',
    urlToImage: 'https://images.livemint.com/img/2024/10/18/600x338/telemedicine_kerala_1697623456123_1697623461559.jpg',
    source: {
      name: 'Mint',
    },
  },
  {
    title: 'Start-up ecosystem sees record funding in climate-tech ventures this year',
    url: 'https://www.financialexpress.com/business/startups/start-up-ecosystem-sees-record-funding-in-climate-tech-ventures-this-year-3550021/',
    urlToImage: 'https://www.financialexpress.com/wp-content/uploads/2024/09/Climate-tech-startups.jpg',
    source: {
      name: 'Financial Express',
    },
  },
  {
    title: 'Indian Railways introduces AI-powered monitoring to enhance safety',
    url: 'https://www.moneycontrol.com/news/business/indian-railways-introduces-ai-powered-monitoring-to-enhance-safety-article-12567321.html',
    urlToImage: 'https://images.moneycontrol.com/static-mcnews/2024/03/Indian-Railways-770x433.jpg',
    source: {
      name: 'Moneycontrol',
    },
  },
];

