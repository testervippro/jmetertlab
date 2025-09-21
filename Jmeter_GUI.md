
# 📊 Generate JMeter HTML Report from GUI

### **1. Save Test Results as `.jtl`**

* In **JMeter GUI**, add a **Summary Report** or **Simple Data Writer** listener.
* Configure it to save results to a file, e.g.:

  ```
  /Users/.../report.jtl
  ```

---

### **2. Generate HTML Report from `.jtl`**

Run this command in **Terminal**:

```bash
rm -rf ~/jmeter_report && jmeter -g /Users/.../report.jtl -o ~/jmeter_report && open ~/jmeter_report/index.html
```

* `rm -rf ~/jmeter_report` → removes old report folder if it exists
* `jmeter -g` → generates report from `.jtl` file
* `-o ~/jmeter_report` → writes report to a clean folder
* `open ~/jmeter_report/index.html` → opens the report in your browser

---

### **3. Example Output**

📌 When you open the `index.html`, you’ll see an interactive report like this:

![HTML Dashboard Overview](https://github.com/user-attachments/assets/0a6af49d-cf9f-4180-b236-11a60596c1af)

![Statistics View](https://github.com/user-attachments/assets/14cee577-ce97-4787-98c5-6632107ab5bf)


