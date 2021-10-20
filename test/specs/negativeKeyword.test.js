const AdvertisingClient = require('../../lib/AdvertisingClient');

const extendedStructure = ['servingStatus', 'creationDate', 'lastUpdatedDate'];
const keywordStructure = ['keywordId', 'adGroupId', 'campaignId', 'keywordText', 'matchType', 'state'];

beforeAll(async () => {
  this.client = new AdvertisingClient(global.__OPTIONS__);

  await this.client.refresh();
});

describe('Negative Keywords', () => {
  test('It should list sponsored product negative keywords', async () => {
    const keywords = await this.client.listNegativeKeywords('sponsoredProducts', { count: 1 });
    if (!keywords.length) return;

    expect(keywords[0]).toHaveStructure(keywordStructure);
  });

  test('It should list sponsored product negative keywords with extended details', async () => {
    const keywords = await this.client.listNegativeKeywords('sponsoredProducts', { count: 1 }, true);
    if (!keywords.length) return;

    expect(keywords[0]).toHaveStructure([...keywordStructure, ...extendedStructure]);
  });

  test('It should get specific product negative keyword details', async () => {
    const keyword = await this.client.getNegativeKeyword('sponsoredProducts', global.__SP_NEG_KEYWORD_ID__);

    expect(keyword).toHaveStructure(keywordStructure);
  });

  test('It should get specific product negative keyword extended details', async () => {
    const keyword = await this.client.getNegativeKeyword('sponsoredProducts', global.__SP_NEG_KEYWORD_ID__, true);

    expect(keyword).toHaveStructure([...keywordStructure, ...extendedStructure]);
  });
});
