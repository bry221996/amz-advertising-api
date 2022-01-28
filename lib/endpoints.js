const endpoints = {
  sponsoredProducts: {
    campaigns: 'v2/sp/campaigns',
    adGroups: 'v2/sp/adGroups',
    keywords: 'v2/sp/keywords',
    targets: 'v2/sp/targets',
    productAds: 'v2/sp/productAds',
    negativeKeywords: 'v2/sp/negativeKeywords',
    campaignNegativeKeywords: 'v2/sp/campaignNegativeKeywords',
    negativeTargets: 'v2/sp/negativeTargets',
    campaignRecommendations: '/sp/campaigns/budgetRecommendations',
  },
  sponsoredBrands: {
    campaigns: 'sb/campaigns',
    adGroups: 'sb/adGroups',
    keywords: 'sb/keywords',
    targets: 'sb/targets',
    negativeKeywords: 'sb/negativeKeywords',
    negativeTargets: 'sb/negativeTargets',
  },
  sponsoredDisplay: {
    campaigns: 'sd/campaigns',
    adGroups: 'sd/adGroups',
    targets: 'sd/targets',
    negativeTargets: 'sd/negativeTargets',
    productAds: 'sd/productAds',
  },
};

/**
 * Get endpoint.
 *
 * @param string campaignType
 * @param string resource
 * @param boolean extended
 * @returns string
 */
exports.endpointOf = (campaignType, resource, extended = false) => {
  if (!campaignType in endpoints) {
    throw new Error('Invalid campaign type.');
  }

  if (!resource in endpoints[campaignType]) {
    throw new Error(`Endpoint for ${campaignType} resource: ${resource} not found.`);
  }

  return this.extendedEndpoint(endpoints[campaignType][resource], extended);
};

/**
 *
 * @param string endpoint
 * @param boolean extended
 * @returns
 */
exports.extendedEndpoint = (endpoint, extended = false) => {
  return extended ? `${endpoint}/extended` : endpoint;
};
