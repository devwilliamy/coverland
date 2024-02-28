import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import {
  IProductData,
  TPathParams,
  getCompleteSelectionData,
} from '@/app/(main)/utils';
import { useCartContext } from '@/providers/CartProvider';
import { useParams } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { useStore } from 'zustand';

export const useItemViewedGoogleTag = (selectedProduct: IProductData) => {
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
    const price = parseFloat(selectedProduct?.price || '0') || 0;
    const msrp = parseFloat(selectedProduct?.msrp || '0') || 0;
    const discount: number = price - msrp;
    const {
      year = '',
      make = '',
      model = '',
      coverType = '',
      productType = '',
    } = params || {};

    const productName = isComplete
      ? `${selectedProduct.fullProductName} Premium Plus ${selectedProduct.type}`
      : `${year} ${make} ${model} ${coverType} ${productType}`
          .replace(/  +/g, ' ')
          .trim();
    window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window?.dataLayer?.push({
      event: 'view_item',
      ecommerce: {
        currency: 'USD',
        value: isComplete ? msrp : undefined,
        items: [
          {
            item_id: isComplete ? selectedProduct?.sku : undefined,
            item_name: productName,
            affiliation: undefined,
            coupon: undefined,
            discount: undefined, // Removed temporarily because we transfer the promotional price or something
            index: 0,
            item_brand: 'Coverland',
            item_category: params?.productType,
            item_category2: params?.coverType,
            item_category3: params?.make,
            item_category4: params?.model,
            item_category5: params?.year,
            item_category6: isComplete ? selectedProduct?.submodel1 : undefined,
            item_category7: isComplete ? selectedProduct?.submodel2 : undefined,
            item_category8: isComplete ? selectedProduct?.submodel3 : undefined,
            item_list_id: undefined,
            item_list_name: undefined,
            item_variant: selectedProduct?.display_color,
            location_id: undefined,
            price: isComplete ? msrp : undefined,
            quantity: 1,
          },
        ],
      },
    });
  }, [params, selectedProduct, isComplete]);
};

export const useCheckoutViewedGoogleTag = () => {
  const { cartItems, getTotalPrice } = useCartContext();
  useEffect(() => {
    // TODO: - Extract this into a map function
    const cartItemsToGTagItems = cartItems.map((cartItem, index) => {
      const productName = `${cartItem.fullProductName} Premium Plus ${cartItem.type}`;
      const price = parseFloat(cartItem?.price || '0') || 0;
      const msrp = parseFloat(cartItem?.msrp || '0') || 0;
      const discount: number = price - msrp;
      return {
        item_id: cartItem?.sku,
        item_name: productName,
        affiliation: undefined,
        coupon: undefined,
        discount: undefined, // Removed temporarily because we transfer the promotional price or something
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
    window?.dataLayer?.push({
      event: 'begin_checkout',
      ecommerce: {
        currency: 'USD',
        value: parseFloat(getTotalPrice().toFixed(2)),
        coupon: undefined,
        items: cartItemsToGTagItems,
      },
    });
  }, [cartItems, getTotalPrice]);
};

type Item = {
  sku: string[];
  total: number;
};

export const useThankYouViewedGoogleTag = (
  items: Item[],
  orderNumber: string
) => {
  const { cartItems, getTotalPrice } = useCartContext();
  useEffect(() => {
    // console.log('CartItems:', cartItems);
    if (typeof window !== 'undefined' && window.performance) {
      const navigationType = window.performance.navigation.type;
      if (navigationType === PerformanceNavigation.TYPE_RELOAD) {
        // console.log('Page was reloaded, GTAG not tracked.');
      } else {
        // TODO: - Extract this into a map function
        const cartItemsToGTagItems = cartItems.map((cartItem, index) => {
          const productName = `${cartItem.fullProductName} Premium Plus ${cartItem.type}`;
          const price = parseFloat(cartItem?.price || '0') || 0;
          const msrp = parseFloat(cartItem?.msrp || '0') || 0;
          const discount: number = price - msrp;
          return {
            item_id: cartItem?.sku,
            item_name: productName,
            affiliation: undefined,
            coupon: undefined,
            discount: undefined, // Removed temporarily because we transfer the promotional price or something
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
        window?.dataLayer?.push({
          event: 'purchase',
          ecommerce: {
            transaction_id: orderNumber,
            // Sum of (price * quantity) for all items.
            value: parseFloat(getTotalPrice().toFixed(2)),
            tax: 0.0, // Femi working on this
            shipping: 0.0, // Free shipping for now
            currency: 'USD',
            coupon: undefined, // will need to put in coupon for later but we don't track this ATM
            items: cartItemsToGTagItems,
          },
        });
      }
    }
  }, [cartItems, getTotalPrice, orderNumber]);
};

export const handleAddToCartGoogleTag = (
  cartProduct: IProductData,
  params: TPathParams
) => {
  const price = parseFloat(cartProduct?.price || '0') || 0;
  const msrp = parseFloat(cartProduct?.msrp || '0') || 0;
  const discount: number = price - msrp;
  const productName = `${cartProduct.fullProductName} Premium Plus ${cartProduct.type}`;
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
          discount: undefined, // Removed temporarily because we transfer the promotional price or something
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
