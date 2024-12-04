import { Categories } from './../categories/categories.interface';
import { Document } from "mongoose";
export interface Subcategories extends Document {
  readonly name: string;
  readonly category: Categories;
    image?: string;
}
