# Ưng Nhựt Khang — CV

Website CV có đầy đủ nội dung tiếng Việt và tiếng Anh, học vấn, kỹ năng, dự án và liên hệ. Bố cục hai cột trên desktop, một cột trên điện thoại, ảnh chân dung nhỏ cạnh tên. Viết bằng HTML, CSS và JavaScript thuần, không cần cài thư viện hay build.

## Xem trên máy

Tại thư mục dự án, chạy:

```sh
python -m http.server 8080
```

Mở http://localhost:8080. Có thể mở `index.html` trực tiếp nếu không cần máy chủ.

## Triển khai trên GitHub Pages

1. Vào **Settings → Pages** của repo `mm4you/profile`.
2. Chọn **Deploy from a branch**.
3. Chọn nhánh **main**, thư mục **/ (root)**, rồi **Save**.
4. Website sẽ có địa chỉ: https://mm4you.github.io/profile/.

Không cần GitHub Actions hoặc bước build. Mọi đường dẫn tài nguyên đều tương đối để hoạt động dưới `/profile/`.

## Tính năng

- Chuyển VI / EN cho toàn bộ nội dung và nhãn hỗ trợ truy cập; lưu lựa chọn trên trình duyệt.
- Liên kết trực tiếp bằng `?lang=vi` hoặc `?lang=en`.
- Nút tải bản PDF gốc bằng tiếng Việt; nút in hỗ trợ ngôn ngữ đang chọn.
- Responsive cho điện thoại, máy tính và bố cục in A4.
- Giao diện tối/sáng với font Be Vietnam Pro được lưu trong dự án, không phụ thuộc dịch vụ font bên ngoài khi xem trang. Giấy phép OFL đi kèm trong `assets/fonts/`.
- Các đường dẫn CSS/JS có mã phiên bản để tránh tải nhầm tài nguyên cũ sau cập nhật.
- Liên hệ qua email, điện thoại và GitHub.
- CSVC UMT được ghi rõ là kho mã nguồn riêng tư; truy cập cần quyền từ chủ repo.
- Nội dung CV vẫn đọc được khi tắt JavaScript.

## Cập nhật nội dung

- `index.html`: CV tiếng Việt, thông tin liên hệ và liên kết dự án.
- `script.js`: bản dịch tiếng Anh và chuyển ngôn ngữ.
- `style.css`: giao diện và bố cục in.
- `assets/`: ảnh chân dung, favicon, font chữ và CV PDF gốc.

Thông tin cá nhân, học vấn và kỹ năng được lấy từ CV do chủ hồ sơ cung cấp. Mô tả dự án được đối chiếu với README GitHub. Drive Music dùng công nghệ hiện tại theo README của dự án; PDF gốc giữ nguyên nội dung được cung cấp.
