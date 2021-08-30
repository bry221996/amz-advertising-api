const endpoints = {
  profiles: 'v2/profiles',
  portfolios: 'v2/portfolios',
};

/**
 * Get endpoint.
 *
 * @param string resource
 * @param boolean extended
 * @returns string
 */
const endpointOf = (resource, extended = false) => {
  if (!resource in endpoints) {
    throw new Error(`Endpoint for resource: ${resource} not found.`);
  }

  const endpoint = endpoints[resource];

  return extended ? `${endpoint}/extended` : endpoint;
};

module.exports = endpointOf;
