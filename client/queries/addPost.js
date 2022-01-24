import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation create_post($post: PostUpdate!) {
    create_post(post: $post) {
      id,
      name,
      minPrice,
      description,
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
