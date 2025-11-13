# ---------- 1단계: Build ----------
FROM node:20 AS build
WORKDIR /app

# 프로젝트 복사
COPY bankedu-front /app

# 패키지 설치
RUN npm install

# 빌드 + export
RUN npm run build
RUN npm run export

# ---------- 2단계: Nginx ----------
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# 빌드 결과물을 Nginx html 폴더로 복사
COPY --from=build /app/out .

# 커스텀 Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

