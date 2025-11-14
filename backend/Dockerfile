# ---------- 1단계: Build ----------
FROM gradle:8.8-jdk17 AS build
WORKDIR /workspace

# 프로젝트 전체 복사
COPY bankedu-back /workspace

# 빌드
RUN gradle clean build -x test --no-daemon

# ---------- 2단계: Run ----------
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# 빌드된 JAR 복사

COPY --from=build /workspace/build/libs/bankedu-back-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

