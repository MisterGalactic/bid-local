import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query get_user_info {
    get_user_info {
      id
      email
      credit
      firstName
      lastName
      phoneNumber
      address {
        id
        firstLineAddress
        secondLineAddress
        city
        postcode
        country
      }
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

export const UPDATE_USER = gql`
mutation update_user (
  $user: UserUpdate!
) {
  update_user (
    user: $user
  ){
    id
    phoneNumber
    email
    firstName
    lastName
  }
}
`;

export const UPDATE_ADDRESS = gql`
mutation update_address(
    $address:AddressUpdate!
  ) {
    update_address (
      address: $address
    ){
      id
      firstLineAddress
      secondLineAddress
      city
      postcode
      country
    }
}
`;
