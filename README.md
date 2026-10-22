# Ưng Nhựt Khang — Portfolio

Website được phát triển trực tiếp từ bản clone của [qminh77/profile](https://github.com/qminh77/profile), giữ bố cục, CSS và nền tảng component của mẫu. Thông tin, ảnh chân dung, CV và dự án được thay bằng nội dung của Ưng Nhựt Khang. Xem nguồn tham khảo và commit gốc trong `site/UPSTREAM.md`.

## Nội dung

- Chuyển đầy đủ Việt–Anh, lưu lựa chọn và hỗ trợ `?lang=vi` / `?lang=en`.
- Giao diện sáng, tối và theo hệ thống; menu gọn trên điện thoại.
- Sáu dự án: IELTS Vocabulary, InnovateX Smart Port, Drive Music, CSVC UMT, Vô Tri và Thi Thố.
- Bộ lọc Web / Hệ thống / Trò chơi; chỉ hiển thị link repository, không có link demo.
- Email có thể nhấn để liên hệ hoặc sao chép; điện thoại, GitHub và tải CV PDF gốc bằng tiếng Việt.
- Học vấn, GPA, kỹ năng, thành tích hackathon, mục tiêu nghề nghiệp và sở thích.
- Biểu đồ GitHub là ảnh chụp dữ liệu công khai ngày 22/10/2026, được lưu cục bộ; không phải dữ liệu realtime.

## Triển khai GitHub Pages

Bản build hoàn chỉnh đã nằm ở thư mục gốc repo, cùng `.nojekyll`. Trong **Settings → Pages**:

1. Chọn **Deploy from a branch**.
2. Chọn nhánh **main**, thư mục **/ (root)**.
3. Nhấn **Save**.

Địa chỉ sau triển khai: https://mm4you.github.io/profile/.

Không cần cấu hình secrets, backend hoặc chạy build trên GitHub để dùng bản đã xuất.

## Mã nguồn & phát triển

Source Next.js 16, React 19, TypeScript, Tailwind CSS 4 và component từ mẫu nằm trong `site/`.

```sh
npm --prefix site ci
npm --prefix site run dev -- --port 8080
```

Mở http://localhost:8080/profile/ vì ứng dụng dùng base path `/profile`.

## Cập nhật bản triển khai

```sh
npm --prefix site run build
node scripts/export-pages.mjs
```

Commit cả source và các file build ở thư mục gốc, rồi push lên `main`. Thư mục `site/.next`, `site/out` và `node_modules` được bỏ qua bởi Git.

- `site/lib/profile.ts`: nội dung hai ngôn ngữ và danh sách dự án.
- `site/components/`: các phần giao diện từ mẫu đã được cá nhân hóa.
- `site/public/`: ảnh chân dung, biểu đồ hoạt động và CV PDF.
- `site/next.config.ts`: static export và đường dẫn `/profile`.

Có thể tải lại dữ liệu biểu đồ bằng `python scripts/update-github-activity.py`; khi cập nhật vào một ngày khác, cập nhật ngày hiển thị trong `site/lib/profile.ts` trước khi build.

Thông tin cá nhân và học vấn dựa trên CV được cung cấp. Mô tả dự án dựa trên README hoặc mã nguồn công khai. CSVC UMT được ghi rõ là repository riêng tư.
