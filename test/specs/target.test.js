const AdvertisingClient = require('../../lib/AdvertisingClient');

const extendedStructure = ['servingStatus', 'creationDate', 'lastUpdatedDate'];
const targetStructure = ['targetId', 'adGroupId', 'campaignId', 'expressionType', 'bid', 'state', 'expression', 'resolvedExpression'];

beforeAll(async () => {
  this.client = new AdvertisingClient(global.__OPTIONS__);

  await this.client.refresh();
});

describe('Targets', () => {
  test('It should list sponsored product targets', async () => {
    const targets = await this.client.listTargets('sponsoredProducts', { count: 1 });

    if (!targets.length) return;

    expect(targets[0]).toHaveStructure(targetStructure);
  });

  test('It should list sponsored product targets with extended details', async () => {
    const targets = await this.client.listTargets('sponsoredProducts', { count: 1 }, true);

    if (!targets.length) return;

    expect(targets[0]).toHaveStructure([...targetStructure, ...extendedStructure]);
  });

  test('It should get specific sponsored product target details', async () => {
    const target = await this.client.getTarget('sponsoredProducts', global.__SP_TARGET_ID__);

    expect(target).toHaveStructure(targetStructure);
  });

  test('It should get specific sponsored product target extended details', async () => {
    const target = await this.client.getTarget('sponsoredProducts', global.__SP_TARGET_ID__, true);

    expect(target).toHaveStructure([...targetStructure, ...extendedStructure]);
  });

  test('It should update sponsored product target details', async () => {
    const response = await this.client.updateTargets('sponsoredProducts', [{ targetId: global.__SP_KEYWORD_ID__, state: 'enabled', bid: 20 }]);

    expect(response[0]).toHaveStructure(['code', 'targetId']);
  });
});
