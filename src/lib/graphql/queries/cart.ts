import { gql } from '@apollo/client';

export const FETCH_CART = gql`
  query fetchCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                image {
                  url
                }
                title
                price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                product {
                  id
                  productType
                  title
                }
                sku
              }
            }
          }
        }
      }
      totalQuantity
      cost {
        checkoutChargeAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        subtotalAmountEstimated
        totalAmount {
          amount
          currencyCode
        }
        totalAmountEstimated
        totalDutyAmount {
          amount
          currencyCode
        }
        totalDutyAmountEstimated
        totalTaxAmount {
          amount
          currencyCode
        }
        totalTaxAmountEstimated
      }
    }
  }
`;
