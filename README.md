# Code Snippets Platform

## 📝 Mô tả dự án

**Code Snippets Platform** là một nền tảng web hiện đại cho phép các developer chia sẻ, khám phá và quản lý các đoạn code (code snippets) trong nhiều ngôn ngữ lập trình khác nhau. Đây là một ứng dụng full-stack được xây dựng với Next.js 15, TypeScript và Prisma.

## ✨ Tính năng chính

### 🔐 Xác thực người dùng

- Đăng ký và đăng nhập tài khoản
- Quản lý profile cá nhân
- Bảo mật mật khẩu với bcrypt

### 📚 Quản lý Code Snippets

- **Tạo snippet mới**: Thêm tiêu đề, code, chọn ngôn ngữ lập trình và chủ đề
- **Chỉnh sửa snippet**: Cập nhật nội dung (chỉ chủ sở hữu)
- **Xóa snippet**: Xóa snippet không cần thiết (chỉ chủ sở hữu)
- **Xem chi tiết**: Hiển thị đầy đủ thông tin snippet

### 🏷️ Phân loại và tìm kiếm

- **Theo ngôn ngữ lập trình**: JavaScript, Python, TypeScript, Java, C++, v.v.
- **Theo chủ đề**: Algorithm, Database, API, Frontend, Backend, v.v.
- **Theo người dùng**: Xem tất cả snippets của một developer cụ thể

### 🌍 Đa ngôn ngữ (i18n)

- Hỗ trợ tiếng Anh và tiếng Việt

### 📱 Responsive Design

- Tối ưu cho mọi thiết bị (desktop, tablet, mobile)
- Menu mobile thân thiện

### 🔍 Phân tích độ phức tạp

- Tự động phân tích độ phức tạp của code (O(n), O(n²), v.v.)
- Hiển thị thông tin phức tạp trong metadata

## 🛠️ Công nghệ sử dụng

### Frontend

- **Next.js 15** - React framework với App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **React Hook Form** - Form management
- **next-intl** - Internationalization

### Backend

- **Next.js API Routes** - Serverless API
- **Prisma** - Database ORM
- **PostgreSQL** - Database (có thể chuyển sang SQLite cho development)
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication

### Development Tools

- **ESLint** - Code linting
- **Turbopack** - Fast bundling
- **Prisma Studio** - Database management

## 🗄️ Cấu trúc Database

```prisma
User {
  id, email, passwordHash, name, snippets[]
}

Language {
  id, name, color, snippets[]
}

Topic {
  id, name, snippets[]
}

Snippet {
  id, title, code, user, language, topics[]
}
```

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống

- **Node.js**: >= 20.0.0 (khuyến nghị 20.19.2)
- **npm**: >= 10.0.0
- **Database**: PostgreSQL hoặc SQLite

### Cài đặt

```bash
# Sử dụng nvm để cài đặt Node.js version chính xác
nvm use

# Cài đặt dependencies
npm install
# hoặc
yarn install

# Thiết lập database
npx prisma generate
npx prisma db push

# Chạy development server
npm run dev
# hoặc
yarn dev

# Build cho production
npm run build
npm start
```

### Sử dụng Node Version Manager

Dự án đã được cấu hình với các file version:

- `.nvmrc` - cho nvm
- `.node-version` - cho nodenv và các version manager khác
- `package.json` engines field - cho npm/yarn

## 📁 Cấu trúc thư mục

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── user/          # User profiles
│   │   ├── snippets/      # Snippet pages
│   │   ├── tags/          # Language/Topic pages
│   │   └── ...
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Icons/            # SVG icon components
│   └── ...
├── contexts/             # React contexts
├── lib/                  # Utility functions
├── services/             # API service functions
└── generated/            # Prisma generated files
```

## 🌟 Tính năng nổi bật

- **SEO Optimized**: Metadata, sitemap, robots.txt
- **Performance**: Server-side rendering, caching
- **Security**: Authentication middleware, input validation
- **UX/UI**: Modern design, smooth animations
- **Accessibility**: Semantic HTML, keyboard navigation

## 📄 API Endpoints

- `GET /api/snippets` - Lấy danh sách snippets
- `POST /api/snippets` - Tạo snippet mới
- `GET /api/snippets/[id]` - Lấy chi tiết snippet
- `PUT /api/snippets/[id]` - Cập nhật snippet
- `DELETE /api/snippets/[id]` - Xóa snippet
- `GET /api/users/[id]/snippets` - Lấy snippets của user
- `GET /api/meta` - Lấy danh sách languages và topics

## Chưa hoàn thiện và phát triển trong tương lai:

- Register account chưa validate email. (hiện tại chỉ cần đúng regex email là nhận)
- Chưa fully translate
- Security BE chưa implement(Rate limit, JWT...)

**Phát triển bởi**: Triet Dang
**Phiên bản**: 0.1.0
