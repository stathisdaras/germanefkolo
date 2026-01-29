# Performance Optimization Guide

## 🚀 Current Performance Issues

### Critical: Hero Image Size
- **Current Size:** 1.9MB (3072x4096px)
- **Impact:** Slow initial page load, poor LCP score
- **Target:** < 200KB for desktop, < 100KB for mobile

---

## ✅ Implemented Optimizations

### 1. Resource Hints
Added to `src/index.html`:
- `preconnect` for Instagram (social links)
- `dns-prefetch` for external domains
- `preload` for critical hero image

### 2. Angular Build Optimizations
Updated `angular.json` production config:
- ✅ Script minification enabled
- ✅ CSS minification with critical CSS inlining
- ✅ Font optimization
- ✅ AOT compilation
- ✅ Build optimizer enabled
- ✅ Source maps disabled in production
- ✅ Named chunks disabled (better caching)

### 3. Hero Image Attributes
Already optimized in `hero.component.html`:
- `loading="eager"` - Load immediately
- `fetchpriority="high"` - Prioritize download
- `width` and `height` attributes - Prevent layout shift

---

## 📋 Next Steps: Image Optimization

### Step 1: Run the Image Optimization Script

We've created an automated script using Sharp to optimize your hero image:

```bash
npm run optimize-images
```

This will create optimized versions in `src/assets/images/optimized/`:
- `hero_image_mobile.jpg` (640px) - ~40KB
- `hero_image_mobile.webp` (640px) - ~30KB
- `hero_image_tablet.jpg` (1024px) - ~80KB
- `hero_image_tablet.webp` (1024px) - ~60KB
- `hero_image_desktop.jpg` (1920px) - ~150KB
- `hero_image_desktop.webp` (1920px) - ~120KB

### Step 2: Update Hero Component

Replace the current `<img>` tag in `src/app/components/hero/hero.component.html` with:

```html
<picture>
  <!-- WebP sources for modern browsers -->
  <source
    media="(max-width: 640px)"
    srcset="assets/images/optimized/hero_image_mobile.webp"
    type="image/webp">
  <source
    media="(max-width: 1024px)"
    srcset="assets/images/optimized/hero_image_tablet.webp"
    type="image/webp">
  <source
    srcset="assets/images/optimized/hero_image_desktop.webp"
    type="image/webp">

  <!-- JPEG fallback sources -->
  <source
    media="(max-width: 640px)"
    srcset="assets/images/optimized/hero_image_mobile.jpg"
    type="image/jpeg">
  <source
    media="(max-width: 1024px)"
    srcset="assets/images/optimized/hero_image_tablet.jpg"
    type="image/jpeg">

  <!-- Default fallback image -->
  <img
    src="assets/images/optimized/hero_image_desktop.jpg"
    alt="German Language Instructor teaching online"
    class="w-full h-full object-cover object-[center_43%] 2xl:object-[center_50%] 3xl:object-[center_60%] 4xl:object-[center_70%]"
    width="1920"
    height="2560"
    loading="eager"
    fetchpriority="high">
</picture>
```

### Step 3: Update Preload in index.html

Update the preload link in `src/index.html`:

```html
<!-- Before -->
<link rel="preload" href="assets/images/hero_image.jpg" as="image" type="image/jpeg" fetchpriority="high">

<!-- After -->
<link rel="preload" href="assets/images/optimized/hero_image_desktop.webp" as="image" type="image/webp" fetchpriority="high" media="(min-width: 1025px)">
<link rel="preload" href="assets/images/optimized/hero_image_tablet.webp" as="image" type="image/webp" fetchpriority="high" media="(min-width: 641px) and (max-width: 1024px)">
<link rel="preload" href="assets/images/optimized/hero_image_mobile.webp" as="image" type="image/webp" fetchpriority="high" media="(max-width: 640px)">
```

---

## 📊 Expected Performance Improvements

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Hero Image Size (Desktop) | 1.9MB | ~120KB (WebP) | **94% smaller** |
| Hero Image Size (Mobile) | 1.9MB | ~30KB (WebP) | **98% smaller** |
| LCP (Largest Contentful Paint) | ~4-6s | ~1-2s | **60-75% faster** |
| FCP (First Contentful Paint) | ~2-3s | ~0.5-1s | **70% faster** |
| Total Page Weight | ~2.5MB | ~500KB | **80% smaller** |

---

## 🎯 Additional Recommendations

### 1. Enable Compression (Server-Side)
Ensure your web server (Nginx/Apache/CDN) has Brotli or Gzip compression enabled:

```nginx
# Nginx example
gzip on;
gzip_types text/css application/javascript image/svg+xml;
brotli on;
brotli_types text/css application/javascript image/svg+xml;
```

### 2. Add Service Worker (PWA)
Consider adding Angular PWA for:
- Asset caching
- Offline support
- Faster repeat visits

```bash
ng add @angular/pwa
```

### 3. Lazy Load Non-Critical Components
Consider lazy loading testimonials/footer components if they're below the fold.

### 4. Font Optimization
If using custom fonts, add to `index.html`:

```html
<link rel="preload" href="/path/to/font.woff2" as="font" type="font/woff2" crossorigin>
```

And use `font-display: swap` in CSS:

```css
@font-face {
  font-family: 'YourFont';
  font-display: swap;
}
```

### 5. CDN for Static Assets
Consider using a CDN (Cloudflare, AWS CloudFront) for:
- Faster global delivery
- Better caching
- DDoS protection

---

## 🔍 Testing Performance

### Online Tools:
1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
2. **GTmetrix**: https://gtmetrix.com/
3. **WebPageTest**: https://www.webpagetest.org/

### Chrome DevTools:
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Run performance audit
4. Check "Performance" and "Network" tabs

### Key Metrics to Monitor:
- **LCP (Largest Contentful Paint)**: < 2.5s (Good)
- **FID (First Input Delay)**: < 100ms (Good)
- **CLS (Cumulative Layout Shift)**: < 0.1 (Good)
- **TTFB (Time to First Byte)**: < 600ms (Good)

---

## 📝 Maintenance

Run the image optimization script whenever you update the hero image:

```bash
npm run optimize-images
```

Regularly check performance scores and iterate on improvements.

---

## 🆘 Troubleshooting

### Images not loading after optimization:
- Check file paths in `hero.component.html`
- Ensure `src/assets/images/optimized/` folder exists
- Verify Angular build includes the optimized folder

### WebP not working in older browsers:
- The `<picture>` element provides JPEG fallback
- IE11 and very old browsers will use the default `<img>` src

### Build errors with optimization:
- Ensure Sharp is installed: `npm install --save-dev sharp`
- Check Node.js version (should be 16+)

---

**Last Updated:** 2026-01-29
