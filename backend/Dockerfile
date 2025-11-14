# ---------- Build ----------
FROM gradle:8.8-jdk17 AS build
WORKDIR /workspace

COPY bankedu-back /workspace
RUN gradle clean build -x test --no-daemon

# ---------- Run ----------
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# 하드코딩 ENV
ENV DB_HOST=sw_team_6_mysql
ENV DB_USERNAME=root
ENV DB_PASSWORD=1234

COPY --from=build /workspace/build/libs/bankedu-back-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

