import { gql } from 'apollo-server';

const QueriesTypeDefs = gql`
  type Query {
    login(args: LoginArgs): User

    getUser(_id: ID!): User
    getProduct(_id: ID!): Product
    getCategory(_id: ID!): Category
    getTag(_id: ID!): Tag
    getColor(_id: ID!): Color
    getOrder(_id: ID!): Order
    getPromotion(_id: ID!): Promotion
    getPickup(_id: ID!): Pickup

    getUsers(args: FiltersArgs): [User]
    getProducts(args: FiltersArgs): [Product]
    getCategories(args: FiltersArgs): [Category]
    getTags(args: FiltersArgs): [Tag]
    getColors(args: FiltersArgs): [Color]
    getOrders(args: FiltersArgs): [Order]
    getPromotions(args: FiltersArgs): [Promotion]
    getPickups(args: FiltersArgs): [Pickup]
  }
`;

export default QueriesTypeDefs;
