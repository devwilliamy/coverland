import { useCartContext } from '@/providers/CartProvider';
import { useEffect } from 'react';

export const useItemViewedGoogleTag = () => {
  useEffect(() => {
    console.log('CarCoverSelector DataLayer:', window.dataLayer);
    window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window?.dataLayer?.push({
      event: 'view_item_list',
      ecommerce: {
        items: [
          {
            item_id: 'dc646',
            item_name: 'Lunchpod T-Shirt',
            price: '90.00',
            item_brand: 'Lunchpod',
            item_category: 'T-Shirts',
            item_list_name: 'shirts you may like',
            index: 0,
          },
          {
            item_id: '57b9d',
            item_name: 'Kiosk T-Shirt',
            price: '55.00',
            item_brand: 'Kiosk',
            item_category: 'T-Shirts',
            item_list_name: 'shirts you may like',
            index: 1,
          },
          {
            item_id: '7w9e0',
            item_name: 'Masons T-Shirt',
            price: '31.00',
            item_brand: 'Masons',
            item_category: 'T-Shirts',
            item_list_name: 'shirts you may like',
            index: 2,
          },
          {
            item_id: 'b55da',
            item_name: 'Flexigen T-Shirt',
            price: '16.00',
            item_brand: 'Flexigen',
            item_category: 'T-Shirts',
            item_list_name: 'shirts you may like',
            index: 3,
          },
        ],
      },
    });
    console.log(
      'CarCoverSelector DataLayer After useEffect:',
      window.dataLayer
    );
  }, []);
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
    console.log('useCheckoutViewedGoogleTag DataLayer:', window.dataLayer);
    window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window?.dataLayer?.push({
      event: 'view_checkout_page',
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
        console.log('Page was reloaded, GTAG not tracked.');
      } else {
        console.log('useCheckoutViewedGoogleTag DataLayer:', window.dataLayer);
        window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
        window?.dataLayer?.push({
          event: 'view_thank_you_page',
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
