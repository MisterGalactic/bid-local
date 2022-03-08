import { gql } from '@apollo/client';

export const PLACE_BID = gql`
mutation place_a_bid(
  $ItemId: ID!,
  $biddingPrice: Int,
  $lastName: String,
  $history: JSON
  ) {
  place_a_bid(
    ItemId: $ItemId,
    biddingPrice: $biddingPrice,
    lastName: $lastName,
    history: $history
  ) {
    minimumBid{
      user {
        email
      }
    }
  }
}
`;