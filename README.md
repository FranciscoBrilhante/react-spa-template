# React TS Template

Client-side rendered single page app: Vite, React, TypeScript (strict), MUI, Zustand, i18next, ESLint.

## Setup

`package.json` only contains scripts so that npm resolves the current versions for you:

```bash
npm install react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled \
  zustand i18next react-i18next i18next-http-backend i18next-browser-languagedetector

npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom \
  eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals

npm run dev
```

## Scripts

| Script              | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Vite dev server                       |
| `npm run build`     | Type-check, then production build     |
| `npm run typecheck` | TypeScript only                       |
| `npm run lint`      | ESLint (typescript-eslint, react-hooks) |

## Localization

- Strings live in `public/locales/<lang>/translation.json` and are fetched at runtime.
- `public/locales/en/translation.json` is the source of truth for types (`src/i18n/i18next.d.ts`).
  `t('home.greeting', { name })` autocompletes keys and errors on unknown ones.
- Add a language: create `public/locales/<lang>/translation.json` and add the code to
  `SUPPORTED_LANGUAGES` in `src/i18n/index.ts`.
- Add a string: add it to the English file first, then to the other languages.
- Recommended VS Code extension: i18n Ally (preconfigured in `.vscode/settings.json`).

## Global snackbar

`<GlobalSnackbar />` is mounted once in `App.tsx`. Trigger it from anywhere, no hooks needed:

```ts
import { snackbar } from '@/store/snackbarStore'

snackbar.success(t('snackbar.success'))
snackbar.show('Custom', {
  severity: 'info',
  variant: 'outlined',
  autoHideDuration: null, // stay until dismissed
  anchorOrigin: { vertical: 'top', horizontal: 'right' },
  action: { label: 'Undo', onClick: () => {} },
  hideCloseButton: false,
})
```

Defaults are in `SNACKBAR_DEFAULTS` in `src/store/snackbarStore.ts`.

## Structure

```
public/locales/{en,pt}/translation.json
src/
  components/GlobalSnackbar.tsx
  i18n/{index.ts,i18next.d.ts}
  store/snackbarStore.ts
  App.tsx  main.tsx  theme.ts
```

Path alias: `@/` maps to `src/`.
