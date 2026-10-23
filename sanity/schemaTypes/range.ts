import { defineField, defineType } from "sanity";

export const range = defineType({
  name: "range",
  title: "Range",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "brand",
      type: "reference",
      to: [{ type: "brand" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", type: "text", rows: 3 }),
  ],
});