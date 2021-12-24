const AdvertisingClient = require('../../lib/AdvertisingClient');

const extendedStructure = ['servingStatus', 'creationDate', 'lastUpdatedDate'];
const keywordStructure = ['keywordId', 'campaignId', 'keywordText', 'matchType', 'state'];

beforeAll(async () => {
  this.client = new AdvertisingClient(global.__OPTIONS__);

  await this.client.refresh();
});

describe('Campaign Negative Keywords', () => {
  test('It should list sponsored product campaign negative keywords', async () => {
    const keywords = await this.client.listCampaignNegativeKeywords('sponsoredProducts', { count: 1 });
    if (!keywords.length) return;

    expect(keywords[0]).toHaveStructure(keywordStructure);
  });

  test('It should list sponsored product campaign negative keywords with extended details', async () => {
    const keywords = await this.client.listCampaignNegativeKeywords('sponsoredProducts', { count: 1 }, true);
    if (!keywords.length) return;

    expect(keywords[0]).toHaveStructure([...keywordStructure, ...extendedStructure]);
  });

  test('It should get specific sponsored product campaign negative keyword details', async () => {
    const keyword = await this.client.getCampaignNegativeKeyword('sponsoredProducts', global.__SP_CAMPAIGN_NEG_KEYWORD_ID__);

    expect(keyword).toHaveStructure(keywordStructure);
  });

  test('It should get specific sponsored product campaign negative keyword extended details', async () => {
    const keyword = await this.client.getCampaignNegativeKeyword('sponsoredProducts', global.__SP_CAMPAIGN_NEG_KEYWORD_ID__, true);

    expect(keyword).toHaveStructure([...keywordStructure, ...extendedStructure]);
  });

  test('It should create sponsored product campaign negative keywords', async () => {
    const response = await this.client.createCampaignNegativeKeywords('sponsoredProducts', [
      {
        campaignId: global.__SP_CAMPAIGN_ID__,
        keywordText: 'keywordText',
        matchType: 'negativeExact',
        state: 'enabled',
      },
    ]);

    expect(response[0]).toHaveStructure(['code', 'keywordId']);
  });
});
