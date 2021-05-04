import { model, Schema } from 'mongoose';
import * as TYPES from 'types';

import { Price } from './components';

type TPromotion = TYPES.ItemDocument<TYPES.Promotion>;

const PromotionSchema = new Schema<TPromotion>({
  type: {
    type: String,
    enum: Object.values(TYPES.PromotionType),
  },
  subtype: {
    type: String,
    enum: Object.values(TYPES.PromotionSubType),
  },
  title: String,
  shortTitle: String,
  priceValue: Price,
  applicableItems: [
    {
      type: String,
      enum: Object.values(TYPES.PromotionApplicableItems),
    },
  ],
  appliedItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  startTime: String,
  endTime: String,
});

const PromotionModel = model<TPromotion>('Promotion', PromotionSchema);

export default PromotionModel;
