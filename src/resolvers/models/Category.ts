import { model, Schema } from 'mongoose';

import * as TYPES from 'types';

type CategoryDocument = TYPES.ItemDocument<TYPES.Category>;
type CategoryModel = TYPES.ItemModel<CategoryDocument>;

const CategorySchema = new Schema<CategoryDocument, CategoryModel>({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: Object.values(TYPES.CategoryType),
  },
});

const CategoryModel = model<CategoryDocument, CategoryModel>('Category', CategorySchema);

export default CategoryModel;
