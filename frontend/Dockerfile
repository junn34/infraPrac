# ---------- 1단계: Build ----------
FROM node:20 AS build
WORKDIR /app

# package.json만 먼저 복사해서 캐시 최적화
COPY bankedu-front/package.json bankedu-front/package-lock.json ./
RUN npm install

# 프로젝트 전체 복사
COPY bankedu-front/ ./

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Next.js 빌드
RUN npm run build

# ---------- 2단계: Run ----------
FROM node:20 AS runner
WORKDIR /app

# 빌드 결과 복사
COPY --from=build /app ./

EXPOSE 3000

CMD ["npm", "start"]

