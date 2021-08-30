const querystring = require("querystring");

/**
 * Sleep
 *
 * @param int ms
 * @returns Promise
 */
exports.sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Parse to big init.
 *
 * @param object obj
 * @returns object
 */
exports.parseBigIntFields = (obj) => {
  const bigIntFields = {
    keywordId: true,
    adGroupId: true,
    campaignId: true,
  };

  if (Array.isArray(obj)) {
    obj.forEach(parseBigIntFields);
    return;
  }

  Object.keys(obj)
    .filter((k) => bigIntFields[k])
    .forEach((k) => {
      obj[k] = BigInt(obj[k]);
    });
};

/**
 * Convert object to query string.
 * @param object data
 * @returns object
 */
exports.queryfy = (data) => {
  return data ? `?${querystring.stringify(data)}` : "";
};
