# Routing and home sections

- `src/main.jsx` mounts RouterProvider directly.
- `src/components/routers/AppRoutes.jsx` defines separate `/`, `/bangladesh`, `/usa`, `/uk`, and `/dubai` routes. `/` renders the Bangladesh home content without redirecting. Each market has home, about, portfolio, project detail and contact children.
- CountryContext receives an explicit country prop instead of reading a dynamic URL parameter. Shared page templates continue to use independent country data.
- Removed the unused App.jsx wrapper and old src/routes/AppRoutes.jsx. The existing src/routes/paths.js switch helper remains.
- Added BrandStory after AboutUs in Home, with its data and scoped CSS.
- Replaced the shared home Contact callout with Contact & Corporate Offices, using the supplied four office records and scoped CSS. About also uses this shared section.
- Removed the unused CountrySwitcher import and commented header bar. Header flags remain removed.

The two sections reuse the existing Reveal helper and fonts. Milestone dates, figures and office details are user-supplied. Story imagery is explicitly illustrative because matching project photographs were not supplied. Empty phone targets and the stray citation marker are fixed.

The latest ZIP had no lockfile. This delivery restores the lockfile from the previous upload, whose package.json is identical; no packages were added or upgraded. Run `npm ci`, then `npm run dev`.

Build, lint and explicit route matching are checked for this delivery. Browser visual verification remains incomplete. See the full JSX and CSS files in src; no snippets or additional framework are required.
