const AdvertisingClient = require('../../lib/AdvertisingClient');

const spCampaignStructure = ['campaignId', 'name', 'campaignType', 'targetingType', 'premiumBidAdjustment', 'dailyBudget', 'startDate', 'state', 'bidding'];
const spCampaignExStructure = [...spCampaignStructure, 'servingStatus', 'creationDate', 'lastUpdatedDate'];

const sbCampaignStructure = ['campaignId', 'name', 'budget', 'bidOptimization', 'adFormat', 'budgetType', 'startDate', 'state', 'servingStatus', 'landingPage'];

const sdCampaignStructure = ['campaignId', 'name', 'budget', 'tactic', 'costType', 'budgetType', 'startDate', 'state', 'deliveryProfile'];
const sdCampaignExStructure = [...sdCampaignStructure, 'servingStatus', 'creationDate', 'lastUpdatedDate'];

beforeAll(async () => {
  this.client = new AdvertisingClient(global.__OPTIONS__);

  await this.client.refresh();
});

describe('Campaigns', () => {
  test('It should list sponsored product campaigns', async () => {
    const campaigns = await this.client.listCampaigns('sponsoredProducts', { count: 1 });
    if (!campaigns.length) return;

    expect(campaigns[0]).toHaveStructure(spCampaignStructure);
  });

  test('It should list sponsored product campaigns with extended details', async () => {
    const campaigns = await this.client.listCampaigns('sponsoredProducts', { count: 1 }, true);
    if (!campaigns.length) return;

    expect(campaigns[0]).toHaveStructure(spCampaignExStructure);
  });

  test('It should list sponsored brands campaigns', async () => {
    const campaigns = await this.client.listCampaigns('sponsoredBrands', { count: 1 });
    if (!campaigns.length) return;

    expect(campaigns[0]).toHaveStructure(sbCampaignStructure);
  });

  test('It should list sponsored display campaigns', async () => {
    const campaigns = await this.client.listCampaigns('sponsoredDisplay', { count: 1 });
    if (!campaigns.length) return;

    expect(campaigns[0]).toHaveStructure(sdCampaignStructure);
  });

  test('It should list sponsored display campaigns with extended details', async () => {
    const campaigns = await this.client.listCampaigns('sponsoredDisplay', { count: 1 }, true);
    if (!campaigns.length) return;

    expect(campaigns[0]).toHaveStructure(sdCampaignExStructure);
  });

  test('It should get specific sponsored product campaign details', async () => {
    const campaign = await this.client.getCampaign('sponsoredProducts', global.__SP_CAMPAIGN_ID__);

    expect(campaign).toHaveStructure(spCampaignStructure);
  });

  test('It should get specific sponsored product campaign extended details', async () => {
    const campaign = await this.client.getCampaign('sponsoredProducts', global.__SP_CAMPAIGN_ID__, true);

    expect(campaign).toHaveStructure(spCampaignExStructure);
  });
});
