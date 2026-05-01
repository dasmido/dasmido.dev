# syntax=docker/dockerfile:1

FROM golang:1.22-alpine AS builder
WORKDIR /src

COPY go.mod ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /out/api-server ./cmd/server

FROM alpine:3.21
WORKDIR /app

ENV PORT=8081
COPY --from=builder /out/api-server ./api-server

EXPOSE 8081
CMD ["sh", "-c", "./api-server"]

