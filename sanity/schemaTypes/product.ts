import { defineArrayMember, defineField, defineType } from "sanity";

const getType = (doc: unknown) => (doc as { type?: string } | undefined)?.type;

const isCarpet = (doc: unknown) => getType(doc) === "carpet";

const WEAR_LAYER_TYPES = ["vinyl", "lvt", "engineered-wood"];
const hasWearLayer = (doc: unknown) =>
  WEAR_LAYER_TYPES.includes(getType(doc) ?? "");

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Product type",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Carpet", value: "carpet" },
          { title: "Vinyl", value: "vinyl" },
          { title: "LVT", value: "lvt" },
          { title: "Laminate", value: "laminate" },
          { title: "Engineered wood", value: "engineered-wood" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text" }),
          ],
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "brand",
      type: "reference",
      to: [{ type: "brand" }],
    }),
    defineField({
      name: "range",
      type: "reference",
      to: [{ type: "range" }],
    }),
    defineField({
      name: "color",
      type: "string",
      options: {
        list: [
          "Beige",
          "Grey",
          "Brown",
          "Black",
          "White",
          "Natural oak",
          "Dark oak",
          "Red",
          "Blue",
          "Green",
          "Multicolor",
        ],
      },
    }),
    defineField({ name: "description", type: "text", rows: 5 }),

    // Price
    defineField({
      name: "price",
      title: "Price (£)",
      type: "number",
      description: "Leave empty to show no price",
      validation: (r) => r.min(0),
    }),
    defineField({
      name: "priceUnit",
      title: "Price unit",
      type: "string",
      options: {
        list: ["per m²", "per pack", "per linear metre", "each"],
      },
      initialValue: "per m²",
    }),

    // Carpet only
    defineField({
      name: "material",
      type: "string",
      options: {
        list: ["Wool", "Wool blend", "Nylon", "Polyester", "Polypropylene"],
      },
      hidden: ({ document }) => !isCarpet(document),
    }),
    defineField({
      name: "rollWidths",
      type: "array",
      of: [{ type: "string" }],
      description: 'e.g. "4m", "5m"',
      hidden: ({ document }) => !isCarpet(document),
    }),

    // Hard flooring only (everything except carpet)
    defineField({
      name: "thickness",
      type: "string",
      description: 'e.g. "8mm"',
      hidden: ({ document }) => isCarpet(document),
    }),
    defineField({
      name: "packCoverage",
      title: "Pack coverage (m²)",
      type: "number",
      hidden: ({ document }) => isCarpet(document),
    }),
    defineField({
      name: "installation",
      type: "string",
      options: {
        list: ["Click", "Glue down", "Loose lay", "Tongue and groove"],
      },
      hidden: ({ document }) => isCarpet(document),
    }),
    defineField({
      name: "waterproof",
      type: "boolean",
      initialValue: false,
      hidden: ({ document }) => isCarpet(document),
    }),

    // Type-specific
    defineField({
      name: "wearLayer",
      type: "string",
      description: 'e.g. "0.55mm" or "3mm"',
      hidden: ({ document }) => !hasWearLayer(document),
    }),
    defineField({
      name: "acRating",
      title: "AC rating",
      type: "string",
      options: { list: ["AC3", "AC4", "AC5"] },
      hidden: ({ document }) => getType(document) !== "laminate",
    }),
    defineField({
      name: "woodSpecies",
      type: "string",
      description: "e.g. Oak, Walnut",
      hidden: ({ document }) => getType(document) !== "engineered-wood",
    }),
    defineField({
      name: "finish",
      type: "string",
      options: { list: ["Oiled", "Lacquered", "Brushed", "Matt"] },
      hidden: ({ document }) => getType(document) !== "engineered-wood",
    }),

    defineField({
      name: "featured",
      type: "boolean",
      description: "Show on the home page",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "type", media: "images.0" },
  },
});