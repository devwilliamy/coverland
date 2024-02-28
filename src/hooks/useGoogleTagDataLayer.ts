import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import {
  IProductData,
  TPathParams,
  getCompleteSelectionData,
} from '@/app/(main)/utils';
import { useCartContext } from '@/providers/CartProvider';
import { useParams, usePathname } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { useStore } from 'zustand';

export const useItemViewedGoogleTag = (
  selectedProduct: IProductData,
  productName: string
) => {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const params = useParams<TPathParams>();
  const modelData = useStore(store, (s) => s.modelData);

  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });
  useEffect(() => {
    const price = selectedProduct?.price || '0';
    const msrp = selectedProduct?.msrp || '0';
    const discount: number = parseFloat(price) - parseFloat(msrp);
    window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window?.dataLayer?.push({
      event: 'view_item',
      ecommerce: {
        currency: 'USD',
        value: msrp,
        items: [
          {
            item_id: selectedProduct?.sku,
            item_name: productName,
            affiliation: undefined,
            coupon: undefined,
            discount: discount,
            index: 0,
            item_brand: 'Coverland',
            item_category: params?.productType,
            item_category2: params?.coverType,
            item_category3: params?.make,
            item_category4: params?.model,
            item_category5: params?.year,
            item_category6: selectedProduct?.submodel1,
            item_category7: selectedProduct?.submodel2,
            item_category8: selectedProduct?.submodel3,
            item_list_id: undefined,
            item_list_name: undefined,
            item_variant: selectedProduct?.display_color,
            location_id: undefined,
            price: msrp,
            quantity: 1,
          },
        ],
      },
    });
  }, [params, productName, selectedProduct]);
};

export const useCheckoutViewedGoogleTag = () => {
  const { cartItems, getTotalPrice } = useCartContext();
  useEffect(() => {
    const cartItemsToGTagItems = cartItems.map((cartItem, index) => {
      const productName = `${cartItem.fullProductName} Premium Plus ${cartItem.type}`;
      const price = cartItem?.price || '0';
      const msrp = cartItem?.msrp || '0';
      const discount: number = parseFloat(price) - parseFloat(msrp);
      return {
        item_id: cartItem?.sku,
        item_name: productName,
        affiliation: undefined,
        coupon: undefined,
        discount: discount,
        index: index,
        item_brand: 'Coverland',
        item_category: cartItem.type,
        item_category2: 'Premium Plus',
        item_category3: cartItem.make,
        item_category4: cartItem.model,
        item_category5: cartItem.parent_generation,
        item_category6: cartItem.submodel1,
        item_category7: cartItem.submodel2,
        item_category8: cartItem.submodel3,
        item_list_id: undefined,
        item_list_name: undefined,
        item_variant: cartItem.display_color,
        location_id: undefined,
        price: msrp,
        quantity: cartItem.quantity,
      };
    });

    window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window?.dataLayer?.push(
      {
        event: 'begin_checkout',
        ecommerce: {
          currency: 'USD',
          value: getTotalPrice().toFixed(2),
          coupon: undefined,
          items: cartItemsToGTagItems,
        },
      },
      [cartItems, getTotalPrice]
    );
  });
};

type Item = {
  sku: string[];
  total: number;
};

export const useThankYouViewedGoogleTag = (
  items: Item[],
  orderNumber: string
) => {
  const {
    cartItems,
    getTotalPrice,
    getOrderSubtotal,
    getTotalDiscountPrice,
    getTotalCartQuantity,
  } = useCartContext();
  useEffect(() => {
    // console.log('CartItems:', cartItems);
    if (typeof window !== 'undefined' && window.performance) {
      const navigationType = window.performance.navigation.type;
      if (navigationType === PerformanceNavigation.TYPE_RELOAD) {
        // console.log('Page was reloaded, GTAG not tracked.');
      } else {
        window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
        window?.dataLayer?.push({
          event: 'purchase',
          ecommerce: {
            transaction_id: 'T_12345',
            // Sum of (price * quantity) for all items.
            value: 72.05,
            tax: 3.6,
            shipping: 5.99,
            currency: 'USD',
            coupon: 'SUMMER_SALE',
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Stan and Friends Tee',
                affiliation: 'Google Merchandise Store',
                coupon: 'SUMMER_FUN',
                discount: 2.22,
                index: 0,
                item_brand: 'Google',
                item_category: 'Apparel',
                item_category2: 'Adult',
                item_category3: 'Shirts',
                item_category4: 'Crew',
                item_category5: 'Short sleeve',
                item_list_id: 'related_products',
                item_list_name: 'Related Products',
                item_variant: 'green',
                location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
                price: 10.01,
                quantity: 3,
              },
            ],
          },
        });
      }
    }
  }, [
    cartItems,
    getTotalPrice,
    getOrderSubtotal,
    getTotalDiscountPrice,
    getTotalCartQuantity,
    orderNumber,
  ]);
};

export const handleAddToCartGoogleTag = (
  cartProduct: IProductData,
  params: TPathParams
) => {
  const price = cartProduct?.price || '0';
  const msrp = cartProduct?.msrp || '0';
  const discount: number = parseFloat(price) - parseFloat(msrp);
  const productName = `${params?.year} ${params?.make} ${params?.model} ${params?.coverType} ${params?.productType}`;

  window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
  window?.dataLayer?.push({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'USD',
      value: msrp,
      items: [
        {
          item_id: cartProduct.sku,
          item_name: productName,
          affiliation: undefined,
          coupon: undefined,
          discount: discount,
          index: 0,
          item_brand: 'Coverland',
          item_category: params?.productType,
          item_category2: params?.coverType,
          item_category3: params?.make,
          item_category4: params?.model,
          item_category5: params?.year,
          item_category6: cartProduct?.submodel1,
          item_category7: cartProduct?.submodel2,
          item_category8: cartProduct?.submodel3,
          item_list_id: undefined,
          item_list_name: undefined,
          item_variant: cartProduct?.display_color,
          location_id: undefined,
          price: msrp,
          quantity: 1,
        },
      ],
    },
  });
};
