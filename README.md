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

To receive contact submissions and reader-list signups by email, set `ZOHO_SMTP_HOST` to the outgoing server listed in your [Zoho Mail SMTP settings](https://www.zoho.com/mail/help/zoho-smtp.html). Set `ZOHO_SMTP_USER` to your full Zoho Mail address and `ZOHO_SMTP_PASSWORD` to your SMTP password. Use a Zoho app-specific password if you have two-factor authentication enabled. Port 465 is the default. Set `ZOHO_SMTP_PORT=587` to use STARTTLS. Set `FORM_EMAIL_TO` to a different recipient if needed. Otherwise, submissions go to the authenticated mailbox. Add the same variables to your hosting environment before rebuilding for production.

Zoho delivery emails each signup to your inbox. Add those addresses to your mailing list before sending reader updates.

When Zoho SMTP is unconfigured, `CONTACT_WEBHOOK_URL` and `NEWSLETTER_WEBHOOK_URL` can point to trusted HTTPS endpoints accepting JSON POST requests. Set `FORM_WEBHOOK_SECRET` if an endpoint expects a shared Bearer token.

Contact payload:

```json
{"kind":"contact","email":"reader@example.com","name":"Reader","subject":"Book club","message":"Our book club would like to connect.","category":"Book club","organization":"Optional group","consent":"true"}
```

Newsletter payload:

```json
{"kind":"newsletter","email":"reader@example.com"}
```

Webhook endpoints should return a successful HTTP status only after accepting delivery. The API validates fields and consent and handles malformed data, honeypots, failed delivery and timeouts. A form without configured delivery is disabled and its API returns 503. The app forwards submissions without storing them locally.

## Verification

```bash
npm run lint
npm run build
npm run test:e2e
```

Browser tests use the installed Microsoft Edge channel and start the production server on port 3100. Build first. Screenshots and test traces are local artifacts excluded from Git.

## Publication content still to supply

Confirmed retailer URLs, publication metadata/formats, the public domain, form delivery service and any approved author photograph or endorsements. The unverified first-person biography drafts were not presented as Samuel’s approved statements.
