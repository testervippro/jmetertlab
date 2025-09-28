
# **Step-by-Step Guide: Run JMeter Test and Generate Report by CSV**

---

## **Step 1: Prepare Your Test Plan**

1. Open **JMeter GUI**.
2. Add **Thread Groups**, **Samplers**, **Controllers**, and **Assertions** as needed.
3. Make sure your samplers have meaningful names; these names appear in the report.
4. Configure **CSV saving**:

   * Open `user.properties` (or `jmeter.properties`) and ensure the following:

```properties
# Save required fields in CSV
jmeter.save.saveservice.output_format=csv
jmeter.save.saveservice.label=true
jmeter.save.saveservice.response_code=true
jmeter.save.saveservice.response_message=true
jmeter.save.saveservice.successful=true
jmeter.save.saveservice.thread_counts=true
jmeter.save.saveservice.bytes=true
jmeter.save.saveservice.latency=true
jmeter.save.saveservice.connect_time=true
jmeter.save.saveservice.time=true
jmeter.save.saveservice.assertion_results_failure_message=true
jmeter.save.saveservice.timestamp_format=ms
```

5. Save your test plan, e.g., `testplan.jmx`.

---

## **Step 2: Run the Test in Non-GUI Mode**

* Open **terminal** or **command prompt**.
* Execute the test and save results to a **CSV JTL file**:

```bash
jmeter -n -t /path/to/testplan.jmx -l /path/to/results.csv
```

**Explanation of flags:**

| Flag | Purpose                                           |
| ---- | ------------------------------------------------- |
| `-n` | Non-GUI mode (faster, recommended for load tests) |
| `-t` | Path to your `.jmx` test plan                     |
| `-l` | Path to save the **results CSV (JTL)**            |

> After this, you have a CSV file with all test results.

---

## **Step 3: Generate the HTML Dashboard Report**

* Use the CSV file to generate a **complete HTML report**:

```bash
jmeter -g /path/to/results.csv -o /path/to/dashboard
```

**Explanation of flags:**

| Flag | Purpose                                            |
| ---- | -------------------------------------------------- |
| `-g` | Input CSV/JTL results file                         |
| `-o` | Output folder for dashboard (must be empty or new) |

* Open `/path/to/dashboard/index.html` in a browser.

**The report includes:**

* Response Times Over Time
* Active Threads Over Time
* Hits per Second
* Transactions per Second
* Bytes Throughput Over Time
* Percentiles & APDEX
* Error Summary & Top 5 Errors

---

## **Step 4: Optional — Filter Samplers in the Report**

* To include only specific samplers, edit `user.properties`:

```properties
# Include only specific samplers
jmeter.reportgenerator.sample_filter=^(Login|Search|Checkout).*$

# Set APDEX thresholds in ms
jmeter.reportgenerator.apdex_satisfied_threshold=500
jmeter.reportgenerator.apdex_tolerated_threshold=1500

# Granularity of over-time graphs (1 min)
jmeter.reportgenerator.overall_granularity=60000
```

* This ensures **only relevant transactions** are in the report.

---

## **Step 5: Tips for Best Practice**

* Always use **non-GUI mode** for load tests.
* Make sure your CSV contains all required fields.
* For **large tests**, do not use GUI listeners—they consume a lot of memory.
* Keep the **dashboard folder empty** before generating the report.
* You can **archive results** for historical comparison.

---

### **Summary Workflow**

```text
Prepare Test Plan (.jmx) → Run Test in Non-GUI Mode → Save Results to CSV → Generate HTML Dashboard → Analyze Graphs
```

---
