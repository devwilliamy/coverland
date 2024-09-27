// lib/queries.js
import { gql } from '@apollo/client';

export const GET_PRODUCT_BY_HANDLE = gql`
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      descriptionHtml
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 100) {
        edges {
          node {
            altText
            url
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            sku
          }
        }
      }
      vendor
      createdAt
      updatedAt
    }
  }
`;
