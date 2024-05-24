/* Supabase Table Names */
export const PRODUCT_REVIEWS_TABLE = 'reviews-2';
export const PRODUCT_DATA_TABLE = 'Products';
export const RELATIONS_PRODUCT_TABLE = 'relations_product';
export const TYPE_TABLE = 'Type';
export const YEARS_TABLE = 'Years';
export const SEAT_PRODUCT_REVIEWS_TABLE = 'seat_cover_reviews_20240426';
export const TYPE_MAKE_YEAR_DISTINCT = 'type_make_year_distinct';
export const ADMIN_PANEL_ORDERS =
  process.env.NEXT_PUBLIC_IS_PREVIEW === 'PREVIEW' ? '_Orders_TEST' : '_Orders';
export const ADMIN_PANEL_ORDER_ITEMS =
  process.env.NEXT_PUBLIC_IS_PREVIEW === 'PREVIEW'
    ? 'orderItems_table_TEST'
    : 'orderItems_table';
export const ADMIN_PANEL_PRODUCTS = 'Products';
export const ADMIN_PANEL_CUSTOMERS = 'users';
export const SEAT_COVERS_TABLE = 'seat_covers';
export const MODEL_TABLE = 'Model';
export const MAKE_TABLE = 'Make';
export const PRODUCT_METADATA_TABLE = 'Product-Metadata';

/* Supabase RPC Names */
export const RPC_GET_MAKE_RELATION = 'get_make_relation';
export const RPC_GET_UNIQUE_YEARS = 'get_unique_years';
export const RPC_GET_DISTINCT_SEAT_COVERS_REVIEW_IMAGES =
  'get_distinct_seat_covers_review_images';
export const RPC_GET_DISTINCT_REVIEW_IMAGES = 'get_distinct_review_images';
export const RPC_GET_SEAT_COVERS_PRODUCT_REVIEWS_SUMMARY =
  'get_seat_covers_product_reviews_summary';
export const RPC_GET_PRODUCT_REVIEWS_SUMMARY = 'get_product_reviews_summary';
export const RPC_GET_SEAT_COVER_SORTED_BY_COLOR =
  'get_seat_cover_products_sorted_by_color';
export const RPC_GET_DISTINCT_MAKES_BY_TYPE = 'get_distinct_makes_by_type';
export const RPC_GET_DISTINCT_MAKES_BY_TYPE_SEATCOVERS =
  'get_distinct_makes_by_type_seatcover';
export const RPC_GET_DISTINCT_YEAR_GENERATION_BY_TYPE_MAKE_MODEL =
  'get_distinct_year_generation_by_type_make_model_year';

export const RPC_GET_MODEL_BY_TYPE_ID_MAKE_ID_RElATION =
  'get_model_by_type_id_make_id_relation';
export const RPC_GET_DISTINCT_MODELS_BY_TYPE_MAKE =
  'get_distinct_models_by_type_make';
export const RPC_GET_DISTINCT_MODELS_BY_TYPE_MAKE_SLUG =
  'get_distinct_models_by_type_make_slug';
export const RPC_GET_DISTINCT_YEARS_BY_TYPE_MAKE_MODEL =
  'get_distinct_years_by_type_make_model';
