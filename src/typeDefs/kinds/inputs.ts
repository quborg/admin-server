import { gql } from 'apollo-server';

const InputsTypeDefs = gql`
  input SignUpInputs {
    name: String!
    username: String!
    email: String!
    password: String!
  }
  input UserInputs {
    _id: ID!
    name: String
    username: String
    email: String
    password: String
    role: Role
    avatar: ImageInput
    public: Boolean
    active: Boolean
    verified: Boolean
  }
  input ProductInputs {
    _id: ID!
    SKU: String
    title: String
    description: String
    images: [ImageInput]
    price: Float
    published: Boolean
    availability: ProductAvailability
    availabilityDate: String
    category: CategoryInputs
    tags: [TagInputs]
    colors: [ColorInputs]
  }
  input CategoryInputs {
    _id: ID!
    name: String
    type: CategoryType
  }
  input TagInputs {
    _id: ID!
    name: String!
  }
  input ColorInputs {
    _id: ID!
    name: String
    code: String
  }

  input OrderInputs {
    _id: ID!
    items: [ItemShipmentInputs]
    status: OrderStatus
    paymentStatus: PaymentStatus
    acknowledged: Boolean
    customerInvoiceEmail: String
    billingAddress: OrderAddressInputs
    deliveryDetails: OrderDeliveryDetailsInputs
    shipments: [ShipmentInputs]
    shippingCost: PriceInputs
    shippingCostTax: PriceInputs
    promotions: [PromotionInputs]
    refund: OrderRefundInputs
    netPriceAmount: PriceInputs
    netTaxAmount: PriceInputs
    pickup: PickupInputs
    annotations: [OrderAnnotationInputs]
  }
  input PriceInputs {
    value: String
    currency: CurrencyType
  }
  input OrderDeliveryDetailsInputs {
    address: OrderAddressInputs
    phoneNumber: String
  }
  input OrderAddressInputs {
    recipientName: String
    streetAddress: [String]
    locality: String
    region: String
    country: String
    postalCode: String
    isPostOfficeBox: Boolean
    fullAddress: [String]
  }
  input OrderRefundInputs {
    amount: PriceInputs
    reason: RefundReason
    reasonText: String
  }
  input ShipmentInputs {
    carrier: Carrier
    deliveryDate: String
    items: [ItemShipmentInputs]
    trackingId: String
    shipmentGroupId: String
    status: ShipmentStatus
    deliveryDetails: ShipmentDeliveryDetailsInputs
  }
  input ItemShipmentInputs {
    productId: String
    quantity: Int
  }
  input ShipmentDeliveryDetailsInputs {
    ScheduledDate: String
    CarrierPhoneNumber: String
  }
  input PromotionInputs {
    _id: String!
    type: PromotionType
    subtype: PromotionSubType
    title: String
    shortTitle: String
    priceValue: PriceInputs
    applicableItems: [PromotionApplicableItems]
    appliedItems: [ProductInputs]
    startTime: String
    endTime: String
  }
  input OrderAnnotationInputs {
    key: String
    value: String
  }
  input PickupInputs {
    _id: String
    address: OrderAddressInputs
    collectors: [PickupCollectorInputs]
    type: PickupType
  }
  input PickupCollectorInputs {
    name: String
    phoneNumber: String
  }
`;

export default InputsTypeDefs;
