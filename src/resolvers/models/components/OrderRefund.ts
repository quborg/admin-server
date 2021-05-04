import { Schema } from 'mongoose';
import * as TYPES from 'types';

import Price from './Price';

type TOrderRefund = TYPES.ItemDocument<TYPES.OrderRefund>;

const OrderRefundSchema = new Schema<TOrderRefund>({
  amount: Price,
  reason: { type: String, enum: TYPES.RefundReason },
  reasonText: String,
  createdAt: String,
  updatedAt: String,
});

export default OrderRefundSchema;
