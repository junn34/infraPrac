# Java 17 기반 이미지
FROM openjdk:17-jdk-slim

# 작업 디렉토리 생성
WORKDIR /app

# bankedu-back 폴더 안의 빌드 결과물 복사
COPY ./bankedu-back/build/libs/*.jar app.jar

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

# 컨테이너 포트 오픈
EXPOSE 8080

# 실행 명령
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

