import { Cart, GetProductByHandleQuery, Product } from '@/generated/graphql';
import { IProductData } from '@/utils';
import { TCartItem } from '../cart/useCart';

const determineColorCode = (color: string): string => {
  const colorMap: Record<string, string> = {
    'Black Red Stripe': 'BKRD-STR',
    'Black Sky-Gray Stripe': 'BKGR-STR',
    'Sky-Gray Black Stripe': 'GRBK-STR',
  };
  return colorMap[color];
};

type VariantOptions = {
  color1: string;
  color2: string;
  yearRange: string;
  bodyTrim: string;
};

type SelectedOption = {
  name: string;
  value: string;
};

const determineVariants = (selectedOptions: SelectedOption[]) => {
  const variables: VariantOptions = {
    color1: '',
    color2: '',
    yearRange: '',
    bodyTrim: '',
  };
  selectedOptions?.forEach((option) => {
    switch (option.name) {
      case 'Year':
        variables.yearRange = option.value;
        break;
      case 'Body/Trim':
        variables.bodyTrim = option.value;
        break;
      case 'Color':
        // Split color by '/' and trim any extra spaces
        const colors = option.value.split('/').map((s) => s.trim());
        variables.color1 = colors[0] || '';
        variables.color2 = colors[1] || '';
        break;
      default:
        break;
    }
  });

  return variables;
};

const isYear = (component: string) => {
  return /^\d{4}-\d{4}$/.test(component) || /^\d{4}$/.test(component);
};

export function mapShopifyToModelData(shopifyProduct: Product): IProductData[] {
  return shopifyProduct?.variants?.edges?.map((variant) => {
    const variables = determineVariants(variant.node.selectedOptions);
    const { yearRange, bodyTrim, color1, color2 } = variables;

    const colorCode = determineColorCode(`${color1} ${color2}`);
    const matchingFeatureImage = shopifyProduct.images.edges.find(
      ({ node }) => node.altText === colorCode
    );

    const matchedImages = shopifyProduct.images.edges
      .filter((image) => image.node.altText === colorCode)
      .map((image) => image.node.url);
    return {
      id: variant.node.id,
      sku: variant.node.sku,
      parent_generation: yearRange, // Parse from title or store elsewhere
      year_generation: yearRange,
      make: shopifyProduct.vendor,
      model: shopifyProduct.title.split(' ')[1], // Assuming model is the second word in title
      submodel1: bodyTrim,
      submodel2: null, // Adjust based on actual submodel structure
      submodel3: null,
      feature: matchingFeatureImage?.node.url || null,
      product: matchedImages.join(','),
      product_video_carousel_thumbnail: null, // Add logic if available
      product_video_carousel: null,
      product_video_zoom: null,
      product_video_360: null,
      banner: shopifyProduct.images.edges[0]?.node.url || null,
      type: 'Car Covers', // Assuming a default type
      year_options: yearRange,
      make_slug: shopifyProduct.handle.split('-')[0], // Assuming the first part of the handle is the make
      model_slug: shopifyProduct.handle.split('-')[1], // Assuming the second part is the model
      msrp: shopifyProduct.priceRange.minVariantPrice.amount,
      price: variant.node.price.amount,
      quantity: null, // Need separate API call for inventory quantity
      display_color: `${color1} / ${color2}`, // Combine both color parts
      display_id: null, // Add logic if available
      display_set: null,
      'skulabs SKU': null,
      preorder: null, // Add logic if available
      preorder_discount: null,
      preorder_date: null,
      gtin: variant.node.barcode || null,
      mpn: null, // Add logic if available
      title: shopifyProduct.title,
      productId: shopifyProduct.id,
      variantTitle: variant.node.title,
    };
  });
}

export function mapShopifyCartToCartData(shopifyCartData: any): TCartItem[] {
  const { merchandise, quantity, id } = shopifyCartData;
  const { product, title, price, image, selectedOptions } = merchandise;
  const { yearRange, bodyTrim, color1, color2 } =
    determineVariants(selectedOptions);
  // Parse necessary fields
  const displayColor = `${color1} / ${color2}`;

  // Assuming make is the first part of the product title (e.g., "Ford Mustang Shelby")
  const make = product?.title.split(' ')[0];
  const model = product?.title.split(' ')[1]; // Assuming model is the second word in the title

  return {
    id: id,
    sku: merchandise?.sku, // Assuming SKU comes from variant ID
    parent_generation: yearRange, // Adjust as necessary
    year_generation: yearRange,
    make: make || null,
    model: model || null,
    submodel1: bodyTrim, // Adjust as necessary
    submodel2: null,
    submodel3: null,
    feature: image?.url || null, // Assuming this is the product image
    product: image?.url || null, // Assuming single image for now
    product_video_carousel_thumbnail: null, // Add logic if available
    product_video_carousel: null,
    product_video_zoom: null,
    product_video_360: null,
    banner: image?.url || null, // Assuming banner is the product image for now
    type: product?.productType || 'Car Cover',
    year_options: yearRange,
    make_slug: make?.toLowerCase() || null,
    model_slug: model?.toLowerCase() || null,
    msrp: price?.amount || null,
    price: price.amount,
    quantity: quantity || 1,
    display_color: displayColor,
    display_id: null, // Add logic if available
    display_set: null,
    skuLabsSKU: null, // Add logic if available
    preorder: null, // Add logic if available
    preorder_discount: null,
    preorder_date: null,
    gtin: null, // Add logic if available
    mpn: null, // Add logic if available
    title: product?.title,
    variantTitle: title,
  };
}
