/**
 * Uses the virtual-typedoc vite plugin to get a list of types and augments with slug properties as required by pre-render script
 */

import loadTypedoc from "../virtual/virtual-typedoc.mjs";

const pages = loadTypedoc("./src/gbc.ts").children
    .map(entry => ({...entry, slug: `/docs/gbc/schema/${entry.slug}`}));

export default {
    pages
}
