
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

## Example API Calls

* Profiles
    * [listProfiles](#listProfiles)
    * [getProfile](#getprofile)
* Porfolios
    * [listPortfolios](#listPortfolios)
    * [getPortfolio](#getPortfolio)
* Sponsored Products
    * [listCampaigns](#list-sponsored-product-campaigns) 
* Sponsored Brands
* Sponsored Display


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

#### List Sponsored Product Campaigns
> listCampaigns(campaignType, data = {}, extended = false)

> Accepts campaignType, filter and extended

```Javascript
await client.listCampaigns('sponsoredProducts');
```
>
```JSON
[
  {
    "campaignId": 1234567890,
    "name": "Campaign Name",
    "campaignType": "sponsoredProducts",
    "targetingType": "auto",
    "premiumBidAdjustment": true,
    "state": "enabled",
    "dailyBudget": 1,
    "startDate": "20200101",
    "bidding": {}
  }
]
```