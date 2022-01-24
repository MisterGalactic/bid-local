import { gql } from '@apollo/client';

export const GET_POST_BY_ID = gql`
query  get_post_by_Id ( $id: ID! ){
  get_post_by_Id(id: $id){
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
    }
  }
`;