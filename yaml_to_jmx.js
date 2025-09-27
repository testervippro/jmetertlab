const fs = require('fs');
const yaml = require('js-yaml');
const builder = require('xmlbuilder'); // npm install xmlbuilder

// Load OpenAPI YAML
const file = fs.readFileSync('api.yaml', 'utf8');
const data = yaml.load(file);

const httpMethods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'];

// Convert OpenAPI schema to example JSON
function buildJsonFromSchema(schema) {
  if (!schema || !schema.properties) return {};
  const result = {};
  for (const [key, value] of Object.entries(schema.properties)) {
    if (value.example !== undefined) {
      result[key] = value.example;
    } else if (value.type === 'object') {
      result[key] = buildJsonFromSchema(value);
    } else if (value.type === 'array') {
      if (value.items) result[key] = [buildJsonFromSchema(value.items)];
      else result[key] = [];
    } else {
      result[key] = null;
    }
  }
  return result;
}

// Group endpoints by tag
const tagsMap = {};
Object.keys(data.paths).forEach(path => {
  const pathItem = data.paths[path];
  Object.keys(pathItem).forEach(method => {
    if (!httpMethods.includes(method.toLowerCase())) return;

    const endpoint = pathItem[method];
    const tags = endpoint.tags.length ? endpoint.tags : ['Default'];

    tags.forEach(tag => {
      if (!tagsMap[tag]) tagsMap[tag] = [];
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

// Build JMeter XML
const testPlan = builder.create('jmeterTestPlan', { encoding: 'UTF-8' })
  .att('version', '1.2')
  .att('properties', '5.0')
  .att('jmeter', '5.6.3');

const hashTree = testPlan.ele('hashTree');

// Test Plan
const testPlanNode = hashTree.ele('TestPlan', {
  guiclass: 'TestPlanGui',
  testclass: 'TestPlan',
  testname: 'Test Plan',
  enabled: 'true'
});
testPlanNode.ele('elementProp', { name: 'TestPlan.user_defined_variables', elementType: 'Arguments', guiclass: 'ArgumentsPanel', testclass: 'Arguments', testname: 'User Defined Variables' })
  .ele('collectionProp', { name: 'Arguments.arguments' });

const testPlanHash = hashTree.ele('hashTree');

// Thread Group
const threadGroup = testPlanHash.ele('ThreadGroup', {
  guiclass: 'ThreadGroupGui',
  testclass: 'ThreadGroup',
  testname: 'Thread Group',
  enabled: 'true'
});
threadGroup.ele('intProp', { name: 'ThreadGroup.num_threads' }, '1');
threadGroup.ele('intProp', { name: 'ThreadGroup.ramp_time' }, '1');
threadGroup.ele('boolProp', { name: 'ThreadGroup.same_user_on_next_iteration' }, 'true');
threadGroup.ele('stringProp', { name: 'ThreadGroup.on_sample_error' }, 'continue');
const loopController = threadGroup.ele('elementProp', { name: 'ThreadGroup.main_controller', elementType: 'LoopController', guiclass: 'LoopControlPanel', testclass: 'LoopController', testname: 'Loop Controller' });
loopController.ele('stringProp', { name: 'LoopController.loops' }, '1');
loopController.ele('boolProp', { name: 'LoopController.continue_forever' }, 'false');

const threadHash = testPlanHash.ele('hashTree');

// Add GenericControllers for each tag
Object.keys(tagsMap).forEach(tag => {
  const controller = threadHash.ele('GenericController', {
    guiclass: 'LogicControllerGui',
    testclass: 'GenericController',
    testname: tag,
    enabled: 'true'
  });
  const controllerHash = threadHash.ele('hashTree');

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

    // HTTP Arguments
    const args = sampler.ele('elementProp', { name: 'HTTPsampler.Arguments', elementType: 'Arguments' });
    const collection = args.ele('collectionProp', { name: 'Arguments.arguments' });

    if (endpoint.body) {
      const arg = collection.ele('elementProp', { name: '', elementType: 'HTTPArgument' });
      arg.ele('boolProp', { name: 'HTTPArgument.always_encode' }, 'false');
      arg.ele('stringProp', { name: 'Argument.value' }, JSON.stringify(endpoint.body));
      arg.ele('stringProp', { name: 'Argument.metadata' }, '=');
    }

    sampler.ele('stringProp', { name: 'HTTPSampler.path' }, endpoint.path);
    controllerHash.ele('hashTree');
  });
});

// Write to file
const xmlString = testPlan.end({ pretty: true });
fs.writeFileSync('openapi_test_plan.jmx', xmlString, 'utf8');
console.log('JMeter test plan generated: openapi_test_plan.jmx');
