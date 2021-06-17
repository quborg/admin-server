import {
  Image,
  Role,
  ProductAvailability,
  CategoryType,
  Price,
  OrderStatus,
  PaymentStatus,
  RefundReason,
  Carrier,
  ShipmentStatus,
  PromotionType,
  PromotionSubType,
  PromotionApplicableItems,
  PickupType,
} from './common';

export type User = UserInputs & {
  __typename?: 'User';
  token?: string;
};
export type UserInputs = {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  avatar: Image;
  role: Role;
  public: boolean;
  active: boolean;
  verified: boolean;
};

export type EmailVerification = EmailVerificationInputs & {
  __typename?: 'EmailVerification';
  _id: string;
};
export type EmailVerificationInputs = {
  userId: string;
  hash: string;
};

export type Product = ProductInputs & {
  __typename?: 'Product';
  createdAt: string;
  updatedAt: string;
};
export type ProductInputs = {
  _id: string;
  title: string;
  SKU: string;
  description: string;
  images: [Image];
  price: number;
  salePrice: number;
  unitPricing: string;
  published: boolean;
  availability: ProductAvailability;
  availabilityDate: string;
  category: Category;
  tags: [Tag];
  colors: [Color];
};

export type Category = CategoryInputs & {
  __typename?: 'Category';
};
export type CategoryInputs = {
  _id: string;
  name: string;
  type: CategoryType;
};

export type Tag = TagInputs & {
  __typename?: 'Tag';
};
export type TagInputs = {
  _id: string;
  name: string;
  type: CategoryType;
};

export type Color = ColorInputs & {
  __typename?: 'Color';
};
export type ColorInputs = {
  _id: string;
  name: string;
  code: string;
};

export type Order = OrderInputs & {
  __typename?: 'Order';
  createdAt: string;
  updatedAt: string;
};
export type OrderInputs = {
  _id: string;
  userId: string;
  items: [ItemShipment];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  acknowledged: boolean;
  customerInvoiceEmail: string;
  billingAddress: OrderAddress;
  deliveryDetails: OrderDeliveryDetails;
  shipments: [Shipment];
  shippingCost: Price;
  shippingCostTax: Price;
  promotions: [Promotion];
  refund: OrderRefund;
  netPriceAmount: Price;
  netTaxAmount: Price;
  pickup: Pickup;
  annotations: [OrderAnnotation];
};
export type OrderAddress = {
  recipientName: string;
  streetAddress: [string];
  locality: string;
  region: string;
  country: string;
  postalCode: string;
  isPostOfficeBox: boolean;
  fullAddress: [string];
};
export type OrderDeliveryDetails = {
  address: OrderAddress;
  phoneNumber: string;
};
export type OrderRefund = {
  amount: Price;
  reason: RefundReason;
  reasonText: string;
  createdAt: string;
  updatedAt: string;
};
export type Shipment = {
  carrier: Carrier;
  deliveryDate: string;
  items: [ItemShipment];
  trackingId: string;
  shipmentGroupId: string;
  status: ShipmentStatus;
  deliveryDetails: ShipmentDeliveryDetails;
};
export type ItemShipment = {
  productId: string;
  quantity: number;
};
export type ShipmentDeliveryDetails = {
  ScheduledDate: string;
  CarrierPhoneNumber: string;
};
export type Promotion = PromotionInputs & {
  __typename?: 'Promotion';
};
export type PromotionInputs = {
  _id: string;
  type: PromotionType;
  subtype: PromotionSubType;
  title: string;
  shortTitle: string;
  priceValue: Price;
  applicableItems: [PromotionApplicableItems];
  appliedItems: [Product];
  startTime: string;
  endTime: string;
};

export type OrderAnnotation = {
  key: string;
  value: string;
};

export type Pickup = PickupInputs & {
  __typename?: 'Pickup';
};
export type PickupInputs = {
  _id: string;
  address: OrderAddress;
  collectors: [PickupCollector];
  type: PickupType;
};
export type PickupCollector = {
  name: string;
  phoneNumber: string;
};

export type OneOfItems =
  | User
  | Product
  | Tag
  | Color
  | Order
  | Promotion
  | Pickup
  | EmailVerification;
