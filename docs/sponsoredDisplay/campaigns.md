#### List Campaigns

> listCampaigns(campaignType, data = {}, extended = false)

> Accepts campaignType, filter and extended

```Javascript
await client.listCampaigns('sponsoredDisplay');
```

>

```JSON
[
  {
    "campaignId": 1234567890,
    "name": "Campaign Name",
    "budget": 1,
    "budgetType": "",
    "tactic": "",
    "state": "enabled",
    "costType": "",
    "startDate": "20200101",
    "deliveryProfile": "",
  }
]
```

#### Get Campaign

> getCampaign(campaignType, campaignId, extended = false)

> Accepts campaignType, campaignId and extended

```Javascript
await client.listCampaigns('sponsoredDisplay', 1111111);
```

>

```JSON
{
    "campaignId": 1234567890,
    "name": "Campaign Name",
    "budget": 1,
    "budgetType": "",
    "tactic": "",
    "state": "enabled",
    "costType": "",
    "startDate": "20200101",
    "deliveryProfile": "",
  }
```
