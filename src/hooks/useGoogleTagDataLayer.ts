import { IProductData, TPathParams } from '@/app/(main)/utils';
import { useCartContext } from '@/providers/CartProvider';
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const useItemViewedGoogleTag = (
  modelData: IProductData[],
  selectedProduct: IProductData,
  featuredImage: string,
  productName: string,
  uniqueColors: (IProductData | undefined)[]
) => {
  const params = useParams<TPathParams>();
  const pathname = usePathname();
  useEffect(() => {
    window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window?.dataLayer?.push({
      event: 'view_item',
      ecommerce: {
        // modelData,
        productName,
        selectedProduct,
        featuredImage,
        url: pathname,
        productType: params?.productType,
        coverType: params?.coverType,
        make: params?.make,
        model: params?.model,
        year: params?.year,
        colorSelection: uniqueColors,
      },
    });
  }, [
    featuredImage,
    params,
    pathname,
    productName,
    selectedProduct,
    // uniqueColors,
  ]);
};

export const useCheckoutViewedGoogleTag = () => {
  const {
    cartItems,
    getTotalPrice,
    getOrderSubtotal,
    getTotalDiscountPrice,
    getTotalCartQuantity,
  } = useCartContext();
  useEffect(() => {
    window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window?.dataLayer?.push({
      event: 'begin_checkout',
      ecommerce: {
        items: cartItems,
        totalPrice: getTotalPrice(),
        subtotal: getOrderSubtotal(),
        discountPrice: getTotalDiscountPrice(),
        cartQuantity: getTotalCartQuantity(),
      },
    });
  }, [
    cartItems,
    getTotalPrice,
    getOrderSubtotal,
    getTotalDiscountPrice,
    getTotalCartQuantity,
  ]);
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

export const handleAddToCartGoogleTag = (cartProduct: IProductData) => {
  window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
  window?.dataLayer?.push({
    event: 'add_to_cart',
    ecommerce: {
      cartProduct: cartProduct,
    },
  });
};
