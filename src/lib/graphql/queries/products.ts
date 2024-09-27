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
      images(first: 20) {
        edges {
          node {
            altText
            originalSrc
          }
        }
      }
      variants(first: 10) {
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
