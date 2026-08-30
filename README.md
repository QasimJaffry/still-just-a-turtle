# still-just-a-turtle

A small interactive scene — click things, get little messages. Built with
React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion.

No backend, no database, no analytics, no network calls of any kind. Fully
static — everything that happens, happens in the browser.

## Run it locally

```bash
cp .env.example .env
# edit .env and set GATE_PASSPHRASE to whatever you want the lock-screen
# password to be
npm install
npm run dev
```

Opens at `http://localhost:5173`. The build will fail with a clear error
if `GATE_PASSPHRASE` isn't set -- that's intentional, so it's impossible to
accidentally ship a build with no lock configured.

## What's on the page

- **A lock screen with two reactive chibi characters** — the whole site
  sits behind a single passphrase field. A small girl and an octopus
  plushie react to what you type: neutral while waiting, sad on a wrong
  guess, happy right before it unlocks — and idly animate the rest of the
  time. See "The lock screen" section below for how the passphrase itself
  is handled.
- **Message stickers** (turtle ×2, cat, coffee, donut, book) — click to
  cycle through a pool of short lines, defined in `src/data/content.ts`.
- **The MacBook** — a tiny sticker-decorator with a handful of toggleable
  stickers, persisted per-device via `localStorage`.
- **The Bigini** — a fake luxury product page.
- **The chup button** — an escalating bit, advances one stage per click.
- **The record player** — visual only, no audio bundled (see note below).
- **The tamagotchi** ("little guy") — feed it / pet it, cycles through a
  small mood state machine (hungry → happy → sleepy → content), persisted
  per-device.
- **The package** ("a package") — another escalating bit, same mechanic as
  chup.
- **A small note** — one sincere paragraph, kept visually separate from
  the joke stickers on purpose.
- **A hidden wish star** — one specific twinkle in the background is a real
  button. Counted in the "found" total, nothing else marks it as special.
- **Two hidden keyboard easter eggs** — typing "chup" or "mushroom" anywhere
  on the page triggers a toast. Not counted in the found total.

## Deploying to GitHub Pages

Deploy manually from your own machine (recommended) — you build it, you
see exactly what gets pushed, no CI environment in between:

1. **Push this project to a new GitHub repo.**
2. **Check `vite.config.ts`** — `base` is already set to `/still-just-a-turtle/`.
   If you rename the repo, update this to match exactly:
   `base: '/<your-repo-name>/'`. (If deploying to a `<username>.github.io`
   *root* repo instead of a project repo, set `base: '/'` instead.)
3. Make sure your local `.env` has the real `GATE_PASSPHRASE` set (see
   "Run it locally" above).
4. Run:
   ```bash
   npm run deploy
   ```
   This builds the site and pushes the `dist` folder straight to a
   `gh-pages` branch on your repo (via the `gh-pages` package).
5. In the repo on GitHub, go to **Settings → Pages**, and under **Source**
   select **Deploy from a branch**, then pick the `gh-pages` branch and
   `/ (root)` folder.
6. The live URL shows up right there in **Settings → Pages** a minute or
   so later.

Whenever you change anything, just run `npm run deploy` again.

<details>
<summary>Alternative: automatic deploy via GitHub Actions</summary>

This repo also includes a workflow at `.github/workflows/deploy.yml` that
rebuilds and redeploys automatically on every push to `main`, if you'd
rather not run a deploy command yourself. To use it instead of the manual
method above:

1. In **Settings → Pages**, set **Source** to **GitHub Actions** instead
   of "Deploy from a branch".
2. Add the passphrase as a repository secret: **Settings → Secrets and
   variables → Actions → New repository secret**, named exactly
   `GATE_PASSPHRASE`.
3. Push to `main`.

Pick one method or the other, not both — having both configured can fight
over what "Source" Pages actually deploys from.
</details>

## The lock screen

The whole site sits behind a single passphrase, with two chibi characters
(a girl and an octopus plushie) that react to what's typed, idly animate
the rest of the time, and hug each other the moment the password is
correct (see `src/components/Chibi.tsx`).

- At **build time**, `vite.config.ts` reads `GATE_PASSPHRASE` (from your
  local `.env`, or the GitHub Actions secret if you're using that path
  instead), hashes it, and embeds *only that hash* into the shipped code.
  The hash function (`cyrb53`, in `src/lib/hash.ts`, duplicated in
  `vite.config.ts` since one runs in Node and one in the browser — they
  have to match exactly) is a simple deterministic hash, not a
  cryptographic one. That's intentional: this was never meant to be real
  security, so a small dependency-free function that works synchronously
  everywhere is a better fit than something like the Web Crypto API,
  which requires a "secure context" that isn't always available.
- The plaintext passphrase is never committed to git, and never appears in
  the deployed JavaScript bundle — confirmed by grepping the built output.
- Once unlocked, it stays unlocked on that device via `localStorage` — no
  need to re-enter it on every visit.
- The submit button and Enter-key handling are deliberately **not** a
  native `<form onSubmit>`. Some file-preview UIs (including chat
  interfaces that render an HTML file inline) show it inside a sandboxed
  iframe without the `allow-forms` permission, which makes browsers
  silently block native form submission entirely -- no error, nothing
  happens, the click just does nothing. Plain `onClick` / `onKeyDown`
  handlers avoid that whole category of failure. If you ever add another
  form to this project, keep this in mind.

Worth being honest about: this was never real security. There's no
rate-limiting, and the hash is sitting right there in the JS bundle for
anyone determined enough to try cracking it offline. For a personal link
that isn't going to attract that kind of attention, it's more than enough
— it just means nobody can open the link and immediately see everything
without at least meaning to get past a locked door.

### A note on privacy

GitHub Pages sites are public and unlisted, not private — anyone with the
exact link can open it, but it won't turn up in search results (there's a
`noindex` tag in `index.html`, and the page has no title/description that
would make it discoverable). If you want an extra layer, you can make the
GitHub *repo* private — Pages can still build and serve from a private repo
on paid plans; the code itself just won't be publicly browsable.

## Where things live

- **`src/data/content.ts`** — every line of text on the site. The file
  you'll touch most for any copy change.
- **`src/data/objects.ts`** — the config array laying out every sticker
  (icon, message pool, rotation, color accent). Adding a new
  "click it, cycle through messages" sticker is just adding an entry here
  plus a message pool in `content.ts` — no layout code to touch.
- **`src/components/features/`** — the bespoke interactions (MacBook,
  Bigini, chup, record, tamagotchi, address, note). To add a new one-off
  interaction: build a component here matching the existing props shape,
  register it in the `switch` in `src/components/Scene.tsx`, then add a
  `"special"` entry to `objects.ts`.
- **`src/components/icons/`** — hand-drawn line-art SVG icons, one per
  object, registered in `icons/index.ts`.
- **`src/components/WishStar.tsx`** — the hidden clickable star. Kept as
  its own component rather than nested in `StarField.tsx` on purpose: a
  child element can't escape a parent's negative `z-index` stacking
  context, so anything meant to be clickable has to live outside it.

## A couple of implementation notes

- **The record player** ("our song") is visual only — no audio file is
  bundled, both for licensing reasons and because it isn't needed for the
  bit to land. To add real audio you have the rights to: drop a file in
  `public/` and wire up an `<audio>` element in
  `src/components/features/RecordFeature.tsx`.
- **Everything that persists** (MacBook stickers, tamagotchi mood, the
  discovery counter) uses `localStorage`, scoped per browser/device. That
  means testing on one device won't show up as "already found" on another.
- **Nothing is ever sent anywhere.** No `fetch`, no form submission, no
  analytics. The "address" joke in particular has no input field and
  collects nothing — it's five strings and a click counter. The lock
  screen doesn't send anything either; the password check happens entirely
  in the browser against a constant baked in at build time (see above).

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion. Fully static —
deploys anywhere that serves static files (GitHub Pages, Netlify, Vercel,
etc.), not just GitHub.
