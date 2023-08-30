export interface Invoices {
  paymentLink:       string;
  shippingMethod:    ShippingMethod;
  vat:               number;
  totalPrice:        number;
  products:          ProductElement[];
  paymentLogId:      string;
  webhookId:         string;
  shippingDetails:   ShippingDetails;
  userId:            string;
  paymentExpiredAt:  Date;
  shippingOrderData: ShippingOrderData;
  paidAt:            Date;
  processedAt:            Date;
  shippedAt:            Date;
  createdAt:         Date;
  paymentId:         string;
  status:            string;
  subTotalPrice:     number;
  paymentStatus:     string;
  invoiceNumber:     string;
  id:                string;
}

export interface At {
  seconds:     number;
  nanoseconds: number;
}

export interface ProductElement {
  userId:            string;
  contactName?:      string;
  phoneNumber?:      string;
  productId:         string;
  qty:               number | string;
  email?:            string;
  updatedAt:         null;
  channel:           string;
  quantity?:         string;
  unitPrice:         number;
  totalPrice:       number;
  createAt:          Date;
  delete:            boolean;
  product:           ProductProduct;
  status:            string;
  id:                string;
  productCategoryId: string;
  orderDescription?: string;
}

export interface ProductProduct {
  description: string;
  productName: string;
  createdAt:   Date;
  updatedAt:   null;
  category:    string;
  slug:        string;
  dummy:       boolean;
  sku:         string;
  active:      boolean;
  id:          string;
  moq:         number;
  leadTime:    number;
  deleted:     boolean;
  random:      { [key: string]: number };
  img:         string[];
  templateId:  string;
  minPrice:    number;
  channel:     string;
  maxPrice:    number;
  stock?:      number;
}

export interface ShippingDetails {
  fullName:    string;
  latLong:     LatLong;
  postalCode:  string;
  address:     string;
  totalWeight: number;
  phoneNumber: string;
  addressNote: string;
}

export interface LatLong {
  lat: number;
  lng: number;
}

export interface ShippingMethod {
  serviceCode:  string;
  courierName:  string;
  duration:     string;
  price:        number;
  insuranceFee: number;
  courierCode:  string;
  serviceName:  string;
  type:         string;
}

export interface ShippingOrderData {
  shipper:      Shipper;
  id:           string;
  price:        number;
  delivery:     Delivery;
  object:       string;
  message:      string;
  success:      boolean;
  reference_id: null;
  status:       string;
  extra:        any[];
  origin:       Destination;
  destination:  Destination;
  courier:      Courier;
  items:        Item[];
}

export interface Courier {
  insurance:   Insurance;
  company:     string;
  type:        string;
  link:        null;
  name:        null;
  tracking_id: null;
  waybill_id:  null;
  phone:       null;
}

export interface Insurance {
  note:   string;
  fee:    number;
  amount: number;
}

export interface Delivery {
  note:          null;
  distance:      number;
  datetime:      string;
  type:          string;
  distance_unit: string;
}

export interface Destination {
  proof_of_delivery?: ProofOfDelivery;
  note:               string;
  cash_on_delivery?:  CashOnDelivery;
  postal_code:        number;
  contact_name:       string;
  contact_phone:      string;
  coordinate:         Coordinate;
  address:            string;
}

export interface CashOnDelivery {
  fee:    number;
  type:   null;
  amount: number;
  note:   null;
  id:     null;
}

export interface Coordinate {
  latitude:  number;
  longitude: number;
}

export interface ProofOfDelivery {
  fee:  number;
  use:  boolean;
  link: null;
  note: null;
}

export interface Item {
  description: string;
  value:       number;
  name:        string;
  length:      number;
  sku:         null;
  width:       number;
  height:      number;
  weight:      number;
  quantity:    number;
}

export interface Shipper {
  phone:        string;
  email:        string;
  organization: string;
  name:         string;
}

export interface OrderRequest {
  invoiceId: string;
}