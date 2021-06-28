import { Context } from './helpers';
import {
  User,
  Product,
  Category,
  Tag,
  Color,
  Order,
  Promotion,
  Pickup,
  UserInputs,
  ProductInputs,
  CategoryInputs,
  TagInputs,
  ColorInputs,
  OrderInputs,
  PromotionInputs,
  PickupInputs,
} from './entities';

export type Maybe<T> = T | null;

export type IResolvers = {
  Query: Query;
  Mutation: Mutation;
};

export interface FiltersArgs {
  keyword: string;
  filter: string;
  start: number;
  limit: number;
  userId: string;
}
export interface SignInArgs extends Record<string, any> {
  email: string;
  password: string;
}
export interface SignUpInputs extends SignInArgs {
  username: string;
  email: string;
}

type parent = any;

export type Query = {
  signIn?: (_: parent, __: { args: SignInArgs }) => Promise<Maybe<User>>;

  getUser?: (_: parent, _id: string, context: Context) => Promise<Maybe<User>>;
  getProduct?: (_: parent, _id: string, context: Context) => Promise<Maybe<Product>>;
  getCategory?: (_: parent, _id: string, context: Context) => Promise<Maybe<Category>>;
  getTag?: (_: parent, _id: string, context: Context) => Promise<Maybe<Tag>>;
  getColor?: (_: parent, _id: string, context: Context) => Promise<Maybe<Color>>;
  getOrder?: (_: parent, _id: string, context: Context) => Promise<Maybe<Order>>;
  getPromotion?: (_: parent, _id: string, context: Context) => Promise<Maybe<Promotion>>;
  getPickup?: (_: parent, _id: string, context: Context) => Promise<Maybe<Pickup>>;

  getUsers?: (_: parent, __: { args: FiltersArgs }, context: Context) => Promise<Maybe<User[]>>;
  getProducts?: (_: parent, __: { args: FiltersArgs }, context: Context) => Promise<Maybe<Product[]>>;
  getCategories?: (_: parent, __: { args: FiltersArgs }, context: Context) => Promise<Maybe<Category[]>>;
  getTags?: (_: parent, __: { args: FiltersArgs }, context: Context) => Promise<Maybe<Tag[]>>;
  getColors?: (_: parent, __: { args: FiltersArgs }, context: Context) => Promise<Maybe<Color[]>>;
  getOrders?: (_: parent, __: { args: FiltersArgs }, context: Context) => Promise<Maybe<Order[]>>;
  getPromotions?: (_: parent, __: { args: FiltersArgs }, context: Context) => Promise<Maybe<Promotion[]>>;
  getPickups?: (_: parent, __: { args: FiltersArgs }, context: Context) => Promise<Maybe<Pickup[]>>;
};
export type Mutation = {
  signUp?: (_: parent, __: { inputs: SignUpInputs }, context: Context) => Promise<Maybe<User>>;

  editUser?: (_: parent, __: { inputs: UserInputs }, context: Context) => Promise<Maybe<User>>;
  editProduct?: (_: parent, __: { inputs: ProductInputs }, context: Context) => Promise<Maybe<Product>>;
  editCategory?: (_: parent, __: { inputs: CategoryInputs }, context: Context) => Promise<Maybe<Category>>;
  editTag?: (_: parent, __: { inputs: TagInputs }, context: Context) => Promise<Maybe<Tag>>;
  editColor?: (_: parent, __: { inputs: ColorInputs }, context: Context) => Promise<Maybe<Color>>;
  editOrder?: (_: parent, __: { inputs: OrderInputs }, context: Context) => Promise<Maybe<Order>>;
  editPromotion?: (_: parent, __: { inputs: PromotionInputs }, context: Context) => Promise<Maybe<Promotion>>;
  editPickup?: (_: parent, __: { inputs: PickupInputs }, context: Context) => Promise<Maybe<Pickup>>;

  deleteUser?: (_: parent, _id: string, context: Context) => Promise<boolean>;
  deleteProduct?: (_: parent, _id: string, context: Context) => Promise<boolean>;
  deleteCategory?: (_: parent, _id: string, context: Context) => Promise<boolean>;
  deleteTag?: (_: parent, _id: string, context: Context) => Promise<boolean>;
  deleteColor?: (_: parent, _id: string, context: Context) => Promise<boolean>;
  deleteOrder?: (_: parent, _id: string, context: Context) => Promise<boolean>;
  deletePromotion?: (_: parent, _id: string, context: Context) => Promise<boolean>;
  deletePickup?: (_: parent, _id: string, context: Context) => Promise<boolean>;
};
