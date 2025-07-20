
## 1.  JMeter – Các Thành Phần (Elements)
## 2.  Thread Group
## 3. Timer
## 4.  Pre-Processors
## 5.  Post-Processors
## 6.  Assertions
## 7.  Listeners

#  JMeter – Các Thành Phần (Elements)

##  Tổng Quan

JMeter là một công cụ dễ sử dụng với giao diện thân thiện. Nó là một công cụ dựa trên **các phần tử (elements)**, trong đó mỗi phần tử đại diện cho một chức năng cụ thể trong việc xây dựng và thực thi kịch bản kiểm thử như: thời gian chờ, kiểm tra phản hồi, gửi yêu cầu, bộ nhớ đệm, mô phỏng tình huống kiểm thử, v.v...

JMeter hỗ trợ rất nhiều **plugin bên ngoài** giúp việc scripting và phân tích trở nên dễ dàng hơn.

---

##  Danh sách 11 Phần Tử Chính của JMeter

### 1.  Test Plan

* **Mô tả:** Phần tử gốc, là cha của tất cả các phần tử khác.
* **Chức năng:** Là nơi định nghĩa toàn bộ kịch bản kiểm thử.
* **Ghi chú:** Có thể đổi tên theo tên dự án hoặc test case.

---

### 2.  Thread Group

* **Mô tả:** Nhóm các luồng mô phỏng người dùng thực hiện kiểm thử.
* **Chức năng:**

  * Cài đặt số lượng người dùng (threads)
  * Thời gian ramp-up
  * Số vòng lặp của bài test
  * Thời gian bắt đầu và thời lượng chạy

---

### 3.  Logic Controllers

* **Mô tả:** Xác định thứ tự thực thi các phần tử con như Sampler hoặc Logic Controller khác.
* **Ví dụ:** If Controller, Loop Controller, While, Switch,...

---

### 4.  Samplers

* **Mô tả:** Dùng để gửi các loại yêu cầu khác nhau đến server.
* **Ví dụ:** HTTP Request, FTP Request, JDBC Request, SOAP/XML-RPC Request,…

---

### 5.  Config Elements

* **Mô tả:** Dùng để cấu hình các giá trị mặc định hoặc thiết lập cho Sampler.
* **Lưu ý:** Phạm vi (scope) của config element là **cục bộ**, chỉ ảnh hưởng đến phần tử con cùng scope.

---

##  Ví dụ: Phạm vi (scope) cục bộ của Config Element trong JMeter

###  Mục tiêu:

Cho thấy rằng một `Config Element` chỉ áp dụng cho các phần tử (ví dụ: `Sampler`) **nằm trong cùng một scope** (phạm vi).

---

###  Cấu trúc Test Plan:

```
Test Plan
└── Thread Group
    ├── HTTP Request Defaults (Config Element - Server: example.com)
    ├── HTTP Request #1 (Sampler)
    └── Simple Controller
        ├── HTTP Request Defaults (Config Element - Server: reqres.in)
        └── HTTP Request #2 (Sampler)
```


###  Phân tích:

* **HTTP Request Defaults 1** được cấu hình với `Server Name or IP = example.com`.
* **HTTP Request Defaults 2** (nằm trong `Simple Controller`) có `Server Name or IP = reqres.in`.

####  Kết quả khi chạy:

| Sampler         | Server được dùng                                   |
| --------------- | -------------------------------------------------- |
| HTTP Request #1 | `example.com`                                      |
| HTTP Request #2 | `reqres.in` (scope cục bộ trong Simple Controller) |

---

###  Kết luận:

* `HTTP Request Defaults` trong `Thread Group` áp dụng cho tất cả các sampler **trong cùng scope**, **trừ khi** bị ghi đè bởi một config element **gần hơn** (cục bộ hơn).
* Config Element không ảnh hưởng đến sampler **ngoài scope của nó**.

---


### 6.  Pre-Processors

* **Mô tả:** Thực thi trước khi Sampler được gọi.
* **Chức năng:** Chỉnh sửa hoặc cập nhật dữ liệu đầu vào trước khi gửi yêu cầu.

---

### 7.  Post-Processors

* **Mô tả:** Thực thi sau khi Sampler hoàn tất.
* **Chức năng:** Trích xuất dữ liệu từ response.
* **Ví dụ quan trọng:** `Regular Expression Extractor`.

---

### 8.  Assertions

* **Mô tả:** Dùng để xác minh tính đúng đắn của phản hồi từ server.
* **Ví dụ:** Response Assertion, Duration Assertion,...
* **Ghi chú:** Nếu Assertion sai, Sampler sẽ hiển thị màu đỏ trong **View Results Tree**.

---

### 9.  Timers

* **Mô tả:** Giúp điều chỉnh khoảng thời gian giữa các request.
* **Chức năng:** Tránh gửi liên tục gây quá tải server.

---

### 10.  Listener

* **Mô tả:** Hiển thị kết quả các Sampler đã chạy.
* **Chức năng:** Phân tích kết quả bằng đồ thị, bảng, cây,...
* **Lưu ý:** Chỉ nên dùng trong **GUI mode**, có thể lưu kết quả ra file.

---

### 11.  Non-Test Elements

* **Mô tả:** Không tham gia trực tiếp vào quá trình kiểm thử.
* **Ví dụ:** `HTTP(S) Test Script Recorder` dùng để ghi lại kịch bản kiểm thử.

---
### 12. Test Fragment

* **Mô tả:**
  `Test Fragment` là một loại **Test Element đặc biệt** trong JMeter, **không tự động được thực thi** khi chạy test. Nó được thiết kế để **tái sử dụng**, giúp **tách biệt các phần test phức tạp** thành các module nhỏ hơn, dễ quản lý hơn.

* **Tác dụng:**
  Dùng để **chia nhỏ kịch bản lớn** thành nhiều phần để nhiều người có thể làm song song, hoặc tái sử dụng trong nhiều Thread Group thông qua `Module Controller`.

* **Ví dụ:**
  Giả sử bạn cần viết test cho luồng lớn gồm nhiều bước như:

  1. Launch Home Page
  2. User Sign-up
  3. User Verification
  4. User Login
  5. Search và đặt hàng
  6. Đánh giá sản phẩm

  Để chia công việc cho 3 người trong 1 ngày, bạn có thể chia nhỏ thành 3 `Test Fragment`:

  * Fragment 1: Launch, Sign-up, Verify
  * Fragment 2: Login, Search, Add to cart
  * Fragment 3: Payment, Submit, Rate

  Sau đó dùng `Module Controller` để gọi từng fragment này trong `Thread Group`.

---


##  Mối Quan Hệ Cha – Con giữa Các Phần Tử JMeter

Hầu hết các phần tử trong JMeter đều có **mối quan hệ cha – con rõ ràng**.
Ví dụ:

* **Logic Controller** có thể chứa các phần tử con như:

  * Sampler
  * Config Element
  * Pre/Post Processor
  * Listener
  * Timer
  * Assertions
  * Logic Controller khác


---

### 2.  Thread Group

<img width="576" height="417" alt="JMeter-Thread-Group" src="https://github.com/user-attachments/assets/b6d7ab58-8a7e-47fa-a49a-2dcaec8bb171" />

* **Mô tả:**
  `Thread Group` là nhóm người dùng ảo mô phỏng hành vi thực tế để thực hiện kiểm thử hiệu năng. Đây là phần tử bắt buộc trong mỗi kịch bản test của JMeter.

* **Tác dụng chính:**

  * Mô phỏng số lượng người dùng truy cập (threads)
  * Cấu hình thời gian khởi động (ramp-up)
  * Số vòng lặp (loop count)
  * Quản lý lỗi trong quá trình test
  * Thiết lập thời gian chạy & delay khởi động

---

####  Các trường cấu hình chính:

| Trường                                 | Mô tả                                                          |
| -------------------------------------- | -------------------------------------------------------------- |
| **Number of Threads (Users)**          | Số lượng người dùng mô phỏng                                   |
| **Ramp-up Period (seconds)**           | Thời gian để khởi động toàn bộ threads                         |
| **Loop Count**                         | Số lần lặp lại của kịch bản test                               |
| **Action on Sampler Error**            | Xử lý khi có lỗi sampler: Continue, Stop Thread, Stop Test,... |
| **Same user on each iteration**        | Duy trì phiên (session) người dùng giữa các vòng lặp           |
| **Delay Thread creation until needed** | Chỉ tạo thread khi đến thời điểm tương ứng trong ramp-up       |
| **Specify Thread Lifetime**            | Cho phép cấu hình thời gian chạy cụ thể                        |
| **Startup Delay (seconds)**            | Thời gian delay trước khi bắt đầu test sau khi nhấn Run        |

---

####  Quan hệ cha – con:

* **Phần tử cha có thể chứa Thread Group:**
  `Test Plan`

* **Thread Group có thể chứa các phần tử con:**
  `Sampler`, `Logic Controller`, `Config Element`, `Pre/Post Processor`, `Assertion`, `Timer`, `Listener`, `Test Fragment`

* **Không thể là con của:**
  `Non-Test Element`, `Test Plan`, `Thread Group khác`

---

####  Ví dụ:

* Nếu bạn muốn mô phỏng 100 người dùng truy cập trong vòng 5 phút, bạn có thể:

  * `Number of Threads`: 100
  * `Ramp-up`: 300 (mỗi người dùng khởi động cách nhau 3 giây)
  * `Loop Count`: 1 (chạy một lần)
  * Kết hợp với `HTTP Request`, `Assertion`, `Listener` để tạo kịch bản hoàn chỉnh.

---

###   Các loại Thread Group đặc biệt

---

####  `setUp Thread Group`

* **Mô tả:**
  Dùng để thực hiện các bước thiết lập (setup) trước khi `Thread Group chính` chạy, ví dụ như: tạo dữ liệu test, đăng nhập trước, hoặc gọi API khởi tạo.

* **Đặc điểm:**

  * Chạy **trước** tất cả các Thread Group khác.
  * Không nên chứa các lệnh kiểm thử chính.
  * Chỉ chạy **một lần**, độc lập với `Thread Group chính`.

* **Ví dụ:**
  Trước khi chạy test, bạn muốn tạo 10 users bằng API `POST /api/create-user`. Thì bạn có thể thêm `HTTP Request` trong `setUp Thread Group` để gửi yêu cầu tạo users.

---

####  `tearDown Thread Group`

* **Mô tả:**
  Dùng để **giải phóng**, **dọn dẹp**, hoặc **đóng kết nối** sau khi các Thread Group khác đã hoàn tất.

* **Đặc điểm:**

  * Chạy **sau cùng**, sau tất cả các Thread Group khác.
  * Không chứa hành động kiểm thử chính.

* **Ví dụ:**
  Sau khi test xong, bạn gọi `DELETE /api/users` để xóa dữ liệu test vừa tạo hoặc logout phiên làm việc bằng API.

---

###  Các Thread Group mở rộng (từ Plugin)

---

####  `Ultimate Thread Group`

* **Mô tả:**
  Cho phép kiểm soát **chi tiết luồng thời gian** tạo thread như: tăng từ từ, giữ ổn định, giảm dần… rất linh hoạt.

* **Ví dụ:**
  Bạn muốn:

  * Tăng 20 người dùng mỗi 10 giây.
  * Giữ nguyên 100 người dùng trong 2 phút.
  * Sau đó giảm dần.

  \=> Có thể cấu hình từng giai đoạn trong bảng: "Start Threads", "Initial Delay", "Startup Time", "Hold Load", "Shutdown Time".

---

####  `Concurrency Thread Group`

* **Mô tả:**
  Được thiết kế để duy trì một **mức người dùng đồng thời** (concurrent users) cụ thể và linh hoạt hơn so với Thread Group mặc định.

* **Ví dụ:**
  Bạn muốn giữ **50 người dùng đồng thời** truy cập API trong **5 phút**, có thể cấu hình:

  * Target concurrency: 50
  * Ramp-up time: 60s
  * Hold target rate time: 300s

---

####  `Arrivals Thread Group`

* **Mô tả:**
  Mô phỏng số lượng **người dùng đến mới** trong một khoảng thời gian cụ thể (arrival rate), thay vì người dùng đồng thời.

* **Ví dụ:**
  Bạn muốn mô phỏng **20 người dùng đến mỗi phút** trong vòng 10 phút
  ⇒ Đây là **arrival rate = 20 users/minute**
  (Số người dùng có thể trùng hoặc khác nhau tùy phiên chạy)

---

####  `Free-form Arrivals Thread Group`

* **Mô tả:**
  Cung cấp khả năng **tùy biến toàn bộ mô hình arrival**, cho phép bạn định nghĩa nhiều giai đoạn khác nhau với các mức arrival rate riêng.

* **Ví dụ:**

  * Giai đoạn 1: 10 users/min trong 5 phút
  * Giai đoạn 2: 50 users/min trong 3 phút
  * Giai đoạn 3: 0 users (nghỉ) trong 1 phút
    ⇒ Cấu hình hoàn toàn trong bảng nhiều dòng (multi-row stages)


 **Timer** trong JMeter:

--
###  **1. Constant Timer**

* **Giải thích**: Luôn chờ đúng một khoảng thời gian cố định giữa các request (đơn vị: milliseconds).
* **Dùng khi**: Muốn tất cả các request có delay giống nhau.

**Ví dụ**:

```xml
<ConstantTimer>
  <stringProp name="ConstantTimer.delay">1000</stringProp>  <!-- 1 giây -->
</ConstantTimer>
```

→ Mỗi request sẽ chờ 1 giây trước khi thực hiện.

---

###  **2. Uniform Random Timer**

* **Giải thích**: Tạo ra delay ngẫu nhiên giữa các request, theo công thức: `delay = random(0, UniformDelay) + ConstantDelay`
* **Dùng khi**: Mô phỏng người dùng có thời gian nghĩ khác nhau trước khi hành động.

**Ví dụ**:

```xml
<UniformRandomTimer>
  <stringProp name="ConstantTimer.delay">1000</stringProp> <!-- Tối thiểu 1s -->
  <stringProp name="RandomTimer.range">2000</stringProp>   <!-- Cộng thêm random đến 2s -->
</UniformRandomTimer>
```

→ Delay từ **1 đến 3 giây**.

---

###  **3. Gaussian Random Timer**

* **Giải thích**: Delay tuân theo phân phối chuẩn (normal distribution), có nghĩa là các giá trị gần mean sẽ xảy ra nhiều hơn.
* **Dùng khi**: Mô phỏng hành vi người dùng thực tế hơn.

**Ví dụ**:

```xml
<GaussianRandomTimer>
  <stringProp name="ConstantTimer.delay">1000</stringProp> <!-- Độ trễ trung bình -->
  <stringProp name="RandomTimer.range">300</stringProp>     <!-- Độ lệch chuẩn -->
</GaussianRandomTimer>
```

→ Hầu hết delay sẽ gần 1000ms ±300ms.

---

###  **4. Poisson Random Timer**

* **Giải thích**: Delay theo phân phối Poisson, phù hợp khi mô phỏng các request xảy ra ngẫu nhiên theo thời gian như event log, traffic,...
* **Dùng khi**: Mô phỏng tần suất các sự kiện hiếm.

**Ví dụ**:

```xml
<PoissonRandomTimer>
  <stringProp name="ConstantTimer.delay">1000</stringProp> <!-- Mean delay -->
</PoissonRandomTimer>
```

→ Mô phỏng một sự kiện xảy ra trung bình 1 lần mỗi giây.

---

###  **5. Constant Throughput Timer**

* **Giải thích**: Duy trì một **throughput** (lưu lượng/tần suất) ổn định (VD: 10 requests/phút).
* **Dùng khi**: Kiểm tra hệ thống có giữ hiệu suất khi request đến với tần suất cố định.

**Ví dụ**:

```xml
<ConstantThroughputTimer>
  <doubleProp name="throughput">10.0</doubleProp> <!-- 10 req/phút -->
  <intProp name="calcMode">1</intProp> <!-- tính trên toàn thread group -->
</ConstantThroughputTimer>
```

---

###  **6. Synchronizing Timer**

* **Giải thích**: Đồng bộ các thread lại và cho phép chúng thực hiện request **cùng lúc** sau khi đã đủ số lượng thread mong muốn.
* **Dùng khi**: Mô phỏng **load spike** hoặc các hành động đồng loạt.

**Ví dụ**:

```xml
<SynchronizingTimer>
  <intProp name="groupSize">5</intProp> <!-- Chờ đủ 5 thread -->
  <longProp name="timeoutInMs">30000</longProp> <!-- Tối đa 30s -->
</SynchronizingTimer>
```

→ 5 người dùng sẽ gửi request cùng lúc sau khi cùng sẵn sàng.

---

###  **7. BeanShell Timer**

* **Giải thích**: Cho phép viết script (BeanShell/Java) để tạo delay tùy ý.
* **Dùng khi**: Cần logic phức tạp như delay theo thời gian trong ngày, hoặc theo dữ liệu đầu vào.

**Ví dụ**:

```java
long delay = 500 + (long)(Math.random() * 1000);
Thread.sleep(delay);
return delay;
```

---

###  **8. JSR223 Timer**

* **Giải thích**: Giống BeanShell nhưng nhanh và linh hoạt hơn. Hỗ trợ ngôn ngữ Groovy, JavaScript, etc.
* **Dùng khi**: Cần hiệu suất tốt khi script nhiều và phức tạp.



**Ví dụ (Groovy)**:

```groovy
long delay = 1000 + new Random().nextInt(1000)
Thread.sleep(delay)
```

Thêm ví dụ dùng JSR223 Timer dùng groovy

###  **Biến và đối tượng có sẵn**

| Tên biến       | Ý nghĩa                                           |
| -------------- | ------------------------------------------------- |
| `vars`         | Truy cập **JMeter variables** (biến tạm)          |
| `props`        | Truy cập **JMeter properties** (biến toàn cục)    |
| `ctx`          | Truy cập **context hiện tại** của sampler         |
| `log`          | Dùng để ghi log (`log.info(...)`)                 |
| `prev`         | SamplerResult của request trước                   |
| `sampler`      | Sampler hiện tại                                  |
| `threadName`   | Tên thread hiện tại                               |
| `SampleResult` | Class mẫu kết quả (nếu cần tạo kết quả tùy chỉnh) |

---


####  **1. Delay ngẫu nhiên**

```groovy
// Trả về delay từ 100 đến 1000 milliseconds
return 100 + (Math.random() * 900).toInteger()
```

####  **2. Delay theo biến từ CSV**

```groovy
// CSV có cột delay_ms, đã map biến
return vars.get("delay_ms") as int
```

####  **3. Delay nếu là người dùng đặc biệt**

```groovy
// Nếu username là admin, delay 2s
return vars.get("username") == "admin" ? 2000 : 500
```

####  **4. Delay theo giờ hệ thống**

```groovy
// Sau 6PM thì delay 3s
def hour = new Date().format("H") as int
return (hour >= 18) ? 3000 : 500
```

####  **5. Ghi log cho debug**

```groovy
log.info("Current delay = " + delay)
```

---

###  **Mẹo**

* **Không dùng Thread.sleep()** trong Timer – chỉ cần `return` số milliseconds.
* **Dùng `as int` hoặc `.toInteger()`** để đảm bảo giá trị trả về là số nguyên.


###  Tóm tắt bảng so sánh:

| Timer Type                | Delay Style            | Sử dụng khi                              |
| ------------------------- | ---------------------- | ---------------------------------------- |
| Constant Timer            | Cố định                | Giản đơn, dễ kiểm soát                   |
| Uniform Random Timer      | Ngẫu nhiên đều         | Mô phỏng người dùng chờ khác nhau        |
| Gaussian Random Timer     | Phân phối chuẩn        | Hành vi người dùng tự nhiên hơn          |
| Poisson Random Timer      | Phân phối Poisson      | Sự kiện xảy ra ngẫu nhiên theo thời gian |
| Constant Throughput Timer | Duy trì throughput     | Test hệ thống với lưu lượng ổn định      |
| Synchronizing Timer       | Đồng bộ threads        | Load đồng loạt                           |
| BeanShell Timer           | Script                 | Delay tùy biến, linh hoạt                |
| JSR223 Timer              | Script (hiệu suất cao) | Linh hoạt hơn BeanShell                  |

Khái niệm dễ gây nhầm lẫn 
 **Timer (Think Time)** và cấu hình **Thread Delay / Thời gian chờ của luồng (thread)**:

---

### ⏱️ 1. Timer (Think Time)

* **Định nghĩa**: Là thành phần JMeter để tạo **độ trễ giữa các request**, nhằm mô phỏng hành vi người dùng thực tế trước khi thực hiện hành động tiếp theo (ví dụ: đọc nội dung trang trước khi click).

* **Đặt ở đâu**:

  * Có thể đặt tại nhiều cấp độ: Test Plan → Thread Group → Controller → Sampler (nếu đặt dưới sampler thì chỉ ảnh hưởng 1 request đó).

* **Phân biệt**:

  * **Global Timer** (đặt ở cấp đầu) ảnh hưởng toàn bộ request.
  * **Sample Timer** (đặt dưới 1 HTTP Request) chỉ gây delay cho request đó.

* **Ví dụ**:

  * **Constant Timer**: `Thread Group` → tất cả request chờ 2s trước khi gửi.
  * **JSR223 Timer**: gắn ngay dưới 1 `HTTP Request` → độ trễ động (ví dụ lấy từ file CSV).

---

###  2. Thread Delay / Startup Delay / Ramp-up

Đây là các tham số cấu hình trong **Thread Group hoặc Test Plan**, khác biệt với Timer:

| Thuộc tính                    | Nơi cấu hình             | Mục đích                                                                               |
| ----------------------------- | ------------------------ | -------------------------------------------------------------------------------------- |
| **Ramp-up Period**            | Thread Group → GUI       | Tổng thời gian để khởi động tất cả thread. Ví dụ 10 threads trong 20s = 2s mỗi thread. |
| **Startup Delay**             | Thread Group → Scheduler | Thời gian chờ trước khi bắt đầu tạo thread (dùng khi chạy theo lịch)                   |
| **Loop Count** / **Duration** | Thread Group             | Số lần lặp hoặc tổng thời gian chạy của thread                                         |

* **Không phải Timer** nhưng cũng tạo delay theo kiểu **quy mô toàn Thread Group**, không phải giữa các sampler.

---

###  Ví dụ minh họa:

```
Thread Group:
- Number of Threads: 5
- Ramp-up: 10s
- Loop Count: 2

Timer:
- Constant Timer (1000ms) dưới mỗi HTTP Request
```

* Ban đầu: 5 thread được tạo dần trong 10s (cách nhau 2s).
* Sau đó mỗi thread thực hiện 2 lần loop, và trước mỗi HTTP Request bị delay 1000ms (do Constant Timer).

---

###  Tổng kết:

*  **Timer** = delay giữa các request để mô phỏng thời gian người dùng "suy nghĩ/đọc".
*  **Thread Delay / Ramp-up** = delay để khởi động tạo và điều khiển luồng người dùng (thread) trên toàn test plan.


# JMeter PreProcessors –


## 1. **BeanShell PreProcessor**

* **Mô tả:**
  Cho phép bạn viết script Java-like để chạy **trước khi sampler thực thi**. Dùng để xử lý logic động, khởi tạo biến, điều chỉnh giá trị tham số trước khi gửi request.

* **Khi nào dùng:**
  Khi cần tính toán hoặc xử lý phức tạp, không thể thực hiện chỉ với các thành phần cấu hình sẵn.

* **Ví dụ:**
  Giả sử bạn muốn thêm một biến `timestamp` động:

  ```java
  long time = System.currentTimeMillis();
  vars.put("timestamp", String.valueOf(time));
  ```

  Biến `timestamp` này có thể dùng trong HTTP Request: `${timestamp}`.

* **Lưu ý:**
  BeanShell chậm hơn, nếu có thể hãy dùng JSR223 với Groovy (hiệu năng tốt hơn).

---

## 2. **HTML Link Parser**

* **Mô tả:**
  Tự động phân tích HTML trả về từ một request để tìm tất cả link (ảnh, css, js, url), rồi tạo ra các request bổ sung cho từng link đó.

* **Khi nào dùng:**
  Khi bạn muốn mô phỏng trình duyệt thật sự tải hết tài nguyên trang (chẳng hạn test hiệu năng của trang web toàn diện).

* **Ví dụ:**
  Sau HTTP Request về một trang web, bạn thêm **HTML Link Parser** làm PreProcessor, thì các tài nguyên trong trang sẽ được tải thêm (request bổ sung).

---

## 3. **HTTP URL Re-writing Modifier**

* **Mô tả:**
  Thêm session ID hoặc tham số bắt buộc vào URL request, dùng cho các ứng dụng không dùng cookie để duy trì session.

* **Khi nào dùng:**
  Ứng dụng cũ không hỗ trợ cookie, hoặc cần gửi session theo URL (ví dụ `jsessionid`).

* **Ví dụ:**
  Giả sử server dùng `jsessionid=ABC123` cho session, thì modifier sẽ tự động thêm `;jsessionid=ABC123` vào cuối URL.

---

## 4. **JDBC PreProcessor**

* **Mô tả:**
  Thực thi một truy vấn SQL trước khi sampler chạy (có thể là truy vấn lấy dữ liệu, cập nhật, insert...).

* **Khi nào dùng:**
  Chuẩn bị dữ liệu test trong database, ví dụ tạo record để test.

* **Ví dụ:**
  Trước khi gửi HTTP Request, bạn muốn insert một user vào DB:

  ```sql
  INSERT INTO users (username, password) VALUES ('testuser', 'pass123');
  ```

  JDBC PreProcessor sẽ thực thi câu SQL này.

---

## 5. **JSR223 PreProcessor**

* **Mô tả:**
  Tương tự BeanShell nhưng hỗ trợ nhiều ngôn ngữ (Groovy, JavaScript...), đặc biệt Groovy thường được dùng do hiệu suất tốt.

* **Khi nào dùng:**
  Thay thế BeanShell với hiệu năng cao hơn, viết script để xử lý biến, logic tuỳ biến.

* **Ví dụ:**
  Tạo biến token động:

  ```groovy
  def token = "ABC123" + System.currentTimeMillis()
  vars.put("authToken", token)
  ```

---

## 6. **Sample Timeout**

* **Mô tả:**
  Đặt thời gian tối đa cho sampler chạy, nếu quá thời gian này thì sampler sẽ bị fail.

* **Khi nào dùng:**
  Giới hạn thời gian response để phát hiện server chậm.

* **Ví dụ:**
  Cấu hình timeout 5000ms, nếu request không trả về sau 5 giây, báo lỗi.

---

## 7. **User Parameters**

* **Mô tả:**
  Khai báo biến riêng cho từng thread (người dùng mô phỏng) với các giá trị khác nhau.

* **Khi nào dùng:**
  Mỗi user có thông tin khác nhau, ví dụ username/password riêng.

* **Ví dụ:**

  | Biến     | Thread 1 | Thread 2 |
  | -------- | -------- | -------- |
  | username | user1    | user2    |
  | password | pass1    | pass2    |

  Trong HTTP Request dùng `${username}`, `${password}` tương ứng với từng thread.

---

## 8. **RegEx User Parameters**

* **Mô tả:**
  Giống User Parameters nhưng giá trị biến được lấy ra bằng cách sử dụng **Regular Expression Extractor** trên response trước đó.

* **Khi nào dùng:**
  Khi cần lấy dữ liệu động từ response, ví dụ lấy session id, token, user id,... và gán làm biến cho thread.

* **Ví dụ:**
  Dùng Regex extractor lấy token trong response rồi gán cho biến `authToken` để dùng ở các bước sau.

---

# Tổng kết bảng tóm tắt

| PreProcessor           | Mục đích chính                            | Ví dụ ứng dụng                    |
| ---------------------- | ----------------------------------------- | --------------------------------- |
| BeanShell PreProcessor | Viết script tùy chỉnh Java-like           | Tính biến timestamp động          |
| HTML Link Parser       | Phân tích HTML, tải thêm tài nguyên       | Mô phỏng browser tải css/js       |
| HTTP URL Re-writing    | Thêm session ID vào URL                   | Ứng dụng Java EE cũ               |
| JDBC PreProcessor      | Chạy câu SQL chuẩn bị dữ liệu             | Tạo user trước khi test           |
| JSR223 PreProcessor    | Viết script Groovy (tối ưu hơn BeanShell) | Tạo token động                    |
| Sample Timeout         | Đặt giới hạn thời gian chờ response       | Phát hiện server chậm             |
| User Parameters        | Gán biến riêng cho từng thread            | Mỗi user có username khác nhau    |
| RegEx User Parameters  | Gán biến dựa trên kết quả Regex extractor | Lấy token, session id từ response |



# JMeter PostProcessors –

## 1. **BeanShell PostProcessor**

* **Mô tả:**
  Cho phép bạn viết script Java-like để xử lý dữ liệu sau khi một sampler thực thi xong.
* **Khi nào dùng:**
  Xử lý kết quả trả về phức tạp, thao tác biến, log hoặc thực hiện logic tùy chỉnh.
* **Ví dụ:**
  Lấy response và in ra log:

  ```java
  String response = prev.getResponseDataAsString();
  log.info("Response data: " + response);
  ```

  Bạn cũng có thể cập nhật biến JMeter qua `vars.put("varName", value);`.

---

## 2. **JSR223 PostProcessor**

* **Mô tả:**
  Tương tự BeanShell PostProcessor nhưng hỗ trợ Groovy (khuyến khích dùng vì hiệu suất tốt hơn).
* **Khi nào dùng:**
  Xử lý dữ liệu, parse, cập nhật biến, chạy các đoạn script tùy chỉnh sau khi sampler kết thúc.
* **Ví dụ:**
  Tạo biến token từ response JSON (giả sử response chứa `{"token":"abc123"}`):

  ```groovy
  def response = prev.getResponseDataAsString()
  def json = new groovy.json.JsonSlurper().parseText(response)
  vars.put("authToken", json.token)
  ```

---

## 3. **Result Status Action Handler**

* **Mô tả:**
  Cho phép bạn định nghĩa hành động khi sampler thất bại (fail) như: dừng thread, dừng test, tiếp tục,...
* **Khi nào dùng:**
  Điều khiển luồng chạy khi có lỗi xảy ra, giúp test dừng hoặc chuyển hướng kịp thời.
* **Ví dụ:**
  Nếu một request lỗi, bạn có thể cấu hình để dừng toàn bộ test hoặc chỉ dừng thread hiện tại.

---

## 4. **Debug PostProcessor**

* **Mô tả:**
  Hiển thị các biến JMeter hiện tại trong **View Results Tree** để hỗ trợ debug script.
* **Khi nào dùng:**
  Kiểm tra giá trị biến, properties trong quá trình phát triển và debug.
* **Ví dụ:**
  Thêm Debug PostProcessor ngay sau một sampler để xem tất cả biến `vars` và `props`.

---

## 5. **Regular Expression Extractor**

* **Mô tả:**
  Trích xuất dữ liệu từ response dựa trên biểu thức chính quy (regex).
* **Khi nào dùng:**
  Lấy dữ liệu động như token, session id, giá trị trong HTML hoặc JSON dạng text không chuẩn.
* **Ví dụ:**
  Response: `<input name="sessionId" value="ABC123"/>`
  Regex: `name="sessionId" value="(.+?)"`
  Biến lưu kết quả: `sessionId`
  Sau đó dùng `${sessionId}` trong các request sau.

---

## 6. **Boundary Extractor**

* **Mô tả:**
  Trích xuất dữ liệu bằng cách lấy chuỗi giữa **Left Boundary (LB)** và **Right Boundary (RB)**.
* **Khi nào dùng:**
  Trích xuất giá trị dễ dàng mà không cần regex phức tạp.
* **Ví dụ:**
  Response: `Your token is [TOKEN123] and valid for 10 mins`
  LB: `is [`
  RB: `]`
  Biến lưu kết quả: `token` → `TOKEN123`

---

## 7. **JSON Extractor**

* **Mô tả:**
  Trích xuất dữ liệu từ response JSON bằng cú pháp JSON Path.
* **Khi nào dùng:**
  Lấy dữ liệu từ response JSON phức tạp, như token, ID, tên user,...
* **Ví dụ:**
  Response JSON:

  ```json
  {
    "user": {
      "id": 123,
      "name": "John"
    },
    "token": "abc123"
  }
  ```

  JSON Path: `$.token` → Biến lưu kết quả: `authToken` → `abc123`
  JSON Path: `$.user.name` → Biến lưu kết quả: `userName` → `John`

---

# Tổng kết bảng tóm tắt

| PostProcessor                | Mục đích chính                                | Ví dụ ứng dụng                 |
| ---------------------------- | --------------------------------------------- | ------------------------------ |
| BeanShell PostProcessor      | Script Java-like xử lý response               | In response, update biến       |
| JSR223 PostProcessor         | Script Groovy xử lý response (tối ưu hơn)     | Parse JSON, tạo biến token     |
| Result Status Action Handler | Xử lý lỗi sampler (dừng test, dừng thread...) | Dừng test khi lỗi nghiêm trọng |
| Debug PostProcessor          | Hiển thị biến giúp debug                      | Xem giá trị biến trong debug   |
| Regular Expression Extractor | Trích xuất bằng regex                         | Lấy session ID từ HTML         |
| Boundary Extractor           | Trích xuất bằng biên trái/phải                | Lấy token giữa dấu ngoặc       |
| JSON Extractor               | Trích xuất dữ liệu từ JSON                    | Lấy token, user name từ JSON   |

---

# JMeter Assertions – 


## 1. **Response Assertion**

* **Mô tả:**
  Kiểm tra nội dung của response (kết quả trả về) có chứa, không chứa hoặc bằng đúng giá trị mong muốn hay không.
* **Ví dụ:**
  Kiểm tra response có chứa từ "Success" hay không. Nếu không có thì test fail.

---

## 2. **Duration Assertion**

* **Mô tả:**
  Kiểm tra thời gian phản hồi (response time) của sampler có nhỏ hơn hoặc bằng giá trị giới hạn đã định hay không.
* **Ví dụ:**
  Đảm bảo response không quá 2000 ms, nếu vượt quá thì assertion fail.

---

## 3. **Size Assertion**

* **Mô tả:**
  Kiểm tra kích thước (bytes) của response có bằng, lớn hơn, nhỏ hơn giá trị chỉ định.
* **Ví dụ:**
  Kiểm tra response có kích thước nhỏ hơn 5000 bytes.

---

## 4. **XML Assertion**

* **Mô tả:**
  Kiểm tra response có phải là XML hợp lệ và không bị lỗi syntax.
* **Ví dụ:**
  Dùng khi API trả về dữ liệu XML, đảm bảo XML đúng chuẩn.

---

## 5. **BeanShell Assertion**

* **Mô tả:**
  Viết script tùy chỉnh kiểm tra kết quả trả về sử dụng BeanShell (Java-like script).
* **Ví dụ:**
  Kiểm tra response có chứa một chuỗi đặc biệt hoặc giá trị biến cụ thể.

```java
if (!prev.getResponseDataAsString().contains("ExpectedString")) {
  Failure = true;
  FailureMessage = "ExpectedString not found in response.";
}
```

---

## 6. **JSR223 Assertion**

* **Mô tả:**
  Tương tự BeanShell Assertion, dùng Groovy hoặc ngôn ngữ khác hỗ trợ JSR223 để viết script kiểm tra.
* **Ví dụ:**
  Kiểm tra JSON response có key "status" bằng "OK":

```groovy
import groovy.json.JsonSlurper

def response = prev.getResponseDataAsString()
def json = new JsonSlurper().parseText(response)

if (json.status != 'OK') {
    AssertionResult.setFailure(true)
    AssertionResult.setFailureMessage('Status is not OK')
}
```

---

## 7. **MD5Hex Assertion**

* **Mô tả:**
  Kiểm tra checksum MD5 của response có đúng như giá trị mong đợi không.
* **Ví dụ:**
  Đảm bảo response không bị thay đổi, dùng checksum để xác nhận.

---

## 8. **XML Schema Assertion**

* **Mô tả:**
  Kiểm tra response XML có tuân thủ schema XSD hay không.
* **Ví dụ:**
  Đảm bảo dữ liệu XML hợp lệ theo chuẩn XSD đã định nghĩa.

---

## 9. **HTML Assertion**

* **Mô tả:**
  Kiểm tra response HTML có hợp lệ (validate theo chuẩn HTML).
* **Ví dụ:**
  Đảm bảo trang web trả về không có lỗi HTML nghiêm trọng.

---

## 10. **Compare Assertion**

* **Mô tả:**
  So sánh response hiện tại với file dữ liệu mẫu (expected response) để xác nhận kết quả đúng.
* **Ví dụ:**
  So sánh response với file `expected_response.txt` để kiểm tra sự khác biệt.

---

# Tổng kết bảng tóm tắt

| Assertion            | Mục đích chính                    | Ví dụ ứng dụng                         |
| -------------------- | --------------------------------- | -------------------------------------- |
| Response Assertion   | Kiểm tra nội dung response        | Kiểm tra chứa "Success"                |
| Duration Assertion   | Kiểm tra thời gian phản hồi       | Response ≤ 2000ms                      |
| Size Assertion       | Kiểm tra kích thước response      | Response < 5000 bytes                  |
| XML Assertion        | Kiểm tra tính hợp lệ XML          | Đảm bảo XML đúng chuẩn                 |
| BeanShell Assertion  | Viết script Java-like để kiểm tra | Kiểm tra chuỗi đặc biệt trong response |
| JSR223 Assertion     | Viết script Groovy để kiểm tra    | Kiểm tra JSON key = "OK"               |
| MD5Hex Assertion     | Kiểm tra checksum MD5 response    | Đảm bảo response không thay đổi        |
| XML Schema Assertion | Kiểm tra XML theo schema XSD      | Validate XML theo XSD                  |
| HTML Assertion       | Kiểm tra tính hợp lệ HTML         | Validate trang web HTML                |
| Compare Assertion    | So sánh response với file mẫu     | So sánh với `expected_response.txt`    |

---

# JMeter Listeners –


## 1. **Assertion Results**

* **Mô tả:**
  Hiển thị kết quả của các Assertions trong kịch bản test.
* **Chức năng:**
  Giúp bạn kiểm tra xem các Assertions có pass hay fail cho từng request.
* **Giao diện:**
  Hiển thị bảng chi tiết kết quả từng assertion, lỗi nếu có, và thông tin bổ sung.
* **Ví dụ sử dụng:**
  Dùng để phân tích lỗi khi một Assertion không thành công, rất hữu ích khi debug test.

---

## 2. **Graph Results**

* **Mô tả:**
  Hiển thị kết quả test dưới dạng đồ thị thời gian (time graph).
* **Chức năng:**
  Cho thấy thời gian thực thi các request qua các vòng lặp, trực quan về hiệu suất theo thời gian.
* **Giao diện:**
  Đồ thị dạng đường thể hiện độ trễ (latency) theo từng thời điểm thực thi.
* **Ví dụ sử dụng:**
  Giúp đánh giá sự ổn định của hệ thống qua thời gian test.

---

## 3. **BeanShell Listener**

* **Mô tả:**
  Cho phép bạn viết script tùy chỉnh bằng BeanShell để xử lý kết quả test.
* **Chức năng:**
  Có thể dùng để ghi log nâng cao, xử lý kết quả phức tạp hoặc tự động hóa các hành động khi test chạy.
* **Ví dụ:**
  Ghi thông tin response vào file log nếu một số điều kiện nhất định xảy ra.

```java
if (!prev.isSuccessful()) {
   log.info("Request failed: " + prev.getURL());
}
```

---

## 4. **JSR223 Listener**

* **Mô tả:**
  Tương tự BeanShell Listener nhưng sử dụng ngôn ngữ kịch bản như Groovy (mạnh mẽ và hiệu quả hơn).
* **Chức năng:**
  Thực thi script tùy chỉnh trên kết quả test để xử lý, báo cáo, hoặc tích hợp với các công cụ khác.
* **Ví dụ:**
  Gửi cảnh báo email nếu số lỗi vượt quá một ngưỡng nào đó.

```groovy
if (!prev.isSuccessful()) {
    // Code gửi email hoặc xử lý lỗi
}
```

---

# Tổng kết bảng tóm tắt

| Listener           | Mục đích chính                            | Ví dụ ứng dụng                           |
| ------------------ | ----------------------------------------- | ---------------------------------------- |
| Assertion Results  | Hiển thị chi tiết kết quả Assertions      | Debug lỗi khi assertion fail             |
| Graph Results      | Đồ thị biểu diễn độ trễ thời gian         | Đánh giá hiệu suất theo thời gian        |
| BeanShell Listener | Script xử lý kết quả bằng BeanShell       | Ghi log nâng cao khi lỗi xảy ra          |
| JSR223 Listener    | Script xử lý kết quả bằng Groovy (JSR223) | Gửi cảnh báo hoặc xử lý kết quả phức tạp |

---




