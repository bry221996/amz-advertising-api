const AdvertisingClient = require("./AdvertisingClient");

const config = {
  clientId: "",
  clientSecret: "",
  refreshToken: "",
  accessToken: "",
  sandbox: false,
  logging: true,
  region: "na",
};

(async () => {
  try {
    const client = new AdvertisingClient(config);

    await client.refresh();

    let profiles = await client.listProfiles();
    console.log(profiles);
  } catch (error) {
    console.log(error);
  }
  process.exit();
})();
