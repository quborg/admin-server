import { model, Schema } from 'mongoose';
import * as TYPES from 'types';

import Pickup from './Pickup';
import Promotion from './Promotion';
import { OrderAddress, Shipment, ItemShipment, Price, OrderRefund } from './components';

const OrderDeliveryDetails = new Schema<TYPES.OrderDeliveryDetails>({
  name: String,
  phoneNumber: String,
});
const OrderAnnotation = new Schema<TYPES.OrderAnnotation>({
  key: String,
  value: String,
});

type TOrder = TYPES.ItemDocument<TYPES.Order>;
const OrderSchema = new Schema<TOrder>(
  {
    usedId: String,
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
    promotions: [Promotion],
    refund: OrderRefund,
    netPriceAmount: Price,
    netTaxAmount: Price,
    pickup: Pickup,
    annotations: [OrderAnnotation],
  },
  {
    timestamps: true,
  }
);

const OrderModel = model<TOrder>('Order', OrderSchema);

export default OrderModel;
