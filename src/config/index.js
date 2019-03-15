module.exports = {
  DEBUG: process.env.NODE_ENV === 'development',

  siteName: 'Nfolio',
  author: 'Nick Lewis',
  description: 'The Photography Site',
  twitter: '@nicklewis',
  fbUserId: '@nicklewis',
  fbAppID: '@nicklewis',
  type: 'website',

  GRAPHQL_ENDPOINT: 'https://api.nfolio.com',
  GRAPHQL_ENDPOINT_DEV: 'http://localhost:4000',
  siteUrl: 'https://www.nfolio.com',
  mediumPublicationUrl: 'https://medium.com/nfolio',
  googleAnalytics: '',
  stripePublishableKey:
    process.env.NODE_ENV === 'development'
      ? 'pk_test_jC20tTpRVutAthAuJephCfQQ'
      : 'pk_live_f28TMSgbconkpJtSfPFC037Q',
  deliveryCharges: 2,

  backgroundColor: '#e0e0e0',
  themeColor: '#c62828',
  primaryColor: '#ef4566',
  secondaryColor: '#2876C4',
  logo: '/images/nfolio.png',
  homeBannerImage: '/images/home-bg-3.jpg',
};
