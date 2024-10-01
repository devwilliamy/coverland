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

const determineVariants = (title: string) => {
  const parts = title.split(' / ');

  let yearGeneration: string | undefined;
  let submodel: string | undefined;
  let color1: string | undefined;
  let color2: string | undefined;

  if (parts.length === 4) {
    [yearGeneration, submodel, color1, color2] = parts;
  } else if (parts.length === 3) {
    [yearGeneration, color1, color2] = parts;
    submodel = undefined; // Optional: handle missing submodel
  } else {
    console.warn('Unexpected title format:', title);
  }
  return {
    yearGeneration,
    submodel,
    color1,
    color2,
  };
};

export function mapShopifyToModelData(shopifyProduct: Product): IProductData[] {
  return shopifyProduct.variants.edges.map((variant) => {
    const { yearGeneration, submodel, color1, color2 } = determineVariants(
      variant.node.title
    );

    const colorCode = determineColorCode(`${color1} ${color2}`);
    const matchingFeatureImage = shopifyProduct.images.edges.find(
      ({ node }) => node.altText === colorCode
    );

    const matchedImages = shopifyProduct.images.edges
      .filter((image) => image.node.altText === colorCode)
      .map((image) => image.node.url);

    return {
      id: shopifyProduct.id,
      sku: variant.node.sku,
      parent_generation: yearGeneration, // Parse from title or store elsewhere
      year_generation: yearGeneration,
      make: shopifyProduct.vendor,
      model: shopifyProduct.title.split(' ')[1], // Assuming model is the second word in title
      submodel1: submodel,
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
      year_options: yearGeneration,
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
    };
  });
}

export function mapShopifyCartToCartData(shopifyCartData: any): TCartItem[] {
  return shopifyCartData.lines.edges.map((lineItem: any) => {
    const { merchandise, quantity } = lineItem.node;
    const { product, title, price, image } = merchandise;
    const { yearGeneration, submodel, color1, color2 } =
      determineVariants(title);
    // Parse necessary fields
    const displayColor = `${color1} / ${color2}`;

    // Assuming make is the first part of the product title (e.g., "Ford Mustang Shelby")
    const make = product.title.split(' ')[0];
    const model = product.title.split(' ')[1]; // Assuming model is the second word in the title

    return {
      id: shopifyCartData.id,
      sku: merchandise.sku, // Assuming SKU comes from variant ID
      parent_generation: yearGeneration, // Adjust as necessary
      year_generation: yearGeneration,
      make: make || null,
      model: model || null,
      submodel1: null, // Adjust as necessary
      submodel2: null,
      submodel3: null,
      feature: image?.url || null, // Assuming this is the product image
      product: image?.url || null, // Assuming single image for now
      product_video_carousel_thumbnail: null, // Add logic if available
      product_video_carousel: null,
      product_video_zoom: null,
      product_video_360: null,
      banner: image?.url || null, // Assuming banner is the product image for now
      type: product.productType || 'Car Cover',
      year_options: yearGeneration,
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
      title: product.title,
    };
  });
}
