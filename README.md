# Diego Chacón — Full Stack Developer Portfolio

A modern, responsive portfolio showcasing full-stack development expertise with dark/light theme support, multi-language internationalization, and smooth animations.

**Live**: [diegof.netlify.app](https://diegof.netlify.app)

---

## Features

### 🎨 Design & UX

- **Dark & Light Themes**: Seamless theme switching with localStorage persistence (dark is default)
- **Responsive Layout**: Mobile-first design optimized for 320px–1920px viewports
- **Smooth Animations**: Scroll-reveal animations with `prefers-reduced-motion` support
- **Custom Cursor**: Interactive hover effects with lerp-interpolated position tracking

### 🌐 Internationalization

- **ES/EN Language Toggle**: Full UI localization with translation function
- **Dynamic Content**: Sections render based on selected language
- **Language Persistence**: Selection saved to localStorage

### 🧠 Smart Components

- **ScrollSpy Navigation**: Active section tracking with IntersectionObserver
- **AI Assistant Widget**: MVP keyword-based assistant for common questions (education, stack, projects)
- **Project Cards**: Expandable details with problem/solution/architecture narratives
- **Background Canvas**: Adaptive particle system (48 nodes desktop, 15 mobile, scales with CPU cores)

### ⚡ Performance

- **PDF Optimization**: Compressed CV (~139 kB, down from 3.9 MB)
- **Image Optimization**: WebP conversion, lazy loading with `loading="lazy"`
- **Code Splitting**: Vite's automatic chunking; 47 modules with 184.50 kB JS (gzip: 58.62 kB)
- **CSS-in-Modules**: Scoped styles per section to avoid cascade conflicts

### ♿ Accessibility

- **WCAG AA Contrast**: All text ratios > 4.5:1 (dark & light modes verified)
- **Semantic HTML**: Proper landmarks (nav, main, section, footer)
- **Keyboard Navigation**: Full focus-visible outlines, 2px solid outline
- **aria-labels & aria-current**: Navigation and interactive elements properly labeled

### 🔧 Architecture

- **React 18 + Vite 5.3**: Fast HMR dev server, optimized production build
- **Context API**: Global state for theme and language (no Redux needed)
- **Modular Components**: Reusable UI blocks (BrandMark, LineIcon, TechIcon, etc.)
- **CSS Variables**: Centralized design tokens (colors, spacing, typography)
- **Data-Driven**: Projects, technologies, education from `src/data/` modules

---

## Tech Stack

### Frontend

- **React 18** — UI library
- **Vite 5.3** — Build tool & dev server
- **CSS 3** — CSS modules, Grid, Flexbox, custom properties
- **JavaScript ES2020+** — Modern syntax, destructuring, arrow functions

### Styling

- **CSS Variables** — Theme switching, responsive design
- **CSS Modules** — Section-level scoped styles
- **Grid & Flexbox** — Responsive layout system
- **Animations** — CSS keyframes, scroll-reveal effects

### Internationalization

- **Custom i18n** — Translation function via Context (no i18n library overhead)
- **Namespaced Keys** — Organized translations by section (nav._, headings._, etc.)

### Icons & Graphics

- **SVG System**: Custom icons (BrandMark, LineIcon variants, SocialIcon)
- **Simple Icons CDN** — Tech logos via `simpleicons.org` (no bundle bloat)
- **Canvas Rendering** — Particle background (CodeConstellation, responsive node count)

### Hosting & Deployment

- **Netlify** — Static hosting with automatic deployments from Git
- **robots.txt & sitemap.xml** — SEO setup with 7 indexed URLs

---

## Project Structure

```
src/
├── App.jsx                      # Root component orchestrating layout & sections
├── App.css                      # Global styles, theme variables, @media queries
├── main.jsx                     # Vite entry point
├── index.css                    # Reset & baseline styles
│
├── components/                  # Reusable UI components
│   ├── BrandMark.jsx           # Logo (48x48 SVG)
│   ├── LineIcon.jsx            # 15-type icon system (node, server, database, etc.)
│   ├── TechIcon.jsx            # Icon wrapper (concept or CDN image)
│   ├── SocialIcon.jsx          # Social links (email, LinkedIn, GitHub)
│   ├── SectionHeading.jsx      # Section header component
│   └── StackArtwork.jsx        # Tech category artwork
│
├── common/                      # Shared utilities & contexts
│   ├── ThemeContext.jsx        # Dark/light theme state management
│   ├── LanguageContext.jsx     # ES/EN language state + translation function
│   ├── ProjectCard.jsx         # Project card component
│   └── SkillList.jsx          # Skills list component
│
├── data/                        # Data-driven content
│   ├── profile.js              # User profile & social links
│   ├── projects.js             # Projects array (featured, status, stack, links)
│   ├── technologies.js         # Tech categories & items with icons
│   └── education.js            # Education entries with dates
│
├── i18n/                        # Localization
│   └── translations.js         # ES/EN translations (namespaced keys)
│
└── assets/                      # Static files
    ├── foto-perfil.jpeg        # Profile photo
    ├── Diego_Chacon_Desarrollador.pdf  # CV
    └── projects/               # Project-specific assets

public/
├── robots.txt                  # SEO: disallow nothing, allow all
└── sitemap.xml                 # SEO: 7 URLs with priorities & lastmod
```

---

## Development

### Prerequisites

- **Node.js 18+** (LTS recommended)
- **npm 9+** or **pnpm**

### Install Dependencies

```bash
npm install
```

### Start Dev Server

```bash
npm run dev
```

Runs at `http://127.0.0.1:5173/` with hot module reload (HMR).

### Lint Code

```bash
npm run lint
```

ESLint checks JavaScript & JSX files; 0 warnings allowed.

### Build Production

```bash
npm run build
```

Generates optimized `dist/` folder with minified CSS/JS, ready for deployment.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally at `http://localhost:4173/` for testing before deployment.

---

## Deployment

### Netlify (Current)

The portfolio is deployed on Netlify with:

- **Automatic deployments** from `main` branch
- **Environment**: Static site (no server-side rendering needed)
- **Build command**: `npm run build`
- **Publish directory**: `dist/`

### Manual Deployment

1. Run `npm run build` locally
2. Upload `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, etc.)

---

## Performance Metrics

| Metric                | Value                  |
| --------------------- | ---------------------- |
| **JS Bundle (gzip)**  | 58.62 kB               |
| **CSS Bundle (gzip)** | 8.52 kB                |
| **Total Modules**     | 47                     |
| **CV PDF Size**       | 139.33 kB (compressed) |
| **Profile Photo**     | 25.37 kB (optimized)   |
| **Build Time**        | ~2 seconds             |

**Lighthouse Targets**:

- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

---

## Key Decisions

### Dark Theme as Default

Unlike `prefers-color-scheme`, users see dark theme on first visit for consistent brand experience. Toggle is always visible in navbar.

### Simple Icons CDN

Logo images use `https://cdn.simpleicons.org/{slug}/{color}` instead of local SVG assets — reduces bundle size, ensures logos are always up-to-date without manual updates.

### Custom i18n

Built-in translation function via React Context instead of external library (i18n-js, react-i18next) — keeps bundle lean, translation logic transparent.

### Canvas Particles over Decorative Images

Adaptive background via HTML5 Canvas (CodeConstellation) instead of static background images — responsive to viewport and CPU availability (desktop: 48 nodes, mobile: 15 nodes).

### CSS Modules per Section

Scoped styling per section avoids global namespace pollution while keeping the main App.css for shared tokens and @media rules.

---

## Accessibility Checklist

- ✅ **WCAG AA Compliance**: Text contrast > 4.5:1 in dark and light modes
- ✅ **Keyboard Navigation**: All interactive elements focusable with visible outlines
- ✅ **aria-labels**: Buttons, links, and forms labeled appropriately
- ✅ **prefers-reduced-motion**: Animations respect user OS preference
- ✅ **Semantic HTML**: Proper use of landmarks (nav, main, section, footer)
- ✅ **alt Text**: Images have meaningful alt attributes
- ✅ **Form Accessibility**: Input fields have associated labels

---

## Future Enhancements

- [ ] Performance monitoring (Sentry, LogRocket)
- [ ] Contact form integration (Netlify Forms or API)
- [ ] Blog section with Markdown support
- [ ] Case study pages with detailed project narratives
- [ ] Animation library (Framer Motion) for advanced scroll effects
- [ ] Dark mode toggle as sidebar menu item on mobile

---

## Contributing

This is a personal portfolio. For suggestions or bug reports, please open an issue or contact directly via LinkedIn.

---

## License

© 2026 Diego Chacón. All rights reserved.

---

## Contact

- **LinkedIn**: [linkedin.com/in/diegochacon](https://www.linkedin.com/in/diegochacon)
- **GitHub**: [github.com/diegofce](https://github.com/diegofce)
- **Email**: Available via portfolio contact form
