import { model, Schema } from 'mongoose';
import * as TYPES from 'types';

import { OrderAddress, Shipment, ItemShipment, Price, OrderRefund } from './components';

const OrderDeliveryDetails = new Schema<TYPES.OrderDeliveryDetails>({
  name: String,
  phoneNumber: String,
});
const OrderAnnotation = new Schema<TYPES.OrderAnnotation>({
  key: String,
  value: String,
});

type OrderDocument = TYPES.ItemDocument<TYPES.Order>;
type OrderModel = TYPES.ItemModel<OrderDocument>;

const OrderSchema = new Schema<OrderDocument, OrderModel>(
  {
    userId: String,
    items: [ItemShipment],
    status: { type: String, enum: TYPES.OrderStatus },
    paymentStatus: { type: String, enum: TYPES.PaymentStatus },
    acknowledged: Boolean,
    customerInvoiceEmail: String,
    billingAddress: OrderAddress,
    deliveryDetails: OrderDeliveryDetails,
    shipments: [Shipment],
    shippingCost: Price,
    shippingCostTax: Price,
    promotions: [{ type: Schema.Types.ObjectId, ref: 'Promotion' }],
    refund: OrderRefund,
    netPriceAmount: Price,
    netTaxAmount: Price,
    pickup: { type: Schema.Types.ObjectId, ref: 'Pickup' },
    annotations: [OrderAnnotation],
  },
  {
    timestamps: true,
  }
);

const OrderModel = model<OrderDocument, OrderModel>('Order', OrderSchema);

export default OrderModel;
