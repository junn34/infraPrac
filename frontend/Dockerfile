# ---------- 1단계: Build ----------
FROM node:20 AS build
WORKDIR /app

COPY bankedu-front/package.json ./package.json
COPY bankedu-front/package-lock.json ./package-lock.json

RUN npm install

COPY bankedu-front/ .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN npm run build

# ---------- 2단계: Run ----------
FROM node:20 AS runner
WORKDIR /app

COPY --from=build /app .

EXPOSE 3000
CMD ["npm", "start"]

