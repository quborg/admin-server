import { Schema } from 'mongoose';

import * as TYPES from 'types';
import { Regex } from 'src/helpers/const';

type TPrice = TYPES.ItemDocument<TYPES.Price>;

const PriceSchema = new Schema<TPrice>({
  value: { type: String, match: Regex.price },
  currency: {
    type: String,
    enum: Object.values(TYPES.CurrencyType),
  },
});
PriceSchema.path('value').get((num: number): string => (num / 100).toFixed(2));
PriceSchema.path('value').set((num: number): number => num * 100);

export default PriceSchema;
