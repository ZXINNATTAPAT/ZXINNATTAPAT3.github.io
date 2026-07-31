# AGENTS.md

## Cursor Cloud specific instructions

This repository is a **static portfolio website + Markdown-driven blog** for Nattapat
Phungphugdee, deployed to GitHub Pages (`nattazxin.com`). There is **no backend, no
database, and no test/lint suite**. The only build tool is Node.js via `build.js`
(dependencies: `marked`, `front-matter`, `sharp`).

### Services / how to run

There is exactly one product with two parts: a **Node build step** and a **static file
server** (the server is not defined in `package.json`; pick any).

- Build (one-shot): `npm run build` — compiles `templates/` + `components/` into the
  locale pages (`index.html`, `th.html`, `ja.html`, `zh.html`, `ko.html`), renders
  `articles/*.md` and `projects/*.md` to HTML, regenerates `blog.html`, and updates
  `sitemap.xml`. See other scripts in `package.json` (`build:index`, `watch`, `dev`,
  `optimize-images`, `build:all`).
- Dev watch: `npm run dev` (alias of `npm run watch`). Note: this is a **file watcher /
  rebuilder only — it does NOT start a web server**.
- Preview: serve the repo root with any static server, e.g.
  `npx http-server . -p 8000 -c-1` or `python3 -m http.server 8000`, then open
  `http://localhost:8000/index.html`.

### Non-obvious gotchas

- **Built HTML is committed to the repo** (it is the GitHub Pages deploy artifact and is
  NOT gitignored). Running `npm run build` regenerates these files and can produce
  date-based diffs even with no content change (e.g. `<lastmod>` in `sitemap.xml` and the
  human-readable dates in article pages come from the current date). Review/`git checkout`
  such incidental diffs before committing so you only commit intended content changes.
- **Article/project URLs use the front-matter `slug`, not the `.md` filename.** For
  example `articles/example-1.md` builds to whatever `slug:` it declares (e.g.
  `articles/nextjs-beginner-guide.html`), so the source filename may not match the output.
- There are no automated tests or linters configured; verification is manual (build + open
  pages in a browser).
- `package-lock.json` is gitignored, so installs resolve against the `^` ranges in
  `package.json`.
