

# **JMeter Groovy Built-in Variables Cheat Sheet with JSON Examples**

## **1. prev – Last Sampler Result**

Represents the previous sampler (`SampleResult`) → use to access the response.

| Method                           | Description               | Example                                                 |
| -------------------------------- | ------------------------- | ------------------------------------------------------- |
| `prev.getResponseDataAsString()` | Response body as string   | `def resp = prev.getResponseDataAsString()`             |
| `prev.getResponseCode()`         | HTTP status code          | `assert prev.getResponseCode() == "200"`                |
| `prev.getResponseMessage()`      | Response message          | `log.info(prev.getResponseMessage())`                   |
| `prev.isSuccessful()`            | Boolean if sampler passed | `if (!prev.isSuccessful()) log.warn("Request failed!")` |

**JSON parsing example:**

```groovy
import groovy.json.JsonSlurper

def response = prev.getResponseDataAsString()
def json = new JsonSlurper().parseText(response)
vars.put("userId", json.id.toString()) // Save to thread variable
log.info("User ID: ${vars.get('userId')}")
```

---

## **2. vars – Thread Variables**

Store/retrieve **per-thread variables**.

| Method                     | Description     | Example                         |
| -------------------------- | --------------- | ------------------------------- |
| `vars.get("name")`         | Get variable    | `def uid = vars.get("userId")`  |
| `vars.put("name","value")` | Set variable    | `vars.put("token", json.token)` |
| `vars.remove("name")`      | Remove variable | `vars.remove("oldValue")`       |

**Example: using JSON values**

```groovy
vars.put("email", json.email)
def email = vars.get("email")
```

---

## **3. props – Global Properties**

Accessible across all threads → good for shared data.

| Method                      | Description     | Example                               |
| --------------------------- | --------------- | ------------------------------------- |
| `props.get("name")`         | Get property    | `def apiBase = props.get("API_BASE")` |
| `props.put("name","value")` | Set property    | `props.put("TOKEN", json.token)`      |
| `props.remove("name")`      | Remove property | `props.remove("TOKEN")`               |

---

## **4. log – Logging**

Write to `jmeter.log`.

| Method             | Description | Example                                      |
| ------------------ | ----------- | -------------------------------------------- |
| `log.info("msg")`  | Info        | `log.info("User ID: ${vars.get('userId')}")` |
| `log.warn("msg")`  | Warning     | `log.warn("Request failed!")`                |
| `log.error("msg")` | Error       | `log.error("Critical failure!")`             |
| `log.debug("msg")` | Debug       | `log.debug("JSON: ${response}")`             |

---

## **5. ctx – JMeter Context**

Access current thread, sampler, variables, etc.

| Method                    | Description           | Example                                     |
| ------------------------- | --------------------- | ------------------------------------------- |
| `ctx.getThreadNum()`      | Current thread number | `log.info("Thread: " + ctx.getThreadNum())` |
| `ctx.getThreadGroup()`    | Thread group object   | `def tg = ctx.getThreadGroup()`             |
| `ctx.getPreviousResult()` | Same as `prev`        | `def last = ctx.getPreviousResult()`        |

---

## **6. sampler – Current Sampler**

Access or modify current sampler.

| Method                       | Description  | Example                                                                                                         |
| ---------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------- |
| `sampler.getName()`          | Sampler name | `log.info(sampler.getName())`                                                                                   |
| `sampler.getHeaderManager()` | HTTP headers | `sampler.getHeaderManager().add(new org.apache.jmeter.protocol.http.control.Header("Auth", vars.get("token")))` |

---

## **7. Working with JSON Responses (Common Patterns)**

### Extract JSON fields

```groovy
import groovy.json.JsonSlurper

def json = new JsonSlurper().parseText(prev.getResponseDataAsString())
vars.put("userId", json.id.toString())
vars.put("userEmail", json.email)
```

### Extract nested JSON

```groovy
vars.put("orderId", json.order.id.toString())
vars.put("firstItemName", json.order.items[0].name)
```

### Conditional checks on JSON

```groovy
assert json.success == true : "API failed!"
if (json.data.size() > 0) {
    log.info("Received data count: ${json.data.size()}")
}
```

### Loop through JSON array

```groovy
json.items.each { item ->
    log.info("Item: ${item.name} - ${item.price}")
}
```

---

## ✅ **Best Practices**

1. Use `prev` only **after a sampler executes**.
2. Store reusable data in `vars` (thread-level) or `props` (global).
3. Always **check for null / missing fields** when parsing JSON.
4. Use `log` for debugging but remove heavy logging in load tests.

