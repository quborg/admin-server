import { model, Schema } from 'mongoose';
import * as TYPES from 'types';

type TCategory = TYPES.ItemDocument<TYPES.Category>;

const CategorySchema = new Schema<TCategory>({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: Object.values(TYPES.CategoryType),
  },
});

const CategoryModel = model<TCategory>('Category', CategorySchema);

export default CategoryModel;
