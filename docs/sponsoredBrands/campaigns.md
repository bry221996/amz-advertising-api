#### List Campaigns

> listCampaigns(campaignType, data = {}, extended = false)

> Accepts campaignType, filter and extended

```Javascript
await client.listCampaigns('sponsoredBrands');
```

>

```JSON
[
  {
    "campaignId": 1234567890,
    "name": "Campaign Name",
    "budget": 1,
    "budgetType": "",
    "bidOptimization": true,
    "state": "enabled",
    "adFormat": "",
    "startDate": "20200101",
    "servingStatus": "",
    "landingPage": ""
  }
]
```

#### Get Campaign

> getCampaign(campaignType, campaignId, extended = false)

> Accepts campaignType, campaignId and extended

```Javascript
await client.listCampaigns('sponsoredBrands', 1111111);
```

>

```JSON
{
    "campaignId": 1234567890,
    "name": "Campaign Name",
    "budget": 1,
    "budgetType": "",
    "bidOptimization": true,
    "state": "enabled",
    "adFormat": "",
    "startDate": "20200101",
    "servingStatus": "",
    "landingPage": ""
  }
```
