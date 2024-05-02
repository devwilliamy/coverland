import { CarSelectionContext } from '../contexts/CarSelectionContext';
import { IProductData, TPathParams, getCompleteSelectionData } from '@/utils';
import { TCartItem } from '@/lib/cart/useCart';
import { deslugify } from '@/lib/utils';
import { useCartContext } from '@/providers/CartProvider';
import { useParams } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { useStore } from 'zustand';

export const removeMakeFromDisplayId = (
  displayId: string,
  make: string
): string => {
  if (displayId === null || make === null) {
    return displayId ?? ''; // Return displayId if it's not null, otherwise return an empty string
  }

  if (displayId?.includes(make)) {
    return displayId.replace(make, '').trim();
  }
  return displayId;
};

const generateViewItemEvent = (
  selectedProduct: IProductData,
  params: TPathParams | null,
  isComplete: boolean
) => {
  // const price = parseFloat(selectedProduct?.price || '0') || 0;
  const msrp = parseFloat(selectedProduct?.msrp || '0') || 0;
  // const discount: number = price - msrp;
  const {
    year = '',
    make = '',
    model = '',
    coverType = '',
    productType = '',
  } = params || {};

  const productName = isComplete
    ? `${selectedProduct.fullProductName} ${deslugify(coverType)} ${selectedProduct.type}`
    : `${year} ${deslugify(make)} ${deslugify(model)} ${deslugify(coverType)} ${deslugify(productType)}`
        .replace(/  +/g, ' ')
        .trim();

  const item = {
    item_id: isComplete ? selectedProduct?.sku : undefined,
    item_name: productName,
    affiliation: undefined,
    coupon: undefined,
    discount: undefined,
    index: 0,
    item_brand: 'Coverland',
    item_category: deslugify(params?.productType || ''),
    item_category2: deslugify(params?.coverType || ''),
    item_category3: deslugify(params?.make || ''),
    item_category4: deslugify(params?.model || ''),
    item_category5: params?.year || '',
    item_category6: isComplete
      ? deslugify(selectedProduct?.submodel1 || '')
      : undefined,
    item_category7: isComplete
      ? deslugify(selectedProduct?.submodel2 || '')
      : undefined,
    item_category8: isComplete
      ? deslugify(selectedProduct?.submodel3 || '')
      : undefined,
    item_list_id: undefined,
    item_list_name: undefined,
    item_variant: selectedProduct?.display_color,
    location_id: undefined,
    price: isComplete ? msrp : undefined,
    quantity: 1,
  };

  return item;
};

const mapCartItemsToGTagItems = (cartItems: TCartItem[]) => {
  return cartItems.map((cartItem, index) => {
    const cleanedDisplayId = removeMakeFromDisplayId(
      cartItem.display_id as string,
      cartItem.make as string
    );
    const fullProductName =
      `${cartItem.year_generation ?? ''} ${cartItem.make ?? ''} ${cartItem.model ?? ''} ${cartItem.submodel1 ?? ''} ${cartItem.submodel2 ?? ''}`.trim();
    const productName = `${fullProductName} ${cleanedDisplayId} ${cartItem.type}`;
    // const price = parseFloat(cartItem?.price || '0') || 0;
    const msrp = parseFloat(cartItem?.msrp || '0') || 0;
    // const discount: number = price - msrp;

    return {
      item_id: cartItem?.sku,
      item_name: productName,
      affiliation: undefined,
      coupon: undefined,
      discount: undefined, // Removed temporarily because we transfer the promotional price or something
      index: index,
      item_brand: 'Coverland',
      item_category: cartItem.type,
      item_category2: cleanedDisplayId,
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
};

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
    const msrp = parseFloat(selectedProduct?.msrp || '0') || 0;
    const item = generateViewItemEvent(selectedProduct, params, isComplete);
    window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window?.dataLayer?.push({
      event: 'view_item',
      ecommerce: {
        currency: 'USD',
        value: isComplete ? msrp : undefined,
        items: [item],
      },
    });
  }, [params, selectedProduct, isComplete]);
};

export const useCheckoutViewedGoogleTag = () => {
  const { cartItems, getTotalPrice } = useCartContext();
  useEffect(() => {
    const cartItemsToGTagItems = mapCartItemsToGTagItems(cartItems);
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
    if (typeof window !== 'undefined' && window.performance) {
      const navigationType = window.performance.navigation.type;
      if (navigationType === PerformanceNavigation.TYPE_RELOAD) {
        // console.log('Page was reloaded, GTAG not tracked.');
      } else {
        const cartItemsToGTagItems = mapCartItemsToGTagItems(cartItems);
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
  // const price = parseFloat(cartProduct?.price || '0') || 0;
  const msrp = parseFloat(cartProduct?.msrp || '0') || 0;
  // const discount: number = price - msrp;
  const cleanedDisplayId = removeMakeFromDisplayId(
    cartProduct.display_id as string,
    cartProduct.make as string
  );
  const fullProductName =
    `${cartProduct.year_generation ?? ''} ${cartProduct.make ?? ''} ${cartProduct.model ?? ''} ${cartProduct.submodel1 ?? ''} ${cartProduct.submodel2 ?? ''}`.trim();
  const productName = `${fullProductName} ${cleanedDisplayId} ${cartProduct.type}`;
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
          item_category: deslugify(
            params?.productType || cartProduct.product_type || ''
          ),
          item_category2: deslugify(
            params?.coverType || cartProduct.display_id || ''
          ),
          item_category3: deslugify(params?.make || cartProduct.make || ''),
          item_category4: deslugify(params?.model || cartProduct.model || ''),
          item_category5: params?.year || cartProduct.parent_generation || '',
          item_category6: deslugify(cartProduct?.submodel1 || ''),
          item_category7: deslugify(cartProduct?.submodel2 || ''),
          item_category8: deslugify(cartProduct?.submodel3 || ''),
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

export const handleViewItemColorChangeGoogleTag = (
  selectedProduct: IProductData,
  params: TPathParams | null,
  isComplete: boolean
) => {
  const msrp = parseFloat(selectedProduct?.msrp || '0') || 0;
  const item = generateViewItemEvent(selectedProduct, params, isComplete);
  window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
  window?.dataLayer?.push({
    event: 'view_item',
    ecommerce: {
      currency: 'USD',
      value: isComplete ? msrp : undefined,
      items: [item],
    },
  });
};
