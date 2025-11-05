# ✅ 1단계: Nginx 이미지 사용
FROM nginx:1.25-alpine

# ✅ 2단계: 커스텀 nginx.conf 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ✅ 3단계: Next.js 빌드 결과물 복사
COPY ./bankedu-front/out /usr/share/nginx/html

# ✅ 4단계: 포트 개방
EXPOSE 80

# ✅ 5단계: 기본 Nginx 실행
CMD ["nginx", "-g", "daemon off;"]

