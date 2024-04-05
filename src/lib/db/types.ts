export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "_new-products-03-2024": {
        Row: {
          display_color: string | null
          display_id: string | null
          feature: string | null
          make: string | null
          model: string | null
          msrp: string | null
          parent_generation: string | null
          price: string | null
          product: string | null
          sku: string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
        }
        Insert: {
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          make?: string | null
          model?: string | null
          msrp?: string | null
          parent_generation?: string | null
          price?: string | null
          product?: string | null
          sku?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Update: {
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          make?: string | null
          model?: string | null
          msrp?: string | null
          parent_generation?: string | null
          price?: string | null
          product?: string | null
          sku?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      _Orders: {
        Row: {
          created_at: string
          is_complete: boolean
          order_id: string
          skus: string[]
          total: number
        }
        Insert: {
          created_at?: string
          is_complete?: boolean
          order_id?: string
          skus?: string[]
          total?: number
        }
        Update: {
          created_at?: string
          is_complete?: boolean
          order_id?: string
          skus?: string[]
          total?: number
        }
        Relationships: []
      }
      "_Products-2024": {
        Row: {
          base_sku: string | null
          display_color: string | null
          display_id: string | null
          feature: string | null
          make: string | null
          model: string | null
          msrp: string | null
          price: string | null
          product: string | null
          product_name: string | null
          product_type: string | null
          sku: string | null
          sku_suffix: string | null
          submodel1: string | null
          submodel2: string | null
          type: string | null
          year_generation: string | null
        }
        Insert: {
          base_sku?: string | null
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          make?: string | null
          model?: string | null
          msrp?: string | null
          price?: string | null
          product?: string | null
          product_name?: string | null
          product_type?: string | null
          sku?: string | null
          sku_suffix?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Update: {
          base_sku?: string | null
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          make?: string | null
          model?: string | null
          msrp?: string | null
          price?: string | null
          product?: string | null
          product_name?: string | null
          product_type?: string | null
          sku?: string | null
          sku_suffix?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      "_reviews-2_duplicate": {
        Row: {
          helpful: number | null
          make: string | null
          make_slug: string | null
          Mirror: string | null
          model: string | null
          model_slug: string | null
          parent_generation: string | null
          product_name: string | null
          product_type: string | null
          rating_stars: number | null
          review_author: string | null
          review_description: string | null
          review_image: string | null
          review_title: string | null
          reviewed_at: string
          Size: string | null
          sku: string | null
          submodel1: string | null
          submodel2: string | null
          type: string | null
          year_generation: string | null
        }
        Insert: {
          helpful?: number | null
          make?: string | null
          make_slug?: string | null
          Mirror?: string | null
          model?: string | null
          model_slug?: string | null
          parent_generation?: string | null
          product_name?: string | null
          product_type?: string | null
          rating_stars?: number | null
          review_author?: string | null
          review_description?: string | null
          review_image?: string | null
          review_title?: string | null
          reviewed_at?: string
          Size?: string | null
          sku?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Update: {
          helpful?: number | null
          make?: string | null
          make_slug?: string | null
          Mirror?: string | null
          model?: string | null
          model_slug?: string | null
          parent_generation?: string | null
          product_name?: string | null
          product_type?: string | null
          rating_stars?: number | null
          review_author?: string | null
          review_description?: string | null
          review_image?: string | null
          review_title?: string | null
          reviewed_at?: string
          Size?: string | null
          sku?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      "_Subscriber-Emails": {
        Row: {
          email: string | null
          id: number
        }
        Insert: {
          email?: string | null
          id?: number
        }
        Update: {
          email?: string | null
          id?: number
        }
        Relationships: []
      }
      _temp_orders: {
        Row: {
          created_at: string
          id: number
          order: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          order?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          order?: string | null
        }
        Relationships: []
      }
      Analytics: {
        Row: {
          action: string
          details: string | null
          id: number
          sku: string | null
          timestamp: string
          url: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          details?: string | null
          id?: number
          sku?: string | null
          timestamp?: string
          url?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          details?: string | null
          id?: number
          sku?: string | null
          timestamp?: string
          url?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      "Car-Data-Master": {
        Row: {
          base_sku: string | null
          display_color: string | null
          display_id: string | null
          feature: string | null
          make: string | null
          make_string: string | null
          model: string | null
          model_string: string | null
          msrp: string | null
          parent_generation: string | null
          price: string | null
          product: string | null
          product_name: string | null
          product_type: string | null
          sku: string
          sku_suffix: string | null
          submodel1: string | null
          submodel2: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          base_sku?: string | null
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          make?: string | null
          make_string?: string | null
          model?: string | null
          model_string?: string | null
          msrp?: string | null
          parent_generation?: string | null
          price?: string | null
          product?: string | null
          product_name?: string | null
          product_type?: string | null
          sku: string
          sku_suffix?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          base_sku?: string | null
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          make?: string | null
          make_string?: string | null
          model?: string | null
          model_string?: string | null
          msrp?: string | null
          parent_generation?: string | null
          price?: string | null
          product?: string | null
          product_name?: string | null
          product_type?: string | null
          sku?: string
          sku_suffix?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      gpt_fix_helpful_count: {
        Row: {
          helpful: number | null
          id: string | null
          review_image: string | null
          type: string | null
        }
        Insert: {
          helpful?: number | null
          id?: string | null
          review_image?: string | null
          type?: string | null
        }
        Update: {
          helpful?: number | null
          id?: string | null
          review_image?: string | null
          type?: string | null
        }
        Relationships: []
      }
      "gpt-reviews": {
        Row: {
          helpful: number | null
          id: string
          make: string | null
          model: string | null
          parent_generation: string | null
          rating_stars: number | null
          review_author: string | null
          review_description: string | null
          review_image: string | null
          review_title: string | null
          reviewed_at: string
          type: string | null
        }
        Insert: {
          helpful?: number | null
          id?: string
          make?: string | null
          model?: string | null
          parent_generation?: string | null
          rating_stars?: number | null
          review_author?: string | null
          review_description?: string | null
          review_image?: string | null
          review_title?: string | null
          reviewed_at?: string
          type?: string | null
        }
        Update: {
          helpful?: number | null
          id?: string
          make?: string | null
          model?: string | null
          parent_generation?: string | null
          rating_stars?: number | null
          review_author?: string | null
          review_description?: string | null
          review_image?: string | null
          review_title?: string | null
          reviewed_at?: string
          type?: string | null
        }
        Relationships: []
      }
      "gpt-reviews-critical": {
        Row: {
          helpful: number | null
          id: string
          make: string | null
          model: string | null
          parent_generation: string | null
          rating_stars: number | null
          review_author: string | null
          review_description: string | null
          review_image: string | null
          review_title: string | null
          reviewed_at: string
          type: string | null
        }
        Insert: {
          helpful?: number | null
          id?: string
          make?: string | null
          model?: string | null
          parent_generation?: string | null
          rating_stars?: number | null
          review_author?: string | null
          review_description?: string | null
          review_image?: string | null
          review_title?: string | null
          reviewed_at?: string
          type?: string | null
        }
        Update: {
          helpful?: number | null
          id?: string
          make?: string | null
          model?: string | null
          parent_generation?: string | null
          rating_stars?: number | null
          review_author?: string | null
          review_description?: string | null
          review_image?: string | null
          review_title?: string | null
          reviewed_at?: string
          type?: string | null
        }
        Relationships: []
      }
      "gpt-reviews-remaining": {
        Row: {
          helpful: number | null
          id: string
          make: string | null
          model: string | null
          parent_generation: string | null
          rating_stars: number | null
          review_author: string | null
          review_description: string | null
          review_image: string | null
          review_title: string | null
          reviewed_at: string
          type: string | null
        }
        Insert: {
          helpful?: number | null
          id?: string
          make?: string | null
          model?: string | null
          parent_generation?: string | null
          rating_stars?: number | null
          review_author?: string | null
          review_description?: string | null
          review_image?: string | null
          review_title?: string | null
          reviewed_at?: string
          type?: string | null
        }
        Update: {
          helpful?: number | null
          id?: string
          make?: string | null
          model?: string | null
          parent_generation?: string | null
          rating_stars?: number | null
          review_author?: string | null
          review_description?: string | null
          review_image?: string | null
          review_title?: string | null
          reviewed_at?: string
          type?: string | null
        }
        Relationships: []
      }
      "gpt-reviews-remaining-fix-helpful-count": {
        Row: {
          helpful: number | null
          id: string | null
          review_image: string | null
          type: string | null
        }
        Insert: {
          helpful?: number | null
          id?: string | null
          review_image?: string | null
          type?: string | null
        }
        Update: {
          helpful?: number | null
          id?: string | null
          review_image?: string | null
          type?: string | null
        }
        Relationships: []
      }
      Makes: {
        Row: {
          id: number
          make: string
        }
        Insert: {
          id?: number
          make: string
        }
        Update: {
          id?: number
          make?: string
        }
        Relationships: []
      }
      Models: {
        Row: {
          id: number
          make: string
          model: string
        }
        Insert: {
          id?: number
          make: string
          model: string
        }
        Update: {
          id?: number
          make?: string
          model?: string
        }
        Relationships: [
          {
            foreignKeyName: "Models_make_fkey"
            columns: ["make"]
            isOneToOne: false
            referencedRelation: "Makes"
            referencedColumns: ["make"]
          },
        ]
      }
      Orders: {
        Row: {
          billing_address: Json | null
          discount_total: number | null
          email: string | null
          first_name: string | null
          id: number
          last_name: string | null
          order_id: string | null
          order_placed: string | null
          order_subtotal: number | null
          order_total: number | null
          phone_number: string | null
          shipping_address: Json | null
          shipping_method: string | null
          shipping_total: number | null
          user_cart: Json | null
        }
        Insert: {
          billing_address?: Json | null
          discount_total?: number | null
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          order_id?: string | null
          order_placed?: string | null
          order_subtotal?: number | null
          order_total?: number | null
          phone_number?: string | null
          shipping_address?: Json | null
          shipping_method?: string | null
          shipping_total?: number | null
          user_cart?: Json | null
        }
        Update: {
          billing_address?: Json | null
          discount_total?: number | null
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          order_id?: string | null
          order_placed?: string | null
          order_subtotal?: number | null
          order_total?: number | null
          phone_number?: string | null
          shipping_address?: Json | null
          shipping_method?: string | null
          shipping_total?: number | null
          user_cart?: Json | null
        }
        Relationships: []
      }
      product_2024_join: {
        Row: {
          base_sku: string | null
          display_color: string | null
          display_id: string | null
          feature: string | null
          fk: number | null
          generation_default: string | null
          generation_end: string | null
          generation_start: string | null
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          msrp: string | null
          price: string | null
          product: string | null
          product_name: string | null
          product_type: string | null
          product_url_slug: string | null
          sku: string
          sku_suffix: string | null
          submodel1: string | null
          submodel1_slug: string | null
          submodel2: string | null
          submodel2_slug: string | null
          type: string | null
          year_generation: string | null
          year_range: string | null
        }
        Insert: {
          base_sku?: string | null
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          fk?: number | null
          generation_default?: string | null
          generation_end?: string | null
          generation_start?: string | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          msrp?: string | null
          price?: string | null
          product?: string | null
          product_name?: string | null
          product_type?: string | null
          product_url_slug?: string | null
          sku: string
          sku_suffix?: string | null
          submodel1?: string | null
          submodel1_slug?: string | null
          submodel2?: string | null
          submodel2_slug?: string | null
          type?: string | null
          year_generation?: string | null
          year_range?: string | null
        }
        Update: {
          base_sku?: string | null
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          fk?: number | null
          generation_default?: string | null
          generation_end?: string | null
          generation_start?: string | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          msrp?: string | null
          price?: string | null
          product?: string | null
          product_name?: string | null
          product_type?: string | null
          product_url_slug?: string | null
          sku?: string
          sku_suffix?: string | null
          submodel1?: string | null
          submodel1_slug?: string | null
          submodel2?: string | null
          submodel2_slug?: string | null
          type?: string | null
          year_generation?: string | null
          year_range?: string | null
        }
        Relationships: []
      }
      "Product-Promo-Codes": {
        Row: {
          created_at: string
          discount_type: string | null
          discount_value: number | null
          expiry_date: string | null
          id: number
          level: string | null
          minimum_purchase: number | null
          name: string | null
          product_skus: string | null
        }
        Insert: {
          created_at?: string
          discount_type?: string | null
          discount_value?: number | null
          expiry_date?: string | null
          id?: number
          level?: string | null
          minimum_purchase?: number | null
          name?: string | null
          product_skus?: string | null
        }
        Update: {
          created_at?: string
          discount_type?: string | null
          discount_value?: number | null
          expiry_date?: string | null
          id?: number
          level?: string | null
          minimum_purchase?: number | null
          name?: string | null
          product_skus?: string | null
        }
        Relationships: []
      }
      "Product-Reviews-02-2024": {
        Row: {
          helpful: string | null
          make: string | null
          Mirror: string | null
          model: string | null
          product_name: string | null
          product_type: string | null
          rating_stars: number | null
          review_author: string | null
          review_description: string | null
          review_image: string | null
          review_title: string | null
          Size: string | null
          sku: string | null
          submodel1: string | null
          submodel2: string | null
          type: string | null
          year_generation: string | null
        }
        Insert: {
          helpful?: string | null
          make?: string | null
          Mirror?: string | null
          model?: string | null
          product_name?: string | null
          product_type?: string | null
          rating_stars?: number | null
          review_author?: string | null
          review_description?: string | null
          review_image?: string | null
          review_title?: string | null
          Size?: string | null
          sku?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Update: {
          helpful?: string | null
          make?: string | null
          Mirror?: string | null
          model?: string | null
          product_name?: string | null
          product_type?: string | null
          rating_stars?: number | null
          review_author?: string | null
          review_description?: string | null
          review_image?: string | null
          review_title?: string | null
          Size?: string | null
          sku?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      Products: {
        Row: {
          bannerimage: string | null
          bannerimage_m: string | null
          color_code_pe_bkgr_str: string | null
          color_code_pe_bkrd_str: string | null
          color_code_pp_bkgr_2to: string | null
          color_code_pp_bkgr_str: string | null
          color_code_pp_bkrd_2to: string | null
          color_code_pp_bkrd_str: string | null
          color_code_pp_grbk_str: string | null
          color_code_pp_grbk_tri: string | null
          color_code_ps_gr_1to: string | null
          color_code_sp_gr_1to: string | null
          color_code_ss_gr_1to: string | null
          color_url_pe_bkgr_str: string | null
          color_url_pe_bkrd_str: string | null
          color_url_pp_bkgr_2to: string | null
          color_url_pp_bkgr_str: string | null
          color_url_pp_bkrd_2to: string | null
          color_url_pp_bkrd_str: string | null
          color_url_pp_grbk_str: string | null
          color_url_pp_grbk_tri: string | null
          color_url_ps_gr_1to: string | null
          color_url_sp_gr_1to: string | null
          color_url_ss_gr_1to: string | null
          cover_type_pe_bkgr_str: string | null
          cover_type_pe_bkrd_str: string | null
          cover_type_pp_bkgr_2to: string | null
          cover_type_pp_bkgr_str: string | null
          cover_type_pp_bkrd_2to: string | null
          cover_type_pp_bkrd_str: string | null
          cover_type_pp_grbk_str: string | null
          cover_type_pp_grbk_tri: string | null
          cover_type_ps_gr_1to: string | null
          cover_type_sp_gr_1to: string | null
          cover_type_ss_gr_1to: string | null
          default_make_images: string | null
          default_model_images: string | null
          display_color_pe_bkgr_str: string | null
          display_color_pe_bkrd_str: string | null
          display_color_pp_bkgr_2to: string | null
          display_color_pp_bkgr_str: string | null
          display_color_pp_bkrd_2to: string | null
          display_color_pp_bkrd_str: string | null
          display_color_pp_grbk_str: string | null
          display_color_pp_grbk_tri: string | null
          display_color_ps_gr_1to: string | null
          display_color_sp_gr_1to: string | null
          display_color_ss_gr_1to: string | null
          display_id_pe_bkgr_str: string | null
          display_id_pe_bkrd_str: string | null
          display_id_pp_bkgr_2to: string | null
          display_id_pp_bkgr_str: string | null
          display_id_pp_bkrd_2to: string | null
          display_id_pp_bkrd_str: string | null
          display_id_pp_grbk_str: string | null
          display_id_pp_grbk_tri: string | null
          display_id_ps_gr_1to: string | null
          display_id_sp_gr_1to: string | null
          display_id_ss_gr_1to: string | null
          display_quantity_pe_bkgr_str: string | null
          display_quantity_pe_bkrd_str: string | null
          display_quantity_pp_bkgr_2to: string | null
          display_quantity_pp_bkgr_str: string | null
          display_quantity_pp_bkrd_2to: string | null
          display_quantity_pp_bkrd_str: string | null
          display_quantity_pp_grbk_str: string | null
          display_quantity_pp_grbk_tri: string | null
          display_quantity_ps_gr_1to: string | null
          display_quantity_sp_gr_1to: string | null
          display_quantity_ss_gr_1to: string | null
          feature_pe_bkgr_str: string | null
          feature_pe_bkrd_str: string | null
          feature_pp_bkgr_2to: string | null
          feature_pp_bkgr_str: string | null
          feature_pp_bkrd_2to: string | null
          feature_pp_bkrd_str: string | null
          feature_pp_grbk_str: string | null
          feature_pp_grbk_tri: string | null
          feature_ps_gr_1to: string | null
          feature_sp_gr_1to: string | null
          feature_ss_gr_1to: string | null
          fk: number
          generation_default: number | null
          listpage_gallery_image: string | null
          make: string | null
          make_id: number | null
          mirror: string | null
          model: string | null
          model_id: string | null
          msrp_pe_bkgr_str: string | null
          msrp_pe_bkrd_str: string | null
          msrp_pp_bkgr_2to: string | null
          msrp_pp_bkgr_str: number | null
          msrp_pp_bkrd_2to: string | null
          msrp_pp_bkrd_str: string | null
          msrp_pp_grbk_str: string | null
          msrp_pp_grbk_tri: string | null
          msrp_ps_gr_1to: number | null
          msrp_sp_gr_1to: number | null
          msrp_ss_gr_1to: number | null
          OR: string | null
          price_pe_bkgr_str: string | null
          price_pe_bkrd_str: string | null
          price_pp_bkgr_2to: string | null
          price_pp_bkgr_str: number | null
          price_pp_bkrd_2to: string | null
          price_pp_bkrd_str: string | null
          price_pp_grbk_str: string | null
          price_pp_grbk_tri: string | null
          price_ps_gr_1to: number | null
          price_sp_gr_1to: string | null
          price_ss_gr_1to: string | null
          product_pe_bkgr_str: string | null
          product_pe_bkrd_str: string | null
          product_pp_bkgr_2to: string | null
          product_pp_bkgr_str: string | null
          product_pp_bkrd_2to: string | null
          product_pp_bkrd_str: string | null
          product_pp_grbk_str: string | null
          product_pp_grbk_tri: string | null
          product_ps_gr_1to: string | null
          product_sp_gr_1to: string | null
          product_ss_gr_1to: string | null
          quantity_pe_bkgr_str: string | null
          quantity_pe_bkrd_str: string | null
          quantity_pp_bkgr_2to: string | null
          quantity_pp_bkgr_str: string | null
          quantity_pp_bkrd_2to: string | null
          quantity_pp_bkrd_str: string | null
          quantity_pp_grbk_str: string | null
          quantity_pp_grbk_tri: string | null
          quantity_ps_gr_1to: string | null
          quantity_sp_gr_1to: string | null
          quantity_ss_gr_1to: string | null
          Size: string | null
          SKU_pe_bkgr_str: string | null
          SKU_pe_bkrd_str: string | null
          SKU_pp_bkgr_2to: string | null
          SKU_pp_bkgr_str: string | null
          SKU_pp_bkrd_2to: string | null
          SKU_pp_bkrd_str: string | null
          SKU_pp_grbk_str: string | null
          SKU_pp_grbk_tri: string | null
          SKU_ps_gr_1to: string | null
          SKU_sp_gr_1to: string | null
          SKU_ss_gr_1to: string | null
          sub1_id: string | null
          sub2_id: string | null
          sub3_id: string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          uc_description: string | null
          uc_image_link: string | null
          uc_title: string | null
          year_generation: string | null
          year_id: string | null
          year_options: string | null
        }
        Insert: {
          bannerimage?: string | null
          bannerimage_m?: string | null
          color_code_pe_bkgr_str?: string | null
          color_code_pe_bkrd_str?: string | null
          color_code_pp_bkgr_2to?: string | null
          color_code_pp_bkgr_str?: string | null
          color_code_pp_bkrd_2to?: string | null
          color_code_pp_bkrd_str?: string | null
          color_code_pp_grbk_str?: string | null
          color_code_pp_grbk_tri?: string | null
          color_code_ps_gr_1to?: string | null
          color_code_sp_gr_1to?: string | null
          color_code_ss_gr_1to?: string | null
          color_url_pe_bkgr_str?: string | null
          color_url_pe_bkrd_str?: string | null
          color_url_pp_bkgr_2to?: string | null
          color_url_pp_bkgr_str?: string | null
          color_url_pp_bkrd_2to?: string | null
          color_url_pp_bkrd_str?: string | null
          color_url_pp_grbk_str?: string | null
          color_url_pp_grbk_tri?: string | null
          color_url_ps_gr_1to?: string | null
          color_url_sp_gr_1to?: string | null
          color_url_ss_gr_1to?: string | null
          cover_type_pe_bkgr_str?: string | null
          cover_type_pe_bkrd_str?: string | null
          cover_type_pp_bkgr_2to?: string | null
          cover_type_pp_bkgr_str?: string | null
          cover_type_pp_bkrd_2to?: string | null
          cover_type_pp_bkrd_str?: string | null
          cover_type_pp_grbk_str?: string | null
          cover_type_pp_grbk_tri?: string | null
          cover_type_ps_gr_1to?: string | null
          cover_type_sp_gr_1to?: string | null
          cover_type_ss_gr_1to?: string | null
          default_make_images?: string | null
          default_model_images?: string | null
          display_color_pe_bkgr_str?: string | null
          display_color_pe_bkrd_str?: string | null
          display_color_pp_bkgr_2to?: string | null
          display_color_pp_bkgr_str?: string | null
          display_color_pp_bkrd_2to?: string | null
          display_color_pp_bkrd_str?: string | null
          display_color_pp_grbk_str?: string | null
          display_color_pp_grbk_tri?: string | null
          display_color_ps_gr_1to?: string | null
          display_color_sp_gr_1to?: string | null
          display_color_ss_gr_1to?: string | null
          display_id_pe_bkgr_str?: string | null
          display_id_pe_bkrd_str?: string | null
          display_id_pp_bkgr_2to?: string | null
          display_id_pp_bkgr_str?: string | null
          display_id_pp_bkrd_2to?: string | null
          display_id_pp_bkrd_str?: string | null
          display_id_pp_grbk_str?: string | null
          display_id_pp_grbk_tri?: string | null
          display_id_ps_gr_1to?: string | null
          display_id_sp_gr_1to?: string | null
          display_id_ss_gr_1to?: string | null
          display_quantity_pe_bkgr_str?: string | null
          display_quantity_pe_bkrd_str?: string | null
          display_quantity_pp_bkgr_2to?: string | null
          display_quantity_pp_bkgr_str?: string | null
          display_quantity_pp_bkrd_2to?: string | null
          display_quantity_pp_bkrd_str?: string | null
          display_quantity_pp_grbk_str?: string | null
          display_quantity_pp_grbk_tri?: string | null
          display_quantity_ps_gr_1to?: string | null
          display_quantity_sp_gr_1to?: string | null
          display_quantity_ss_gr_1to?: string | null
          feature_pe_bkgr_str?: string | null
          feature_pe_bkrd_str?: string | null
          feature_pp_bkgr_2to?: string | null
          feature_pp_bkgr_str?: string | null
          feature_pp_bkrd_2to?: string | null
          feature_pp_bkrd_str?: string | null
          feature_pp_grbk_str?: string | null
          feature_pp_grbk_tri?: string | null
          feature_ps_gr_1to?: string | null
          feature_sp_gr_1to?: string | null
          feature_ss_gr_1to?: string | null
          fk: number
          generation_default?: number | null
          listpage_gallery_image?: string | null
          make?: string | null
          make_id?: number | null
          mirror?: string | null
          model?: string | null
          model_id?: string | null
          msrp_pe_bkgr_str?: string | null
          msrp_pe_bkrd_str?: string | null
          msrp_pp_bkgr_2to?: string | null
          msrp_pp_bkgr_str?: number | null
          msrp_pp_bkrd_2to?: string | null
          msrp_pp_bkrd_str?: string | null
          msrp_pp_grbk_str?: string | null
          msrp_pp_grbk_tri?: string | null
          msrp_ps_gr_1to?: number | null
          msrp_sp_gr_1to?: number | null
          msrp_ss_gr_1to?: number | null
          OR?: string | null
          price_pe_bkgr_str?: string | null
          price_pe_bkrd_str?: string | null
          price_pp_bkgr_2to?: string | null
          price_pp_bkgr_str?: number | null
          price_pp_bkrd_2to?: string | null
          price_pp_bkrd_str?: string | null
          price_pp_grbk_str?: string | null
          price_pp_grbk_tri?: string | null
          price_ps_gr_1to?: number | null
          price_sp_gr_1to?: string | null
          price_ss_gr_1to?: string | null
          product_pe_bkgr_str?: string | null
          product_pe_bkrd_str?: string | null
          product_pp_bkgr_2to?: string | null
          product_pp_bkgr_str?: string | null
          product_pp_bkrd_2to?: string | null
          product_pp_bkrd_str?: string | null
          product_pp_grbk_str?: string | null
          product_pp_grbk_tri?: string | null
          product_ps_gr_1to?: string | null
          product_sp_gr_1to?: string | null
          product_ss_gr_1to?: string | null
          quantity_pe_bkgr_str?: string | null
          quantity_pe_bkrd_str?: string | null
          quantity_pp_bkgr_2to?: string | null
          quantity_pp_bkgr_str?: string | null
          quantity_pp_bkrd_2to?: string | null
          quantity_pp_bkrd_str?: string | null
          quantity_pp_grbk_str?: string | null
          quantity_pp_grbk_tri?: string | null
          quantity_ps_gr_1to?: string | null
          quantity_sp_gr_1to?: string | null
          quantity_ss_gr_1to?: string | null
          Size?: string | null
          SKU_pe_bkgr_str?: string | null
          SKU_pe_bkrd_str?: string | null
          SKU_pp_bkgr_2to?: string | null
          SKU_pp_bkgr_str?: string | null
          SKU_pp_bkrd_2to?: string | null
          SKU_pp_bkrd_str?: string | null
          SKU_pp_grbk_str?: string | null
          SKU_pp_grbk_tri?: string | null
          SKU_ps_gr_1to?: string | null
          SKU_sp_gr_1to?: string | null
          SKU_ss_gr_1to?: string | null
          sub1_id?: string | null
          sub2_id?: string | null
          sub3_id?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          uc_description?: string | null
          uc_image_link?: string | null
          uc_title?: string | null
          year_generation?: string | null
          year_id?: string | null
          year_options?: string | null
        }
        Update: {
          bannerimage?: string | null
          bannerimage_m?: string | null
          color_code_pe_bkgr_str?: string | null
          color_code_pe_bkrd_str?: string | null
          color_code_pp_bkgr_2to?: string | null
          color_code_pp_bkgr_str?: string | null
          color_code_pp_bkrd_2to?: string | null
          color_code_pp_bkrd_str?: string | null
          color_code_pp_grbk_str?: string | null
          color_code_pp_grbk_tri?: string | null
          color_code_ps_gr_1to?: string | null
          color_code_sp_gr_1to?: string | null
          color_code_ss_gr_1to?: string | null
          color_url_pe_bkgr_str?: string | null
          color_url_pe_bkrd_str?: string | null
          color_url_pp_bkgr_2to?: string | null
          color_url_pp_bkgr_str?: string | null
          color_url_pp_bkrd_2to?: string | null
          color_url_pp_bkrd_str?: string | null
          color_url_pp_grbk_str?: string | null
          color_url_pp_grbk_tri?: string | null
          color_url_ps_gr_1to?: string | null
          color_url_sp_gr_1to?: string | null
          color_url_ss_gr_1to?: string | null
          cover_type_pe_bkgr_str?: string | null
          cover_type_pe_bkrd_str?: string | null
          cover_type_pp_bkgr_2to?: string | null
          cover_type_pp_bkgr_str?: string | null
          cover_type_pp_bkrd_2to?: string | null
          cover_type_pp_bkrd_str?: string | null
          cover_type_pp_grbk_str?: string | null
          cover_type_pp_grbk_tri?: string | null
          cover_type_ps_gr_1to?: string | null
          cover_type_sp_gr_1to?: string | null
          cover_type_ss_gr_1to?: string | null
          default_make_images?: string | null
          default_model_images?: string | null
          display_color_pe_bkgr_str?: string | null
          display_color_pe_bkrd_str?: string | null
          display_color_pp_bkgr_2to?: string | null
          display_color_pp_bkgr_str?: string | null
          display_color_pp_bkrd_2to?: string | null
          display_color_pp_bkrd_str?: string | null
          display_color_pp_grbk_str?: string | null
          display_color_pp_grbk_tri?: string | null
          display_color_ps_gr_1to?: string | null
          display_color_sp_gr_1to?: string | null
          display_color_ss_gr_1to?: string | null
          display_id_pe_bkgr_str?: string | null
          display_id_pe_bkrd_str?: string | null
          display_id_pp_bkgr_2to?: string | null
          display_id_pp_bkgr_str?: string | null
          display_id_pp_bkrd_2to?: string | null
          display_id_pp_bkrd_str?: string | null
          display_id_pp_grbk_str?: string | null
          display_id_pp_grbk_tri?: string | null
          display_id_ps_gr_1to?: string | null
          display_id_sp_gr_1to?: string | null
          display_id_ss_gr_1to?: string | null
          display_quantity_pe_bkgr_str?: string | null
          display_quantity_pe_bkrd_str?: string | null
          display_quantity_pp_bkgr_2to?: string | null
          display_quantity_pp_bkgr_str?: string | null
          display_quantity_pp_bkrd_2to?: string | null
          display_quantity_pp_bkrd_str?: string | null
          display_quantity_pp_grbk_str?: string | null
          display_quantity_pp_grbk_tri?: string | null
          display_quantity_ps_gr_1to?: string | null
          display_quantity_sp_gr_1to?: string | null
          display_quantity_ss_gr_1to?: string | null
          feature_pe_bkgr_str?: string | null
          feature_pe_bkrd_str?: string | null
          feature_pp_bkgr_2to?: string | null
          feature_pp_bkgr_str?: string | null
          feature_pp_bkrd_2to?: string | null
          feature_pp_bkrd_str?: string | null
          feature_pp_grbk_str?: string | null
          feature_pp_grbk_tri?: string | null
          feature_ps_gr_1to?: string | null
          feature_sp_gr_1to?: string | null
          feature_ss_gr_1to?: string | null
          fk?: number
          generation_default?: number | null
          listpage_gallery_image?: string | null
          make?: string | null
          make_id?: number | null
          mirror?: string | null
          model?: string | null
          model_id?: string | null
          msrp_pe_bkgr_str?: string | null
          msrp_pe_bkrd_str?: string | null
          msrp_pp_bkgr_2to?: string | null
          msrp_pp_bkgr_str?: number | null
          msrp_pp_bkrd_2to?: string | null
          msrp_pp_bkrd_str?: string | null
          msrp_pp_grbk_str?: string | null
          msrp_pp_grbk_tri?: string | null
          msrp_ps_gr_1to?: number | null
          msrp_sp_gr_1to?: number | null
          msrp_ss_gr_1to?: number | null
          OR?: string | null
          price_pe_bkgr_str?: string | null
          price_pe_bkrd_str?: string | null
          price_pp_bkgr_2to?: string | null
          price_pp_bkgr_str?: number | null
          price_pp_bkrd_2to?: string | null
          price_pp_bkrd_str?: string | null
          price_pp_grbk_str?: string | null
          price_pp_grbk_tri?: string | null
          price_ps_gr_1to?: number | null
          price_sp_gr_1to?: string | null
          price_ss_gr_1to?: string | null
          product_pe_bkgr_str?: string | null
          product_pe_bkrd_str?: string | null
          product_pp_bkgr_2to?: string | null
          product_pp_bkgr_str?: string | null
          product_pp_bkrd_2to?: string | null
          product_pp_bkrd_str?: string | null
          product_pp_grbk_str?: string | null
          product_pp_grbk_tri?: string | null
          product_ps_gr_1to?: string | null
          product_sp_gr_1to?: string | null
          product_ss_gr_1to?: string | null
          quantity_pe_bkgr_str?: string | null
          quantity_pe_bkrd_str?: string | null
          quantity_pp_bkgr_2to?: string | null
          quantity_pp_bkgr_str?: string | null
          quantity_pp_bkrd_2to?: string | null
          quantity_pp_bkrd_str?: string | null
          quantity_pp_grbk_str?: string | null
          quantity_pp_grbk_tri?: string | null
          quantity_ps_gr_1to?: string | null
          quantity_sp_gr_1to?: string | null
          quantity_ss_gr_1to?: string | null
          Size?: string | null
          SKU_pe_bkgr_str?: string | null
          SKU_pe_bkrd_str?: string | null
          SKU_pp_bkgr_2to?: string | null
          SKU_pp_bkgr_str?: string | null
          SKU_pp_bkrd_2to?: string | null
          SKU_pp_bkrd_str?: string | null
          SKU_pp_grbk_str?: string | null
          SKU_pp_grbk_tri?: string | null
          SKU_ps_gr_1to?: string | null
          SKU_sp_gr_1to?: string | null
          SKU_ss_gr_1to?: string | null
          sub1_id?: string | null
          sub2_id?: string | null
          sub3_id?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          uc_description?: string | null
          uc_image_link?: string | null
          uc_title?: string | null
          year_generation?: string | null
          year_id?: string | null
          year_options?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Products_generation_default_fkey"
            columns: ["generation_default"]
            isOneToOne: false
            referencedRelation: "product_join_mv"
            referencedColumns: ["fk"]
          },
          {
            foreignKeyName: "Products_generation_default_fkey"
            columns: ["generation_default"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["fk"]
          },
        ]
      }
      "Products-2024": {
        Row: {
          base_sku: string | null
          display_color: string | null
          display_id: string | null
          feature: string | null
          fk: number | null
          generation_end: string | null
          generation_start: string | null
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          msrp: string | null
          parent_generation: string | null
          price: string | null
          product: string | null
          product_name: string | null
          product_type: string | null
          product_url_slug: string | null
          sku: string
          sku_suffix: string | null
          submodel1: string | null
          submodel1_slug: string | null
          submodel2: string | null
          submodel2_slug: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          base_sku?: string | null
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          fk?: number | null
          generation_end?: string | null
          generation_start?: string | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          msrp?: string | null
          parent_generation?: string | null
          price?: string | null
          product?: string | null
          product_name?: string | null
          product_type?: string | null
          product_url_slug?: string | null
          sku: string
          sku_suffix?: string | null
          submodel1?: string | null
          submodel1_slug?: string | null
          submodel2?: string | null
          submodel2_slug?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          base_sku?: string | null
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          fk?: number | null
          generation_end?: string | null
          generation_start?: string | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          msrp?: string | null
          parent_generation?: string | null
          price?: string | null
          product?: string | null
          product_name?: string | null
          product_type?: string | null
          product_url_slug?: string | null
          sku?: string
          sku_suffix?: string | null
          submodel1?: string | null
          submodel1_slug?: string | null
          submodel2?: string | null
          submodel2_slug?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      "Products-2024-2": {
        Row: {
          base_sku: string | null
          display_color: string | null
          display_id: string | null
          feature: string | null
          fk: number | null
          generation_end: string | null
          generation_start: string | null
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          msrp: string | null
          parent_generation: string | null
          price: string | null
          product: string | null
          product_name: string | null
          product_type: string | null
          product_url_slug: string | null
          sku: string
          sku_suffix: string | null
          submodel1: string | null
          submodel1_slug: string | null
          submodel2: string | null
          submodel2_slug: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          base_sku?: string | null
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          fk?: number | null
          generation_end?: string | null
          generation_start?: string | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          msrp?: string | null
          parent_generation?: string | null
          price?: string | null
          product?: string | null
          product_name?: string | null
          product_type?: string | null
          product_url_slug?: string | null
          sku: string
          sku_suffix?: string | null
          submodel1?: string | null
          submodel1_slug?: string | null
          submodel2?: string | null
          submodel2_slug?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          base_sku?: string | null
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          fk?: number | null
          generation_end?: string | null
          generation_start?: string | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          msrp?: string | null
          parent_generation?: string | null
          price?: string | null
          product?: string | null
          product_name?: string | null
          product_type?: string | null
          product_url_slug?: string | null
          sku?: string
          sku_suffix?: string | null
          submodel1?: string | null
          submodel1_slug?: string | null
          submodel2?: string | null
          submodel2_slug?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      "Products-Data-02-2024": {
        Row: {
          base_sku: string | null
          display_color: string | null
          display_id: string | null
          feature: string | null
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          msrp: string | null
          parent_generation: string | null
          price: string | null
          product: string | null
          product_name: string | null
          product_type: string | null
          sku: string
          sku_suffix: string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          base_sku?: string | null
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          msrp?: string | null
          parent_generation?: string | null
          price?: string | null
          product?: string | null
          product_name?: string | null
          product_type?: string | null
          sku: string
          sku_suffix?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          base_sku?: string | null
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          msrp?: string | null
          parent_generation?: string | null
          price?: string | null
          product?: string | null
          product_name?: string | null
          product_type?: string | null
          sku?: string
          sku_suffix?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      "reviews-2": {
        Row: {
          gpt_review_id: string | null
          helpful: number | null
          id: string
          make: string | null
          make_slug: string | null
          Mirror: string | null
          model: string | null
          model_slug: string | null
          parent_generation: string | null
          product_name: string | null
          product_type: string | null
          rating_stars: number | null
          review_author: string | null
          review_description: string | null
          review_image: string | null
          review_title: string | null
          reviewed_at: string
          Size: string | null
          sku: string | null
          submodel1: string | null
          submodel2: string | null
          type: string | null
          year_generation: string | null
        }
        Insert: {
          gpt_review_id?: string | null
          helpful?: number | null
          id?: string
          make?: string | null
          make_slug?: string | null
          Mirror?: string | null
          model?: string | null
          model_slug?: string | null
          parent_generation?: string | null
          product_name?: string | null
          product_type?: string | null
          rating_stars?: number | null
          review_author?: string | null
          review_description?: string | null
          review_image?: string | null
          review_title?: string | null
          reviewed_at?: string
          Size?: string | null
          sku?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Update: {
          gpt_review_id?: string | null
          helpful?: number | null
          id?: string
          make?: string | null
          make_slug?: string | null
          Mirror?: string | null
          model?: string | null
          model_slug?: string | null
          parent_generation?: string | null
          product_name?: string | null
          product_type?: string | null
          rating_stars?: number | null
          review_author?: string | null
          review_description?: string | null
          review_image?: string | null
          review_title?: string | null
          reviewed_at?: string
          Size?: string | null
          sku?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      seat_cover_20240322: {
        Row: {
          display_color: string | null
          display_id: string | null
          fk: number | null
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          msrp: number | null
          parent_generation: string | null
          price: number | null
          product: string | null
          quantity: number | null
          sku: string
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          display_color?: string | null
          display_id?: string | null
          fk?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          msrp?: number | null
          parent_generation?: string | null
          price?: number | null
          product?: string | null
          quantity?: number | null
          sku: string
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          display_color?: string | null
          display_id?: string | null
          fk?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          msrp?: number | null
          parent_generation?: string | null
          price?: number | null
          product?: string | null
          quantity?: number | null
          sku?: string
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      seat_cover_20240401: {
        Row: {
          availability: string | null
          display_color: string | null
          display_id: string | null
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          msrp: number | null
          parent_generation: string | null
          price: number | null
          product: string | null
          quantity: number | null
          sku: string
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          availability?: string | null
          display_color?: string | null
          display_id?: string | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          msrp?: number | null
          parent_generation?: string | null
          price?: number | null
          product?: string | null
          quantity?: number | null
          sku: string
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          availability?: string | null
          display_color?: string | null
          display_id?: string | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          msrp?: number | null
          parent_generation?: string | null
          price?: number | null
          product?: string | null
          quantity?: number | null
          sku?: string
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      seat_covers_20240308_duplicate: {
        Row: {
          display_color: string | null
          display_id: string | null
          feature: string | null
          id: string | null
          msrp: number | null
          price: number | null
          product: string | null
          quantity: number | null
          sku: string
          type: string | null
        }
        Insert: {
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          id?: string | null
          msrp?: number | null
          price?: number | null
          product?: string | null
          quantity?: number | null
          sku: string
          type?: string | null
        }
        Update: {
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          id?: string | null
          msrp?: number | null
          price?: number | null
          product?: string | null
          quantity?: number | null
          sku?: string
          type?: string | null
        }
        Relationships: []
      }
      "Stripe-Full-Data": {
        Row: {
          Amount: number | null
          "Amount Refunded": string | null
          Captured: Json | null
          "Card ID": string | null
          "Converted Amount": number | null
          "Converted Amount Refunded": string | null
          "Converted Currency": string | null
          "Created date (UTC)": string | null
          Currency: string | null
          "Customer Description": string | null
          "Customer Email": string | null
          "Customer ID": string | null
          Description: string | null
          Fee: number | null
          "Guest (metadata)": string | null
          id: string | null
          "Invoice ID": string | null
          "Module (metadata)": string | null
          "Order # (metadata)": string | null
          "Payment Location (metadata)": string | null
          "Payment Method (metadata)": string | null
          "Seller Message": string | null
          "Statement Descriptor": string | null
          Status: string | null
          "Taxes On Fee": string | null
          Transfer: string | null
        }
        Insert: {
          Amount?: number | null
          "Amount Refunded"?: string | null
          Captured?: Json | null
          "Card ID"?: string | null
          "Converted Amount"?: number | null
          "Converted Amount Refunded"?: string | null
          "Converted Currency"?: string | null
          "Created date (UTC)"?: string | null
          Currency?: string | null
          "Customer Description"?: string | null
          "Customer Email"?: string | null
          "Customer ID"?: string | null
          Description?: string | null
          Fee?: number | null
          "Guest (metadata)"?: string | null
          id?: string | null
          "Invoice ID"?: string | null
          "Module (metadata)"?: string | null
          "Order # (metadata)"?: string | null
          "Payment Location (metadata)"?: string | null
          "Payment Method (metadata)"?: string | null
          "Seller Message"?: string | null
          "Statement Descriptor"?: string | null
          Status?: string | null
          "Taxes On Fee"?: string | null
          Transfer?: string | null
        }
        Update: {
          Amount?: number | null
          "Amount Refunded"?: string | null
          Captured?: Json | null
          "Card ID"?: string | null
          "Converted Amount"?: number | null
          "Converted Amount Refunded"?: string | null
          "Converted Currency"?: string | null
          "Created date (UTC)"?: string | null
          Currency?: string | null
          "Customer Description"?: string | null
          "Customer Email"?: string | null
          "Customer ID"?: string | null
          Description?: string | null
          Fee?: number | null
          "Guest (metadata)"?: string | null
          id?: string | null
          "Invoice ID"?: string | null
          "Module (metadata)"?: string | null
          "Order # (metadata)"?: string | null
          "Payment Location (metadata)"?: string | null
          "Payment Method (metadata)"?: string | null
          "Seller Message"?: string | null
          "Statement Descriptor"?: string | null
          Status?: string | null
          "Taxes On Fee"?: string | null
          Transfer?: string | null
        }
        Relationships: []
      }
      "Test-Orders": {
        Row: {
          created_at: string
          is_complete: boolean
          order_id: string
          skus: string[]
          total: number
        }
        Insert: {
          created_at?: string
          is_complete?: boolean
          order_id?: string
          skus: string[]
          total: number
        }
        Update: {
          created_at?: string
          is_complete?: boolean
          order_id?: string
          skus?: string[]
          total?: number
        }
        Relationships: []
      }
      type_make_year_distinct: {
        Row: {
          display_id: string | null
          id: string
          make: string | null
          make_slug: string | null
          parent_generation: string | null
          type: string | null
          year_options: string | null
        }
        Insert: {
          display_id?: string | null
          id?: string
          make?: string | null
          make_slug?: string | null
          parent_generation?: string | null
          type?: string | null
          year_options?: string | null
        }
        Update: {
          display_id?: string | null
          id?: string
          make?: string | null
          make_slug?: string | null
          parent_generation?: string | null
          type?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      updated_cleaned_product_list_03082024: {
        Row: {
          display_color: string | null
          display_id: string | null
          feature: string | null
          make: string | null
          model: string | null
          msrp: string | null
          parent_generation: string | null
          price: string | null
          product: string | null
          sku: string
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
        }
        Insert: {
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          make?: string | null
          model?: string | null
          msrp?: string | null
          parent_generation?: string | null
          price?: string | null
          product?: string | null
          sku: string
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Update: {
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          make?: string | null
          model?: string | null
          msrp?: string | null
          parent_generation?: string | null
          price?: string | null
          product?: string | null
          sku?: string
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      updating_product_pictures_20240311: {
        Row: {
          feature: string | null
          new_feature: string | null
          new_product: string | null
          product: string | null
          sku: string
        }
        Insert: {
          feature?: string | null
          new_feature?: string | null
          new_product?: string | null
          product?: string | null
          sku: string
        }
        Update: {
          feature?: string | null
          new_feature?: string | null
          new_product?: string | null
          product?: string | null
          sku?: string
        }
        Relationships: []
      }
      "Vehicle-Makes": {
        Row: {
          created_at: string
          default_make_images: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          default_make_images?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          default_make_images?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      "Vehicle-Models": {
        Row: {
          default_model_images: string | null
          fk: string | null
          generation_default: string | null
          id: number
          name: string | null
        }
        Insert: {
          default_model_images?: string | null
          fk?: string | null
          generation_default?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          default_model_images?: string | null
          fk?: string | null
          generation_default?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      product_join_mv: {
        Row: {
          bannerimage: string | null
          bannerimage_m: string | null
          color_code_pe_bkgr_str: string | null
          color_code_pe_bkrd_str: string | null
          color_code_pp_bkgr_2to: string | null
          color_code_pp_bkgr_str: string | null
          color_code_pp_bkrd_2to: string | null
          color_code_pp_bkrd_str: string | null
          color_code_pp_grbk_str: string | null
          color_code_pp_grbk_tri: string | null
          color_code_ps_gr_1to: string | null
          color_code_sp_gr_1to: string | null
          color_code_ss_gr_1to: string | null
          color_url_pe_bkgr_str: string | null
          color_url_pe_bkrd_str: string | null
          color_url_pp_bkgr_2to: string | null
          color_url_pp_bkgr_str: string | null
          color_url_pp_bkrd_2to: string | null
          color_url_pp_bkrd_str: string | null
          color_url_pp_grbk_str: string | null
          color_url_pp_grbk_tri: string | null
          color_url_ps_gr_1to: string | null
          color_url_sp_gr_1to: string | null
          color_url_ss_gr_1to: string | null
          cover_type_pe_bkgr_str: string | null
          cover_type_pe_bkrd_str: string | null
          cover_type_pp_bkgr_2to: string | null
          cover_type_pp_bkgr_str: string | null
          cover_type_pp_bkrd_2to: string | null
          cover_type_pp_bkrd_str: string | null
          cover_type_pp_grbk_str: string | null
          cover_type_pp_grbk_tri: string | null
          cover_type_ps_gr_1to: string | null
          cover_type_sp_gr_1to: string | null
          cover_type_ss_gr_1to: string | null
          default_make_images: string | null
          default_model_images: string | null
          display_color_pe_bkgr_str: string | null
          display_color_pe_bkrd_str: string | null
          display_color_pp_bkgr_2to: string | null
          display_color_pp_bkgr_str: string | null
          display_color_pp_bkrd_2to: string | null
          display_color_pp_bkrd_str: string | null
          display_color_pp_grbk_str: string | null
          display_color_pp_grbk_tri: string | null
          display_color_ps_gr_1to: string | null
          display_color_sp_gr_1to: string | null
          display_color_ss_gr_1to: string | null
          display_id_pe_bkgr_str: string | null
          display_id_pe_bkrd_str: string | null
          display_id_pp_bkgr_2to: string | null
          display_id_pp_bkgr_str: string | null
          display_id_pp_bkrd_2to: string | null
          display_id_pp_bkrd_str: string | null
          display_id_pp_grbk_str: string | null
          display_id_pp_grbk_tri: string | null
          display_id_ps_gr_1to: string | null
          display_id_sp_gr_1to: string | null
          display_id_ss_gr_1to: string | null
          display_quantity_pe_bkgr_str: string | null
          display_quantity_pe_bkrd_str: string | null
          display_quantity_pp_bkgr_2to: string | null
          display_quantity_pp_bkgr_str: string | null
          display_quantity_pp_bkrd_2to: string | null
          display_quantity_pp_bkrd_str: string | null
          display_quantity_pp_grbk_str: string | null
          display_quantity_pp_grbk_tri: string | null
          display_quantity_ps_gr_1to: string | null
          display_quantity_sp_gr_1to: string | null
          display_quantity_ss_gr_1to: string | null
          feature_pe_bkgr_str: string | null
          feature_pe_bkrd_str: string | null
          feature_pp_bkgr_2to: string | null
          feature_pp_bkgr_str: string | null
          feature_pp_bkrd_2to: string | null
          feature_pp_bkrd_str: string | null
          feature_pp_grbk_str: string | null
          feature_pp_grbk_tri: string | null
          feature_ps_gr_1to: string | null
          feature_sp_gr_1to: string | null
          feature_ss_gr_1to: string | null
          fk: number | null
          generation_default: number | null
          listpage_gallery_image: string | null
          make: string | null
          make_id: number | null
          mirror: string | null
          model: string | null
          model_id: string | null
          msrp_pe_bkgr_str: string | null
          msrp_pe_bkrd_str: string | null
          msrp_pp_bkgr_2to: string | null
          msrp_pp_bkgr_str: number | null
          msrp_pp_bkrd_2to: string | null
          msrp_pp_bkrd_str: string | null
          msrp_pp_grbk_str: string | null
          msrp_pp_grbk_tri: string | null
          msrp_ps_gr_1to: number | null
          msrp_sp_gr_1to: number | null
          msrp_ss_gr_1to: number | null
          OR: string | null
          price_pe_bkgr_str: string | null
          price_pe_bkrd_str: string | null
          price_pp_bkgr_2to: string | null
          price_pp_bkgr_str: number | null
          price_pp_bkrd_2to: string | null
          price_pp_bkrd_str: string | null
          price_pp_grbk_str: string | null
          price_pp_grbk_tri: string | null
          price_ps_gr_1to: number | null
          price_sp_gr_1to: string | null
          price_ss_gr_1to: string | null
          product_pe_bkgr_str: string | null
          product_pe_bkrd_str: string | null
          product_pp_bkgr_2to: string | null
          product_pp_bkgr_str: string | null
          product_pp_bkrd_2to: string | null
          product_pp_bkrd_str: string | null
          product_pp_grbk_str: string | null
          product_pp_grbk_tri: string | null
          product_ps_gr_1to: string | null
          product_sp_gr_1to: string | null
          product_ss_gr_1to: string | null
          quantity_pe_bkgr_str: string | null
          quantity_pe_bkrd_str: string | null
          quantity_pp_bkgr_2to: string | null
          quantity_pp_bkgr_str: string | null
          quantity_pp_bkrd_2to: string | null
          quantity_pp_bkrd_str: string | null
          quantity_pp_grbk_str: string | null
          quantity_pp_grbk_tri: string | null
          quantity_ps_gr_1to: string | null
          quantity_sp_gr_1to: string | null
          quantity_ss_gr_1to: string | null
          Size: string | null
          SKU_pe_bkgr_str: string | null
          SKU_pe_bkrd_str: string | null
          SKU_pp_bkgr_2to: string | null
          SKU_pp_bkgr_str: string | null
          SKU_pp_bkrd_2to: string | null
          SKU_pp_bkrd_str: string | null
          SKU_pp_grbk_str: string | null
          SKU_pp_grbk_tri: string | null
          SKU_ps_gr_1to: string | null
          SKU_sp_gr_1to: string | null
          SKU_ss_gr_1to: string | null
          sub1_id: string | null
          sub2_id: string | null
          sub3_id: string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          uc_description: string | null
          uc_image_link: string | null
          uc_title: string | null
          year_generation: string | null
          year_id: string | null
          year_options: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Products_generation_default_fkey"
            columns: ["generation_default"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["fk"]
          },
          {
            foreignKeyName: "Products_generation_default_fkey"
            columns: ["generation_default"]
            isOneToOne: false
            referencedRelation: "product_join_mv"
            referencedColumns: ["fk"]
          },
        ]
      }
    }
    Functions: {
      get_car_covers: {
        Args: Record<PropertyKey, never>
        Returns: {
          make: string
          models: string[]
        }[]
      }
      get_distinct_make_slugs: {
        Args: Record<PropertyKey, never>
        Returns: {
          make_slug: string
        }[]
      }
      get_distinct_makes_by_year: {
        Args: {
          type: string
          cover: string
          year: string
        }
        Returns: {
          make: string
          make_slug: string
        }[]
      }
      get_distinct_review_images: {
        Args: {
          p_type?: string
          p_make_slug?: string
          p_model_slug?: string
          p_parent_generation?: string
        }
        Returns: {
          rating_stars: number
          helpful: number
          reviewed_at: string
          gpt_review_id: string
          model: string
          year_generation: string
          submodel1: string
          submodel2: string
          mirror: string
          review_description: string
          make_slug: string
          review_title: string
          review_author: string
          review_image: string
          model_slug: string
          size: string
          sku: string
          parent_generation: string
          product_type: string
          product_name: string
          type: string
          make: string
        }[]
      }
      get_joined_products: {
        Args: Record<PropertyKey, never>
        Returns: {
          fk: number
          generation_default: number
          year_generation: string
          make: string
          model: string
          submodel1: string
          submodel2: string
          SKU_pe_bkgr_str: string
          SKU_pe_bkrd_str: string
          SKU_pp_bkgr_str: string
          SKU_pp_bkrd_str: string
          SKU_pp_bkrd_2to: string
          SKU_pp_grbk_tri: string
          SKU_pp_grbk_str: string
          SKU_ps_gr_1to: string
          SKU_sp_gr_1to: string
          SKU_ss_gr_1to: string
          SKU_pp_bkgr_2to: string
        }[]
      }
      get_make_and_slug: {
        Args: {
          type_param: string
          display_id_param: string
          year_param: string
        }
        Returns: {
          make: string
          make_slug: string
        }[]
      }
      get_make_and_slug_trial: {
        Args: {
          type_param: string
          display_id_param: string
          year_param: string
        }
        Returns: {
          make: string
          make_slug: string
        }[]
      }
      get_product_reviews_summary: {
        Args: {
          type?: string
          make?: string
          model?: string
          year?: string
          submodel?: string
          submodel2?: string
        }
        Returns: {
          total_reviews: number
          average_score: number
        }[]
      }
      get_seat_cover_products_sorted_by_color: {
        Args: {
          p_type?: string
          p_make?: string
          p_model?: string
          p_year?: string
          p_submodel?: string
          p_submodel2?: string
        }
        Returns: {
          sku: string
          fk: number
          type: string
          make: string
          model: string
          year_generation: string
          parent_generation: string
          submodel1: string
          submodel2: string
          product: string
          display_color: string
          msrp: number
          price: number
          quantity: number
          display_id: string
          make_slug: string
          model_slug: string
          year_options: string
        }[]
      }
      get_seat_cover_products_sorted_by_color_20240401: {
        Args: {
          p_type?: string
          p_cover?: string
          p_make?: string
          p_model?: string
          p_year?: string
          p_submodel?: string
          p_submodel2?: string
          p_submodel3?: string
        }
        Returns: {
          sku: string
          type: string
          make: string
          model: string
          year_generation: string
          parent_generation: string
          submodel1: string
          submodel2: string
          submodel3: string
          product: string
          display_color: string
          msrp: number
          price: number
          quantity: number
          display_id: string
          make_slug: string
          model_slug: string
          year_options: string
        }[]
      }
      join_products: {
        Args: Record<PropertyKey, never>
        Returns: {
          product1: string
          product2: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
