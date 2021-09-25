[![Netlify Status](https://api.netlify.com/api/v1/badges/7befdeff-e928-4eed-b7b6-0552a9bea11a/deploy-status)](https://app.netlify.com/sites/resetpresents/deploys)

# ✨ RESET ⚡️

The online experience for the Chicago event organization, Reset Presents, powered by [SvelteKit](https://github.com/sveltejs/kit);

## ⚙️ Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## 🔨 Building

This project uses the static [adapter](https://kit.svelte.dev/docs#adapters). That target will be built for with:

```bash
pnpm build
```

> You can preview the built app with `pnpm preview`, regardless of whether you installed an adapter. This should _not_ be used to serve the app in production.

> This project requires at least Node v14.13 to run
