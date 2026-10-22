# djquiz

Flashcards for DJ key notation: Traditional ⇄ Camelot mappings and transposition.

## Dev
    npm install
    npm run dev      # http://localhost:5173
    npm test         # unit tests for src/keys.js
    npm run build    # static output in dist/

## Deploy to Vercel
1. Push this repo to GitHub.
2. In Vercel: Add New → Project → import the repo. It auto-detects Vite
   (build: `npm run build`, output: `dist`).
3. Project → Settings → Domains → add `djquiz.lol` and set the DNS records Vercel shows.

Or from the CLI: `npx vercel --prod`.
