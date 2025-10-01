
```groovy
// Loop request using Groovy in JMeter
import org.apache.jmeter.samplers.SampleResult
// Documentation: https://jmeter.apache.org/api/org/apache/jmeter/samplers/SampleResult.html

// Get the URL from a JMeter variable, or use a default if not set
def url = vars.get("URL") ?: "http://google.com"

// Loop 10 times
for (int i = 1; i <= 10; i++) {

    // Create a new SampleResult for this request
    def result = new SampleResult()
    result.sampleStart()  // Start the timer for this request

    try {
        // Initialize HTTP connection
        def http = new URL(url)
        def connection = http.openConnection()
        connection.setRequestMethod("GET")  // Set HTTP method to GET
        connection.connectTimeout = 5000    // Connection timeout in milliseconds
        connection.readTimeout = 5000       // Read timeout in milliseconds

        // Read the response as text
        def response = connection.inputStream.text

        // Set information in SampleResult
        result.sampleEnd()  // Stop the timer
        result.setResponseData(response, "UTF-8")  // Set the response data
        result.setDataType(SampleResult.TEXT)      // Set the data type to TEXT
        result.setSuccessful(true)                 // Mark request as successful
        result.setResponseMessage("OK")            // Response message
        result.setResponseCode("200")              // HTTP response code
        result.setSampleLabel("Request #${i} to ${url}")  // Label for this sample

    } catch (Exception e) {
        // Handle errors
        result.sampleEnd()
        result.setSuccessful(false)               // Mark request as failed
        result.setResponseMessage(e.message)     // Store exception message
        result.setResponseCode("500")            // Set response code for failure
        result.setSampleLabel("Request #${i} to ${url}")
    }

    // Send the SampleResult to View Results Tree
    SampleResult.addSubResult(result)  // This will make it appear in the listener
}
```

---


