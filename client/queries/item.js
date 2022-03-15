import { gql } from '@apollo/client';

export const PLACE_A_BID = gql`
  mutation place_a_bid (
    $ItemId: ID!,
    $biddingPrice: Int,
    $lastName: String,
    $history: JSON
    ) {
    place_a_bid (
      ItemId: $ItemId,
      biddingPrice: $biddingPrice,
      lastName: $lastName,
      history: $history
      ) {
      id
    }
  }
`;

export const BUY_CREDIT = gql`
  mutation buy_credit ($UserId: ID!, $credit: Int) {
    buy_credit (UserId: $UserId, credit: $credit) {
      id
    }
  }
`;


export const GET_ITEM_BY_ID = gql`
query  get_item_by_Id ( $id: ID! ){
  get_item_by_Id(id: $id){
    id
    name
    subname
    color
    description
    auctionStart
    auctionEnd
    minimumBid
    description
    picUrl1
    picUrl2
    picUrl3
    history
    bidder
    user {
      firstName
      lastName
      email
      phoneNumber
    }
  }
}
`;

export const GET_USER_INFO = gql`
  query get_user_info {
    get_user_info {
      id
      credit
      firstName
      lastName
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation create_record(
    $ItemId: ID!,
    $biddingPrice: Int,
    $record: RecordUpdate!
    ) {
    create_record(
      ItemId: $ItemId,
      biddingPrice: $biddingPrice,
      record: $record
      ) {
      id
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation update_record (
    $ItemId: ID!,
    $biddingPrice: Int,
    $record: RecordUpdate!
  ) {
    update_item (
      ItemId: $ItemId,
      biddingPrice: $biddingPrice,
      record: $record
    ) {
      id
    }
  }
`;
