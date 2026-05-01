# Go API

Minimal Go HTTP API service for your project.

## Endpoints
- `GET /`
- `GET /api/health`

## Local run
```zsh
cd /Users/mohammedjamal/workspace/my-react/api
go run ./cmd/server
```

## Run tests
```zsh
cd /Users/mohammedjamal/workspace/my-react/api
go test ./...
```

## Build binary
```zsh
cd /Users/mohammedjamal/workspace/my-react/api
go build -o bin/api-server ./cmd/server
```

## Docker build and run
```zsh
cd /Users/mohammedjamal/workspace/my-react/api
docker build -t my-react-go-api .
docker run --rm -p 8081:8081 -e PORT=8081 my-react-go-api
```

