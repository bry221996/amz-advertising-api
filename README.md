# Advertising API NodeJS client library.

## Docs

[Amazon Advertising Docs](https://advertising.amazon.com/API/docs)

## Guide

#### Initiate the client

```Javascript

let AdvertisingClient = require('amz-advertising-api');

let client = new AdvertisingClient({
    clientId: "CLIENT_ID",
    clientSecret: "CLIENT_SECRET",
    accessToken: "ACCESS_TOKEN",
    refreshToken: "REFRESH_TOKEN",
    profileId: "PROFILE_ID",
    sandbox: false,
    region: 'eu'
});

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

## API Calls

- Profiles
  - [listProfiles](#list-profiles)
  - [getProfile](#get-profile)
- Porfolios
  - [listPortfolios](#list-Portfolios)
  - [getPortfolio](#get-Portfolio)
- Sponsored Products
  - [listCampaigns](docs/sponsoredProducts/campaigns.md#list-campaigns)
  - [getCampaign](docs/sponsoredProducts/campaigns.md#get-campaign)
- Sponsored Brands
  - [listCampaigns](docs/sponsoredBrands/campaigns.md#list-campaigns)
  - [getCampaign](docs/sponsoredBrands/campaigns.md#get-campaign)
- Sponsored Display
  - [listCampaigns](docs/sponsoredDisplay/campaigns.md#list-campaigns)
  - [getCampaign](docs/sponsoredBrands/campaigns.md#get-campaign)

#### List Profiles

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

#### Get Profile

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

#### List Portfolios

> listPortfolios(filter: {}, extended: false).

> Accepts first argument as filter, and the second argument to list for extended details or not.

```Javascript
await client.listPortfolios();
```

>

```JSON
[
  {
    "portfolioId": 1234567890,
    "name": "Portfolio Name",
    "budget": { },
    "inBudget": true,
    "state": "enabled"
  }
]
```

#### Get Portfolio

> getPortfolio(portfolioId, extended: false).

> Accepts first argument as the portfolioId, and the second argument for extended details or not.

```Javascript
await client.getPortfolio(portfolioId);
```

>

```JSON
{
  "portfolioId": 1234567890,
  "name": "Portfolio Name",
  "budget": { },
  "inBudget": true,
  "state": "enabled",
  "creationDate": 202-0101,
  "lastUpdatedDate": 20210101
}
```
