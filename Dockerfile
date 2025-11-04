# Nginx를 베이스 이미지로 사용
FROM nginx:latest

# 현재 폴더의 index.html을 nginx 기본 폴더로 복사
COPY ./index.html /usr/share/nginx/html/index.html

# 80번 포트를 외부에 공개
EXPOSE 80

# nginx 실행 (기본 명령어)
CMD ["nginx", "-g", "daemon off;"]

