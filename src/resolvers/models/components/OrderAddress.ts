import { Schema } from 'mongoose';
import * as TYPES from 'types';

type TOrderAddress = TYPES.ItemDocument<TYPES.OrderAddress>;

const OrderAddressSchema = new Schema<TOrderAddress>({
  recipientName: String,
  streetAddress: [String],
  locality: String,
  region: String,
  country: String,
  postalCode: String,
  isPostOfficeBox: Boolean,
  fullAddress: [String],
});

export default OrderAddressSchema;
