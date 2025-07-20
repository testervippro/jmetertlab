

# JMeter 101 – Hướng Dẫn Cơ Bản Bằng Tiếng Việt

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

## 🛠️ Các thành phần cơ bản trong JMeter

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

##  Ví dụ kiểm thử đơn giản với Google

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

## ⚙️ Chạy bằng dòng lệnh (CLI Mode)

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


