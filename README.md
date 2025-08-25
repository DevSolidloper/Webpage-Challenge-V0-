# ML Dashboard (v0)

This project wraps your **v0.tsx** page and **v0.css** styles in a minimal Next.js + Tailwind setup so you can deploy easily.

## Run locally

```bash
npm install        # or yarn / pnpm
npm run dev
# open http://localhost:3000
```

## Deploy (Vercel)

1. Create a new GitHub repo and push this folder.
2. Go to https://vercel.com/new and import the repo.
3. Keep defaults; Vercel will detect Next.js and build the app.
4. When it finishes, you'll get a public URL to submit.

## Notes

- We vendor lightweight UI components compatible with the `@/components/ui/*` imports used by the page (Card, Badge, Tabs, Progress), so you don't need to set up shadcn/ui manually.
- `v0.tsx` and `v0.css` are added as `app/page.tsx` and `app/globals.css` respectively.
- Recharts is preinstalled for the charts.
