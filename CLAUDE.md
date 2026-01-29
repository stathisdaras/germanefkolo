# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a German language learning website built with Angular 19+ standalone components. The site features multi-language support (German, English, Greek) and is designed for Panagiotis Daras's German language teaching services.

## Development Commands

### Development Server
```bash
ng serve
# or
npm start
```
Runs the development server at http://localhost:4200

### Building
```bash
ng build                    # Development build
ng build:prod              # Production build (optimized, minified)
npm run build              # Alias for development build
```
Output directory: `dist/germanefkolo/`

### Testing
```bash
ng test                    # Run Karma/Jasmine tests
```

### Image Optimization
```bash
npm run optimize-images    # Optimize hero images using Sharp
```
Creates responsive image variants (mobile/tablet/desktop) in WebP and JPEG formats at `src/assets/images/optimized/`.

## Architecture

### Application Bootstrap
- Uses **standalone components** (no NgModules)
- Bootstrap via `bootstrapApplication()` in `src/main.ts`
- App configuration in `src/app/app.config.ts` with providers:
  - `provideZoneChangeDetection` with event coalescing
  - `provideRouter` for routing
  - `provideHttpClient` for HTTP requests

### Component Structure
All components are standalone with the following pattern:
```typescript
@Component({
  selector: 'app-component-name',
  templateUrl: './component-name.component.html',
  styleUrls: ['./component-name.component.less'],
  standalone: true,
  imports: [/* required imports */]
})
```

Main layout components (imported in AppComponent):
- `HeroComponent` - Hero section with animated title
- `AboutComponent` - About section
- `ServicesComponent` - Services listing
- `TestimonialsComponent` - Testimonials carousel
- `ContactComponent` - Contact information
- `FooterComponent` - Footer
- `LanguagePickerComponent` - Language switcher
- `SideNavigationComponent` - Side navigation menu

### Translation System
The translation service (`src/app/services/translation.service.ts`) is central to the multi-language functionality:

**Key Features:**
- Loads translations from `src/assets/translations/translations.yml` (YAML format using js-yaml)
- Uses BehaviorSubject (`currentLang$`) for reactive language switching
- Stores language preference in localStorage
- Provides `translate(key: string)` method for dot-notation keys (e.g., `hero.title.en`)
- Special handling for testimonials which are structured differently

**Translation File Structure:**
```yaml
section:
  key:
    en: English text
    de: German text
    el: Greek text
```

**Usage in Components:**
```typescript
constructor(public translate: TranslationService) {}
// In template: {{ translate.translate('hero.title') }}
```

### Styling
- **Primary:** Tailwind CSS (configured in `tailwind.config.js`)
- **Component-level:** LESS files (`*.component.less`)
- **Global:** `src/styles.less`
- Tailwind scans: `src/**/*.{html,ts}`

### PrimeNG Integration
Uses PrimeNG components (v19.1.0):
- `CarouselModule` for testimonials
- `ButtonModule` for buttons
- Note: `NO_ERRORS_SCHEMA` and `CUSTOM_ELEMENTS_SCHEMA` are enabled in AppComponent

## Build Configuration Notes

### Production Build Optimizations (angular.json)
- AOT compilation enabled (always on in Angular 19+)
- CSS minification with critical CSS inlining
- Font optimization
- Output hashing for cache busting
- Budget limits: 500KB warning, 1MB error for initial bundle
- Note: `buildOptimizer` property was removed as it's deprecated in Angular 19 (always enabled with optimization)

### Assets
Key static assets copied during build:
- `src/CNAME` - GitHub Pages custom domain
- `src/sitemap.xml` - SEO sitemap
- `src/robots.txt` - Search engine crawler rules
- `src/assets/**` - All asset files
- `public/**` - Public directory contents

## Translation Updates

When adding new translatable text:
1. Add keys to `src/assets/translations/translations.yml` following the existing structure
2. Provide translations for all three languages: `en`, `de`, `el`
3. Use dot notation for nested keys: `section.subsection.key`
4. For testimonials, follow the special list structure with name/comment objects

## Component Development

When creating new components:
1. Use `ng generate component components/component-name` (auto-generates standalone)
2. Inject `TranslationService` if the component needs translations
3. Use LESS for component-specific styles
4. Import required modules directly in the component's `imports` array
5. Add to AppComponent imports if it's a main layout component

## GitHub Actions

The repository has CI/CD workflows in `.github/workflows/`:
- `claude.yml` - Claude Code integration
- `claude-code-review.yml` - Automated code review
- `deploy.yml` - Deployment pipeline

## Image Assets

Hero image workflow:
1. Place source image at `src/assets/images/hero_image.jpg`
2. Run `npm run optimize-images` to generate responsive variants
3. Update component templates to use optimized images from `src/assets/images/optimized/`
