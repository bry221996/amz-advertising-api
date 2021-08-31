const AdvertisingClient = require('../../lib/AdvertisingClient');

const spAdGroupStructure = ['adGroupId', 'name', 'campaignId', 'defaultBid', 'state'];
const spAdGroupExStructure = [...spAdGroupStructure, 'servingStatus', 'creationDate', 'lastUpdatedDate'];

const sbAdGroupStructure = ['adGroupId', 'name', 'campaignId', 'bid'];

const sdCampaignStructure = ['campaignId', 'name', 'budget', 'tactic', 'costType', 'budgetType', 'startDate', 'state', 'deliveryProfile'];
const sdCampaignExStructure = [...sdCampaignStructure, 'servingStatus', 'creationDate', 'lastUpdatedDate'];

beforeAll(async () => {
  this.client = new AdvertisingClient(global.__OPTIONS__);

  await this.client.refresh();
});

describe('Ad Groups', () => {
  test('It should list sponsored product ad groups', async () => {
    const adGroups = await this.client.listAdGroups('sponsoredProducts', { count: 1 });
    if (!adGroups.length) return;

    expect(adGroups[0]).toHaveStructure(spAdGroupStructure);
  });

  test('It should list sponsored product ad groups with extended details', async () => {
    const adGroups = await this.client.listAdGroups('sponsoredProducts', { count: 1 }, true);
    if (!adGroups.length) return;

    expect(adGroups[0]).toHaveStructure(spAdGroupExStructure);
  });

  test('It should list sponsored brands ad groups', async () => {
    const adGroups = await this.client.listAdGroups('sponsoredBrands', { count: 1 });
    if (!adGroups.length) return;

    expect(adGroups[0]).toHaveStructure(sbAdGroupStructure);
  });

  // test('It should list sponsored display campaigns', async () => {
  //   const campaigns = await this.client.listCampaigns('sponsoredDisplay', { count: 1 });
  //   if (!campaigns.length) return;

  //   expect(campaigns[0]).toHaveStructure(sdCampaignStructure);
  // });

  // test('It should list sponsored display campaigns with extended details', async () => {
  //   const campaigns = await this.client.listCampaigns('sponsoredDisplay', { count: 1 }, true);
  //   if (!campaigns.length) return;

  //   expect(campaigns[0]).toHaveStructure(sdCampaignExStructure);
  // });

  // test('It should get specific sponsored product campaign details', async () => {
  //   const campaign = await this.client.getCampaign('sponsoredProducts', global.__SP_CAMPAIGN_ID__);

  //   expect(campaign).toHaveStructure(spCampaignStructure);
  // });

  // test('It should get specific sponsored product campaign extended details', async () => {
  //   const campaign = await this.client.getCampaign('sponsoredProducts', global.__SP_CAMPAIGN_ID__, true);

  //   expect(campaign).toHaveStructure(spCampaignExStructure);
  // });

  // test('It should get specific brand product campaign details', async () => {
  //   const campaign = await this.client.getCampaign('sponsoredBrands', global.__SB_CAMPAIGN_ID__);

  //   expect(campaign).toHaveStructure(sbCampaignStructure);
  // });

  // test('It should get specific sponsored product campaign details', async () => {
  //   const campaign = await this.client.getCampaign('sponsoredDisplay', global.__SD_CAMPAIGN_ID__);

  //   expect(campaign).toHaveStructure(sdCampaignStructure);
  // });

  // test('It should get specific sponsored product campaign extended details', async () => {
  //   const campaign = await this.client.getCampaign('sponsoredDisplay', global.__SD_CAMPAIGN_ID__, true);

  //   expect(campaign).toHaveStructure(sdCampaignExStructure);
  // });
});
