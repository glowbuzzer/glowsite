# www.glowbuzzer.com

This repository contains the source for the glowbuzzer public website.

The site is a React application built with [Vite](https://vitejs.dev).

Much of the site is automatically generated from GBC and GBR source code using a
variety of Vite plugins we have developed or adapters from elsewhere.

To run locally, we recommend you use PNPM as package manager:

```
git clone https://github.com/glowbuzzer/glowsite.git
cd glowsite
pnpm i
vite root/www
```

## Vite plugins used

### [vite-imagetools](https://github.com/JonasKruckenberg/imagetools)

Flexible raster image resizing

### [vite-plugin-radar](https://github.com/stafyniaksacha/vite-plugin-radar)

Google Analytics tracking

### [remark-deflist](https://github.com/Symbitic/remark-plugins/tree/master/packages/remark-deflist)

Definition list support

### [remark-prism](https://github.com/sergioramos/remark-prism)

Syntax highlighting in code blocks

### [remark-gfm](https://github.com/remarkjs/remark-gfm)

Github flavoured markdown support

### [./plugins/remark-mermaid.mjs](./plugins/remark-mermaid.mjs)

Mermaid in markdown support

### [./plugins/remark-codeblock.mjs](./plugins/remark-codeblock.mjs)

Codeblocks with dynamic demo support

### [./plugins/svgr-plugin-wrapper.mjs](./plugins/svgr-plugin-wrapper.mjs)

Simple wrapper around [@svgr/rollup](https://react-svgr.com/docs/rollup) to control when SVGs are inlined

### [./plugins/mdx-plugin-wrapper.mjs](./plugins/mdx-plugin-wrapper.mjs)

Simple wrapper around [@mdx-js/rollup](https://github.com/mdx-js/mdx/tree/main/packages/rollup)
to provide reporting of transform errors

### [./plugins/remark-entities.mjs](./plugins/remark-entities.mjs)

Provides support for custom entities, such as `&gb;` in markdown

### [./plugins/remark-links.mjs](./plugins/remark-links.mjs)

Ensures links internal to the site use the react-router `Link` component

### [./plugins/vite-plugin-typedoc.mjs](./plugins/vite-plugin-typedoc.mjs)

Dynamic documentation from Typescript source using [TypeDoc](https://typedoc.org)

### [./plugins/vite-plugin-react-docgen.mjs](./plugins/vite-plugin-react-docgen.mjs)

Dynamic documentation from React component source using [react-docgen](https://github.com/reactjs/react-docgen)

