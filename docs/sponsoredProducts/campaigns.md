#### List Campaigns

> listCampaigns(campaignType, data = {}, extended = false)

> Accepts campaignType, filter and extended

```Javascript
await client.listCampaigns('sponsoredProducts');
```


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

#### Get Campaign

> getCampaign(campaignType, campaignId, extended = false)

> Accepts campaignType, campaignId and extended

```Javascript
await client.listCampaigns('sponsoredProducts', 1111111);
```

>

```JSON
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
```
