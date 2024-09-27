export function mapShopifyToModelData(shopifyProduct) {
    return shopifyProduct.variants.edges.map(variant => {
      const [yearGeneration, submodel, displayColor] = variant.node.title.split(' / '); // Assuming this structure
      return {
        id: shopifyProduct.id,
        sku: variant.node.sku,
        parent_generation: yearGeneration,  // Parse from title or store elsewhere
        year_generation: yearGeneration,
        make: shopifyProduct.vendor,
        model: shopifyProduct.title.split(' ')[1], // Assuming model is the second word in title
        submodel1: submodel,
        submodel2: null,  // Adjust based on actual submodel structure
        submodel3: null,
        feature: shopifyProduct.images.edges[0]?.node.originalSrc || null,
        product: shopifyProduct.images.edges.map(image => image.node.originalSrc).join(','),
        product_video_carousel_thumbnail: null,  // Add logic if available
        product_video_carousel: null,
        product_video_zoom: null,
        product_video_360: null,
        banner: shopifyProduct.images.edges[0]?.node.originalSrc || null,
        type: "Car Covers",  // Assuming a default type
        year_options: yearGeneration,
        make_slug: shopifyProduct.handle.split('-')[0], // Assuming the first part of the handle is the make
        model_slug: shopifyProduct.handle.split('-')[1], // Assuming the second part is the model
        msrp: shopifyProduct.priceRange.minVariantPrice.amount,
        price: variant.node.price.amount,
        quantity: null,  // Need separate API call for inventory quantity
        display_color: displayColor,
        display_id: null,  // Add logic if available
        display_set: null,
        'skulabs SKU': null,
        preorder: null,  // Add logic if available
        preorder_discount: null,
        preorder_date: null,
        gtin: variant.node.barcode || null,
        mpn: null  // Add logic if available
      };
    });
  }
  