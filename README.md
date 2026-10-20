# d0dge website

The website for **d0dge: glyph survival**, a minimalist monochrome survival arcade game. Built with Next.js and Tailwind CSS on the Tailwind Plus *Pocket* template, exported as a static site for GitHub Pages.

## Develop

```sh
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # static site in out/
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.

The site is served from `/d0dge-website/` as a project page. The workflow reads the base path from GitHub Pages, so a custom domain needs no code change.

## Look

The site follows the game's visual rules (GDD §10 in the game repository): four colour roles (`--void`, `--phosphor`, `--grid`, `--signal`, in `src/styles/tailwind.css`), thin outlines, square corners, no glow, and the Doto dot-matrix face with round dots. The palettes match `D0dge.Core/Presentation/Palettes.cs`; the shop section lets visitors try them on the page.

The phone demos (`src/components/GridDemo.tsx`) are a small canvas imitation of a run, not the game's simulation. They pause off screen and hold a still frame with reduced motion.

## Licences

- Template: Tailwind Plus licence (`LICENSE.md` in the template download), used here for this site only.
- Doto: SIL Open Font License 1.1, `src/fonts/Doto-OFL.txt`.
