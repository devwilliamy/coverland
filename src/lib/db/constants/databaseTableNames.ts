/* Supabase Table Names */
export const PRODUCT_REVIEWS_TABLE = 'reviews-2';
export const CAR_COVERS_REVIEWS_TABLE = 'reviews_car_covers';
export const SEAT_COVERS_REVIEWS_TABLE = 'reviews_seat_covers';
export const PRODUCT_DATA_TABLE = 'Products';
export const RELATIONS_PRODUCT_TABLE = 'relations_product';
export const TYPE_TABLE = 'Type';
export const TYPE_MAKE_YEAR_DISTINCT = 'type_make_year_distinct';
export const ADMIN_PANEL_ORDERS =
  process.env.NEXT_PUBLIC_IS_PREVIEW === 'PREVIEW' ? '_Orders_TEST' : '_Orders';
export const ADMIN_PANEL_ORDER_ITEMS =
  process.env.NEXT_PUBLIC_IS_PREVIEW === 'PREVIEW'
    ? 'orderItems_table_TEST'
    : 'orderItems_table';
export const ADMIN_PANEL_PRODUCTS = 'Products';
export const ADMIN_PANEL_CUSTOMERS = 'users';
export const MODEL_TABLE = 'Model';
export const MAKE_TABLE = 'Make';
export const PRODUCT_METADATA_TABLE = 'Product-Metadata';

/* Supabase RPC Names */
export const RPC_GET_MAKE_RELATION = 'get_make_relation';
export const RPC_GET_UNIQUE_YEARS = 'get_unique_years';
export const RPC_GET_DISTINCT_REVIEW_IMAGES = 'get_distinct_review_images';
export const RPC_GET_PRODUCT_REVIEWS_SUMMARY = 'get_product_reviews_summary';
export const RPC_GET_SEAT_COVER_SORTED_BY_COLOR = 'get_seat_cover_products_sorted_by_color';
export const RPC_GET_DEFAULT_SEAT_COVER_SORTED_BY_COLOR = 'get_default_seat_cover_products_sorted_by_color';
  