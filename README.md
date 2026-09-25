# Samuel Latney — Paired by Providence

A responsive, five-page author website built with Next.js 16, React 19, Tailwind CSS 4, Framer Motion, and Lucide icons. Content and visual direction follow the supplied Word blueprint. All story photography and retailer logos use the supplied `public` assets.

## Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000. Production: `npm run build`, then `npm start`.

## Content and reusable components

- `lib/site.ts`: retailer names, images and purchase URLs; navigation; image paths; metadata helper.
- `components/platform.tsx`: reusable retailer section with a `platforms` prop. Empty URLs show “Link coming soon”; confirmed URLs become external purchase links.
- `components/`: shared header, footer, hero, buttons, headings, animation wrapper, character profiles, story path, themes, author section, newsletter and forms.
- `app/`: Home, About Samuel, The Book, Alice & James, Contact, utility pages and 404. Previous `/about-samuel` and `/meet-alice-and-james` paths redirect to the canonical pages.

Images use `next/image` with responsive sizes, lazy loading, hero preloading, and AVIF/WebP optimization. Original assets remain intact. Fonts are served locally through `next/font/local`. Motion respects reduced-motion preferences.

## Add your purchase links

Replace the empty `href` strings in `retailers` in `lib/site.ts` with verified product URLs. The retailer cards activate automatically. No invented purchase links, publication metadata, author portrait, testimonials or spoiler images are displayed.

## Connect forms when ready

Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_SITE_URL` to the public HTTPS origin to enable correct canonical URLs, social URLs and the sitemap. Rebuild after changing environment variables.

Set `CONTACT_WEBHOOK_URL` and/or `NEWSLETTER_WEBHOOK_URL` to a trusted HTTPS endpoint accepting JSON POST requests. These can be your own backend or a workflow that delivers mail/adds newsletter subscribers. Set `FORM_WEBHOOK_SECRET` if your endpoint expects a shared Bearer token. Secrets remain on the server.

Contact payload:

```json
{"kind":"contact","email":"reader@example.com","name":"Reader","subject":"Book club","message":"Our book club would like to connect.","category":"Book club","organization":"Optional group","consent":"true"}
```

Newsletter payload:

```json
{"kind":"newsletter","email":"reader@example.com"}
```

The recipient must return a successful HTTP status only after accepting delivery. The API validates fields and consent and handles malformed data, honeypots, failed delivery and timeouts. With no endpoints, submission is visibly disabled and the API returns 503 instead of a false success. The destination should handle spam/rate limits, subscriber double opt-in, retention and unsubscribe requests. Update the privacy copy with the actual provider and practices before enabling forms. No reader data is stored locally by this app.

## Verification

```bash
npm run lint
npm run build
npm run test:e2e
```

Browser tests use the installed Microsoft Edge channel and start the production server on port 3100. Build first. Screenshots and test traces are local artifacts excluded from Git.

## Publication content still to supply

Confirmed retailer URLs, publication metadata/formats, the public domain, form delivery service and any approved author photograph or endorsements. The unverified first-person biography drafts were not presented as Samuel’s approved statements.
