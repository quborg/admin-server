import { model, Schema } from 'mongoose';
import * as TYPES from 'types';

type TColor = TYPES.ItemDocument<TYPES.Color>;

const ColorSchema = new Schema<TColor>({
  name: { type: String, required: true },
  code: String,
});

const ColorModel = model<TColor>('Color', ColorSchema);

export default ColorModel;
