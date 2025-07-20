Trong phần này chúng ta sẽ học 
JMeter – Các Thành Phần (Elements)
JMeter – Thread Group

#  JMeter – Các Thành Phần (Elements)

## 🧩 Tổng Quan

JMeter là một công cụ dễ sử dụng với giao diện thân thiện. Nó là một công cụ dựa trên **các phần tử (elements)**, trong đó mỗi phần tử đại diện cho một chức năng cụ thể trong việc xây dựng và thực thi kịch bản kiểm thử như: thời gian chờ, kiểm tra phản hồi, gửi yêu cầu, bộ nhớ đệm, mô phỏng tình huống kiểm thử, v.v...

JMeter hỗ trợ rất nhiều **plugin bên ngoài** giúp việc scripting và phân tích trở nên dễ dàng hơn.

---

## 📋 Danh sách 11 Phần Tử Chính của JMeter

### 1. 🧪 Test Plan

* **Mô tả:** Phần tử gốc, là cha của tất cả các phần tử khác.
* **Chức năng:** Là nơi định nghĩa toàn bộ kịch bản kiểm thử.
* **Ghi chú:** Có thể đổi tên theo tên dự án hoặc test case.

---

### 2. 👥 Thread Group

* **Mô tả:** Nhóm các luồng mô phỏng người dùng thực hiện kiểm thử.
* **Chức năng:**

  * Cài đặt số lượng người dùng (threads)
  * Thời gian ramp-up
  * Số vòng lặp của bài test
  * Thời gian bắt đầu và thời lượng chạy

---

### 3. 🔀 Logic Controllers

* **Mô tả:** Xác định thứ tự thực thi các phần tử con như Sampler hoặc Logic Controller khác.
* **Ví dụ:** If Controller, Loop Controller, While, Switch,...

---

### 4. 📡 Samplers

* **Mô tả:** Dùng để gửi các loại yêu cầu khác nhau đến server.
* **Ví dụ:** HTTP Request, FTP Request, JDBC Request, SOAP/XML-RPC Request,…

---

### 5. ⚙️ Config Elements

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


### 🔎 Phân tích:

* **HTTP Request Defaults 1** được cấu hình với `Server Name or IP = example.com`.
* **HTTP Request Defaults 2** (nằm trong `Simple Controller`) có `Server Name or IP = reqres.in`.

#### 👉 Kết quả khi chạy:

| Sampler         | Server được dùng                                   |
| --------------- | -------------------------------------------------- |
| HTTP Request #1 | `example.com`                                      |
| HTTP Request #2 | `reqres.in` (scope cục bộ trong Simple Controller) |

---

###  Kết luận:

* `HTTP Request Defaults` trong `Thread Group` áp dụng cho tất cả các sampler **trong cùng scope**, **trừ khi** bị ghi đè bởi một config element **gần hơn** (cục bộ hơn).
* Config Element không ảnh hưởng đến sampler **ngoài scope của nó**.

---


### 6. ⏩ Pre-Processors

* **Mô tả:** Thực thi trước khi Sampler được gọi.
* **Chức năng:** Chỉnh sửa hoặc cập nhật dữ liệu đầu vào trước khi gửi yêu cầu.

---

### 7. ⏪ Post-Processors

* **Mô tả:** Thực thi sau khi Sampler hoàn tất.
* **Chức năng:** Trích xuất dữ liệu từ response.
* **Ví dụ quan trọng:** `Regular Expression Extractor`.

---

### 8. ✅ Assertions

* **Mô tả:** Dùng để xác minh tính đúng đắn của phản hồi từ server.
* **Ví dụ:** Response Assertion, Duration Assertion,...
* **Ghi chú:** Nếu Assertion sai, Sampler sẽ hiển thị màu đỏ trong **View Results Tree**.

---

### 9. ⏱️ Timers

* **Mô tả:** Giúp điều chỉnh khoảng thời gian giữa các request.
* **Chức năng:** Tránh gửi liên tục gây quá tải server.

---

### 10. 📈 Listener

* **Mô tả:** Hiển thị kết quả các Sampler đã chạy.
* **Chức năng:** Phân tích kết quả bằng đồ thị, bảng, cây,...
* **Lưu ý:** Chỉ nên dùng trong **GUI mode**, có thể lưu kết quả ra file.

---

### 11. 🚫 Non-Test Elements

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

### 2. 👥 Thread Group

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

#### 🛠 Các trường cấu hình chính:

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

###  🧩 Các loại Thread Group đặc biệt

---

#### ✅ `setUp Thread Group`

* **Mô tả:**
  Dùng để thực hiện các bước thiết lập (setup) trước khi `Thread Group chính` chạy, ví dụ như: tạo dữ liệu test, đăng nhập trước, hoặc gọi API khởi tạo.

* **Đặc điểm:**

  * Chạy **trước** tất cả các Thread Group khác.
  * Không nên chứa các lệnh kiểm thử chính.
  * Chỉ chạy **một lần**, độc lập với `Thread Group chính`.

* **Ví dụ:**
  Trước khi chạy test, bạn muốn tạo 10 users bằng API `POST /api/create-user`. Thì bạn có thể thêm `HTTP Request` trong `setUp Thread Group` để gửi yêu cầu tạo users.

---

#### ✅ `tearDown Thread Group`

* **Mô tả:**
  Dùng để **giải phóng**, **dọn dẹp**, hoặc **đóng kết nối** sau khi các Thread Group khác đã hoàn tất.

* **Đặc điểm:**

  * Chạy **sau cùng**, sau tất cả các Thread Group khác.
  * Không chứa hành động kiểm thử chính.

* **Ví dụ:**
  Sau khi test xong, bạn gọi `DELETE /api/users` để xóa dữ liệu test vừa tạo hoặc logout phiên làm việc bằng API.

---

### 🔁 Các Thread Group mở rộng (từ Plugin)

---

#### 🔄 `Ultimate Thread Group`

* **Mô tả:**
  Cho phép kiểm soát **chi tiết luồng thời gian** tạo thread như: tăng từ từ, giữ ổn định, giảm dần… rất linh hoạt.

* **Ví dụ:**
  Bạn muốn:

  * Tăng 20 người dùng mỗi 10 giây.
  * Giữ nguyên 100 người dùng trong 2 phút.
  * Sau đó giảm dần.

  \=> Có thể cấu hình từng giai đoạn trong bảng: "Start Threads", "Initial Delay", "Startup Time", "Hold Load", "Shutdown Time".

---

#### 👥 `Concurrency Thread Group`

* **Mô tả:**
  Được thiết kế để duy trì một **mức người dùng đồng thời** (concurrent users) cụ thể và linh hoạt hơn so với Thread Group mặc định.

* **Ví dụ:**
  Bạn muốn giữ **50 người dùng đồng thời** truy cập API trong **5 phút**, có thể cấu hình:

  * Target concurrency: 50
  * Ramp-up time: 60s
  * Hold target rate time: 300s

---

#### 🚦 `Arrivals Thread Group`

* **Mô tả:**
  Mô phỏng số lượng **người dùng đến mới** trong một khoảng thời gian cụ thể (arrival rate), thay vì người dùng đồng thời.

* **Ví dụ:**
  Bạn muốn mô phỏng **20 người dùng đến mỗi phút** trong vòng 10 phút
  ⇒ Đây là **arrival rate = 20 users/minute**
  (Số người dùng có thể trùng hoặc khác nhau tùy phiên chạy)

---

#### 🧠 `Free-form Arrivals Thread Group`

* **Mô tả:**
  Cung cấp khả năng **tùy biến toàn bộ mô hình arrival**, cho phép bạn định nghĩa nhiều giai đoạn khác nhau với các mức arrival rate riêng.

* **Ví dụ:**

  * Giai đoạn 1: 10 users/min trong 5 phút
  * Giai đoạn 2: 50 users/min trong 3 phút
  * Giai đoạn 3: 0 users (nghỉ) trong 1 phút
    ⇒ Cấu hình hoàn toàn trong bảng nhiều dòng (multi-row stages)




