# Repository Guidelines

## Project Structure & Module Organization

This is a Vite + React portfolio site. Application entry points live in `src/main.jsx` and `src/App.jsx`. Page sections are organized under `src/sections/`, with each section in its own folder, for example `src/sections/Hero/Hero.jsx` and `HeroStyles.module.css`. Shared UI helpers live in `src/common/`, reusable components in `src/components/`, and images, SVGs, and PDFs in `src/assets/`. Static public files belong in `public/`. Production output is generated in `dist/` and should not be edited manually.

## Build, Test, and Development Commands

- `npm install`: install project dependencies from `package-lock.json`.
- `npm run dev`: start the Vite development server with hot module reload.
- `npm run build`: create the production build in `dist/`.
- `npm run preview`: serve the production build locally for verification.
- `npm run lint`: run ESLint across JavaScript and JSX files with zero warnings allowed.

There is currently no configured test script. Use `npm run lint` and `npm run build` as the minimum validation before submitting changes.

## Coding Style & Naming Conventions

Use React function components and ES modules. Name components and component files in PascalCase, such as `ProjectCard.jsx` or `ParticlesBackground.jsx`. Keep section-specific styles beside the component using CSS modules named `SectionStyles.module.css`. Prefer descriptive asset names and import assets from `src/assets/` instead of hardcoding relative public paths.

Follow the existing formatting style: two-space indentation in JSX, semicolons, single quotes for imports and strings, and concise component bodies. Keep global styles in `src/App.css` or `src/index.css`; use CSS modules for section-level selectors.

## Testing Guidelines

No testing framework is installed yet. If tests are added, prefer a Vite-compatible setup such as Vitest with React Testing Library. Place tests near the component they cover using names like `Hero.test.jsx` or under a dedicated `src/__tests__/` folder. Focus tests on rendered content, links, theme behavior, and user interactions rather than implementation details.

## Commit & Pull Request Guidelines

Recent commits use short Spanish summaries such as `Particulas de fondo` and `Mejorando botones`. Keep commits concise, imperative or descriptive, and focused on one change.

Pull requests should include a brief description, commands run (`npm run lint`, `npm run build`), screenshots or screen recordings for visual changes, and linked issues when applicable. Mention any asset replacements, new dependencies, or behavior changes that affect the live portfolio.
