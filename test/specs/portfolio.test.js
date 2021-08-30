const { sample } = require("lodash");
const AdvertisingClient = require("../../lib/AdvertisingClient");

beforeAll(async () => {
  this.client = new AdvertisingClient(global.__OPTIONS__);

  await this.client.refresh();
});

describe("Portfolios", () => {
  test("It should list portfolios", async () => {
    const portfolios = await this.client.listPortfolios();
    const portfolio = sample(portfolios);

    expect(portfolio).toHaveProperty("portfolioId");
    expect(portfolio).toHaveProperty("name");
    expect(portfolio).toHaveProperty("state");
    expect(portfolio).toHaveProperty("inBudget");
  });

  test("It should list portfolios with extended property", async () => {
    const portfolios = await this.client.listPortfolios({}, true);
    const portfolio = sample(portfolios);

    expect(portfolio).toHaveProperty("portfolioId");
    expect(portfolio).toHaveProperty("name");
    expect(portfolio).toHaveProperty("state");
    expect(portfolio).toHaveProperty("inBudget");
    expect(portfolio).toHaveProperty("servingStatus");
    expect(portfolio).toHaveProperty("creationDate");
    expect(portfolio).toHaveProperty("lastUpdatedDate");
  });

  test("It should get portfolio details", async () => {
    const portfolio = await this.client.getPortfolio(global.__PORTFOLIO_ID__);

    expect(portfolio).toHaveProperty("portfolioId");
    expect(portfolio).toHaveProperty("name");
    expect(portfolio).toHaveProperty("state");
    expect(portfolio).toHaveProperty("inBudget");
  });

  test("It should get portfolio extended details", async () => {
    const portfolio = await this.client.getPortfolio(
      global.__PORTFOLIO_ID__,
      true
    );

    expect(portfolio).toHaveProperty("portfolioId");
    expect(portfolio).toHaveProperty("name");
    expect(portfolio).toHaveProperty("state");
    expect(portfolio).toHaveProperty("inBudget");
    expect(portfolio).toHaveProperty("servingStatus");
    expect(portfolio).toHaveProperty("creationDate");
    expect(portfolio).toHaveProperty("lastUpdatedDate");
  });
});
