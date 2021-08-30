const Regions = {
  na: {
    prod: "advertising-api.amazon.com",
    sandbox: "advertising-api-test.amazon.com",
    tokenUrl: "api.amazon.com/auth/o2/token",
  },
  eu: {
    prod: "advertising-api-eu.amazon.com",
    sandbox: "advertising-api-test.amazon.com",
    tokenUrl: "api.amazon.co.uk/auth/o2/token",
  },
  fe: {
    prod: "advertising-api-fe.amazon.com",
    sandbox: "advertising-api-test.amazon.com",
    tokenUrl: "api.amazon.com/auth/o2/token",
  },
};

module.exports = Regions;
