## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── public resources
├── src/
│   ├── assets/
│   │   └── .ts files
│   ├── layouts/          [defines layout - header, menu, and footer for website]
│   │   └── Layout.astro
│   ├── components/       [reusable components and partial pages]
│   │   └── home-page-sections  [sections to the home page]
│   │   └── meta-data-helpers   [SEO meta data helper]
│   │   └── script-components   [javascript for layout management]
│   │   └── .astro files        [astro components]
│   │   └── .tsx files          [react js islands]
│   └── content/           [markdown content]
│   │   └── blog
│   │   └── events
│   │   └── jobs
│   │   └── news
│   │   └── press
│   │   └── scientific_papers
│   │   └── white_papers
│   │   └── config.ts           [markdown content configuration file]
│   └── pages/
│       └── index.astro     [home page]
│       └── 404.astro
│       └── website urls
│   └── styles/
│       └── global.css        [global styles]
└── astro.config.msj        [astro configuration]
└── package.json            
└── tailwind.config.js      [astro configuration]
└── tsconfig.json           [typescript configuration]
└── vercel.json             [vercel configuration]
```

## Anatomy of an astro webpage
```
---
// This is for front matter. For example, importing components
import TopPageBanner1 from "@/components/TopPageBanner-3.astro";
import Layout from "@/layouts/Layout.astro";
import SEOMeta from '@/components/meta-data-helpers/SEOMeta.astro';  
---
<Layout>
  <SEOMeta 
    slot="head"
    title="Stalled genomic revolution | Phaeno"
    description="Find our more about the shortcomings of the genomic revolution."
  />    
  <main>
    <TopPageBanner1 title="Stalled genomic revolution" />
    <section>
      Page content here. A page may have multiple sections
    </section>  
  </main>
</Layout>
```
Every page must follow this basic pattern, in this specific order:
- Layout
  - SEOMeta
  - main
    - TopPageBanner
    - section(s)


## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

