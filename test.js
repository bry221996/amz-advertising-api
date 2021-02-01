const AdvertisingClient = require("./index");

const test = async () => {
  try {
    const advertisingClient = new AdvertisingClient({
      clientId: "amzn1.application-oa2-client.1b29bf5b29d341748799c60eb7df497b",
      clientSecret:
        "7858db989097f923df41d1a5eca7884efed6e548477c4d855b7c5a70082aaf1a",
      refreshToken:
        "Atzr|IwEBIO0ZMXR3K9fm4XDCTIj6YLHuLi4iT2qzmod0sAYLlRIOx61j7ZY8bryU_tqzZ0i4bYTcM0vyV0gzCgf_9_iB5Qtash_TaVRRFxZNVtX0tPdWAIUVq4g-XaWgH6G4jmeOrZ3el7aGFamoN701sthqBUXG-TNwY__3RapKfRwDrn5b7KcBywSIRTpaHl6o-Ajy4z7l6IaCRH-FwtuLhE0HhN-9pxM_vshDIosvEM-paBl4VfMDCLD2NAoZB6zs8QDxiuupTodZTOVcFP0S2UbVUv2iwu8xLWltNqtKp-ktpf6TyA4vCNls-PsFuWAf1PkK82NFxe1g9D_rZvTaqcr1fqbhudQNzYLh10dudsAyksgeJPOM1PuaKgH82th78vIGNTR1Yc72Ehr6QkduKwQqnQr1K-e4DaK690ILL_QD-Dw-frdYKiHGq_UNDnnuJVCCIeU",
      accessToken:
        "Atza|IwEBIOtQC89FCaeHZGTsK3rSlAJDRLcYZ40OQXS1nnYXl-4GVmFx7rzhflZ16TMuhzvSzfCFodyoYPzP8AeTotYY03hI1z5HF8i7TipNYxsy_aOYgDbStPd8SIAX7ze6tPdqIj26E_PB-V6YwwpSbD-8tcqhMVZoq-MvMkT4KGxbuq8oV4xnbbVMF47hbgLAsNqPMKeJLGy-hDTVrZJ-9srahxSMj_EAraaH-BNN8jc_NXyupB7OK3cjC6meU6SiyfGSD7tsNEmS68B7PazBadE5hh9wz1cF35r_IgCOvIgXEOFgPNyCOoeUYG51p-FLshl0lJIS9KFl6-kgS0zAnVG1YGXqIvOY7-JRdCrQ1qaagZzW-ZhvTwKzkjIfN9wkZqgRRxSLleJ9Db0GpLEmnBenEY_liiD4iJVzXWK2AaCvl42KcZatCwzESZzXrcyz8teAGn0",
      sandbox: false,
      region: "na",
      profileId: 2181900935403563,
    });

    await advertisingClient.init();

    const records = await advertisingClient.getSnapshot(
      "sp",
      "amzn1.clicksAPI.v1.p1.601402AF.b63858a6-9a04-471c-9f5c-2a57cf4fb95d"
    );
    console.log(records.length);
  } catch (error) {
    console.log(error);
  }
};

test();
