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
