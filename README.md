# Personal Branding Site

A one-page personal brand website built with React + TypeScript + Vite, inspired by modern portfolio layouts.

## Sections

- Hero with primary call-to-action
- About
- Services
- Selected work
- Contact + social footer

## Run locally

```bash
npm install
export VITE_API_BASE_URL="http://localhost:8000"
export VITE_BLOG_ADMIN_KEY="local-admin-key"
npm run dev
```

## Production API

- Your live API is available at `https://api-dasmido.sliplane.app/api/blogs`.
- For the frontend env, prefer setting:

```bash
export VITE_API_BASE_URL="https://api-dasmido.sliplane.app"
```

- The frontend also tolerates pasted values like `https://api-dasmido.sliplane.app/api` or `https://api-dasmido.sliplane.app/api/blogs`, but the API host only is the cleanest value.
- If `VITE_API_BASE_URL` is missing in production, the frontend now falls back to `https://api-dasmido.sliplane.app` for blog reads.

## Production Docker build

Build the frontend image with the API base URL baked into the Vite bundle:

```bash
docker build \
  --build-arg VITE_API_BASE_URL="https://api-dasmido.sliplane.app" \
  -t my-react-frontend .
```

## Blog write protection

- Backend blog mutations require `X-Admin-Key` matching `BLOG_ADMIN_KEY`.
- Frontend create/edit/delete controls are enabled only when `VITE_BLOG_ADMIN_KEY` is set.
- Without `VITE_BLOG_ADMIN_KEY`, the blog page stays read-only.

## Build

```bash
npm run build
npm run preview
```

## Customize quickly

- Update content in `src/App.tsx`
- Tweak section styles in `src/App.css`
- Adjust global color/typography tokens in `src/index.css`
