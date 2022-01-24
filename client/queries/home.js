import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
query get_categories {
  get_categories {
    id
    name
  }
}
`;

export const GET_ITEMS = gql`
query get_items {
  get_items {
    id
    name
    subname
    color
    description
    minimumBid
    picUrl1
    auctionStart
    auctionEnd
    category {
      name
    }
  }
}
`;

export const GET_POSTCATEGORIES = gql`
query get_postcategories {
  get_postcategories {
    id
    name
  }
}
`;

export const GET_POSTS = gql`
query get_posts {
  get_posts {
    id
    name
    subname
    color
    description
    minimumBid
    picUrl1
    auctionStart
    auctionEnd
    postcategory {
      name
    }
  }
}
`;