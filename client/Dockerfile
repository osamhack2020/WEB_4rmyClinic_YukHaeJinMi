FROM golang:1.13 as builder
WORKDIR /app
COPY server/go.mod ./
# server/go.sum
RUN go mod download
COPY server .
RUN ls /app
RUN GOOS=linux go build -o main .

FROM node:10 as web
WORKDIR /web
COPY ./react/package.json ./react/package-lock.json ./
RUN npm install
COPY ./react/src ./src
COPY ./react/public ./public
COPY ./react/tsconfig.json ./react/.babelrc ./react/config-overrides.js ./
RUN ls /web
RUN npm run build

FROM debian:bullseye-20191118
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /root/
COPY --from=builder /app/main .
COPY --from=web /web/build ./web
RUN ls -lah
ENTRYPOINT [ "/root/main" ]