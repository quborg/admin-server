import { gql } from 'apollo-server';

const EntitiesTypeDefs = gql`
  type User {
    _id: ID!
    name: String!
    username: String!
    email: String!
    password: String
    token: String
    avatar: Image
    role: Role
    public: Boolean
    active: Boolean
    verified: Boolean
  }
  type Product {
    _id: ID!
    SKU: String
    title: String!
    description: String
    images: [Image]
    price: Float
    salePrice: Float
    unitPricing: String
    published: Boolean
    availability: ProductAvailability
    availabilityDate: String
    category: Category
    tags: [Tag]
    colors: [Color]
    createdAt: String
    updatedAt: String
  }
  type Category {
    _id: ID!
    name: String!
    type: CategoryType
  }
  type Tag {
    _id: ID!
    name: String!
  }
  type Color {
    _id: ID!
    name: String!
    code: String
  }
  type Order {
    _id: ID!
    usedId: String
    items: [ItemShipment]
    status: OrderStatus
    paymentStatus: PaymentStatus
    acknowledged: Boolean
    customerInvoiceEmail: String
    billingAddress: OrderAddress
    deliveryDetails: OrderDeliveryDetails
    shipments: [Shipment]
    shippingCost: Price
    shippingCostTax: Price
    promotions: [Promotion]
    refund: OrderRefund
    netPriceAmount: Price
    netTaxAmount: Price
    pickup: Pickup
    annotations: [OrderAnnotation]
    createdAt: String
    updatedAt: String
  }
  type Price {
    value: String
    currency: CurrencyType
  }
  type OrderDeliveryDetails {
    address: OrderAddress
    phoneNumber: String
  }
  type OrderAddress {
    recipientName: String
    streetAddress: [String]
    locality: String
    region: String
    country: String
    postalCode: String
    isPostOfficeBox: Boolean
    fullAddress: [String]
  }
  type OrderRefund {
    amount: Price
    reason: RefundReason
    reasonText: String
    createdAt: String
    updatedAt: String
  }
  type Shipment {
    carrier: Carrier
    deliveryDate: String
    items: [ItemShipment]
    trackingId: String
    shipmentGroupId: String
    status: ShipmentStatus
    deliveryDetails: ShipmentDeliveryDetails
  }
  type ItemShipment {
    productId: String
    quantity: Int
  }
  type ShipmentDeliveryDetails {
    ScheduledDate: String
    CarrierPhoneNumber: String
  }
  type Promotion {
    _id: String
    type: PromotionType
    subtype: PromotionSubType
    title: String
    shortTitle: String
    priceValue: Price
    applicableItems: [PromotionApplicableItems]
    appliedItems: [Product]
    startTime: String
    endTime: String
  }
  type OrderAnnotation {
    key: String
    value: String
  }
  type Pickup {
    _id: String
    address: OrderAddress
    collectors: [PickupCollector]
    type: PickupType
  }
  type PickupCollector {
    name: String
    phoneNumber: String
  }
`;

export default EntitiesTypeDefs;
