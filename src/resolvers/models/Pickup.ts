import { model, Schema } from 'mongoose';
import * as TYPES from 'types';

import { OrderAddress } from './schemas';

const PickupCollector = new Schema<TYPES.PickupCollector>({
  name: String,
  phoneNumber: String,
});

type TPickup = TYPES.ItemDocument<TYPES.Pickup>;
const PickupSchema = new Schema<TPickup>({
  address: OrderAddress,
  collectors: [PickupCollector],
  type: {
    type: String,
    enum: TYPES.PickupType,
  },
});

const PickupModel = model<TPickup>('Pickup', PickupSchema);

export default PickupModel;
