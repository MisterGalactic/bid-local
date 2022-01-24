import { gql } from '@apollo/client';

export const GET_USER_ITEMS = gql`
query get_user_info {
    get_user_info {
    item {
      id
      name
      minimumBid
      description
      auctionEnd
    }
  }
}
`;

export const UPDATE_ITEM = gql`
mutation update_item (
  $ItemId: ID!
  $item: ItemUpdate!
) {
  update_item (
    ItemId: $ItemId
    item: $item
  ) {
    id
    name
    description
  }
}
`;

export const DELETE_ITEM = gql`
mutation delete_item_by_id (
  $ItemId: ID!
) {
  delete_item_by_id (
    ItemId: $ItemId
  )
}
`;





export const GET_USER_POSTS = gql`
query get_user_info {
    get_user_info {
    post {
      id
      name
      minimumBid
      description
      auctionEnd
    }
  }
}
`;

export const UPDATE_POST = gql`
mutation update_post (
  $PostId: ID!
  $post: PostUpdate!
) {
  update_post (
    PostId: $PostId
    post: $post
  ) {
    id
    name
    description
  }
}
`;

export const DELETE_POST = gql`
mutation delete_post_by_id (
  $PostId: ID!
) {
  delete_post_by_id (
    PostId: $PostId
  )
}
`;