import { createCn } from "cn/config"

// Fulldev UI re-exports `cn` from shadcn's `cn` package. This one also knows
// the site tokens from src/styles/global.css, so `text-ui` replaces a font size
// instead of a text colour.
export const cn = createCn({
  extend: {
    theme: {
      text: ["label", "ui", "copy", "stat", "title", "closing"],
      shadow: ["sheet", "desk"],
      ease: ["settle"],
    },
  },
})
