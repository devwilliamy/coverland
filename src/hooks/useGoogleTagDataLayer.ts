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

export const useCheckoutViewedGoogleTag = (selectedProduct, productName) => {
  const {
    cartItems,
    getTotalPrice,
    getOrderSubtotal,
    getTotalDiscountPrice,
    getTotalCartQuantity,
  } = useCartContext();
  useEffect(() => {
    const price = selectedProduct?.price || '0';
    const msrp = selectedProduct?.msrp || '0';
    const discount: number = parseFloat(price) - parseFloat(msrp);
    window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window?.dataLayer?.push(
      {
        event: 'begin_checkout',
        ecommerce: {
          currency: 'USD',
          value: msrp,
          coupon: undefined,
          items: [
            {
              item_id: selectedProduct?.sku,
              item_name: productName,
              affiliation: undefined,
              coupon: undefined,
              discount: discount,
              index: 0,
              item_brand: 'Coverland',
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
      },
      [
        cartItems,
        getTotalPrice,
        getOrderSubtotal,
        getTotalDiscountPrice,
        getTotalCartQuantity,
      ]
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
    if (typeof window !== 'undefined' && window.performance) {
      const navigationType = window.performance.navigation.type;
      if (navigationType === PerformanceNavigation.TYPE_RELOAD) {
        // console.log('Page was reloaded, GTAG not tracked.');
      } else {
        window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
        window?.dataLayer?.push({
          event: 'purchase',
          ecommerce: {
            items: cartItems,
            orderNumber: orderNumber,
            totalPrice: getTotalPrice(),
            subtotal: getOrderSubtotal(),
            discountPrice: getTotalDiscountPrice(),
            cartQuantity: getTotalCartQuantity(),
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
