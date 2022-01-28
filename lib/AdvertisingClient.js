const querystring = require('querystring');
const needle = require('needle');
const zlib = require('zlib');
const JSONbig = require('json-bigint')({ storeAsString: true });
const { setIntervalAsync } = require('set-interval-async/dynamic');
const { extendedEndpoint, endpointOf } = require('./endpoints');

const Regions = require('./Regions');
const { sleep, queryfy, parseBigIntFields } = require('./util');

class AdvertisingClient {
  constructor(options) {
    this.options = options;

    this.options.clientId = options.clientId || process.env.AMAZON_CLIENT_ID;
    this.options.clientSecret = options.clientSecret || process.env.AMAZON_CLIENT_SECRET;
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
    return this.request('GET', 'v2/profiles');
  }

  getProfile(profileId) {
    return this.request('GET', `v2/profiles/${profileId}`);
  }

  listPortfolios(data = {}, extended = false) {
    return this.request('GET', `${extendedEndpoint('v2/portfolios', extended)}${queryfy(data)}`);
  }

  getPortfolio(portfolioId, extended = false) {
    return this.request('GET', `${extendedEndpoint('v2/portfolios', extended)}/${portfolioId}`);
  }

  listCampaigns(campaignType, data = {}, extended = false) {
    return this.request('GET', `${endpointOf(campaignType, 'campaigns', extended)}${queryfy(data)}`);
  }

  getCampaign(campaignType, campaignId, extended = false) {
    return this.request('GET', `${endpointOf(campaignType, 'campaigns', extended)}/${campaignId}`);
  }

  createCampaigns(campaignType, data) {
    parseBigIntFields(data);
    return this.request('POST', endpointOf(campaignType, 'campaigns'), data);
  }

  updateCampaigns(campaignType, data) {
    parseBigIntFields(data);
    return this.request('PUT', endpointOf(campaignType, 'campaigns'), data);
  }

  getCampaignRecommendations(campaignType, data) {
    parseBigIntFields(data);
    return this.request('POST', endpointOf(campaignType, 'campaignRecommendations'), data);
  }

  listAdGroups(campaignType, data = {}, extended = false) {
    return this.request('GET', `${endpointOf(campaignType, 'adGroups', extended)}${queryfy(data)}`);
  }

  getAdGroup(campaignType, adGroupId, extended = false) {
    return this.request('GET', `${endpointOf(campaignType, 'adGroups', extended)}/${adGroupId}`);
  }

  createAdGroups(campaignType, data) {
    parseBigIntFields(data);
    return this.request('POST', endpointOf(campaignType, 'adGroups'), data);
  }

  updateAdGroups(campaignType, data) {
    parseBigIntFields(data);
    return this.request('PUT', endpointOf(campaignType, 'adGroups'), data);
  }

  listKeywords(campaignType, data = {}, extended = false) {
    return this.request('GET', `${endpointOf(campaignType, 'keywords', extended)}${queryfy(data)}`);
  }

  getKeyword(campaignType, keywordId, extended = false) {
    return this.request('GET', `${endpointOf(campaignType, 'keywords', extended)}/${keywordId}`);
  }

  updateKeywords(campaignType, data) {
    parseBigIntFields(data);
    return this.request('PUT', endpointOf(campaignType, 'keywords'), data);
  }

  createKeywords(campaignType, data) {
    parseBigIntFields(data);
    return this.request('POST', endpointOf(campaignType, 'keywords'), data);
  }

  listTargets(campaignType, data = {}, extended = false) {
    return this.request('GET', `${endpointOf(campaignType, 'targets', extended)}${queryfy(data)}`);
  }

  getTarget(campaignType, targetId, extended = false) {
    return this.request('GET', `${endpointOf(campaignType, 'targets', extended)}/${targetId}`);
  }

  createTarget(campaignType, data) {
    parseBigIntFields(data);
    return this.request('POST', endpointOf(campaignType, 'targets'), data);
  }

  updateTargets(campaignType, data) {
    parseBigIntFields(data);
    return this.request('PUT', endpointOf(campaignType, 'targets'), data);
  }

  listNegativeKeywords(campaignType, data = {}, extended = false) {
    return this.request('GET', `${endpointOf(campaignType, 'negativeKeywords', extended)}${queryfy(data)}`);
  }

  getNegativeKeyword(campaignType, keywordId, extended = false) {
    return this.request('GET', `${endpointOf(campaignType, 'negativeKeywords', extended)}/${keywordId}`);
  }

  createNegativeKeywords(campaignType, data) {
    parseBigIntFields(data);
    return this.request('POST', endpointOf(campaignType, 'negativeKeywords'), data);
  }

  updateNegativeKeywords(campaignType, data) {
    parseBigIntFields(data);
    return this.request('PUT', endpointOf(campaignType, 'negativeKeywords'), data);
  }

  listNegativeTargets(campaignType, data = {}, extended = false) {
    return this.request('GET', `${endpointOf(campaignType, 'negativeTargets', extended)}${queryfy(data)}`);
  }

  getNegativeTarget(campaignType, negativeTargetId, extended = false) {
    return this.request('GET', `${endpointOf(campaignType, 'negativeTargets', extended)}/${negativeTargetId}`);
  }

  createNegativeTargets(campaignType, data) {
    parseBigIntFields(data);
    return this.request('POST', endpointOf(campaignType, 'negativeTargets'), data);
  }

  updateNegativeTargets(campaignType, data) {
    parseBigIntFields(data);
    return this.request('PUT', endpointOf(campaignType, 'negativeTargets'), data);
  }

  listCampaignNegativeKeywords(campaignType, data = {}, extended = false) {
    return this.request('GET', `${endpointOf(campaignType, 'campaignNegativeKeywords', extended)}${queryfy(data)}`);
  }

  getCampaignNegativeKeyword(campaignType, keywordId, extended = false) {
    return this.request('GET', `${endpointOf(campaignType, 'campaignNegativeKeywords', extended)}/${keywordId}`);
  }

  createCampaignNegativeKeywords(campaignType, data) {
    parseBigIntFields(data);
    return this.request('POST', endpointOf(campaignType, 'campaignNegativeKeywords'), data);
  }

  updateCampaignNegativeKeywords(campaignType, data) {
    parseBigIntFields(data);
    return this.request('PUT', endpointOf(campaignType, 'campaignNegativeKeywords'), data);
  }

  listProductAds(campaignType, data = {}, extended = false) {
    return this.request('GET', `${endpointOf(campaignType, 'productAds', extended)}${queryfy(data)}`);
  }

  getProductAd(campaignType, productAdId, extended = false) {
    return this.request('GET', `${endpointOf(campaignType, 'productAds', extended)}/${productAdId}`);
  }

  createProductAds(campaignType, data) {
    parseBigIntFields(data);
    return this.request('POST', endpointOf(campaignType, 'productAds'), data);
  }

  updateProductAds(campaignType, data) {
    parseBigIntFields(data);
    return this.request('POST', endpointOf(campaignType, 'productAds'), data);
  }

  getAdGroupBidRecommendations(adGroupId) {
    return this.apiRequest(`v2/sp/adGroups/${adGroupId}/bidRecommendations`, null, 'GET');
  }
  getKeywordBidRecommendations(keywordId) {
    return this.apiRequest(`v2/sp/keywords/${keywordId}/bidRecommendations`, null, 'GET');
  }
  bulkGetKeywordBidRecommendations(data) {
    return this.apiRequest(`v2/sp/keywords/bidRecommendations`, data, `POST`);
  }
  getAdGroupKeywordSuggestions(adGroupId, data) {
    return this.apiRequest(`v2/sp/adGroups/${adGroupId}/suggested/keywords${queryfy(data)}`, null, 'GET');
  }
  getAdGroupKeywordSuggestionsEx(adGroupId, data) {
    return this.apiRequest(`v2/sp/adGroups/${adGroupId}/suggested/keywords/extended${queryfy(data)}`, null, 'GET');
  }
  getAsinKeywordSuggestions(asin, data) {
    return this.apiRequest(`v2/sp/asins/${asin}/suggested/keywords${queryfy(data)}`, null, 'GET');
  }
  bulkGetAsinKeywordSuggestions(data) {
    return this.apiRequest(`v2/sp/asins/suggested/keywords`, data, `POST`);
  }
  requestSnapshot(campaignType, recordType, data = {}) {
    const mainEndpoint = campaignType != 'sd' ? 'v2' : '';
    return this.apiRequest(`${mainEndpoint}/${campaignType}/${recordType}/snapshot`, data, `POST`);
  }

  async getSnapshot(campaignType, snapshotId) {
    if (!snapshotId) {
      throw 'No valid snapshotId';
    }

    let retry = 1;

    while (true) {
      const mainEndpoint = campaignType != 'sd' ? 'v2' : '';

      let snapshotRequest = await this.apiRequest(`${mainEndpoint}/${campaignType}/snapshots/${snapshotId}`, {}, 'GET');

      if (snapshotRequest.status === 'SUCCESS') {
        return this.download(snapshotRequest.location, true);
      } else if (snapshotRequest.status === 'FAILURE') {
        throw 'FAILURE';
      } else if (snapshotRequest.status === 'ERROR') {
        throw 'ERROR';
      }

      var waitTime = Math.pow(2, retry++) * 100;
      waitTime = Math.min(this.options.maxWaitTime);
      await sleep(waitTime);
    }
  }

  requestReport(campaignType, recordType, data) {
    const mainEndpoint = campaignType != 'sd' ? 'v2' : '';

    return this.apiRequest(`${mainEndpoint}/${campaignType}/${recordType}/report`, data, `POST`);
  }

  async getReport(reportId) {
    if (!reportId) {
      throw 'No valid reportId';
    }

    let retry = 1;

    while (true) {
      let reportRequest = await this.apiRequest(`v2/reports/${reportId}`, null, 'GET');

      if (reportRequest.status === 'SUCCESS') {
        var result = await this.download(reportRequest.location, true);
        return Array.isArray(result) ? result : JSONbig.parse(zlib.gunzipSync(result).toString());
      } else if (reportRequest.status === 'FAILURE') {
        throw 'FAILURE';
      } else if (reportRequest.status === 'ERROR') {
        throw 'ERROR';
      }

      var waitTime = Math.pow(2, retry++) * 100;
      waitTime = Math.min(this.options.maxWaitTime);
      await sleep(waitTime);
    }
  }

  async refresh() {
    if (!this.options.refreshToken) throw 'No refresh token';

    if (this.refreshing) return;

    this.refreshing = true;

    let requestOptions = {
      content_type: 'application/x-www-form-urlencoded;charset=UTF-8',
    };

    var formData = querystring.stringify({
      grant_type: 'refresh_token',
      client_id: this.options.clientId,
      client_secret: this.options.clientSecret,
      refresh_token: this.options.refreshToken,
    });

    let response = (await needle('POST', `https://${this.tokenUrl}`, formData, requestOptions)).body;

    if (response.error) {
      throw response.error;
    }

    this.options.accessToken = response.access_token;

    this.refreshing = false;
  }

  async download(location, auth, retry = 1) {
    let requestOptions = {
      accept: '*',
      headers: {
        'Amazon-Advertising-API-ClientId': this.options.clientId,
      },
      followRedirect: false,
      compressed: false,
      json: false,
    };

    if (auth) {
      requestOptions.headers.Authorization = 'Bearer ' + this.options.accessToken;
    }

    if (this.options.profileId) {
      requestOptions.headers['Amazon-Advertising-API-Scope'] = this.options.profileId;
    }

    let response;
    let requestFailed;

    try {
      response = await needle('GET', location, null, requestOptions);
    } catch (error) {
      requestFailed = true;
    }

    if (requestFailed || response.statusCode == '429' || response.statusCode == '500' || response.statusCode == '401') {
      if (retry >= this.options.maxRetry) throw new Error('Maximum retry count reached.');

      if (!requestFailed && response.statusCode == '401') await this.refresh();

      let waitTime = Math.pow(2, retry) * 100;
      waitTime = Math.min(this.options.maxWaitTime, waitTime);
      await sleep(waitTime);
      return this.download(location, true, ++retry);
    } else if (response.statusCode == 307) {
      return this.download(response.headers.location, false);
    } else if (!(response.statusCode < 400 && response.statusCode >= 200)) {
      throw new Error(response.body.details);
    }

    if (response.headers['content-encoding'] == 'gzip') {
      var unzipped = zlib.gunzipSync(response.raw).toString();
      if (response.headers['content-type'] == 'application/json') {
        return JSONbig.parse(unzipped);
      } else {
        return unzipped;
      }
    } else {
      if (response.headers['content-type'] == 'application/octet-stream') {
        var unzipped = zlib.gunzipSync(response.raw).toString();
        return JSONbig.parse(unzipped);
      }

      return response.body;
    }
  }

  async apiRequest(path, data, method, retry = 1) {
    let url = `https://${this.endpoint}/${path}`;

    let requestOptions = {
      accept: '*',
      headers: {
        Authorization: 'Bearer ' + this.options.accessToken,
        'Amazon-Advertising-API-ClientId': this.options.clientId,
      },
      json: true,
      compressed: true,
    };

    if (this.options.profileId) {
      requestOptions.headers['Amazon-Advertising-API-Scope'] = this.options.profileId;
    }

    let response;
    let requestFailed;

    try {
      if (typeof data === 'object' && data !== null && method != 'POST') {
        data = Object.keys(data).length ? data : null;
      }

      let payload = data ? JSONbig.stringify(data) : data;

      if (this.options.logging) {
        console.log(`${method} ${url}`);
        console.log('Request params: ', payload);
        console.log('Request options: ', requestOptions);
      }

      response = await needle(method, url, payload, requestOptions);

      if (this.options.logging) {
        console.log('Response status: ', response.statusCode);
        console.log('Response body: ', response.body);
      }
    } catch (error) {
      if (this.options.logging) console.log(error);
      requestFailed = true;
    }

    if (this.options.logging) console.log(response);

    if (requestFailed || response.statusCode == '429' || response.statusCode == '500' || response.statusCode == '401' || response.statusCode == '400') {
      if (this.options.logging) {
        console.log(`Error on ${url}.`);
      }

      if (retry >= this.options.maxRetry) throw new Error('Maximum retry count reached.');

      if (!requestFailed && response.statusCode == '401') await this.refresh();

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
    let url = encodeURI(`https://${this.endpoint}/${path}`);

    let requestOptions = {
      accept: '*',
      headers: {
        Authorization: 'Bearer ' + this.options.accessToken,
        'Amazon-Advertising-API-ClientId': this.options.clientId,
      },
      json: true,
      compressed: true,
    };

    if (this.options.profileId) {
      requestOptions.headers['Amazon-Advertising-API-Scope'] = this.options.profileId;
    }

    let response;
    let requestFailed;

    try {
      if (typeof data === 'object' && data !== null && method != 'POST') {
        data = Object.keys(data).length ? data : null;
      }

      let payload = data ? JSONbig.stringify(data) : data;

      if (this.options.logging) {
        console.log(`${method} ${url}`);
        console.log('Request params: ', payload);
        console.log('Request options: ', requestOptions);
      }

      response = await needle(method, url, payload, requestOptions);

      if (this.options.logging) {
        console.log('Response status: ', response.statusCode);
        console.log('Response body: ', response.body);
      }
    } catch (error) {
      if (this.options.logging) console.log(error);
      requestFailed = true;
    }

    if (this.options.logging && response) console.log(response.body, response.statusCode);

    if (requestFailed || response.statusCode == '429' || response.statusCode == '500' || response.statusCode == '401' || response.statusCode == '400') {
      if (this.options.logging) {
        console.log(`Error on ${url}.`);
      }

      if (retry >= this.options.maxRetry) throw new Error('Maximum retry count reached.');

      if (!requestFailed && response.statusCode == '401') await this.refresh();

      let waitTime = Math.pow(2, retry) * 100;
      waitTime = Math.min(this.options.maxWaitTime, waitTime);
      await sleep(waitTime);
      return this.request(method, path, data, ++retry);
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
