# Replace const file = fs.readFileSync('api.yaml', 'utf8') like your file
``` java
const fs = require('fs');
const yaml = require('js-yaml');
const builder = require('xmlbuilder'); // Used to generate XML for JMeter .jmx

// Load OpenAPI YAML file
const file = fs.readFileSync('api.yaml', 'utf8');
const data = yaml.load(file);

// List of HTTP methods we want to process
const httpMethods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'];

/**
 * Convert OpenAPI schema to example JSON
 * @param {Object} schema - OpenAPI schema object
 * @returns {Object} JSON object with example values
 */
function buildJsonFromSchema(schema) {
  if (!schema || !schema.properties) return {};
  const result = {};

  for (const [key, value] of Object.entries(schema.properties)) {
    if (value.example !== undefined) {
      result[key] = value.example; // Use example value if provided
    } else if (value.type === 'object') {
      result[key] = buildJsonFromSchema(value); // Recursively handle nested objects
    } else if (value.type === 'array') {
      if (value.items) result[key] = [buildJsonFromSchema(value.items)]; // Handle array items
      else result[key] = [];
    } else {
      result[key] = null; // Default to null if no example
    }
  }

  return result;
}

// Group all endpoints by tags for logical organization in JMeter
const tagsMap = {};
Object.keys(data.paths).forEach(path => {
  const pathItem = data.paths[path];

  Object.keys(pathItem).forEach(method => {
    if (!httpMethods.includes(method.toLowerCase())) return; // Skip unsupported methods

    const endpoint = pathItem[method];
    const tags = endpoint.tags.length ? endpoint.tags : ['Default']; // Use 'Default' if no tag

    tags.forEach(tag => {
      if (!tagsMap[tag]) tagsMap[tag] = [];

      // Build example JSON body if requestBody exists
      const jsonBody = endpoint.requestBody?.content?.['application/json']?.schema
        ? buildJsonFromSchema(endpoint.requestBody.content['application/json'].schema)
        : null;

      tagsMap[tag].push({
        path,
        method: method.toUpperCase(),
        body: jsonBody
      });
    });
  });
});

// Build JMeter Test Plan XML
const testPlan = builder.create('jmeterTestPlan', { encoding: 'UTF-8' })
  .att('version', '1.2')
  .att('properties', '5.0')
  .att('jmeter', '5.6.3');

// Root hashTree for JMeter test plan
const hashTree = testPlan.ele('hashTree');

// Create Test Plan element
const testPlanNode = hashTree.ele('TestPlan', {
  guiclass: 'TestPlanGui',
  testclass: 'TestPlan',
  testname: 'Test Plan',
  enabled: 'true'
});

// Add User Defined Variables to Test Plan (empty for now)
testPlanNode.ele('elementProp', { 
    name: 'TestPlan.user_defined_variables', 
    elementType: 'Arguments', 
    guiclass: 'ArgumentsPanel', 
    testclass: 'Arguments', 
    testname: 'User Defined Variables' 
  })
  .ele('collectionProp', { name: 'Arguments.arguments' });

// Add hashTree for Test Plan children
const testPlanHash = hashTree.ele('hashTree');

// Create a Thread Group
const threadGroup = testPlanHash.ele('ThreadGroup', {
  guiclass: 'ThreadGroupGui',
  testclass: 'ThreadGroup',
  testname: 'Thread Group',
  enabled: 'true'
});

// Thread Group settings
threadGroup.ele('intProp', { name: 'ThreadGroup.num_threads' }, '1'); // Number of users
threadGroup.ele('intProp', { name: 'ThreadGroup.ramp_time' }, '1'); // Ramp-up in seconds
threadGroup.ele('boolProp', { name: 'ThreadGroup.same_user_on_next_iteration' }, 'true');
threadGroup.ele('stringProp', { name: 'ThreadGroup.on_sample_error' }, 'continue');

// Loop Controller for Thread Group
const loopController = threadGroup.ele('elementProp', { 
  name: 'ThreadGroup.main_controller', 
  elementType: 'LoopController', 
  guiclass: 'LoopControlPanel', 
  testclass: 'LoopController', 
  testname: 'Loop Controller' 
});
loopController.ele('stringProp', { name: 'LoopController.loops' }, '1');
loopController.ele('boolProp', { name: 'LoopController.continue_forever' }, 'false');

// hashTree for Thread Group children (GenericControllers)
const threadHash = testPlanHash.ele('hashTree');

// Add a GenericController for each tag
Object.keys(tagsMap).forEach(tag => {
  // GenericController represents a logical group of endpoints
  const controller = threadHash.ele('GenericController', {
    guiclass: 'LogicControllerGui',
    testclass: 'GenericController',
    testname: tag,
    enabled: 'true'
  });

  const controllerHash = threadHash.ele('hashTree');

  // Add HTTP Samplers for each endpoint in this tag
  tagsMap[tag].forEach(endpoint => {
    const sampler = controllerHash.ele('HTTPSamplerProxy', {
      guiclass: 'HttpTestSampleGui',
      testclass: 'HTTPSamplerProxy',
      testname: `${endpoint.method} ${endpoint.path}`,
      enabled: 'true'
    });

    sampler.ele('boolProp', { name: 'HTTPSampler.follow_redirects' }, 'true');
    sampler.ele('boolProp', { name: 'HTTPSampler.use_keepalive' }, 'true');
    sampler.ele('boolProp', { name: 'HTTPSampler.postBodyRaw' }, endpoint.body ? 'true' : 'false');
    sampler.ele('stringProp', { name: 'HTTPSampler.method' }, endpoint.method);

    // HTTP Arguments (for request body)
    const args = sampler.ele('elementProp', { name: 'HTTPsampler.Arguments', elementType: 'Arguments' });
    const collection = args.ele('collectionProp', { name: 'Arguments.arguments' });

    if (endpoint.body) {
      const arg = collection.ele('elementProp', { name: '', elementType: 'HTTPArgument' });
      arg.ele('boolProp', { name: 'HTTPArgument.always_encode' }, 'false');
      arg.ele('stringProp', { name: 'Argument.value' }, JSON.stringify(endpoint.body));
      arg.ele('stringProp', { name: 'Argument.metadata' }, '=');
    }

    sampler.ele('stringProp', { name: 'HTTPSampler.path' }, endpoint.path);
    controllerHash.ele('hashTree'); // Required empty hashTree for each sampler
  });
});

// Write the XML string to a .jmx file
const xmlString = testPlan.end({ pretty: true });
fs.writeFileSync('test_plan.jmx', xmlString, 'utf8');
console.log('JMeter test plan generated: openapi_test_plan.jmx');
```
# Example Yaml 
``` java
openapi: 3.0.0
info:
  title: Sample API
  version: 1.0.0

paths:
  /api/v1/single-tag-endpoint:
    get:
      summary: "Endpoint with a single tag"
      tags:
        - Config
      responses:
        '200':
          description: OK

  /api/v1/multi-tag-endpoint:
    post:
      summary: "Endpoint with multiple tags"
      tags:
        - Donation
        - Payment
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                amount:
                  type: number
                  example: 100
                currency:
                  type: string
                  example: USD
      responses:
        '200':
          description: OK

````
Run jmeter -t test_plan.jmx
# Example output 
<img width="1171" height="756" alt="Screenshot 2025-09-27 at 2 56 44 PM" src="https://github.com/user-attachments/assets/fb2d3ace-cc64-4a66-9c5f-4467af56b2c6" />

