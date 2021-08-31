const endpoints = {
  sponsoredProducts: {
    campaigns: 'v2/sp/campaigns',
    adGroups: 'v2/sp/adGroups',
  },
  sponsoredBrands: {
    campaigns: 'sb/campaigns',
    adGroups: 'sb/adGroups',
  },
  sponsoredDisplay: {
    campaigns: 'sd/campaigns',
    adGroups: 'sd/adGroups',
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
