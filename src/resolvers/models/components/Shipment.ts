import { Schema } from 'mongoose';
import * as TYPES from 'types';

import ItemShipment from './ItemShipment';

const ShipmentDeliveryDetails = new Schema<TYPES.ShipmentDeliveryDetails>({
  ScheduledDate: String,
  CarrierPhoneNumber: String,
});

type OrderRefundDocument = TYPES.ItemDocument<TYPES.OrderRefund>;

const OrderRefundSchema = new Schema<OrderRefundDocument>({
  carrier: { type: String, enum: TYPES.Carrier },
  deliveryDate: String,
  items: [ItemShipment],
  trackingId: String,
  shipmentGroupId: String,
  status: { type: String, enum: TYPES.ShipmentStatus },
  deliveryDetails: ShipmentDeliveryDetails,
});

export default OrderRefundSchema;
