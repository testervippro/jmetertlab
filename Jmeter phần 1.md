

# JMeter 101 – Hướng Dẫn Cơ Bản Bằng Tiếng Việt
## Nội dung 
1. Giới thiệu về JMeter
2. Cài đặt JMeter
3. Ví dụ nhỏ chạy JMeter bằng Command Line (CLI)
4. Cấu trúc thư mục trong JMeter
5. Các chế độ mở (Open Mode) trong JMeter

**Apache JMeter** là một công cụ mã nguồn mở mạnh mẽ giúp kiểm thử hiệu năng, kiểm thử tải và cả kiểm thử chức năng cho các hệ thống như website, API, cơ sở dữ liệu, và nhiều hơn nữa.

---

##  JMeter là gì?

JMeter có thể được dùng để:

- Kiểm thử hiệu năng (Performance Testing)
- Kiểm thử tải (Load Testing)
- Kiểm thử chức năng (Functional Testing)

**Hỗ trợ nhiều giao thức:**

- HTTP/HTTPS
- REST API / SOAP
- JDBC (kết nối cơ sở dữ liệu)
- FTP
- WebSocket (thông qua plugin)

---

##  Tại sao nên dùng JMeter?

- Miễn phí và mã nguồn mở
- Giao diện đơn giản, dễ sử dụng
- Hỗ trợ chạy song song và phân tán
- Chạy được trên giao diện hoặc dòng lệnh
- Dễ tích hợp vào hệ thống CI/CD
- Hỗ trợ mở rộng thông qua plugin

---

##  Các thành phần cơ bản trong JMeter

| Thành phần       | Giải thích                                |
|------------------|--------------------------------------------|
| **Test Plan**     | Kế hoạch kiểm thử tổng thể                |
| **Thread Group**  | Mô phỏng số lượng người dùng              |
| **Sampler**       | Gửi yêu cầu đến server (ví dụ: HTTP)      |
| **Controller**    | Điều khiển luồng kiểm thử (Loop, If...)   |
| **Listener**      | Hiển thị kết quả kiểm thử (bảng, biểu đồ) |
| **Timer**         | Tạo thời gian chờ giữa các yêu cầu        |
| **Assertion**     | Kiểm tra phản hồi từ server               |
| **Config Element**| Cấu hình dữ liệu đầu vào (CSV, Header...) |

---

##  Ví dụ kiểm thử đơn giản với Google (Thực hiện sau khi cài đặt) 

**Bước 1: Mở JMeter**
- Tải tại: [https://jmeter.apache.org](https://jmeter.apache.org)

**Bước 2: Tạo Test Plan**
- Thêm **Thread Group**
  - Number of Threads: `10`
  - Ramp-Up Period: `5`
  - Loop Count: `2`

**Bước 3: Thêm HTTP Request**
- Server Name: `www.google.com`
- Method: `GET`
- Path: `/`

**Bước 4: Thêm Listener**
- View Results Tree

**Bước 5: Chạy kiểm thử**
- Nhấn nút `Run ▶` để chạy

---

##  Kiểm thử theo dữ liệu (CSV Data Set)

Tạo file CSV như sau:

```csv
username,password
user1,pass1
user2,pass2
````

Sau đó sử dụng các biến:

```text
${username} và ${password}
```

trong phần HTTP Request để tự động kiểm thử nhiều người dùng.

---

##  Chạy bằng dòng lệnh (CLI Mode)

Sử dụng dòng lệnh để chạy test không cần giao diện:

```bash
jmeter -n -t test_plan.jmx -l result.jtl -e -o output_dir
```

Giải thích:

* `-n`: Chế độ không giao diện (non-GUI)
* `-t`: File kế hoạch `.jmx`
* `-l`: Ghi log kết quả `.jtl`
* `-e -o`: Tạo báo cáo HTML

---

##  Mẹo và khuyến nghị

* Dùng **Timer** để mô phỏng hành vi người dùng
* Dùng **Assertion** để kiểm tra phản hồi đúng
* Tránh chạy test lớn bằng giao diện (nên dùng CLI)
* Cài thêm plugin bằng **JMeter Plugin Manager**
* Dùng **PerfMon** để giám sát CPU, RAM của server khi test

---

##  Tài liệu & Khóa học hữu ích

* [Hướng dẫn chính thức của JMeter](https://jmeter.apache.org/usermanual/)
* [Danh sách plugin JMeter](https://jmeter-plugins.org/)
* [Khóa học miễn phí từ BlazeMeter](https://www.blazemeter.com/)

---

---


#  Hướng Dẫn Cài Đặt Java và JMeter (Windows)

##  Cài đặt Java JDK

Tải và cài đặt JDK 17 (bạn có thể thay đổi version nếu muốn):

```powershell
# Đường dẫn tải về JDK
$url = "https://download.oracle.com/java/17/archive/jdk-17.0.12_windows-x64_bin.exe" 

# Thay đổi đường dẫn nếu cần
$outputPath = "C:\Users\ad\Downloads\jdk-17-installer.exe"

# Tải JDK
Invoke-WebRequest -Uri $url -OutFile $outputPath

# Cài đặt im lặng
Start-Process -FilePath $outputPath -ArgumentList "/s" -NoNewWindow -Wait

# Kiểm tra Java đã cài thành công chưa
java -version

# Thiết lập biến môi trường JAVA_HOME
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"  # Chỉnh sửa nếu cài ở nơi khác
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", $env:JAVA_HOME, "Machine")

# Thêm vào PATH
$path = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
$path += ";C:\Program Files\Java\jdk-17\bin"  # Chỉnh sửa nếu cần
[System.Environment]::SetEnvironmentVariable("Path", $path, "Machine")

# Kiểm tra JAVA_HOME
Write-Host "Java Home"
[System.Environment]::GetEnvironmentVariable("JAVA_HOME", "Machine")
```


##  Cài đặt Apache JMeter

```powershell
# Phiên bản JMeter
$jmeterVersion = "5.6.3"
$jmeterUrl = "https://dlcdn.apache.org//jmeter/binaries/apache-jmeter-$jmeterVersion.zip"
$jmeterZipPath = "$env:USERPROFILE\Downloads\apache-jmeter-$jmeterVersion.zip"
$jmeterExtractPath = "C:\Apache\jmeter-$jmeterVersion"

# Tải JMeter
Invoke-WebRequest -Uri $jmeterUrl -OutFile $jmeterZipPath

# Tạo thư mục cài
New-Item -ItemType Directory -Path $jmeterExtractPath -Force

# Giải nén
Expand-Archive -Path $jmeterZipPath -DestinationPath $jmeterExtractPath -Force

# Thêm JMeter vào PATH
$jmeterBinPath = "$jmeterExtractPath\apache-jmeter-$jmeterVersion\bin"
$existingPath = [System.Environment]::GetEnvironmentVariable('Path', [System.EnvironmentVariableTarget]::Machine)
[System.Environment]::SetEnvironmentVariable('Path', "$jmeterBinPath;$existingPath", [System.EnvironmentVariableTarget]::Machine)

# Kiểm tra JMeter
$jmeterOutput = jmeter -v 2>&1
Write-Host "JMeter version:"
Write-Host $jmeterOutput
```

---

##  Kết quả mong đợi

Chạy các lệnh sau trong terminal để kiểm tra:

```powershell
java -version
jmeter -v
```
<img width="1919" height="1075" alt="Screenshot 2025-07-20 220901" src="https://github.com/user-attachments/assets/f6ab8f5f-6055-458e-a6f6-ff32bce6867f" />


Bạn sẽ thấy thông tin version cho từng công cụ nếu cài đặt thành công.

---

 **Ghi chú:**

* Các bước này dùng cho **Windows PowerShell**.
* Cần quyền **Administrator** để thay đổi biến môi trường hệ thống.
* Nhớ **restart terminal** sau khi cài để cập nhật biến môi trường.

---

##  Chạy Test & Tạo Báo Cáo từ Dòng Lệnh

Sau khi đã cài đặt xong và có sẵn file `test_plan.jmx`, bạn có thể:

###  Chạy kiểm thử:

```bash
jmeter -n -t test_plan.jmx -l result.jtl
```

* `-n`: Chạy chế độ không giao diện
* `-t`: Đường dẫn đến file kịch bản `.jmx`
* `-l`: Ghi kết quả vào file `.jtl`

###  Tạo báo cáo HTML sau khi test xong:

```bash
jmeter -n -t test_plan.jmx -l result.jtl -e -o report-folder
```

* `-e`: Kích hoạt tạo báo cáo
* `-o`: Thư mục chứa báo cáo HTML




 📁 Cấu trúc thư mục của Apache JMeter
##<img width="1919" height="1079" alt="Screenshot 2025-07-20 220726" src="https://github.com/user-attachments/assets/5a700aa2-edca-4479-ade5-8f230c310f6e" />

Sau khi bạn giải nén gói cài đặt của **Apache JMeter**, bạn sẽ thấy một số thư mục và file chính nằm trong thư mục gốc `apache-jmeter-<version>`. Việc hiểu cấu trúc thư mục giúp bạn dễ dàng quản lý, cấu hình và mở rộng JMeter.

### 📂 Thư mục chính (Root Folder)

Tên: `apache-jmeter-<phiên bản>`
→ Là thư mục gốc chứa toàn bộ các thành phần của JMeter.

---

### 📂 /backups

* Chỉ được tạo **tự động** khi bạn bắt đầu tạo test script.
* Chứa các bản sao lưu `.jmx` của script trong quá trình làm việc.
* Số lượng backup có thể điều chỉnh trong file `jmeter.properties`.

---

### 📂 /bin

* **Quan trọng nhất**: chứa các file thực thi như:

  * `jmeter.bat` (chạy GUI trên Windows)
  * `jmeter.sh`, `heapdump.sh` (chạy trên Unix/Linux)
* Cũng chứa:

  * Các file cấu hình: `jmeter.properties`, `user.properties`
  * File log, script mẫu, chứng chỉ SSL
  * Các thư mục con:

    * `examples`: chứa file CSV và ví dụ script
    * `templates`: mẫu test plan
    * `report-template`: mẫu báo cáo

---

### 📂 /docs

* Chứa tài liệu hướng dẫn, hình ảnh, CSS, và API.
* Chủ yếu phục vụ cho việc hiển thị và trình bày thông tin trong tài liệu.

---

### 📂 /extras

* Chứa các file phụ trợ như: `.xml`, `.xsl`, `.bsh`, `.sh`
* Hỗ trợ giao diện người dùng hoặc tính năng mở rộng.

---

### 📂 /lib

* Chứa **các thư viện JAR** cần thiết để JMeter hoạt động.
* Có 2 thư mục con:

  * `/ext`: thư viện mở rộng, thêm plugin ngoài
  * `/junit`: thư viện JUnit dùng trong test

---

### 📂 /licenses

* Chứa các **giấy phép phần mềm** (license, copyright, terms of use).
* Áp dụng cho các thư viện JAR trong `/lib`.

---

### 📂 /printable\_docs

* Chứa tài liệu hướng dẫn dạng **PDF và HTML**.
* Có thể mở trực tiếp để xem nội dung như tutorial hoặc hướng dẫn sử dụng.

---

### 📄 Các file đi kèm

* `LICENSE`: giấy phép sử dụng JMeter
* `NOTICE`: ghi chú pháp lý và thông báo
* `README.md`: thông tin cơ bản về JMeter

---


##  Các chế độ khởi động JMeter

Sau khi cài đặt thành công JMeter, bạn có thể khởi động công cụ này bằng **3 chế độ khác nhau**, tùy mục đích sử dụng:

---

### 1. **GUI Mode** – Giao diện đồ họa

**Mục đích:**

* Dùng để tạo, chỉnh sửa và kiểm thử (debug) script.
* Phù hợp để thiết kế test plan, **không nên dùng để load test vì tốn nhiều bộ nhớ**.

**Cách khởi động:**

* Mở file `jmeter.bat` trong thư mục `/bin` (Windows).
* Hoặc qua CMD:

  ```bash
  cd đường_dẫn_đến_bin
  jmeter.bat
  ```
* Hoặc qua CMD After add to Path :

  ```bash
  jmeter
  ```

### 2. **Non-GUI Mode** – Dòng lệnh

**Mục đích:**

* Dùng để **thực thi test** khi load test vì tiết kiệm tài nguyên hệ thống.

**Câu lệnh:**

* Windows:

  ```bash
  jmeter -n -t đường_dẫn_script.jmx -l đường_dẫn_log.jtl
  ```
* Unix:

  ```bash
  ./jmeter.sh -n -t script.jmx -l log.jtl
  ```

**Lệnh bổ sung:**

* `jmeter -?` → liệt kê tất cả tham số dòng lệnh hỗ trợ.
* `stoptest` hoặc `shutdown` → dừng test (tuỳ kiểu).

**Một số lệnh hữu ích:**

* `jmeter.bat` – Chạy GUI
* `jmeter -n` – Chạy Non-GUI
* `jmeter -n -r` – Chạy test Non-GUI từ xa
* `jmeter-server.bat` – Bật chế độ server

---

### 3. **Server Mode (Distributed Testing)**

**Mục đích:**

* **Kiểm thử phân tán** theo mô hình client-server.
* GUI hoạt động như client, các máy chủ chạy `jmeter-server`.

**Câu lệnh thực thi:**

* Windows:

  ```bash
  jmeter -n -t script.jmx -l log.jtl -r
  ```
* Unix:

  ```bash
  ./jmeter.sh -n -t script.jmx -l log.jtl -r
  ```

**Thực thi trên các server cụ thể:**

* Windows:

  ```bash
  jmeter -n -t script.jmx -l log.jtl -R server1,server2
  ```

**Hỗ trợ proxy/firewall (tùy chọn):**

```bash
jmeter -H proxy.host -P 8080 -u user -a pass -N localhost
```

---

##  Gợi ý

* **Dùng GUI để viết và kiểm tra script.**
* **Dùng Non-GUI để chạy test thật.**
* **Dùng Server mode khi cần test tải phân tán trên nhiều máy.**









