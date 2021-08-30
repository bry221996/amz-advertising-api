require("dotenv").config({ path: __dirname + "/.env.test" });

const config = {
  verbose: true,
  globals: {
    __OPTIONS__: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      region: process.env.REGION,
      refreshToken: process.env.REFRESH_TOKEN,
      maxRetry: 2,
      maxWaitTime: 60000,
    },
  },
};

module.exports = config;
