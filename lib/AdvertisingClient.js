const querystring = require("querystring");
const needle = require("needle");
const zlib = require("zlib");
const JSONbig = require("json-bigint")({ storeAsString: true });
const { setIntervalAsync } = require("set-interval-async/dynamic");

const Regions = require("./Regions");
const { sleep, queryfy, parseBigIntFields } = require("./util");

class AdvertisingClient {
  constructor(options) {
    this.options = options;

    this.options.clientId = options.clientId || process.env.AMAZON_CLIENT_ID;
    this.options.clientSecret =
      options.clientSecret || process.env.AMAZON_CLIENT_SECRET;
    this.options.maxWaitTime = options.maxWaitTime || 1000 * 60 * 2;
    this.options.maxRetry = options.maxRetry || 10;
    this.options.logging = options.logging || false;

    this.tokenUrl = Regions[options.region].tokenUrl;

    if (options.sandbox) {
      this.endpoint = Regions[options.region].sandbox;
    } else {
      this.endpoint = Regions[options.region].prod;
    }
  }

  async init() {
    await this.refresh();
    setIntervalAsync(this.refresh.bind(this), 2000 * 60);
  }

  listProfiles() {
    return this.request("GET", "v2/profiles");
  }

  getProfile(profileId) {
    return this.request("GET", `v2/profiles/${profileId}`);
  }

  listPortfolios(data = {}, extended = false) {
    const endpoint = extended ? "portfolios/extended" : "portfolios";
    return this.request("GET", `v2/${endpoint}${queryfy(data)}`);
  }

  getPortfolio(portfolioId, extended = false) {
    const endpoint = extended ? "portfolios/extended" : "portfolios";
    return this.request("GET", `v2/${endpoint}/${portfolioId}`);
  }

  getCampaign(campaignId, options = {}) {
    const { campaignType, version = "", isExtended = false } = options;
    const resource = `${version}/${campaignType}/campaigns/`;
    const endpoint = `${resource}${isExtended ? "extended/" : ""}${campaignId}`;

    return this.apiRequest(endpoint, null, "GET");
  }

  getCampaignEx(campaignId) {
    return this.apiRequest(
      `v2/sp/campaigns/extended/${campaignId}`,
      null,
      "GET"
    );
  }
  createCampaigns(data) {
    parseBigIntFields(data);
    return this.apiRequest(`v2/sp/campaigns`, data, `POST`);
  }
  updateCampaigns(data) {
    parseBigIntFields(data);
    return this.apiRequest(`v2/sp/campaigns`, data, `PUT`);
  }
  archiveCampaign(campaignId) {
    return this.apiRequest(`v2/sp/campaigns/${campaignId}`, null, `DELETE`);
  }
  listSpCampaigns(data) {
    return this.apiRequest(`v2/sp/campaigns${queryfy(data)}`, null, "GET");
  }
  listCampaignsEx(data) {
    return this.apiRequest(
      `v2/sp/campaigns/extended${queryfy(data)}`,
      null,
      "GET"
    );
  }

  getAdGroup(adGroupId, options = {}) {
    const { campaignType, version = "", isExtended = false } = options;
    const resource = `${version}/${campaignType}/adGroups/`;
    const endpoint = `${resource}${isExtended ? "extended/" : ""}${adGroupId}`;

    return this.apiRequest(endpoint, null, "GET");
  }

  getAdGroupEx(adGroupId) {
    return this.apiRequest(`v2/sp/adGroups/extended/${adGroupId}`, null, "GET");
  }
  createAdGroups(data) {
    parseBigIntFields(data);
    return this.apiRequest(`v2/sp/adGroups`, data, `POST`);
  }
  updateAdGroups(data) {
    parseBigIntFields(data);
    return this.apiRequest(`v2/sp/adGroups`, data, `PUT`);
  }
  archiveAdGroup(adGroupId) {
    return this.apiRequest(`v2/sp/adGroups/${adGroupId}`, null, `DELETE`);
  }
  listAdGroups(data) {
    return this.apiRequest(`v2/sp/adGroups${queryfy(data)}`, null, "GET");
  }
  listAdGroupsEx(data) {
    return this.apiRequest(
      `v2/sp/adGroups/extended${queryfy(data)}`,
      null,
      "GET"
    );
  }
  getBiddableKeyword(keywordId) {
    return this.apiRequest(`v2/sp/keywords/${keywordId}`, null, "GET");
  }
  getBiddableKeywordEx(keywordId) {
    return this.apiRequest(`v2/sp/keywords/extended/${keywordId}`, null, "GET");
  }
  createBiddableKeywords(data) {
    parseBigIntFields(data);
    return this.apiRequest(`v2/sp/keywords`, data, `POST`);
  }
  updateBiddableKeywords(data) {
    parseBigIntFields(data);
    return this.apiRequest(`v2/sp/keywords`, data, `PUT`);
  }
  updateBiddableTargets(data) {
    parseBigIntFields(data);
    return this.apiRequest(`v2/sp/targets`, data, `PUT`);
  }
  archiveBiddableKeyword(keywordId) {
    return this.apiRequest(`v2/sp/keywords/${keywordId}`, null, `DELETE`);
  }
  listBiddableKeywords(data) {
    return this.apiRequest(`v2/sp/keywords${queryfy(data)}`, null, "GET");
  }
  listBiddableKeywordsEx(data) {
    return this.apiRequest(
      `v2/sp/keywords/extended${queryfy(data)}`,
      null,
      "GET"
    );
  }
  getNegativeKeyword(keywordId) {
    return this.apiRequest(`v2/sp/negativeKeywords/${keywordId}`, null, "GET");
  }
  getNegativeKeywordEx(keywordId) {
    return this.apiRequest(
      `v2/sp/negativeKeywords/extended/${keywordId}`,
      null,
      "GET"
    );
  }
  createNegativeKeywords(data) {
    parseBigIntFields(data);
    return this.apiRequest(`v2/sp/negativeKeywords`, data, `POST`);
  }
  updateNegativeKeywords(data) {
    parseBigIntFields(data);
    return this.apiRequest(`v2/sp/negativeKeywords`, data, `PUT`);
  }
  archiveNegativeKeyword(keywordId) {
    return this.apiRequest(
      `v2/sp/negativeKeywords/${keywordId}`,
      null,
      `DELETE`
    );
  }
  listNegativeKeywords(data) {
    return this.apiRequest(
      `v2/sp/negativeKeywords${queryfy(data)}`,
      null,
      "GET"
    );
  }
  listNegativeKeywordsEx(data) {
    return this.apiRequest(
      `v2/sp/negativeKeywords/extended${queryfy(data)}`,
      null,
      "GET"
    );
  }
  getCampaignNegativeKeyword(keywordId) {
    return this.apiRequest(
      `v2/sp/campaignNegativeKeywords/${keywordId}`,
      null,
      "GET"
    );
  }
  getCampaignNegativeKeywordEx(keywordId) {
    return this.apiRequest(
      `v2/sp/campaignNegativeKeywords/extended/${keywordId}`,
      null,
      "GET"
    );
  }
  createCampaignNegativeKeywords(data) {
    parseBigIntFields(data);
    return this.apiRequest(`v2/sp/campaignNegativeKeywords`, data, `POST`);
  }
  updateCampaignNegativeKeywords(data) {
    parseBigIntFields(data);
    return this.apiRequest(`v2/sp/campaignNegativeKeywords`, data, `PUT`);
  }
  removeCampaignNegativeKeyword(keywordId) {
    return this.apiRequest(
      `v2/sp/campaignNegativeKeywords/${keywordId}`,
      null,
      `DELETE`
    );
  }
  listCampaignNegativeKeywords(data) {
    return this.apiRequest(
      `v2/sp/campaignNegativeKeywords${queryfy(data)}`,
      null,
      "GET"
    );
  }
  listCampaignNegativeKeywordsEx(data) {
    return this.apiRequest(
      `v2/sp/campaignNegativeKeywords/extended${queryfy(data)}`,
      null,
      "GET"
    );
  }
  getProductAd(productAdId) {
    return this.apiRequest(`v2/sp/productAds/${productAdId}`, null, "GET");
  }
  getProductAdEx(productAdId) {
    return this.apiRequest(
      `v2/sp/productAds/extended/${productAdId}`,
      null,
      "GET"
    );
  }
  createProductAds(data) {
    parseBigIntFields(data);
    return this.apiRequest(`v2/sp/productAds`, data, `POST`);
  }
  updateProductAds(data) {
    parseBigIntFields(data);
    return this.apiRequest(`v2/sp/productAds`, data, `PUT`);
  }
  archiveProductAd(productAdId) {
    return this.apiRequest(`v2/sp/productAds/${productAdId}`, null, `DELETE`);
  }
  listProductAds(data) {
    return this.apiRequest(`v2/sp/productAds${queryfy(data)}`, null, "GET");
  }
  listProductAdsEx(data) {
    return this.apiRequest(
      `v2/sp/productAds/extended${queryfy(data)}`,
      null,
      "GET"
    );
  }
  getAdGroupBidRecommendations(adGroupId) {
    return this.apiRequest(
      `v2/sp/adGroups/${adGroupId}/bidRecommendations`,
      null,
      "GET"
    );
  }
  getKeywordBidRecommendations(keywordId) {
    return this.apiRequest(
      `v2/sp/keywords/${keywordId}/bidRecommendations`,
      null,
      "GET"
    );
  }
  bulkGetKeywordBidRecommendations(data) {
    return this.apiRequest(`v2/sp/keywords/bidRecommendations`, data, `POST`);
  }
  getAdGroupKeywordSuggestions(adGroupId, data) {
    return this.apiRequest(
      `v2/sp/adGroups/${adGroupId}/suggested/keywords${queryfy(data)}`,
      null,
      "GET"
    );
  }
  getAdGroupKeywordSuggestionsEx(adGroupId, data) {
    return this.apiRequest(
      `v2/sp/adGroups/${adGroupId}/suggested/keywords/extended${queryfy(data)}`,
      null,
      "GET"
    );
  }
  getAsinKeywordSuggestions(asin, data) {
    return this.apiRequest(
      `v2/sp/asins/${asin}/suggested/keywords${queryfy(data)}`,
      null,
      "GET"
    );
  }
  bulkGetAsinKeywordSuggestions(data) {
    return this.apiRequest(`v2/sp/asins/suggested/keywords`, data, `POST`);
  }
  requestSnapshot(campaignType, recordType, data = {}) {
    const mainEndpoint = campaignType != "sd" ? "v2" : "";
    return this.apiRequest(
      `${mainEndpoint}/${campaignType}/${recordType}/snapshot`,
      data,
      `POST`
    );
  }

  async getSnapshot(campaignType, snapshotId) {
    if (!snapshotId) {
      throw "No valid snapshotId";
    }

    let retry = 1;

    while (true) {
      const mainEndpoint = campaignType != "sd" ? "v2" : "";

      let snapshotRequest = await this.apiRequest(
        `${mainEndpoint}/${campaignType}/snapshots/${snapshotId}`,
        {},
        "GET"
      );

      if (snapshotRequest.status === "SUCCESS") {
        return this.download(snapshotRequest.location, true);
      } else if (snapshotRequest.status === "FAILURE") {
        throw "FAILURE";
      } else if (snapshotRequest.status === "ERROR") {
        throw "ERROR";
      }

      var waitTime = Math.pow(2, retry++) * 100;
      waitTime = Math.min(this.options.maxWaitTime);
      await sleep(waitTime);
    }
  }

  requestReport(campaignType, recordType, data) {
    const mainEndpoint = campaignType != "sd" ? "v2" : "";

    return this.apiRequest(
      `${mainEndpoint}/${campaignType}/${recordType}/report`,
      data,
      `POST`
    );
  }

  async getReport(reportId) {
    if (!reportId) {
      throw "No valid reportId";
    }

    let retry = 1;

    while (true) {
      let reportRequest = await this.apiRequest(
        `v2/reports/${reportId}`,
        null,
        "GET"
      );

      if (reportRequest.status === "SUCCESS") {
        var result = await this.download(reportRequest.location, true);
        return Array.isArray(result)
          ? result
          : JSONbig.parse(zlib.gunzipSync(result).toString());
      } else if (reportRequest.status === "FAILURE") {
        throw "FAILURE";
      } else if (reportRequest.status === "ERROR") {
        throw "ERROR";
      }

      var waitTime = Math.pow(2, retry++) * 100;
      waitTime = Math.min(this.options.maxWaitTime);
      await sleep(waitTime);
    }
  }

  async refresh() {
    if (!this.options.refreshToken) throw "No refresh token";

    if (this.refreshing) return;

    this.refreshing = true;

    let requestOptions = {
      content_type: "application/x-www-form-urlencoded;charset=UTF-8",
    };

    var formData = querystring.stringify({
      grant_type: "refresh_token",
      client_id: this.options.clientId,
      client_secret: this.options.clientSecret,
      refresh_token: this.options.refreshToken,
    });

    let response = (
      await needle("POST", `https://${this.tokenUrl}`, formData, requestOptions)
    ).body;

    if (response.error) {
      throw response.error;
    }

    this.options.accessToken = response.access_token;

    this.refreshing = false;
  }

  async download(location, auth, retry = 1) {
    let requestOptions = {
      accept: "*",
      headers: {
        "Amazon-Advertising-API-ClientId": this.options.clientId,
      },
      followRedirect: false,
      compressed: false,
      json: false,
    };

    if (auth) {
      requestOptions.headers.Authorization =
        "Bearer " + this.options.accessToken;
    }

    if (this.options.profileId) {
      requestOptions.headers["Amazon-Advertising-API-Scope"] =
        this.options.profileId;
    }

    let response;
    let requestFailed;

    try {
      response = await needle("GET", location, null, requestOptions);
    } catch (error) {
      requestFailed = true;
    }

    if (
      requestFailed ||
      response.statusCode == "429" ||
      response.statusCode == "500" ||
      response.statusCode == "401"
    ) {
      if (retry >= this.options.maxRetry)
        throw new Error("Maximum retry count reached.");

      if (!requestFailed && response.statusCode == "401") await this.refresh();

      let waitTime = Math.pow(2, retry) * 100;
      waitTime = Math.min(this.options.maxWaitTime, waitTime);
      await sleep(waitTime);
      return this.download(location, true, ++retry);
    } else if (response.statusCode == 307) {
      return this.download(response.headers.location, false);
    } else if (!(response.statusCode < 400 && response.statusCode >= 200)) {
      throw new Error(response.body.details);
    }

    if (response.headers["content-encoding"] == "gzip") {
      var unzipped = zlib.gunzipSync(response.raw).toString();
      if (response.headers["content-type"] == "application/json") {
        return JSONbig.parse(unzipped);
      } else {
        return unzipped;
      }
    } else {
      if (response.headers["content-type"] == "application/octet-stream") {
        var unzipped = zlib.gunzipSync(response.raw).toString();
        return JSONbig.parse(unzipped);
      }

      return response.body;
    }
  }

  async apiRequest(path, data, method, retry = 1) {
    let url = `https://${this.endpoint}/${path}`;

    let requestOptions = {
      accept: "*",
      headers: {
        Authorization: "Bearer " + this.options.accessToken,
        "Amazon-Advertising-API-ClientId": this.options.clientId,
      },
      json: true,
      compressed: true,
    };

    if (this.options.profileId) {
      requestOptions.headers["Amazon-Advertising-API-Scope"] =
        this.options.profileId;
    }

    let response;
    let requestFailed;

    try {
      if (typeof data === "object" && data !== null && method != "POST") {
        data = Object.keys(data).length ? data : null;
      }

      let payload = data ? JSONbig.stringify(data) : data;

      if (this.options.logging) {
        console.log(`${method} ${url}`);
        console.log("Request params: ", payload);
        console.log("Request options: ", requestOptions);
      }

      response = await needle(method, url, payload, requestOptions);

      if (this.options.logging) {
        console.log("Response status: ", response.statusCode);
        console.log("Response body: ", response.bodys);
      }
    } catch (error) {
      requestFailed = true;
    }

    if (
      requestFailed ||
      response.statusCode == "429" ||
      response.statusCode == "500" ||
      response.statusCode == "401" ||
      response.statusCode == "400"
    ) {
      if (this.options.logging) {
        console.log(`Error on ${url}.`);
      }

      if (retry >= this.options.maxRetry)
        throw new Error("Maximum retry count reached.");

      if (!requestFailed && response.statusCode == "401") await this.refresh();

      let waitTime = Math.pow(2, retry) * 100;
      waitTime = Math.min(this.options.maxWaitTime, waitTime);
      await sleep(waitTime);
      return this.apiRequest(path, data, method, ++retry);
    } else if (!(response.statusCode < 400 && response.statusCode >= 200)) {
      throw new Error(response.body.details);
    }

    try {
      return JSONbig.parse(response.body);
    } catch (error) {
      return response.body;
    }
  }

  /**
   * Send request.
   *
   * @param string method
   * @param string path
   * @param object data
   * @param int retry
   * @returns Promise
   */
  async request(method, path, data = null, retry = 1) {
    let url = `https://${this.endpoint}/${path}`;

    let requestOptions = {
      accept: "*",
      headers: {
        Authorization: "Bearer " + this.options.accessToken,
        "Amazon-Advertising-API-ClientId": this.options.clientId,
      },
      json: true,
      compressed: true,
    };

    if (this.options.profileId) {
      requestOptions.headers["Amazon-Advertising-API-Scope"] =
        this.options.profileId;
    }

    let response;
    let requestFailed;

    try {
      if (typeof data === "object" && data !== null && method != "POST") {
        data = Object.keys(data).length ? data : null;
      }

      let payload = data ? JSONbig.stringify(data) : data;

      if (this.options.logging) {
        console.log(`${method} ${url}`);
        console.log("Request params: ", payload);
        console.log("Request options: ", requestOptions);
      }

      response = await needle(method, url, payload, requestOptions);

      if (this.options.logging) {
        console.log("Response status: ", response.statusCode);
        console.log("Response body: ", response.bodys);
      }
    } catch (error) {
      requestFailed = true;
    }

    if (
      requestFailed ||
      response.statusCode == "429" ||
      response.statusCode == "500" ||
      response.statusCode == "401" ||
      response.statusCode == "400"
    ) {
      if (this.options.logging) {
        console.log(`Error on ${url}.`);
      }

      if (retry >= this.options.maxRetry)
        throw new Error("Maximum retry count reached.");

      if (!requestFailed && response.statusCode == "401") await this.refresh();

      let waitTime = Math.pow(2, retry) * 100;
      waitTime = Math.min(this.options.maxWaitTime, waitTime);
      await sleep(waitTime);
      return this.apiRequest(path, data, method, ++retry);
    } else if (!(response.statusCode < 400 && response.statusCode >= 200)) {
      throw new Error(response.body.details);
    }

    try {
      return JSONbig.parse(response.body);
    } catch (error) {
      return response.body;
    }
  }
}

module.exports = AdvertisingClient;
