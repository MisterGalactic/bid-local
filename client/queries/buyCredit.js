import { gql } from '@apollo/client';

export const BUY_CREDIT = gql`
mutation buy_credit(
  $UserId: ID!,
  $credit:Int
  ) {
  buy_credit(
    UserId: $UserId,
    credit:$credit,
  ) {
    credit
  }
}
`;

