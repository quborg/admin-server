import { gql } from 'apollo-server';

const MutationsTypeDefs = gql`
  type Mutation {
    signUp(inputs: SignUpInputs): User!

    editUser(inputs: UserInputs): User!
    editProduct(inputs: ProductInputs): Product!
    editCategory(inputs: CategoryInputs): Category!
    editTag(inputs: TagInputs): Tag!
    editColor(inputs: ColorInputs): Color!
    editOrder(inputs: OrderInputs): Order!
    editPromotion(inputs: PromotionInputs): Promotion!
    editPickup(inputs: PickupInputs): Pickup!

    deleteUser(_id: ID!): Boolean!
    deleteProduct(_id: ID!): Boolean!
    deleteCategory(_id: ID!): Boolean!
    deleteTag(_id: ID!): Boolean!
    deleteColor(_id: ID!): Boolean!
    deleteOrder(_id: ID!): Boolean!
    deletePromotion(_id: ID!): Boolean!
    deletePickup(_id: ID!): Boolean!
  }
`;

export default MutationsTypeDefs;
