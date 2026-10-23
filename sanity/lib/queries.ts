import { defineQuery } from "next-sanity";

export const productsQuery = defineQuery(`
  *[_type == "product"
    && (!defined($type) || type == $type)
    && (!defined($brand) || brand->slug.current == $brand)
  ] | order(name asc) {
    _id, name, type, color,
    "brand": brand->name,
    "range": range->name,
    "slug": slug.current,
    "image": images[0]
  }
`);

export const featuredQuery = defineQuery(`
  *[_type == "product" && featured == true][0...8] {
    _id, name, type,
    "slug": slug.current,
    "image": images[0]
  }
`);

export const productQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    ..., "brand": brand->name, "range": range->name, "slug": slug.current
  }
`);

export const brandsQuery = defineQuery(`
  *[_type == "brand"] | order(name asc) { _id, name, "slug": slug.current, logo }
`);


export const rangesQuery = defineQuery(`
  *[_type == "range"] | order(name asc) {
    _id, name, "slug": slug.current, "brand": brand->name, image
  }
`);

export const brandPageQuery = defineQuery(`
  *[_type == "brand" && slug.current == $brand][0] {
    _id, name, description, logo,
    "ranges": *[_type == "range" && brand._ref == ^._id] | order(name asc) {
      _id, name, "slug": slug.current, image
    },
    "products": *[_type == "product" && brand._ref == ^._id] | order(name asc) {
      _id, name, type, "slug": slug.current, "image": images[0]
    }
  }
`);

export const rangePageQuery = defineQuery(`
  *[_type == "range" && slug.current == $range && brand->slug.current == $brand][0] {
    _id, name, description, image,
    "brand": brand->{ name, "slug": slug.current },
    "products": *[_type == "product" && range._ref == ^._id] | order(name asc) {
      _id, name, type, "slug": slug.current, "image": images[0]
    }
  }
`);