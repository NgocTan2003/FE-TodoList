FROM node:22.14.0

WORKDIR /app

# Copy file cấu hình trước để caching hiệu quả
COPY package.json yarn.lock ./

# Cài đặt dependencies trong môi trường sạch
RUN yarn install

# Force install esbuild để tránh lỗi version mismatch
RUN yarn add esbuild --force

# Copy toàn bộ mã nguồn còn lại
COPY . .

# Build dự án
RUN yarn build

# Cài serve để chạy dist
RUN yarn global add serve

# Cổng chạy mặc định của serve
EXPOSE 5173

# Chạy app production
CMD ["serve", "-s", "dist", "-l", "4173"]
