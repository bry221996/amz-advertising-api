const AdvertisingClient = require('../../lib/AdvertisingClient');

const spCampaignStructure = ['campaignId', 'name', 'campaignType', 'targetingType', 'premiumBidAdjustment', 'dailyBudget', 'startDate', 'state', 'bidding'];
const spCampaignExStructure = [...spCampaignStructure, 'servingStatus', 'creationDate', 'lastUpdatedDate'];

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

  test('It should get specific sponsored product campaign details', async () => {
    const campaign = await this.client.getCampaign('sponsoredProducts', global.__SP_CAMPAIGN_ID__);

    expect(campaign).toHaveStructure(spCampaignStructure);
  });

  test('It should get specific sponsored product campaign extended details', async () => {
    const campaign = await this.client.getCampaign('sponsoredProducts', global.__SP_CAMPAIGN_ID__, true);

    expect(campaign).toHaveStructure(spCampaignExStructure);
  });

  test('It should update sponsored product campaign details', async () => {
    const response = await this.client.updateCampaigns('sponsoredProducts', [{ campaignId: global.__SP_CAMPAIGN_ID__, state: 'paused', dailyBudget: 20 }]);

    expect(response[0]).toHaveStructure(['code', 'campaignId']);
  });
});
