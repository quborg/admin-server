import { Schema } from 'mongoose';
import * as TYPES from 'types';

type TItemShipment = TYPES.ItemDocument<TYPES.ItemShipment>;

const ItemShipmentSchema = new Schema<TItemShipment>({
  productId: String,
  quantity: Number,
});

export default ItemShipmentSchema;
