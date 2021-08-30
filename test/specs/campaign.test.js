const AdvertisingClient = require('../../lib/AdvertisingClient');

beforeAll(async () => {
  this.client = new AdvertisingClient(global.__OPTIONS__);

  await this.client.refresh();
});

describe('Campaigns', () => {
  test('It should list sponsored product campaigns', async () => {
    const campaigns = await this.client.listCampaigns('sponsoredProducts', { count: 1 });
    if (!campaigns.length) return;

    expect(campaigns[0]).toHaveProperty('campaignId');
    expect(campaigns[0]).toHaveProperty('name');
    expect(campaigns[0]).toHaveProperty('campaignType');
    expect(campaigns[0]).toHaveProperty('targetingType');
    expect(campaigns[0]).toHaveProperty('premiumBidAdjustment');
    expect(campaigns[0]).toHaveProperty('dailyBudget');
    expect(campaigns[0]).toHaveProperty('startDate');
    expect(campaigns[0]).toHaveProperty('state');
    expect(campaigns[0]).toHaveProperty('bidding');
  });

  test('It should list sponsored product campaigns with extended details', async () => {
    const campaigns = await this.client.listCampaigns('sponsoredProducts', { count: 1 }, true);
    if (!campaigns.length) return;

    expect(campaigns[0]).toHaveProperty('campaignId');
    expect(campaigns[0]).toHaveProperty('name');
    expect(campaigns[0]).toHaveProperty('campaignType');
    expect(campaigns[0]).toHaveProperty('targetingType');
    expect(campaigns[0]).toHaveProperty('premiumBidAdjustment');
    expect(campaigns[0]).toHaveProperty('dailyBudget');
    expect(campaigns[0]).toHaveProperty('startDate');
    expect(campaigns[0]).toHaveProperty('state');
    expect(campaigns[0]).toHaveProperty('bidding');
    expect(campaigns[0]).toHaveProperty('servingStatus');
    expect(campaigns[0]).toHaveProperty('creationDate');
    expect(campaigns[0]).toHaveProperty('lastUpdatedDate');
  });

  test('It should list sponsored brands campaigns', async () => {
    const campaigns = await this.client.listCampaigns('sponsoredBrands', { count: 1 });
    if (!campaigns.length) return;

    expect(campaigns[0]).toHaveProperty('campaignId');
    expect(campaigns[0]).toHaveProperty('name');
    expect(campaigns[0]).toHaveProperty('budget');
    expect(campaigns[0]).toHaveProperty('bidOptimization');
    expect(campaigns[0]).toHaveProperty('adFormat');
    expect(campaigns[0]).toHaveProperty('budgetType');
    expect(campaigns[0]).toHaveProperty('startDate');
    expect(campaigns[0]).toHaveProperty('state');
    expect(campaigns[0]).toHaveProperty('servingStatus');
    expect(campaigns[0]).toHaveProperty('creative');
    expect(campaigns[0]).toHaveProperty('landingPage');
  });

  test('It should list sponsored display campaigns', async () => {
    const campaigns = await this.client.listCampaigns('sponsoredDisplay', { count: 1 });
    if (!campaigns.length) return;

    expect(campaigns[0]).toHaveProperty('campaignId');
    expect(campaigns[0]).toHaveProperty('name');
    expect(campaigns[0]).toHaveProperty('budget');
    expect(campaigns[0]).toHaveProperty('tactic');
    expect(campaigns[0]).toHaveProperty('costType');
    expect(campaigns[0]).toHaveProperty('budgetType');
    expect(campaigns[0]).toHaveProperty('startDate');
    expect(campaigns[0]).toHaveProperty('state');
    expect(campaigns[0]).toHaveProperty('deliveryProfile');
  });

  test('It should list sponsored display campaigns with extended details', async () => {
    const campaigns = await this.client.listCampaigns('sponsoredDisplay', { count: 1 }, true);
    if (!campaigns.length) return;

    expect(campaigns[0]).toHaveProperty('campaignId');
    expect(campaigns[0]).toHaveProperty('name');
    expect(campaigns[0]).toHaveProperty('budget');
    expect(campaigns[0]).toHaveProperty('tactic');
    expect(campaigns[0]).toHaveProperty('costType');
    expect(campaigns[0]).toHaveProperty('budgetType');
    expect(campaigns[0]).toHaveProperty('startDate');
    expect(campaigns[0]).toHaveProperty('state');
    expect(campaigns[0]).toHaveProperty('deliveryProfile');
    expect(campaigns[0]).toHaveProperty('servingStatus');
    expect(campaigns[0]).toHaveProperty('creationDate');
    expect(campaigns[0]).toHaveProperty('lastUpdatedDate');
  });
});
