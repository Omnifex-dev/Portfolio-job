# Portfolio

Next.js 16 portfolio with an animated underwater background.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Requires Node.js 20.9 or newer.

## Edit content

| What                        | Where                     |
| --------------------------- | ------------------------- |
| Name, role, bio, skills     | `lib/site.ts`             |
| Contact links               | `lib/site.ts` (`contacts`) |
| Projects                    | `data/projects.ts`        |
| Certificates                | `data/certifications.ts`  |
| Background scene            | `components/ocean/`       |

### Project screenshots

Each project card shows a screenshot of the site's homepage, fetched from
thum.io at runtime. Before deploying, save them locally so the site doesn't
depend on that service:

```bash
npm run screenshots           # new projects only
npm run screenshots -- --force  # refresh all
```

To use your own image instead, put it in `public/projects/` and set
`image: "/projects/<file>"` on the project.
