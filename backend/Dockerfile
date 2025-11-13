# ---------- 1단계: Build ----------
FROM gradle:8.8-jdk17 AS build
WORKDIR /workspace

# 프로젝트 복사
COPY bankedu-back /workspace

# Gradle 캐시를 활용하기 위해 dependencies 먼저 다운로드
RUN gradle clean build -x test --no-daemon

# ---------- 2단계: Run ----------
FROM openjdk:17-jdk-slim
WORKDIR /app

# 위에서 빌드된 jar 복사
COPY --from=build /workspace/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

