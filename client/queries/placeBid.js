import { gql } from '@apollo/client';

export const PLACE_BID = gql`
mutation place_a_bid(
  $ItemId: ID!,
  $biddingPrice:Int
  ) {
  place_a_bid(
    ItemId: $ItemId,
    biddingPrice:$biddingPrice,
  ) {
    minimumBid{
      user {
        email
      }
    }
  }
}
`;