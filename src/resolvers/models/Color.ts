import { model, Schema } from 'mongoose';

import * as TYPES from 'types';

type ColorDocument = TYPES.ItemDocument<TYPES.Color>;
type ColorModel = TYPES.ItemModel<ColorDocument>;

const ColorSchema = new Schema<ColorDocument, ColorModel>({
  name: { type: String, required: true },
  code: String,
});

const ColorModel = model<ColorDocument, ColorModel>('Color', ColorSchema);

export default ColorModel;
