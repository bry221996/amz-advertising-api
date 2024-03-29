const AdvertisingClient = require('../../lib/AdvertisingClient');

const extendedStructure = ['servingStatus', 'creationDate', 'lastUpdatedDate'];
const keywordStructure = ['keywordId', 'adGroupId', 'campaignId', 'keywordText', 'matchType', 'state'];

beforeAll(async () => {
  this.client = new AdvertisingClient(global.__OPTIONS__);

  await this.client.refresh();
});

describe('Keywords', () => {
  test('It should list sponsored product keywords', async () => {
    const keywords = await this.client.listKeywords('sponsoredProducts', { count: 1 });
    if (!keywords.length) return;

    expect(keywords[0]).toHaveStructure(keywordStructure);
  });

  test('It should list sponsored product keywords with extended details', async () => {
    const keywords = await this.client.listKeywords('sponsoredProducts', { count: 1 }, true);
    if (!keywords.length) return;

    expect(keywords[0]).toHaveStructure([...keywordStructure, ...extendedStructure]);
  });

  test('It should get specific product keyword details', async () => {
    const keyword = await this.client.getKeyword('sponsoredProducts', global.__SP_KEYWORD_ID__);

    expect(keyword).toHaveStructure(keywordStructure);
  });

  test('It should get specific product keyword extended details', async () => {
    const keyword = await this.client.getKeyword('sponsoredProducts', global.__SP_KEYWORD_ID__, true);

    expect(keyword).toHaveStructure([...keywordStructure, ...extendedStructure]);
  });

  test('It should update keyword details', async () => {
    const response = await this.client.updateKeywords('sponsoredProducts', [{ keywordId: global.__SP_KEYWORD_ID__, state: 'enabled', bid: 20 }]);

    expect(response[0]).toHaveStructure(['code', 'keywordId']);
  });

  test('It should create specific product keywords', async () => {
    const response = await this.client.createKeywords('sponsoredProducts', [
      {
        adGroupId: global.__SP_AD_GROUP_ID__,
        campaignId: global.__SP_CAMPAIGN_ID__,
        keywordText: 'test',
        matchType: 'broad',
        state: 'enabled',
      },
    ]);

    expect(response[0]).toHaveStructure(['code', 'keywordId']);
  });
});
