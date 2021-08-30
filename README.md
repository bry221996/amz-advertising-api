## Synopsis

Advertising API NodeJS client library.

## Docs

[API Reference](https://advertising.amazon.com/API/docs)<br/>
[Access Request](https://advertising.amazon.com/API)<br/>
[Getting Started](https://advertising.amazon.com/API/docs/v2/guides/get_started)

## Quick Start
#### Instantiate the client
> You can pass in `profileId` later. You can get all available profiles with `listProfiles`.
> After you instantiate the client you have to call init().

```Javascript

let AdvertisingClient = require('amz-advertising-api');

let config = {
    clientId: "CLIENT_ID",
    clientSecret: "CLIENT_SECRET",
    accessToken: "ACCESS_TOKEN",
    refreshToken: "REFRESH_TOKEN",
    profileId: "PROFILE_ID",
    sandbox: false,
    region: 'eu'
}

let client = new AdvertisingClient(config);

await client.init();
```
#### Refresh access token
> The refresh token gets automaticly refreshed every 2 minutes.

>
```JSON
{
  "access_token": "Atza|IQEBLjAsAhRmHjNgHpi0U-Dme37rR6CuUpSR…",
  "expires_in": 3600
}
```

#### Set profile Id
```Javascript
client.options.profileId = "1234567890";
```

> Once you've set the profile Id you are ready to start making API calls.

## Example API Calls

* Profiles
    * [listProfiles](#listProfiles)
    * [getProfile](#getprofile)
* Porfolios
    * [listPortfolios](#listPortfolios)


#### listProfiles
> List Profiles
```Javascript
let profiles = await client.listProfiles();
```
>
```JSON
[
  {
    "profileId":1234567890,
    "countryCode":"US",
    "currencyCode":"USD",
    "dailyBudget":10.00,
    "timezone":"America/Los_Angeles",
    "accountInfo":{
      "marketplaceStringId":"ABC123",
      "sellerStringId":"DEF456"
    }
  }
]
```

#### getProfile
> Retrieves a single profile by Id.

```Javascript
await client.getProfile("1234567890");
```
>
```JSON
{
  "profileId": 1234567890,
  "countryCode": "US",
  "currencyCode": "USD",
  "dailyBudget": 3.99,
  "timezone": "America/Los_Angeles",
  "accountInfo": {
    "marketplaceStringId": "ABC123",
    "sellerStringId": "DEF456"
  }
}
```

#### listPortfolios
> Retrieves a single profile by Id.

```Javascript
await client.getProfile("1234567890");
```
>
```JSON
{
  "profileId": 1234567890,
  "countryCode": "US",
  "currencyCode": "USD",
  "dailyBudget": 3.99,
  "timezone": "America/Los_Angeles",
  "accountInfo": {
    "marketplaceStringId": "ABC123",
    "sellerStringId": "DEF456"
  }
}
```