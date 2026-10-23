import { type SchemaTypeDefinition } from "sanity";
import { product } from "./product";
import { brand } from "./brand";
import { range } from "./range";


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, brand, range],
};