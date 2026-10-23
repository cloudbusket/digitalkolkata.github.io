# Digital Kolkata website (static, GitHub Pages ready)

A plain HTML / CSS / JavaScript copy of the Digital Kolkata site that was built on GoDaddy Airo.
No build step, no frameworks, no server. Open `index.html` in a browser to preview it.

## What came from where
- **index.html** is a faithful copy of the page you saved: same layout, colours, fonts (Bebas Neue + Inter), text, logo and hero image. The original stylesheet is in `assets/css/styles.css`.
- **services.html** and **contact.html** are **new**. The saved file only contained the home page, so I built these two in the same design using your text and contact details. Edit the wording freely. If you send me the original pages I can match them exactly.
- `assets/css/extra.css` and `assets/js/main.js` replace the animations, mobile menu, share buttons and form that the Airo (React) version did with JavaScript.

## Files
    index.html  services.html  contact.html  404.html
    assets/css/styles.css      original compiled styles (colours are the variables at the top of :root)
    assets/css/extra.css       animations, mobile menu, forms
    assets/js/main.js          menu, scroll reveal, share/copy link, contact form
    assets/img/                logo.png, hero.webp, favicon.svg
    robots.txt  .nojekyll

## Publish free on GitHub Pages
1. Create a GitHub account and a **new public repository**. For a site at `https://USERNAME.github.io/` name it exactly `USERNAME.github.io`. Any other name gives `https://USERNAME.github.io/REPO/`.
2. Upload **all files in this folder** (not the folder itself) to the repository root: GitHub, Add file > Upload files, drag everything in, Commit.
3. Open Settings > Pages. Under "Build and deployment" choose Source: **Deploy from a branch**, Branch: **main**, folder **/ (root)**, Save.
4. After a minute your site is live at the address shown on that page.

All links are relative, so the site also works at `USERNAME.github.io/REPO/`. Only `404.html` assumes the site is at the root of a domain, which is true for a user site or a custom domain.

## Use your own domain (e.g. digitalkolkata.com or digitalkolkata.in)
1. In the repository create a file named `CNAME` containing just your domain, for example `www.digitalkolkata.com` (or set it in Settings > Pages > Custom domain).
2. At your domain registrar (GoDaddy DNS) add: `CNAME` record `www` pointing to `USERNAME.github.io`. For the bare domain add four `A` records for `@` with GitHub Pages' IP addresses (listed in GitHub's "Managing a custom domain" help page).
3. Back in Settings > Pages tick **Enforce HTTPS** once the certificate is ready.

## Contact form (needs one setup step)
GitHub Pages cannot run server code, so the form uses the free service Formspree.
1. Sign up at formspree.io, create a form, and copy its id (looks like `xyzabcde`).
2. In `contact.html` replace `YOUR_FORM_ID` in `action="https://formspree.io/f/YOUR_FORM_ID"` with your id.
Until you do that, the form opens the visitor's email app with the message pre-filled, so nothing is lost.

## Things to review before you go public
- **Social links** in the footer point to `#` (as in the saved page). Put your real Instagram, LinkedIn, X and Facebook URLs in each page's footer.
- **Contact details** (email `support@digitalkolkata.in`, phone, city) were copied from the saved page. Change them in the footer and `contact.html` if they differ.
- The original had `noindex` (hidden from Google) because it was a preview. This copy has **no** noindex, so search engines can list it.
- No social-share preview image: add `<meta property="og:image" content="https://YOUR-DOMAIN/assets/img/og.jpg">` (1200x630) to each page.
- `favicon.svg` is a simple placeholder "DK" icon. Replace it with your own.
- Stats on the home page (50+ clients, 3x ROI, 5 years, 98% retention) and the bullet lists on the Services page are placeholder-style claims. Make sure they are accurate for your business.
- Fonts load from Google Fonts. If you need the site to work with no third-party requests, download the fonts and host them in `assets/`.

## Editing
Change text directly in the HTML files. Colours and spacing live in the `:root` variables at the top of `assets/css/styles.css` (primary blue, accent orange, dark navy background).
