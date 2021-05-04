import { gql } from 'apollo-server';

const ArgsTypeDefs = gql`
  input LoginArgs {
    email: String!
    password: String!
  }
  input FiltersArgs {
    keyword: String
    filter: String
    start: Int!
    limit: Int!
  }
`;

export default ArgsTypeDefs;
