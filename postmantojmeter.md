const axios = require('axios');

// Replace with your API Key and Collection ID
const apiKey = 'PM-f09e3732f327323ca8a1dd3f49a6131ca1';
const collectionId = '17953526-697fed-8cc4-77f284baea51';

const url = `https://api.getpostman.com/collections/${collectionId}`;

axios.get(url, { headers: { 'X-Api-Key': apiKey } })
  .then(response => {
    const collection = response.data.collection;
    const variables = collection.variable || [];

    const simplified = processItems(collection.item);

    console.log(JSON.stringify({ requests: simplified, collectionVariables: variables }, null, 2));
  })
  .catch(error => {
    console.error('Error fetching collection:', error.response ? error.response.data : error.message);
  });

// Recursive function to process items (requests or folders)
function processItems(items) {
  const result = [];

  items.forEach(item => {
    if (item.item && Array.isArray(item.item)) {
      // Folder: recurse
      result.push({
        folderName: item.name,
        items: processItems(item.item)
      });
    } else if (item.request) {
      // Individual request
      const req = item.request;

      result.push({
        name: item.name,
        method: req.method,
        url: req.url ? (req.url.raw || buildUrl(req.url)) : null,
        headers: req.header ? req.header.map(h => ({ key: h.key, value: h.value })) : [],
        body: req.body ? req.body : null,
        variablesUsed: extractVariables(req)
      });
    }
  });

  return result;
}

// Build URL from structured object if needed
function buildUrl(urlObj) {
  const protocol = urlObj.protocol ? urlObj.protocol + '://' : '';
  const host = urlObj.host ? urlObj.host.join('.') : '';
  const path = urlObj.path ? '/' + urlObj.path.join('/') : '';
  return protocol + host + path;
}

// Extract variables from URL, headers, and body
function extractVariables(req) {
  const vars = [];
  const sources = [];

  if (req.url && req.url.raw) sources.push(req.url.raw);
  if (req.header) sources.push(...req.header.map(h => h.value));
  if (req.body && req.body.raw) sources.push(req.body.raw);

  const regex = /{{(.*?)}}/g;
  sources.forEach(str => {
    let match;
    while ((match = regex.exec(str)) !== null) {
      vars.push(match[1]);
    }
  });

  return [...new Set(vars)]; // remove duplicates
}
