# ---------- Build ----------
FROM node:20 AS build
WORKDIR /app

COPY bankedu-front/package.json ./
COPY bankedu-front/package-lock.json ./

RUN npm install

COPY bankedu-front/ .

# 하드코딩 API URL
#ENV NEXT_PUBLIC_API_URL=http://192.168.0.79:8580

RUN npm run build

# ---------- Run ----------
FROM node:20 AS runner
WORKDIR /app

COPY --from=build /app .

EXPOSE 3000
CMD ["npm", "start"]
