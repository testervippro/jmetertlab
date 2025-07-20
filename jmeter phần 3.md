
#  Các Khái Niệm Quan Trọng Trong Kiểm Thử Hiệu Năng

## 🔹 Think Time (Thời gian suy nghĩ)

* **Định nghĩa**: Là khoảng thời gian người dùng **tạm dừng hoặc suy nghĩ** giữa hai hành động (ví dụ: đọc nội dung trang trước khi bấm vào liên kết).
* **Tác dụng trong kiểm thử hiệu năng**: Giúp mô phỏng hành vi **thực tế** của người dùng. Không có think time sẽ dẫn đến **tải ảo cao hơn thực tế**.

---

## 🔹 90th Percentile Response Time (Thời gian phản hồi ở phần trăm thứ 90)

* **Ý nghĩa**: 90% các yêu cầu có thời gian phản hồi **thấp hơn hoặc bằng giá trị này**.
* **Lý do quan trọng**: Nó **phản ánh trải nghiệm người dùng tệ nhất trong nhóm tốt** (chứ không bị đánh lừa bởi trung bình thấp).

📌 **Ví dụ**: Nếu thời gian phản hồi trung bình là 2s, nhưng 90th percentile là 5s → 10% người dùng gặp phản hồi rất chậm.

---

## 🔹 Standard Deviation (Độ lệch chuẩn)

* **Định nghĩa**: Đo mức **dao động hoặc không ổn định** của thời gian phản hồi.
* **Độ lệch chuẩn thấp** → Thời gian phản hồi **ổn định**.
* **Độ lệch chuẩn cao** → Phản hồi **không đều, không ổn định**.

---

## 🔹 Latency, Bandwidth, Throughput & Response Time

| Thuật ngữ                              | Giải thích đơn giản                                                       |
| -------------------------------------- | ------------------------------------------------------------------------- |
| **Latency (Độ trễ)**                   | Thời gian từ khi gửi yêu cầu đến khi nhận **byte đầu tiên** từ server.    |
| **Bandwidth (Băng thông)**             | Dung lượng truyền tải tối đa (ví dụ: 100 Mbps).                           |
| **Throughput (Thông lượng)**           | Lượng dữ liệu **thực tế** được truyền qua mỗi giây.                       |
| **Response Time (Thời gian phản hồi)** | Tổng thời gian từ lúc gửi yêu cầu đến khi nhận được **toàn bộ phản hồi**. |

---

## 🔹 Tầm quan trọng của Think Time và Pacing

* **Think Time**: Mô phỏng thời gian người dùng suy nghĩ trước khi hành động tiếp theo.
* **Pacing**: Là khoảng cách giữa **các vòng lặp của một người dùng ảo** trong test.
* Cả hai giúp tránh **gây áp lực quá mức** và phản ánh **tải thực tế** hơn.

---

## 🔹 Concurrent Users vs Simultaneous Users

| Thuật ngữ                                  | Giải thích                                                                 |
| ------------------------------------------ | -------------------------------------------------------------------------- |
| **Concurrent Users (Người dùng đồng thời)** | Những người dùng đang **hoạt động cùng lúc** trong hệ thống.              |
| **Simultaneous Users (Người dùng đồng thời chính xác)** | Những người **thực hiện cùng một hành động tại cùng thời điểm**.          |



#  Realistic Performance Testing (Kiểm thử hiệu năng sát thực tế)

##  Mục tiêu chính của kiểm thử hiệu năng:

1. Xác định **ngưỡng chịu tải** của hệ thống ở mức tải mong muốn.
2. Xác định các **điểm nghẽn hiệu năng** khiến hệ thống không đạt kỳ vọng.

Để đạt được 2 mục tiêu trên, tester cần xây dựng chiến lược kiểm thử sát với **hành vi người dùng thật**.

---

##  Mô hình SEA trong kiểm thử hiệu năng

> SEA = **Scripting** (Viết kịch bản) → **Execution** (Mô phỏng tải) → **Analysis** (Phân tích kết quả)

Hầu hết các công cụ kiểm thử hiệu năng (như JMeter, LoadRunner...) đều dựa trên mô hình này.

---

## 🧠 Phần 1: Giả lập **Hành vi người dùng thật**

Một kịch bản test hiệu quả cần phản ánh đúng hành vi người dùng ngoài đời thực:

### ✅ Các yếu tố chính cần có:

#### 1. **Random Navigation (Điều hướng ngẫu nhiên)**

* Người dùng không theo cùng 1 luồng sử dụng ứng dụng.
* Cần xác định các **luồng nghiệp vụ quan trọng** (critical flows) dựa vào tần suất truy cập.

  * Ví dụ: 80% người dùng ngân hàng kiểm tra số dư tài khoản → đây là luồng quan trọng.

#### 2. **Random Input (Dữ liệu đầu vào ngẫu nhiên)**

* Mỗi người dùng nhập thông tin khác nhau: tên đăng nhập, sản phẩm tìm kiếm, địa chỉ, v.v.
* Dùng **parameterization** để mô phỏng người dùng thật với dữ liệu đa dạng.

#### 3. **Random Selections (Lựa chọn ngẫu nhiên)**

* Người dùng chọn khác nhau từ dropdown, checkbox, v.v.
* Dùng **correlation** để lấy danh sách lựa chọn và chọn ngẫu nhiên một phần tử từ danh sách.

#### 4. **Random Think Time (Thời gian suy nghĩ ngẫu nhiên)**

* Người dùng mất thời gian để đọc, gõ dữ liệu... → tạo **khoảng nghỉ** ngẫu nhiên giữa các bước.
* Mỗi người dùng có tốc độ khác nhau → thời gian nghĩ không nên cố định.

#### 5. **Browser Simulation (Giả lập trình duyệt)**

* Công cụ test **không dùng trình duyệt thật**, nhưng có thể:

  * Gửi header trình duyệt
  * Lưu cache và cookie
  * Nhận dạng người dùng cũ → tạo trải nghiệm sát thực tế.

---

##  Phần 2: Giả lập **tải sát với thế giới thực**

Sau khi hoàn thiện kịch bản, bước tiếp theo là tạo mô hình tải giống thực tế (**Workload Modelling**):

###  Các yếu tố cần xem xét:

#### 1. **Transaction Rate (Tần suất giao dịch)**

* Dựa trên thống kê thực tế vào giờ cao điểm và trung bình.
* Thiết lập số lượng người dùng/giây tương ứng.

#### 2. **Geographical Location (Khu vực địa lý)**

* Nếu 70% người dùng đến từ TP.HCM, nên đặt **Load Generator** ở đó hoặc dùng công cụ mô phỏng mạng.

#### 3. **Bandwidth (Băng thông)**

* Người dùng khác nhau có kết nối Internet khác nhau.
* Cần mô phỏng các mức băng thông khác nhau để có kết quả thực tế.

#### 4. **Transaction Type (Loại giao dịch)**

* Mỗi tính năng có tỷ lệ sử dụng khác nhau.
* Phân bổ tải theo **tỷ lệ sử dụng thực tế**.

---

##  Kết luận: Tính “Thực tế” là cốt lõi

> Performance Testing là **nghệ thuật mô phỏng thế giới thực**:

* Nghệ thuật tạo hành vi người dùng thật.
* Nghệ thuật xây dựng tải sát thực tế.
* Nghệ thuật đọc hiểu & phân tích kết quả.
* Nghệ thuật phát hiện điểm nghẽn và đảm bảo hệ thống không “gục ngã”.

Một bài kiểm thử hiệu năng **sát thực tế** là yếu tố sống còn để dự đoán hệ thống hoạt động như thế nào khi đưa vào sản xuất.

---


##  **Luật Little trong Kiểm thử Hiệu năng**

### 1.  **Bài toán đặt ra**

Trong kiểm thử hiệu năng, một tester cần mô phỏng **kịch bản thực tế** bằng cách xây dựng mô hình tải (Workload Model), gồm:

* **Số lượng người dùng (User Load)**
* **Tốc độ gửi request (TPS – Transactions Per Second)**
* **Thời gian phản hồi (Response Time)**

Luật Little giúp liên kết các chỉ số trên để tạo ra một kịch bản tải chính xác. Nhưng nếu chỉ áp dụng nguyên công thức cơ bản, có thể dẫn đến sai số lớn. Nhiều tester phải tính thủ công để đạt được kết quả mong muốn.

---

### 2.  **Luật Little là gì?**

Luật được phát triển bởi John Little năm 1954:

> **L = λ × W**

Trong đó:

* **L** = Số lượng người trong hệ thống (trung bình)
* **λ** = Tỷ lệ đến của khách hàng (arrival rate)
* **W** = Thời gian trung bình khách ở trong hệ thống

 Trong kiểm thử hiệu năng, chuyển thành:

> **U = T × R**

* **U** = Số lượng người dùng hoạt động
* **T** = Transactions per second (TPS)
* **R** = Thời gian phản hồi trung bình

---

### 3. ⚠️ **Vấn đề khi áp dụng**

Giả sử yêu cầu của khách hàng là:

* 100 người dùng
* 5 giao dịch mỗi giây (TPS)
* 2 giây response time/giao dịch

Áp dụng luật:

> **U = T × R = 5 × 2 = 10** ⛔ Sai so với yêu cầu 100 user

---

### 4. 🛠️ **Nguyên nhân sai lệch**

Khi tester **chưa tính các yếu tố quan trọng khác**:

* **Think Time**: Thời gian người dùng suy nghĩ, điền form, đọc nội dung...
* **Pacing**: Thời gian trễ giữa hai lần thực hiện lại hành trình

▶️ Nếu mỗi người dùng truy cập qua 5 trang (Login, Search, Order...), với mỗi trang mất 2 giây xử lý và 5 giây Think Time (trừ Logout), và Pacing là 70 giây:

**Công thức mới nên là:**

> **User Load = (TPS / Số giao dịch) × (Tổng thời gian phản hồi + Think Time + Pacing)**

Cụ thể:

* TPS = 5
* Số giao dịch (pages) = 5
* Tổng response time = 5 × 2 = 10 giây
* Tổng think time = (5 - 1) × 5 = 20 giây
* Pacing = 70 giây

➡️ Áp dụng:

> **U = (5 / 5) × (10 + 20 + 70) = 1 × 100 = 100 ✅**

---

### 5. 📐 **Công thức mở rộng (Công thức đúng)**

> 🧮 **User Load = (TPS / Số giao dịch) × (Tổng thời gian phản hồi + Tổng Think Time + Pacing)**

**Viết lại:**

> **U = (T / N) × (ΣR + TT + P)**
> Trong đó:

* **T**: TPS (Transactions per second)
* **N**: Số giao dịch trên mỗi lượt truy cập (pages per iteration)
* **ΣR**: Tổng thời gian phản hồi của tất cả các giao dịch
* **TT**: Tổng Think Time (không tính trang cuối)
* **P**: Pacing (thời gian trễ giữa các lượt)

---

### 6. ✅ **Lợi ích khi dùng công thức mở rộng**

* Không cần tính toán thủ công
* Tính được **pacing chính xác**
* Đảm bảo mô hình tải **đúng với yêu cầu khách hàng**
* Tránh gửi quá tải hoặc thiếu tải lên hệ thống
* Giúp xác định hiệu suất thật sự của hệ thống

---

### 7. 🔚 **Kết luận**

Luật Little nguyên bản **chỉ dùng 3 biến**, nhưng trong kiểm thử hiệu năng, chúng ta cần **6 yếu tố** để mô phỏng đúng thực tế:
➡️ **Số lượng người dùng, TPS, Response Time, Think Time, Pacing và Số giao dịch**

Việc sử dụng **công thức mở rộng** giúp Performance Tester:

* Xây dựng được mô hình tải chính xác
* Giảm thiểu sai sót
* Không cần phải tính toán giấy tay thủ công

### 📌 **Tóm tắt về công thức CPS (Characters Per Second)**

**Công thức:**

$$
\text{CPS} = \text{RB} \times 128
$$

Trong đó:

* 🔹 **CPS (Characters per second)**: Số ký tự truyền được mỗi giây.
* 🔹 **RB (Required Bandwidth)**: Băng thông yêu cầu, nhập bằng **kbps** (kilobit/giây).

---

### ✅ **Giải thích:**

* 1 **kilobit** = 1024 **bit**, nhưng công thức dùng gần đúng là **1 kbps ≈ 128 characters/second** (vì 1 ký tự ≈ 8 bit).
* Bạn nhân băng thông (kbps) với 128 để ước lượng số ký tự có thể truyền mỗi giây.

---

### 🧠 **Dùng khi nào?**

* Khi cần **tính toán dữ liệu gửi đi** từ người dùng ảo trong **kiểm thử hiệu năng** (performance testing).
* Để đảm bảo **băng thông mạng** đủ cho số lượng user đang mô phỏng.

---

### 🔧 **Ví dụ:**

Nếu bạn có băng thông là **100 kbps**, thì:

$$
\text{CPS} = 100 \times 128 = 12,800 \text{ characters/second}
$$

👉 Tức là hệ thống có thể truyền **12,800 ký tự mỗi giây** với băng thông đó.


### ách kiến thức về phần cứng để phục vụ Performance Testing**

(Kiến thức cơ bản đến nâng cao, dành cho tester/QA)


## 🧩 1. **Tại sao cần hiểu phần cứng trong Performance Testing?**

* Performance testing không chỉ đánh giá phần mềm mà còn đo lường khả năng **hạ tầng phần cứng** như:

  * CPU, RAM
  * Disk I/O
  * Network Bandwidth
* Hiểu phần cứng giúp:

  * Xác định **bottleneck (nút thắt)**: ứng dụng hay hệ thống?
  * Đề xuất **scale-up hoặc scale-out**
  * Thiết kế **kịch bản test thực tế** hơn

---

## 🧠 . **Các thành phần phần cứng quan trọng**

| Thành phần         | Vai trò                                   | Gợi ý theo dõi                               |
| ------------------ | ----------------------------------------- | -------------------------------------------- |
| **CPU**            | Xử lý logic và tính toán                  | % CPU Usage, Load Average                    |
| **RAM**            | Bộ nhớ tạm thời để xử lý dữ liệu          | Available Memory, Page Faults/sec            |
| **Disk** (Storage) | Lưu trữ dữ liệu, truy xuất file           | Disk Read/Write IOPS, Queue Length           |
| **Network**        | Truyền nhận dữ liệu qua Internet/Intranet | Bandwidth (Throughput), Latency, Packet Loss |

---

## 📊 3. **Các công cụ theo dõi phần cứng**

* **Windows**:

  * Task Manager
  * Performance Monitor (PerfMon)
* **Linux**:

  * `top`, `htop`, `vmstat`, `iostat`, `sar`
* **Cross-platform**:

  * **Grafana + Prometheus**
  * **Nagios**, **Zabbix**
  * **New Relic**, **Datadog**, **AppDynamics**

---

## 🧪 4. **Thông số phần cứng cần monitor trong Performance Test**

| Loại                     | Mục tiêu                           |
| ------------------------ | ---------------------------------- |
| **CPU Usage (%)**        | Dưới 70% là lý tưởng               |
| **RAM Usage (%)**        | Tránh dùng > 90%                   |
| **Disk I/O (ms)**        | Thời gian đọc/ghi nên thấp         |
| **Network Latency (ms)** | Càng thấp càng tốt (<100ms)        |
| **Throughput (Mbps)**    | Phù hợp với yêu cầu user đồng thời |

---

## 📘 5. **Kết nối với các loại Performance Testing**

| Loại Test                 | Phần cứng cần chú ý      |
| ------------------------- | ------------------------ |
| **Load Test**             | CPU, RAM, Network        |
| **Stress Test**           | CPU, RAM, Disk I/O       |
| **Spike Test**            | RAM, Network             |
| **Endurance Test (Soak)** | RAM rò rỉ, Disk tăng dần |
| **Volume Test**           | Disk I/O                 |

---

## 🎯 6. **Kinh nghiệm thực tế**

* Luôn **giám sát hệ thống trong quá trình test**
* So sánh với baseline: "Lúc bình thường thì CPU là bao nhiêu?"
* Cân nhắc tạo **dashboards hiển thị thời gian thực**

---

