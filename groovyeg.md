# JSR223 PreProcessor 
```java
import org.apache.jmeter.protocol.http.control.Header
import org.apache.jmeter.protocol.http.control.HeaderManager
import groovy.json.JsonSlurper

// Refer https://jmeter.apache.org/api/org/apache/jmeter/threads/JMeterContext.html
def sampler = ctx.getCurrentSampler()

// Change path
def basePath = sampler.getPath()
def newPath = "api/v3/" + basePath
sampler.setPath(newPath)

//// Add header
Header header = new Header("Accept", "application/json")
Header header2 = new Header("Content-Type", "application/json")
HeaderManager headerManager = new HeaderManager()
headerManager.add(header)
headerManager.add(header2)
sampler.addTestElement(headerManager)

// === Example: Parse static JSON ===
def exampleResponse = '''
{
  "user": {
    "id": 101,
    "name": "Alice",
    "status": "ACTIVE"
  }
}
'''

def exampleJson = new JsonSlurper().parseText(exampleResponse)
log.info("User ID: " + exampleJson.user.id)
log.info("User Name: " + exampleJson.user.name)
log.info("User Status: " + exampleJson.user.status)

// Save into JMeter variables
vars.put("userId", exampleJson.user.id.toString())
vars.put("userStatus", exampleJson.user.status)
```
# JSR223 PostProcessor 

``` java
import groovy.json.JsonSlurper

// Raw response
def response = prev.getResponseDataAsString()
log.info("=== Raw Response ===\n" + response)

// Metadata
log.info("Response Code: " + prev.getResponseCode())
log.info("Response Message: " + prev.getResponseMessage())
log.info("Response Time (ms): " + prev.getTime())
log.info("Sampler Label: " + prev.getSampleLabel())

// Headers
log.info("Response Headers:\n" + prev.getResponseHeaders())
log.info("Request Headers:\n" + prev.getRequestHeaders())

// Try to parse JSON
try {
    def json = new JsonSlurper().parseText(response)

    if (json instanceof Map) {
        log.info("=== Parsed JSON Fields ===")
        json.each { k, v ->
            log.info("Key: ${k}, Value: ${v}")
        }
    }

    // Example: Extract user info
    if (json.user) {
        vars.put("userId", json.user.id.toString())
        vars.put("userName", json.user.name.toString())
        vars.put("userStatus", json.user.status.toString())
        log.info("Stored userId, userName, userStatus into JMeter variables.")
    }
} catch(Exception e) {
    log.warn("Response is not valid JSON: " + e.getMessage())
}

```
