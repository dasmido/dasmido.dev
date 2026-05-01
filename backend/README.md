# FastAPI Backend

## Setup
1. Create virtual env
2. Install dependencies
3. Configure `DATABASE_URL`
4. Run API

## Run locally
```zsh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export DATABASE_URL="postgresql+psycopg://postgres:postgres@localhost:5432/my_react"

```

## Test
```zsh
source .venv/bin/activate
pytest -q
```

## Endpoints
- `GET /` -> service info
- `GET /api/health` -> health status
- `POST /api/blogs` -> create blog
- `GET /api/blogs` -> list blogs
- `GET /api/blogs/{blog_id}` -> get blog by id
- `PUT /api/blogs/{blog_id}` -> update blog
- `DELETE /api/blogs/{blog_id}` -> delete blog

