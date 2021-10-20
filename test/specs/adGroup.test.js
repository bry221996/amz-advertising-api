const AdvertisingClient = require('../../lib/AdvertisingClient');

const spAdGroupStructure = ['adGroupId', 'name', 'campaignId', 'defaultBid', 'state'];
const spAdGroupExStructure = [...spAdGroupStructure, 'servingStatus', 'creationDate', 'lastUpdatedDate'];

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

  test('It should get specific sponsored product ad group details', async () => {
    const adGroup = await this.client.getAdGroup('sponsoredProducts', global.__SP_AD_GROUP_ID__);

    expect(adGroup).toHaveStructure(spAdGroupStructure);
  });

  test('It should get specific sponsored product ad group extended details', async () => {
    const adGroup = await this.client.getAdGroup('sponsoredProducts', global.__SP_AD_GROUP_ID__, true);

    expect(adGroup).toHaveStructure(spAdGroupExStructure);
  });

  test('It should update sponsored product ad group details', async () => {
    const response = await this.client.updateAdGroups('sponsoredProducts', [
      { adGroupId: global.__SP_AD_GROUP_ID__, name: 'updated name', state: 'enabled', defaultBid: 20 },
    ]);

    expect(response[0]).toHaveStructure(['code', 'adGroupId']);
  });
});
