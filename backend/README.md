# FastAPI Backend

## Setup
1. Create virtual env
2. Install dependencies
3. Configure `DATABASE_URL`
4. Configure `BLOG_ADMIN_KEY`
5. Run API

## Run locally
```zsh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export DATABASE_URL="postgresql+psycopg://postgres:postgres@localhost:5432/my_react"
export BLOG_ADMIN_KEY="local-admin-key"

```

## Production notes
- Live API base: `https://api-dasmido.sliplane.app`
- Live blogs endpoint: `https://api-dasmido.sliplane.app/api/blogs`
- Set `CORS_ORIGINS` to your deployed frontend origin, for example `https://your-frontend-domain.example`
- Do **not** set `CORS_ORIGINS` to the API domain unless the frontend is also served from that same origin

## Build Docker image
Build from the repository root so the backend Dockerfile can copy `backend/...` files correctly:

```zsh
cd ..
docker build -f backend/Dockerfile -t my-react-backend .
```

## Test
```zsh
source .venv/bin/activate
pytest -q
```

## Cleanup shell exports
If you exported backend variables in your current terminal session, remove them with:

```zsh
unset DATABASE_URL
unset BLOG_ADMIN_KEY
```

## Endpoints
- `GET /` -> service info
- `GET /api/health` -> health status
- `POST /api/blogs` -> create blog
- `GET /api/blogs` -> list blogs
- `GET /api/blogs/{blog_id}` -> get blog by id
- `PUT /api/blogs/{blog_id}` -> update blog
- `DELETE /api/blogs/{blog_id}` -> delete blog

### Protected blog mutation endpoints
- `POST /api/blogs`, `PUT /api/blogs/{blog_id}`, and `DELETE /api/blogs/{blog_id}` require header:
  - `X-Admin-Key: <BLOG_ADMIN_KEY>`

