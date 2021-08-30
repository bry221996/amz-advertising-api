require('dotenv').config({ path: __dirname + '/.env.test' });

const config = {
  verbose: true,
  globals: {
    __PROFILE_ID__: process.env.PROFILE_ID,
    __PORTFOLIO_ID__: process.env.PORTFOLIO_ID,
    __SP_CAMPAIGN_ID__: process.env.SP_CAMPAIGN_ID,
    __OPTIONS__: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      region: process.env.REGION,
      refreshToken: process.env.REFRESH_TOKEN,
      maxRetry: 2,
      maxWaitTime: 60000,
      profileId: process.env.PROFILE_ID,
    },
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
};

module.exports = config;
