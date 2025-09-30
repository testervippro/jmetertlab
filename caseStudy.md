
```groovy
// ==========================================
// Thread Group Loop (fetch all data with paging)
// Loop condition:
// ${__jexl3(${page} < ${last_page},)}
// ==========================================

import groovy.json.JsonSlurper

// --- Parse JSON response ---
def response = prev.getResponseDataAsString()
def json = new JsonSlurper().parseText(response)

// --- Get list of violations ---
def violations = json.data.message_violations

// --- Collect IDs for "Reviewing" status ---
def idsReviewingLocal = vars.get("idsReviewingListLocal")?.split(",")*.trim() ?: []

violations.each { v ->
    if (v.status_name == "Reviewing") {
        idsReviewingLocal.add(v.id.toString())

        // --- Store in thread-local variable ---
        vars.put("idsReviewingListLocal", idsReviewingLocal.join(","))

        // --- Update global property ---
        props.put("idsReviewingList", idsReviewingLocal.join(","))
    }
}

// Optional: store test01 for debugging/demo
props.put("test01", "106,105")

// --- Log for debugging ---
log.info("Thread-local idsReviewingListLocal: " + vars.get("idsReviewingListLocal"))
log.info("Global idsReviewingList: " + props.get("idsReviewingList"))

// --- Increment page (optional) ---
def page = vars.get("page")?.toInteger() ?: 1
page++
vars.put("page", page.toString())
log.info("Current page incremented to: " + page)

// ==========================================
// Pre HTTP GET: Use global IDs safely
// Lock on the props object to prevent race conditions
// ==========================================
synchronized (props) {

    // Get IDs from property and split into a list
    def idsStr = props.get("idsReviewingList") 
    def idsList = idsStr.split(",")*.trim().findAll { it }

    if (!idsList) {
        log.warn("No IDs left in 'idsReviewingList'!")
        return
    }

    // Take the first ID from the list
    def currentId = idsList.remove(0)

    // Update the property with the remaining IDs
    props.put("idsReviewingList", idsList.join(","))

    // Append ID to existing HTTP Request path
    sampler.path = sampler.path + "/" + currentId

    // --- Log for debugging ---
    log.info("Using ID: $currentId, Updated Path: ${sampler.path}")
    log.info("Remaining IDs: ${props.get('idsReviewingList')}")
}
```

---

