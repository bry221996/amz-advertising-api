const AdvertisingClient = require("../../lib/AdvertisingClient");

beforeAll(async () => {
  this.client = new AdvertisingClient(global.__OPTIONS__);

  await this.client.refresh();
});

describe("Profiles", () => {
  test("It should list profiles", async () => {
    const profiles = await this.client.listProfiles();

    profiles.forEach((profile) => {
      expect(profile).toHaveProperty("profileId");
      expect(profile).toHaveProperty("countryCode");
      expect(profile).toHaveProperty("currencyCode");
      expect(profile).toHaveProperty("timezone");
      expect(profile).toHaveProperty("accountInfo");
    });
  });

  test("It should get profile", async () => {
    const profile = await this.client.getProfile(global.__PROFILE_ID__);

    expect(profile).toHaveProperty("profileId");
    expect(profile).toHaveProperty("countryCode");
    expect(profile).toHaveProperty("currencyCode");
    expect(profile).toHaveProperty("timezone");
    expect(profile).toHaveProperty("dailyBudget");
    expect(profile).toHaveProperty("accountInfo");
  });
});
