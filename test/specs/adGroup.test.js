const AdvertisingClient = require('../../lib/AdvertisingClient');

const spAdGroupStructure = ['adGroupId', 'name', 'campaignId', 'defaultBid', 'state'];
const spAdGroupExStructure = [...spAdGroupStructure, 'servingStatus', 'creationDate', 'lastUpdatedDate'];

const sbAdGroupStructure = ['adGroupId', 'name', 'campaignId', 'bid'];

const sdAdGroupStructure = ['adGroupId', 'name', 'campaignId', 'defaultBid', 'state', 'bidOptimization', 'tactic'];
const sdAdGroupExStructure = [...sdAdGroupStructure, 'servingStatus', 'creationDate', 'lastUpdatedDate'];

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

  test('It should list sponsored display ad groups', async () => {
    const adGroups = await this.client.listAdGroups('sponsoredDisplay', { count: 1 });
    if (!adGroups.length) return;

    expect(adGroups[0]).toHaveStructure(sdAdGroupStructure);
  });

  test('It should list sponsored display ad groups with extended details', async () => {
    const adGroups = await this.client.listAdGroups('sponsoredDisplay', { count: 1 }, true);
    if (!adGroups.length) return;

    expect(adGroups[0]).toHaveStructure(sdAdGroupExStructure);
  });

  test('It should get specific sponsored product ad group details', async () => {
    const adGroup = await this.client.getAdGroup('sponsoredProducts', global.__SP_AD_GROUP_ID__);

    expect(adGroup).toHaveStructure(spAdGroupStructure);
  });

  test('It should get specific sponsored product ad group extended details', async () => {
    const adGroup = await this.client.getAdGroup('sponsoredProducts', global.__SP_AD_GROUP_ID__, true);

    expect(adGroup).toHaveStructure(spAdGroupExStructure);
  });

  test('It should get specific brand ad group details', async () => {
    const adGroup = await this.client.getAdGroup('sponsoredBrands', global.__SB_AD_GROUP_ID__);

    expect(adGroup).toHaveStructure(sbAdGroupStructure);
  });

  test('It should get specific sponsored display ad group details', async () => {
    const adGroup = await this.client.getAdGroup('sponsoredDisplay', global.__SD_AD_GROUP_ID__);

    expect(adGroup).toHaveStructure(sdAdGroupStructure);
  });

  test('It should get specific sponsored display ad group extended details', async () => {
    const adGroup = await this.client.getAdGroup('sponsoredDisplay', global.__SD_AD_GROUP_ID__, true);

    expect(adGroup).toHaveStructure(sdAdGroupExStructure);
  });
});
