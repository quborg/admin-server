import { model, Schema } from 'mongoose';

import * as TYPES from 'types';

import { OrderAddress } from './components';

const PickupCollector = new Schema<TYPES.PickupCollector>({
  name: String,
  phoneNumber: String,
});

type PickupDocument = TYPES.ItemDocument<TYPES.Pickup>;
type PickupModel = TYPES.ItemModel<PickupDocument>;

const PickupSchema = new Schema<PickupDocument, PickupModel>({
  address: OrderAddress,
  collectors: [PickupCollector],
  type: {
    type: String,
    enum: TYPES.PickupType,
  },
});

const PickupModel = model<PickupDocument, PickupModel>('Pickup', PickupSchema);

export default PickupModel;
