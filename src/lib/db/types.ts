export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      _Orders: {
        Row: {
          billing_address_city: string | null;
          billing_address_country: string | null;
          billing_address_line_1: string | null;
          billing_address_line_2: string | null;
          billing_address_postal_code: string | null;
          billing_address_state: string | null;
          billing_customer_name: string | null;
          card_amount: number | null;
          card_brand: string | null;
          card_fingerprint: string | null;
          card_funding: string | null;
          created_at: string | null;
          currency: string | null;
          customer_email: string | null;
          customer_id: number | null;
          customer_name: string | null;
          customer_phone: string | null;
          id: number;
          notes: string | null;
          order_date: string | null;
          order_id: string | null;
          payment_date: string | null;
          payment_gateway: string | null;
          payment_gateway_customer_id: string | null;
          payment_method: string | null;
          payment_method_id: string | null;
          payment_status: string | null;
          shipping_address_city: string | null;
          shipping_address_country: string | null;
          shipping_address_line_1: string | null;
          shipping_address_line_2: string | null;
          shipping_address_postal_code: string | null;
          shipping_address_state: string | null;
          shipping_carrier: string | null;
          shipping_tracking_number: string | null;
          skus: string | null;
          status: string | null;
          total_amount: number | null;
          transaction_id: string | null;
          updated_at: string | null;
          wallet_type: string | null;
        };
        Insert: {
          billing_address_city?: string | null;
          billing_address_country?: string | null;
          billing_address_line_1?: string | null;
          billing_address_line_2?: string | null;
          billing_address_postal_code?: string | null;
          billing_address_state?: string | null;
          billing_customer_name?: string | null;
          card_amount?: number | null;
          card_brand?: string | null;
          card_fingerprint?: string | null;
          card_funding?: string | null;
          created_at?: string | null;
          currency?: string | null;
          customer_email?: string | null;
          customer_id?: number | null;
          customer_name?: string | null;
          customer_phone?: string | null;
          id?: number;
          notes?: string | null;
          order_date?: string | null;
          order_id?: string | null;
          payment_date?: string | null;
          payment_gateway?: string | null;
          payment_gateway_customer_id?: string | null;
          payment_method?: string | null;
          payment_method_id?: string | null;
          payment_status?: string | null;
          shipping_address_city?: string | null;
          shipping_address_country?: string | null;
          shipping_address_line_1?: string | null;
          shipping_address_line_2?: string | null;
          shipping_address_postal_code?: string | null;
          shipping_address_state?: string | null;
          shipping_carrier?: string | null;
          shipping_tracking_number?: string | null;
          skus?: string | null;
          status?: string | null;
          total_amount?: number | null;
          transaction_id?: string | null;
          updated_at?: string | null;
          wallet_type?: string | null;
        };
        Update: {
          billing_address_city?: string | null;
          billing_address_country?: string | null;
          billing_address_line_1?: string | null;
          billing_address_line_2?: string | null;
          billing_address_postal_code?: string | null;
          billing_address_state?: string | null;
          billing_customer_name?: string | null;
          card_amount?: number | null;
          card_brand?: string | null;
          card_fingerprint?: string | null;
          card_funding?: string | null;
          created_at?: string | null;
          currency?: string | null;
          customer_email?: string | null;
          customer_id?: number | null;
          customer_name?: string | null;
          customer_phone?: string | null;
          id?: number;
          notes?: string | null;
          order_date?: string | null;
          order_id?: string | null;
          payment_date?: string | null;
          payment_gateway?: string | null;
          payment_gateway_customer_id?: string | null;
          payment_method?: string | null;
          payment_method_id?: string | null;
          payment_status?: string | null;
          shipping_address_city?: string | null;
          shipping_address_country?: string | null;
          shipping_address_line_1?: string | null;
          shipping_address_line_2?: string | null;
          shipping_address_postal_code?: string | null;
          shipping_address_state?: string | null;
          shipping_carrier?: string | null;
          shipping_tracking_number?: string | null;
          skus?: string | null;
          status?: string | null;
          total_amount?: number | null;
          transaction_id?: string | null;
          updated_at?: string | null;
          wallet_type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: '_Orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      _Orders_backup_20240531: {
        Row: {
          billing_address_city: string | null;
          billing_address_country: string | null;
          billing_address_line_1: string | null;
          billing_address_line_2: string | null;
          billing_address_postal_code: string | null;
          billing_address_state: string | null;
          billing_customer_name: string | null;
          card_amount: number | null;
          card_brand: string | null;
          card_fingerprint: string | null;
          card_funding: string | null;
          created_at: string | null;
          currency: string | null;
          customer_email: string | null;
          customer_id: number | null;
          customer_name: string | null;
          customer_phone: string | null;
          id: number;
          notes: string | null;
          order_date: string | null;
          order_id: string | null;
          payment_date: string | null;
          payment_gateway: string | null;
          payment_gateway_customer_id: string | null;
          payment_method: string | null;
          payment_method_id: string | null;
          payment_status: string | null;
          shipping_address_city: string | null;
          shipping_address_country: string | null;
          shipping_address_line_1: string | null;
          shipping_address_line_2: string | null;
          shipping_address_postal_code: string | null;
          shipping_address_state: string | null;
          shipping_carrier: string | null;
          shipping_tracking_number: string | null;
          skus: string | null;
          status: string | null;
          total_amount: number | null;
          transaction_id: string | null;
          updated_at: string | null;
          wallet_type: string | null;
        };
        Insert: {
          billing_address_city?: string | null;
          billing_address_country?: string | null;
          billing_address_line_1?: string | null;
          billing_address_line_2?: string | null;
          billing_address_postal_code?: string | null;
          billing_address_state?: string | null;
          billing_customer_name?: string | null;
          card_amount?: number | null;
          card_brand?: string | null;
          card_fingerprint?: string | null;
          card_funding?: string | null;
          created_at?: string | null;
          currency?: string | null;
          customer_email?: string | null;
          customer_id?: number | null;
          customer_name?: string | null;
          customer_phone?: string | null;
          id?: number;
          notes?: string | null;
          order_date?: string | null;
          order_id?: string | null;
          payment_date?: string | null;
          payment_gateway?: string | null;
          payment_gateway_customer_id?: string | null;
          payment_method?: string | null;
          payment_method_id?: string | null;
          payment_status?: string | null;
          shipping_address_city?: string | null;
          shipping_address_country?: string | null;
          shipping_address_line_1?: string | null;
          shipping_address_line_2?: string | null;
          shipping_address_postal_code?: string | null;
          shipping_address_state?: string | null;
          shipping_carrier?: string | null;
          shipping_tracking_number?: string | null;
          skus?: string | null;
          status?: string | null;
          total_amount?: number | null;
          transaction_id?: string | null;
          updated_at?: string | null;
          wallet_type?: string | null;
        };
        Update: {
          billing_address_city?: string | null;
          billing_address_country?: string | null;
          billing_address_line_1?: string | null;
          billing_address_line_2?: string | null;
          billing_address_postal_code?: string | null;
          billing_address_state?: string | null;
          billing_customer_name?: string | null;
          card_amount?: number | null;
          card_brand?: string | null;
          card_fingerprint?: string | null;
          card_funding?: string | null;
          created_at?: string | null;
          currency?: string | null;
          customer_email?: string | null;
          customer_id?: number | null;
          customer_name?: string | null;
          customer_phone?: string | null;
          id?: number;
          notes?: string | null;
          order_date?: string | null;
          order_id?: string | null;
          payment_date?: string | null;
          payment_gateway?: string | null;
          payment_gateway_customer_id?: string | null;
          payment_method?: string | null;
          payment_method_id?: string | null;
          payment_status?: string | null;
          shipping_address_city?: string | null;
          shipping_address_country?: string | null;
          shipping_address_line_1?: string | null;
          shipping_address_line_2?: string | null;
          shipping_address_postal_code?: string | null;
          shipping_address_state?: string | null;
          shipping_carrier?: string | null;
          shipping_tracking_number?: string | null;
          skus?: string | null;
          status?: string | null;
          total_amount?: number | null;
          transaction_id?: string | null;
          updated_at?: string | null;
          wallet_type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: '_Orders_backup_20240531_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      _Orders_TEST: {
        Row: {
          billing_address_city: string | null;
          billing_address_country: string | null;
          billing_address_line_1: string | null;
          billing_address_line_2: string | null;
          billing_address_postal_code: string | null;
          billing_address_state: string | null;
          billing_customer_name: string | null;
          card_amount: number | null;
          card_brand: string | null;
          card_fingerprint: string | null;
          card_funding: string | null;
          created_at: string | null;
          currency: string | null;
          customer_email: string | null;
          customer_id: number | null;
          customer_name: string | null;
          customer_phone: string | null;
          id: number;
          notes: string | null;
          order_date: string | null;
          order_id: string | null;
          payment_date: string | null;
          payment_gateway: string | null;
          payment_gateway_customer_id: string | null;
          payment_method: string | null;
          payment_method_id: string | null;
          payment_status: string | null;
          shipping_address_city: string | null;
          shipping_address_country: string | null;
          shipping_address_line_1: string | null;
          shipping_address_line_2: string | null;
          shipping_address_postal_code: string | null;
          shipping_address_state: string | null;
          shipping_carrier: string | null;
          shipping_tracking_number: string | null;
          skus: string | null;
          status: string | null;
          total_amount: number | null;
          transaction_id: string | null;
          updated_at: string | null;
          wallet_type: string | null;
        };
        Insert: {
          billing_address_city?: string | null;
          billing_address_country?: string | null;
          billing_address_line_1?: string | null;
          billing_address_line_2?: string | null;
          billing_address_postal_code?: string | null;
          billing_address_state?: string | null;
          billing_customer_name?: string | null;
          card_amount?: number | null;
          card_brand?: string | null;
          card_fingerprint?: string | null;
          card_funding?: string | null;
          created_at?: string | null;
          currency?: string | null;
          customer_email?: string | null;
          customer_id?: number | null;
          customer_name?: string | null;
          customer_phone?: string | null;
          id?: number;
          notes?: string | null;
          order_date?: string | null;
          order_id?: string | null;
          payment_date?: string | null;
          payment_gateway?: string | null;
          payment_gateway_customer_id?: string | null;
          payment_method?: string | null;
          payment_method_id?: string | null;
          payment_status?: string | null;
          shipping_address_city?: string | null;
          shipping_address_country?: string | null;
          shipping_address_line_1?: string | null;
          shipping_address_line_2?: string | null;
          shipping_address_postal_code?: string | null;
          shipping_address_state?: string | null;
          shipping_carrier?: string | null;
          shipping_tracking_number?: string | null;
          skus?: string | null;
          status?: string | null;
          total_amount?: number | null;
          transaction_id?: string | null;
          updated_at?: string | null;
          wallet_type?: string | null;
        };
        Update: {
          billing_address_city?: string | null;
          billing_address_country?: string | null;
          billing_address_line_1?: string | null;
          billing_address_line_2?: string | null;
          billing_address_postal_code?: string | null;
          billing_address_state?: string | null;
          billing_customer_name?: string | null;
          card_amount?: number | null;
          card_brand?: string | null;
          card_fingerprint?: string | null;
          card_funding?: string | null;
          created_at?: string | null;
          currency?: string | null;
          customer_email?: string | null;
          customer_id?: number | null;
          customer_name?: string | null;
          customer_phone?: string | null;
          id?: number;
          notes?: string | null;
          order_date?: string | null;
          order_id?: string | null;
          payment_date?: string | null;
          payment_gateway?: string | null;
          payment_gateway_customer_id?: string | null;
          payment_method?: string | null;
          payment_method_id?: string | null;
          payment_status?: string | null;
          shipping_address_city?: string | null;
          shipping_address_country?: string | null;
          shipping_address_line_1?: string | null;
          shipping_address_line_2?: string | null;
          shipping_address_postal_code?: string | null;
          shipping_address_state?: string | null;
          shipping_carrier?: string | null;
          shipping_tracking_number?: string | null;
          skus?: string | null;
          status?: string | null;
          total_amount?: number | null;
          transaction_id?: string | null;
          updated_at?: string | null;
          wallet_type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: '_Orders_TEST_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      Accessories: {
        Row: {
          description: string[] | null;
          id: number;
          images: string | null;
          msrp: number | null;
          sku: string | null;
          title: string | null;
        };
        Insert: {
          description?: string[] | null;
          id: number;
          images?: string | null;
          msrp?: number | null;
          sku?: string | null;
          title?: string | null;
        };
        Update: {
          description?: string[] | null;
          id?: number;
          images?: string | null;
          msrp?: number | null;
          sku?: string | null;
          title?: string | null;
        };
        Relationships: [];
      };
      Blogs: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          image_path: string | null;
          Name: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          image_path?: string | null;
          Name?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          image_path?: string | null;
          Name?: string | null;
        };
        Relationships: [];
      };
      Make: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          slug: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          slug?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          slug?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      make_20240425_backup: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          slug: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          slug?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          slug?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      Make_old: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      Model: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          slug: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          slug?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          slug?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      model_20240425_backup: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          slug: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          slug?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          slug?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      Model_old: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      order_id_sequences: {
        Row: {
          date: string;
          last_sequence: number | null;
          product_type: string;
        };
        Insert: {
          date: string;
          last_sequence?: number | null;
          product_type: string;
        };
        Update: {
          date?: string;
          last_sequence?: number | null;
          product_type?: string;
        };
        Relationships: [];
      };
      orderItems_table: {
        Row: {
          created_at: string;
          id: number;
          order_id: number | null;
          price: number | null;
          product_id: number | null;
          quantity: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          order_id?: number | null;
          price?: number | null;
          product_id?: number | null;
          quantity?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          order_id?: number | null;
          price?: number | null;
          product_id?: number | null;
          quantity?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orderItems_table_duplicate_duplicate_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: '_Orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orderItems_table_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'Products';
            referencedColumns: ['id'];
          },
        ];
      };
      orderItems_table_duplicate_20240531: {
        Row: {
          created_at: string;
          id: number;
          order_id: number | null;
          price: number | null;
          product_id: number | null;
          quantity: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          order_id?: number | null;
          price?: number | null;
          product_id?: number | null;
          quantity?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          order_id?: number | null;
          price?: number | null;
          product_id?: number | null;
          quantity?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orderItems_table_duplicate_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: '_Orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orderItems_table_duplicate_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'Products_20240513_old';
            referencedColumns: ['id'];
          },
        ];
      };
      orderItems_table_TEST: {
        Row: {
          created_at: string;
          id: number;
          order_id: number | null;
          price: number | null;
          product_id: number | null;
          quantity: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          order_id?: number | null;
          price?: number | null;
          product_id?: number | null;
          quantity?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          order_id?: number | null;
          price?: number | null;
          product_id?: number | null;
          quantity?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orderItems_table_TEST_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: '_Orders_TEST';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orderItems_table_TEST_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'Products_20240513_old';
            referencedColumns: ['id'];
          },
        ];
      };
      'Product-Metadata': {
        Row: {
          description: string | null;
          id: string | null;
          URL: string | null;
        };
        Insert: {
          description?: string | null;
          id?: string | null;
          URL?: string | null;
        };
        Update: {
          description?: string | null;
          id?: string | null;
          URL?: string | null;
        };
        Relationships: [];
      };
      Products: {
        Row: {
          banner: string | null;
          display_color: string | null;
          display_id: string | null;
          display_set: string | null;
          feature: string | null;
          id: number;
          make: string | null;
          make_slug: string | null;
          model: string | null;
          model_slug: string | null;
          msrp: number | null;
          parent_generation: string | null;
          price: number | null;
          product: string | null;
          product_video_360: string | null;
          product_video_carousel: string | null;
          product_video_carousel_thumbnail: string | null;
          product_video_zoom: string | null;
          quantity: string | null;
          sku: string | null;
          submodel1: string | null;
          submodel2: string | null;
          submodel3: string | null;
          type: string | null;
          year_generation: string | null;
          year_options: string | null;
        };
        Insert: {
          banner?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          display_set?: string | null;
          feature?: string | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          msrp?: number | null;
          parent_generation?: string | null;
          price?: number | null;
          product?: string | null;
          product_video_360?: string | null;
          product_video_carousel?: string | null;
          product_video_carousel_thumbnail?: string | null;
          product_video_zoom?: string | null;
          quantity?: string | null;
          sku?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Update: {
          banner?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          display_set?: string | null;
          feature?: string | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          msrp?: number | null;
          parent_generation?: string | null;
          price?: number | null;
          product?: string | null;
          product_video_360?: string | null;
          product_video_carousel?: string | null;
          product_video_carousel_thumbnail?: string | null;
          product_video_zoom?: string | null;
          quantity?: string | null;
          sku?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Relationships: [];
      };
      Products_20240425: {
        Row: {
          banner: string | null;
          description: string | null;
          display_color: string | null;
          display_id: string | null;
          feature: string | null;
          id: number;
          make: string | null;
          make_slug: string | null;
          model: string | null;
          model_slug: string | null;
          msrp: number | null;
          parent_generation: string | null;
          price: number | null;
          product: string | null;
          quantity: string | null;
          sku: string | null;
          status: string | null;
          submodel1: string | null;
          submodel2: string | null;
          submodel3: string | null;
          type: string | null;
          year_generation: string | null;
          year_options: string | null;
        };
        Insert: {
          banner?: string | null;
          description?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          feature?: string | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          msrp?: number | null;
          parent_generation?: string | null;
          price?: number | null;
          product?: string | null;
          quantity?: string | null;
          sku?: string | null;
          status?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Update: {
          banner?: string | null;
          description?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          feature?: string | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          msrp?: number | null;
          parent_generation?: string | null;
          price?: number | null;
          product?: string | null;
          quantity?: string | null;
          sku?: string | null;
          status?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Relationships: [];
      };
      Products_20240503_backup: {
        Row: {
          banner: string | null;
          description: string | null;
          display_color: string | null;
          display_id: string | null;
          feature: string | null;
          id: number;
          make: string | null;
          make_slug: string | null;
          model: string | null;
          model_slug: string | null;
          msrp: number | null;
          parent_generation: string | null;
          price: number | null;
          product: string | null;
          product_video_360: string | null;
          product_video_carousel: string | null;
          product_video_carousel_thumbnail: string | null;
          product_video_zoom: string | null;
          quantity: string | null;
          sku: string | null;
          status: string | null;
          submodel1: string | null;
          submodel2: string | null;
          submodel3: string | null;
          type: string | null;
          year_generation: string | null;
          year_options: string | null;
        };
        Insert: {
          banner?: string | null;
          description?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          feature?: string | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          msrp?: number | null;
          parent_generation?: string | null;
          price?: number | null;
          product?: string | null;
          product_video_360?: string | null;
          product_video_carousel?: string | null;
          product_video_carousel_thumbnail?: string | null;
          product_video_zoom?: string | null;
          quantity?: string | null;
          sku?: string | null;
          status?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Update: {
          banner?: string | null;
          description?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          feature?: string | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          msrp?: number | null;
          parent_generation?: string | null;
          price?: number | null;
          product?: string | null;
          product_video_360?: string | null;
          product_video_carousel?: string | null;
          product_video_carousel_thumbnail?: string | null;
          product_video_zoom?: string | null;
          quantity?: string | null;
          sku?: string | null;
          status?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Relationships: [];
      };
      Products_20240503_old: {
        Row: {
          banner: string | null;
          description: string | null;
          display_color: string | null;
          display_id: string | null;
          feature: string | null;
          id: number;
          make: string | null;
          make_slug: string | null;
          model: string | null;
          model_slug: string | null;
          msrp: number | null;
          parent_generation: string | null;
          price: number | null;
          product: string | null;
          product_video_360: string | null;
          product_video_carousel: string | null;
          product_video_carousel_thumbnail: string | null;
          product_video_zoom: string | null;
          quantity: string | null;
          sku: string | null;
          status: string | null;
          submodel1: string | null;
          submodel2: string | null;
          submodel3: string | null;
          type: string | null;
          year_generation: string | null;
          year_options: string | null;
        };
        Insert: {
          banner?: string | null;
          description?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          feature?: string | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          msrp?: number | null;
          parent_generation?: string | null;
          price?: number | null;
          product?: string | null;
          product_video_360?: string | null;
          product_video_carousel?: string | null;
          product_video_carousel_thumbnail?: string | null;
          product_video_zoom?: string | null;
          quantity?: string | null;
          sku?: string | null;
          status?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Update: {
          banner?: string | null;
          description?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          feature?: string | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          msrp?: number | null;
          parent_generation?: string | null;
          price?: number | null;
          product?: string | null;
          product_video_360?: string | null;
          product_video_carousel?: string | null;
          product_video_carousel_thumbnail?: string | null;
          product_video_zoom?: string | null;
          quantity?: string | null;
          sku?: string | null;
          status?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Relationships: [];
      };
      Products_20240513_backup: {
        Row: {
          banner: string | null;
          description: string | null;
          display_color: string | null;
          display_id: string | null;
          feature: string | null;
          id: number;
          make: string | null;
          make_slug: string | null;
          model: string | null;
          model_slug: string | null;
          msrp: number | null;
          parent_generation: string | null;
          price: number | null;
          product: string | null;
          product_video_360: string | null;
          product_video_carousel: string | null;
          product_video_carousel_thumbnail: string | null;
          product_video_zoom: string | null;
          quantity: string | null;
          sku: string | null;
          status: string | null;
          submodel1: string | null;
          submodel2: string | null;
          submodel3: string | null;
          type: string | null;
          year_generation: string | null;
          year_options: string | null;
        };
        Insert: {
          banner?: string | null;
          description?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          feature?: string | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          msrp?: number | null;
          parent_generation?: string | null;
          price?: number | null;
          product?: string | null;
          product_video_360?: string | null;
          product_video_carousel?: string | null;
          product_video_carousel_thumbnail?: string | null;
          product_video_zoom?: string | null;
          quantity?: string | null;
          sku?: string | null;
          status?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Update: {
          banner?: string | null;
          description?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          feature?: string | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          msrp?: number | null;
          parent_generation?: string | null;
          price?: number | null;
          product?: string | null;
          product_video_360?: string | null;
          product_video_carousel?: string | null;
          product_video_carousel_thumbnail?: string | null;
          product_video_zoom?: string | null;
          quantity?: string | null;
          sku?: string | null;
          status?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Relationships: [];
      };
      Products_20240513_old: {
        Row: {
          banner: string | null;
          description: string | null;
          display_color: string | null;
          display_id: string | null;
          feature: string | null;
          id: number;
          make: string | null;
          make_slug: string | null;
          model: string | null;
          model_slug: string | null;
          msrp: number | null;
          parent_generation: string | null;
          price: number | null;
          product: string | null;
          product_video_360: string | null;
          product_video_carousel: string | null;
          product_video_carousel_thumbnail: string | null;
          product_video_zoom: string | null;
          quantity: string | null;
          sku: string | null;
          status: string | null;
          submodel1: string | null;
          submodel2: string | null;
          submodel3: string | null;
          type: string | null;
          year_generation: string | null;
          year_options: string | null;
        };
        Insert: {
          banner?: string | null;
          description?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          feature?: string | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          msrp?: number | null;
          parent_generation?: string | null;
          price?: number | null;
          product?: string | null;
          product_video_360?: string | null;
          product_video_carousel?: string | null;
          product_video_carousel_thumbnail?: string | null;
          product_video_zoom?: string | null;
          quantity?: string | null;
          sku?: string | null;
          status?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Update: {
          banner?: string | null;
          description?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          feature?: string | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          msrp?: number | null;
          parent_generation?: string | null;
          price?: number | null;
          product?: string | null;
          product_video_360?: string | null;
          product_video_carousel?: string | null;
          product_video_carousel_thumbnail?: string | null;
          product_video_zoom?: string | null;
          quantity?: string | null;
          sku?: string | null;
          status?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Relationships: [];
      };
      Products_20240529_backup: {
        Row: {
          banner: string | null;
          display_color: string | null;
          display_id: string | null;
          display_set: string | null;
          feature: string | null;
          id: number;
          make: string | null;
          make_slug: string | null;
          model: string | null;
          model_slug: string | null;
          msrp: number | null;
          parent_generation: string | null;
          price: number | null;
          product: string | null;
          product_video_360: string | null;
          product_video_carousel: string | null;
          product_video_carousel_thumbnail: string | null;
          product_video_zoom: string | null;
          quantity: string | null;
          sku: string | null;
          submodel1: string | null;
          submodel2: string | null;
          submodel3: string | null;
          type: string | null;
          year_generation: string | null;
          year_options: string | null;
        };
        Insert: {
          banner?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          display_set?: string | null;
          feature?: string | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          msrp?: number | null;
          parent_generation?: string | null;
          price?: number | null;
          product?: string | null;
          product_video_360?: string | null;
          product_video_carousel?: string | null;
          product_video_carousel_thumbnail?: string | null;
          product_video_zoom?: string | null;
          quantity?: string | null;
          sku?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Update: {
          banner?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          display_set?: string | null;
          feature?: string | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          msrp?: number | null;
          parent_generation?: string | null;
          price?: number | null;
          product?: string | null;
          product_video_360?: string | null;
          product_video_carousel?: string | null;
          product_video_carousel_thumbnail?: string | null;
          product_video_zoom?: string | null;
          quantity?: string | null;
          sku?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Relationships: [];
      };
      relations_product: {
        Row: {
          created_at: string | null;
          id: number;
          make_id: number | null;
          model_id: number | null;
          product_id: number | null;
          type_id: number | null;
          updated_at: string | null;
          year_id: number | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          make_id?: number | null;
          model_id?: number | null;
          product_id?: number | null;
          type_id?: number | null;
          updated_at?: string | null;
          year_id?: number | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          make_id?: number | null;
          model_id?: number | null;
          product_id?: number | null;
          type_id?: number | null;
          updated_at?: string | null;
          year_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'relations_product_20240529_2_make_id_fkey';
            columns: ['make_id'];
            isOneToOne: false;
            referencedRelation: 'Make';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_20240529_2_model_id_fkey';
            columns: ['model_id'];
            isOneToOne: false;
            referencedRelation: 'Model';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_20240529_2_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'Products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_20240529_2_type_id_fkey';
            columns: ['type_id'];
            isOneToOne: false;
            referencedRelation: 'Type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_20240529_2_year_id_fkey';
            columns: ['year_id'];
            isOneToOne: false;
            referencedRelation: 'Years';
            referencedColumns: ['id'];
          },
        ];
      };
      relations_product_20240425: {
        Row: {
          created_at: string;
          id: number;
          make_id: number | null;
          model_id: number | null;
          product_id: number | null;
          type_id: number | null;
          updated_at: string;
          year_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          make_id?: number | null;
          model_id?: number | null;
          product_id?: number | null;
          type_id?: number | null;
          updated_at?: string;
          year_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          make_id?: number | null;
          model_id?: number | null;
          product_id?: number | null;
          type_id?: number | null;
          updated_at?: string;
          year_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'relations_product_make_id_fkey';
            columns: ['make_id'];
            isOneToOne: false;
            referencedRelation: 'Make';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_model_id_fkey';
            columns: ['model_id'];
            isOneToOne: false;
            referencedRelation: 'Model';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'Products_20240425';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_type_id_fkey';
            columns: ['type_id'];
            isOneToOne: false;
            referencedRelation: 'Type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_year_id_fkey';
            columns: ['year_id'];
            isOneToOne: false;
            referencedRelation: 'Years';
            referencedColumns: ['id'];
          },
        ];
      };
      relations_product_20240513_backup: {
        Row: {
          created_at: string;
          id: number;
          make_id: number | null;
          model_id: number | null;
          product_id: number | null;
          type_id: number | null;
          updated_at: string;
          year_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          make_id?: number | null;
          model_id?: number | null;
          product_id?: number | null;
          type_id?: number | null;
          updated_at?: string;
          year_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          make_id?: number | null;
          model_id?: number | null;
          product_id?: number | null;
          type_id?: number | null;
          updated_at?: string;
          year_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'relations_product_20240513_duplicate_make_id_fkey';
            columns: ['make_id'];
            isOneToOne: false;
            referencedRelation: 'Make';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_20240513_duplicate_model_id_fkey';
            columns: ['model_id'];
            isOneToOne: false;
            referencedRelation: 'Model';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_20240513_duplicate_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'Products_20240513_old';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_20240513_duplicate_type_id_fkey';
            columns: ['type_id'];
            isOneToOne: false;
            referencedRelation: 'Type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_20240513_duplicate_year_id_fkey';
            columns: ['year_id'];
            isOneToOne: false;
            referencedRelation: 'Years';
            referencedColumns: ['id'];
          },
        ];
      };
      relations_product_20240513_old: {
        Row: {
          created_at: string;
          id: number;
          make_id: number | null;
          model_id: number | null;
          product_id: number | null;
          type_id: number | null;
          updated_at: string;
          year_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          make_id?: number | null;
          model_id?: number | null;
          product_id?: number | null;
          type_id?: number | null;
          updated_at?: string;
          year_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          make_id?: number | null;
          model_id?: number | null;
          product_id?: number | null;
          type_id?: number | null;
          updated_at?: string;
          year_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'relations_product_20240513_make_id_fkey';
            columns: ['make_id'];
            isOneToOne: false;
            referencedRelation: 'Make';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_20240513_model_id_fkey';
            columns: ['model_id'];
            isOneToOne: false;
            referencedRelation: 'Model';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_20240513_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'Products_20240513_old';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_20240513_type_id_fkey';
            columns: ['type_id'];
            isOneToOne: false;
            referencedRelation: 'Type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_20240513_year_id_fkey';
            columns: ['year_id'];
            isOneToOne: false;
            referencedRelation: 'Years';
            referencedColumns: ['id'];
          },
        ];
      };
      relations_product_20240529_backup: {
        Row: {
          created_at: string | null;
          id: number;
          make_id: number | null;
          model_id: number | null;
          product_id: number | null;
          type_id: number | null;
          updated_at: string | null;
          year_id: number | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          make_id?: number | null;
          model_id?: number | null;
          product_id?: number | null;
          type_id?: number | null;
          updated_at?: string | null;
          year_id?: number | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          make_id?: number | null;
          model_id?: number | null;
          product_id?: number | null;
          type_id?: number | null;
          updated_at?: string | null;
          year_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'relations_product_20240529_backup_make_id_fkey';
            columns: ['make_id'];
            isOneToOne: false;
            referencedRelation: 'Make';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_20240529_backup_model_id_fkey';
            columns: ['model_id'];
            isOneToOne: false;
            referencedRelation: 'Model';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_20240529_backup_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'Products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_20240529_backup_type_id_fkey';
            columns: ['type_id'];
            isOneToOne: false;
            referencedRelation: 'Type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relations_product_20240529_backup_year_id_fkey';
            columns: ['year_id'];
            isOneToOne: false;
            referencedRelation: 'Years';
            referencedColumns: ['id'];
          },
        ];
      };
      'reviews-2': {
        Row: {
          gpt_review_id: string | null;
          helpful: number | null;
          id: number;
          make: string | null;
          make_slug: string | null;
          Mirror: string | null;
          model: string | null;
          model_slug: string | null;
          parent_generation: string | null;
          product_name: string | null;
          product_type: string | null;
          rating_stars: number | null;
          recommend: string | null;
          review_author: string | null;
          review_description: string | null;
          review_image: string | null;
          review_title: string | null;
          reviewed_at: string | null;
          Size: string | null;
          sku: string | null;
          submodel1: string | null;
          submodel2: string | null;
          type: string | null;
          verified_status: string | null;
          year_generation: string | null;
        };
        Insert: {
          gpt_review_id?: string | null;
          helpful?: number | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          Mirror?: string | null;
          model?: string | null;
          model_slug?: string | null;
          parent_generation?: string | null;
          product_name?: string | null;
          product_type?: string | null;
          rating_stars?: number | null;
          recommend?: string | null;
          review_author?: string | null;
          review_description?: string | null;
          review_image?: string | null;
          review_title?: string | null;
          reviewed_at?: string | null;
          Size?: string | null;
          sku?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          type?: string | null;
          verified_status?: string | null;
          year_generation?: string | null;
        };
        Update: {
          gpt_review_id?: string | null;
          helpful?: number | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          Mirror?: string | null;
          model?: string | null;
          model_slug?: string | null;
          parent_generation?: string | null;
          product_name?: string | null;
          product_type?: string | null;
          rating_stars?: number | null;
          recommend?: string | null;
          review_author?: string | null;
          review_description?: string | null;
          review_image?: string | null;
          review_title?: string | null;
          reviewed_at?: string | null;
          Size?: string | null;
          sku?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          type?: string | null;
          verified_status?: string | null;
          year_generation?: string | null;
        };
        Relationships: [];
      };
      'reviews-2_backup': {
        Row: {
          gpt_review_id: string | null;
          helpful: number | null;
          id: number;
          make: string | null;
          make_slug: string | null;
          Mirror: string | null;
          model: string | null;
          model_slug: string | null;
          parent_generation: string | null;
          product_name: string | null;
          product_type: string | null;
          rating_stars: number | null;
          recommend: string | null;
          review_author: string | null;
          review_description: string | null;
          review_image: string | null;
          review_title: string | null;
          reviewed_at: string | null;
          Size: string | null;
          sku: string | null;
          submodel1: string | null;
          submodel2: string | null;
          type: string | null;
          verified_status: string | null;
          year_generation: string | null;
        };
        Insert: {
          gpt_review_id?: string | null;
          helpful?: number | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          Mirror?: string | null;
          model?: string | null;
          model_slug?: string | null;
          parent_generation?: string | null;
          product_name?: string | null;
          product_type?: string | null;
          rating_stars?: number | null;
          recommend?: string | null;
          review_author?: string | null;
          review_description?: string | null;
          review_image?: string | null;
          review_title?: string | null;
          reviewed_at?: string | null;
          Size?: string | null;
          sku?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          type?: string | null;
          verified_status?: string | null;
          year_generation?: string | null;
        };
        Update: {
          gpt_review_id?: string | null;
          helpful?: number | null;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          Mirror?: string | null;
          model?: string | null;
          model_slug?: string | null;
          parent_generation?: string | null;
          product_name?: string | null;
          product_type?: string | null;
          rating_stars?: number | null;
          recommend?: string | null;
          review_author?: string | null;
          review_description?: string | null;
          review_image?: string | null;
          review_title?: string | null;
          reviewed_at?: string | null;
          Size?: string | null;
          sku?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          type?: string | null;
          verified_status?: string | null;
          year_generation?: string | null;
        };
        Relationships: [];
      };
      seat_cover_reviews_20240426_backup: {
        Row: {
          helpful: number | null;
          make: string | null;
          make_slug: string | null;
          model: string | null;
          model_slug: string | null;
          parent_generation: string | null;
          rating_stars: number | null;
          recommend: string | null;
          review_author: string | null;
          review_description: string | null;
          review_image: string | null;
          review_title: string | null;
          reviewed_at: string | null;
          sku: string | null;
          type: string | null;
          verfied_status: string | null;
          year_generation: string | null;
        };
        Insert: {
          helpful?: number | null;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          parent_generation?: string | null;
          rating_stars?: number | null;
          recommend?: string | null;
          review_author?: string | null;
          review_description?: string | null;
          review_image?: string | null;
          review_title?: string | null;
          reviewed_at?: string | null;
          sku?: string | null;
          type?: string | null;
          verfied_status?: string | null;
          year_generation?: string | null;
        };
        Update: {
          helpful?: number | null;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          parent_generation?: string | null;
          rating_stars?: number | null;
          recommend?: string | null;
          review_author?: string | null;
          review_description?: string | null;
          review_image?: string | null;
          review_title?: string | null;
          reviewed_at?: string | null;
          sku?: string | null;
          type?: string | null;
          verfied_status?: string | null;
          year_generation?: string | null;
        };
        Relationships: [];
      };
      seat_cover_reviews_20240530: {
        Row: {
          customer_name: string | null;
          date: string | null;
          display_color: string | null;
          display_id: string | null;
          'F# Seat Cover': number | null;
          helpful: number | null;
          image_link: string | null;
          make: string | null;
          make_slug: string | null;
          model: string | null;
          model_slug: string | null;
          parent_generation: string | null;
          rating: number | null;
          recommend: string | null;
          review_description: string | null;
          review_title: string | null;
          sku: string | null;
          submodel1: string | null;
          submodel2: string | null;
          submodel3: string | null;
          type: string | null;
          verfied_status: string | null;
          year_generation: string | null;
        };
        Insert: {
          customer_name?: string | null;
          date?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          'F# Seat Cover'?: number | null;
          helpful?: number | null;
          image_link?: string | null;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          parent_generation?: string | null;
          rating?: number | null;
          recommend?: string | null;
          review_description?: string | null;
          review_title?: string | null;
          sku?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          verfied_status?: string | null;
          year_generation?: string | null;
        };
        Update: {
          customer_name?: string | null;
          date?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          'F# Seat Cover'?: number | null;
          helpful?: number | null;
          image_link?: string | null;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          parent_generation?: string | null;
          rating?: number | null;
          recommend?: string | null;
          review_description?: string | null;
          review_title?: string | null;
          sku?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          verfied_status?: string | null;
          year_generation?: string | null;
        };
        Relationships: [];
      };
      seat_cover_reviews_20240530_2: {
        Row: {
          customer_name: string | null;
          date: string | null;
          display_color: string | null;
          display_id: string | null;
          'F# Seat Cover': number | null;
          helpful: number | null;
          image_link: string | null;
          make: string | null;
          make_slug: string | null;
          model: string | null;
          model_slug: string | null;
          parent_generation: string | null;
          rating: number | null;
          recommend: string | null;
          review_description: string | null;
          review_title: string | null;
          sku: string | null;
          submodel1: string | null;
          submodel2: string | null;
          submodel3: string | null;
          type: string | null;
          verfied_status: string | null;
          year_generation: string | null;
        };
        Insert: {
          customer_name?: string | null;
          date?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          'F# Seat Cover'?: number | null;
          helpful?: number | null;
          image_link?: string | null;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          parent_generation?: string | null;
          rating?: number | null;
          recommend?: string | null;
          review_description?: string | null;
          review_title?: string | null;
          sku?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          verfied_status?: string | null;
          year_generation?: string | null;
        };
        Update: {
          customer_name?: string | null;
          date?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          'F# Seat Cover'?: number | null;
          helpful?: number | null;
          image_link?: string | null;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          parent_generation?: string | null;
          rating?: number | null;
          recommend?: string | null;
          review_description?: string | null;
          review_title?: string | null;
          sku?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          verfied_status?: string | null;
          year_generation?: string | null;
        };
        Relationships: [];
      };
      seat_cover_reviews_20240530_3: {
        Row: {
          customer_name: string | null;
          date: string | null;
          display_color: string | null;
          display_id: string | null;
          'F# Seat Cover': number | null;
          helpful: number | null;
          image_link: string | null;
          make: string | null;
          make_slug: string | null;
          model: string | null;
          model_slug: string | null;
          parent_generation: string | null;
          rating: number | null;
          recommend: string | null;
          review_description: string | null;
          review_title: string | null;
          sku: string | null;
          submodel1: string | null;
          submodel2: string | null;
          submodel3: string | null;
          type: string | null;
          verfied_status: string | null;
          year_generation: string | null;
        };
        Insert: {
          customer_name?: string | null;
          date?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          'F# Seat Cover'?: number | null;
          helpful?: number | null;
          image_link?: string | null;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          parent_generation?: string | null;
          rating?: number | null;
          recommend?: string | null;
          review_description?: string | null;
          review_title?: string | null;
          sku?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          verfied_status?: string | null;
          year_generation?: string | null;
        };
        Update: {
          customer_name?: string | null;
          date?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          'F# Seat Cover'?: number | null;
          helpful?: number | null;
          image_link?: string | null;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          parent_generation?: string | null;
          rating?: number | null;
          recommend?: string | null;
          review_description?: string | null;
          review_title?: string | null;
          sku?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          verfied_status?: string | null;
          year_generation?: string | null;
        };
        Relationships: [];
      };
      seat_cover_reviews_20240530_4: {
        Row: {
          customer_name: string | null;
          date: string | null;
          display_color: string | null;
          display_id: string | null;
          'F# Seat Cover': number | null;
          helpful: string | null;
          image_link: string | null;
          make: string | null;
          make_slug: string | null;
          model: string | null;
          model_slug: string | null;
          parent_generation: string | null;
          rating: string | null;
          recommend: string | null;
          review_description: string | null;
          review_title: string | null;
          sku: string | null;
          submodel1: string | null;
          submodel2: string | null;
          submodel3: string | null;
          type: string | null;
          verfied_status: string | null;
          year_generation: string | null;
        };
        Insert: {
          customer_name?: string | null;
          date?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          'F# Seat Cover'?: number | null;
          helpful?: string | null;
          image_link?: string | null;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          parent_generation?: string | null;
          rating?: string | null;
          recommend?: string | null;
          review_description?: string | null;
          review_title?: string | null;
          sku?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          verfied_status?: string | null;
          year_generation?: string | null;
        };
        Update: {
          customer_name?: string | null;
          date?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          'F# Seat Cover'?: number | null;
          helpful?: string | null;
          image_link?: string | null;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          parent_generation?: string | null;
          rating?: string | null;
          recommend?: string | null;
          review_description?: string | null;
          review_title?: string | null;
          sku?: string | null;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          verfied_status?: string | null;
          year_generation?: string | null;
        };
        Relationships: [];
      };
      seat_covers: {
        Row: {
          availability: string | null;
          display_color: string | null;
          display_id: string | null;
          make: string | null;
          make_slug: string | null;
          model: string | null;
          model_slug: string | null;
          msrp: number | null;
          parent_generation: string | null;
          price: number | null;
          product: string | null;
          quantity: number | null;
          sku: string;
          submodel1: string | null;
          submodel2: string | null;
          submodel3: string | null;
          type: string | null;
          year_generation: string | null;
          year_options: string | null;
        };
        Insert: {
          availability?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          msrp?: number | null;
          parent_generation?: string | null;
          price?: number | null;
          product?: string | null;
          quantity?: number | null;
          sku: string;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Update: {
          availability?: string | null;
          display_color?: string | null;
          display_id?: string | null;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          msrp?: number | null;
          parent_generation?: string | null;
          price?: number | null;
          product?: string | null;
          quantity?: number | null;
          sku?: string;
          submodel1?: string | null;
          submodel2?: string | null;
          submodel3?: string | null;
          type?: string | null;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Relationships: [];
      };
      seat_covers_year_options: {
        Row: {
          id: number;
          year_generation: string | null;
          year_options: string | null;
        };
        Insert: {
          id?: number;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Update: {
          id?: number;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Relationships: [];
      };
      'Test-Orders': {
        Row: {
          created_at: string | null;
          is_complete: boolean | null;
          order_id: string | null;
          skus: Json | null;
          total: string | null;
        };
        Insert: {
          created_at?: string | null;
          is_complete?: boolean | null;
          order_id?: string | null;
          skus?: Json | null;
          total?: string | null;
        };
        Update: {
          created_at?: string | null;
          is_complete?: boolean | null;
          order_id?: string | null;
          skus?: Json | null;
          total?: string | null;
        };
        Relationships: [];
      };
      Type: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      type_make_model: {
        Row: {
          created_at: string;
          id: number;
          make: string | null;
          make_slug: string | null;
          model: string | null;
          model_slug: string | null;
          type: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          type?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          make?: string | null;
          make_slug?: string | null;
          model?: string | null;
          model_slug?: string | null;
          type?: string | null;
        };
        Relationships: [];
      };
      type_make_year_distinct: {
        Row: {
          display_id: string | null;
          id: string | null;
          make: string | null;
          make_slug: string | null;
          parent_generation: string | null;
          type: string | null;
          year_options: string | null;
        };
        Insert: {
          display_id?: string | null;
          id?: string | null;
          make?: string | null;
          make_slug?: string | null;
          parent_generation?: string | null;
          type?: string | null;
          year_options?: string | null;
        };
        Update: {
          display_id?: string | null;
          id?: string | null;
          make?: string | null;
          make_slug?: string | null;
          parent_generation?: string | null;
          type?: string | null;
          year_options?: string | null;
        };
        Relationships: [];
      };
      Type_old: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          type_slug_web: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          type_slug_web?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          type_slug_web?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          address: string | null;
          address_2: string | null;
          city: string | null;
          created_at: string;
          email: string | null;
          id: number;
          image_path: string | null;
          last_name: string | null;
          name: string | null;
          password: string | null;
          phone: string | null;
          pincode: string | null;
          shipping_address: string | null;
          shipping_address_2: string | null;
          shipping_city: string | null;
          shipping_pincode: string | null;
          shipping_state: string | null;
          state: string | null;
        };
        Insert: {
          address?: string | null;
          address_2?: string | null;
          city?: string | null;
          created_at?: string;
          email?: string | null;
          id?: number;
          image_path?: string | null;
          last_name?: string | null;
          name?: string | null;
          password?: string | null;
          phone?: string | null;
          pincode?: string | null;
          shipping_address?: string | null;
          shipping_address_2?: string | null;
          shipping_city?: string | null;
          shipping_pincode?: string | null;
          shipping_state?: string | null;
          state?: string | null;
        };
        Update: {
          address?: string | null;
          address_2?: string | null;
          city?: string | null;
          created_at?: string;
          email?: string | null;
          id?: number;
          image_path?: string | null;
          last_name?: string | null;
          name?: string | null;
          password?: string | null;
          phone?: string | null;
          pincode?: string | null;
          shipping_address?: string | null;
          shipping_address_2?: string | null;
          shipping_city?: string | null;
          shipping_pincode?: string | null;
          shipping_state?: string | null;
          state?: string | null;
        };
        Relationships: [];
      };
      year_20240425_backup: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      year_options_20240425: {
        Row: {
          id: number;
          year_generation: string | null;
          year_options: string | null;
        };
        Insert: {
          id?: number;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Update: {
          id?: number;
          year_generation?: string | null;
          year_options?: string | null;
        };
        Relationships: [];
      };
      Years: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      Years_old: {
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_all_products: {
        Args: Record<PropertyKey, never>;
        Returns: {
          products_row: unknown;
        }[];
      };
      get_distinct_makes_by_type: {
        Args: {
          type: string;
        };
        Returns: {
          make: string;
        }[];
      };
      get_distinct_makes_by_type_seatcover: {
        Args: {
          type: string;
        };
        Returns: {
          make: string;
        }[];
      };
      get_distinct_models_by_type_make: {
        Args: {
          type: string;
          make: string;
        };
        Returns: {
          model: string;
        }[];
      };
      get_distinct_models_by_type_make_slug: {
        Args: {
          type: string;
          make: string;
        };
        Returns: {
          model: string;
        }[];
      };
      get_distinct_parent_generations: {
        Args: {
          type: string;
          make: string;
          model: string;
        };
        Returns: {
          parent_generation: string;
        }[];
      };
      get_distinct_review_images: {
        Args: {
          p_type?: string;
          p_make_slug?: string;
          p_model_slug?: string;
          p_parent_generation?: string;
        };
        Returns: {
          rating_stars: number;
          helpful: number;
          reviewed_at: string;
          gpt_review_id: string;
          model: string;
          year_generation: string;
          submodel1: string;
          submodel2: string;
          mirror: string;
          review_description: string;
          make_slug: string;
          review_title: string;
          review_author: string;
          review_image: string;
          model_slug: string;
          size: string;
          sku: string;
          parent_generation: string;
          product_type: string;
          product_name: string;
          type: string;
          make: string;
        }[];
      };
      get_distinct_seat_covers_review_images: {
        Args: {
          p_type?: string;
          p_make_slug?: string;
          p_model_slug?: string;
          p_parent_generation?: string;
        };
        Returns: {
          rating_stars: number;
          helpful: number;
          reviewed_at: string;
          model: string;
          year_generation: string;
          review_description: string;
          make_slug: string;
          review_title: string;
          review_author: string;
          review_image: string;
          model_slug: string;
          sku: string;
          parent_generation: string;
          type: string;
          make: string;
        }[];
      };
      get_distinct_year_generation_by_type_make_model_year: {
        Args: {
          type: string;
          make: string;
          model: string;
          year: string;
        };
        Returns: {
          year_generation: string;
        }[];
      };
      get_distinct_years_by_type_make_model: {
        Args: {
          type: string;
          make: string;
          model: string;
        };
        Returns: {
          year_options: string;
        }[];
      };
      get_make_and_slug: {
        Args: {
          type_param: string;
          display_id_param: string;
          year_param: string;
        };
        Returns: {
          make: string;
          make_slug: string;
        }[];
      };
      get_make_relation: {
        Args: {
          year_id_web: number;
          type_id_web: number;
        };
        Returns: {
          id: number;
          name: string;
        }[];
      };
      get_make_relation_20240529: {
        Args: {
          year_id_web: number;
          type_id_web: number;
        };
        Returns: {
          id: number;
          name: string;
        }[];
      };
      get_make_relations: {
        Args: {
          year_id_web: number;
          type_id_web: number;
        };
        Returns: {
          make_id: number;
          name: string;
        }[];
      };
      get_make_relations_web: {
        Args: {
          year_id_web: number;
          type_id_web: number;
        };
        Returns: {
          id: number;
          name: string;
        }[];
      };
      get_model_by_type_id_make_id_relation: {
        Args: {
          type_id_web: number;
          make_id_web: number;
        };
        Returns: {
          id: number;
          name: string;
        }[];
      };
      get_next_sequence: {
        Args: {
          p_type: string;
          p_date: string;
        };
        Returns: string;
      };
      get_product_reviews_summary: {
        Args: {
          type?: string;
          make?: string;
          model?: string;
          year?: string;
          submodel?: string;
          submodel2?: string;
        };
        Returns: {
          total_reviews: number;
          average_score: number;
        }[];
      };
      get_seat_cover_products_sorted_by_color: {
        Args: {
          p_type?: string;
          p_cover?: string;
          p_make?: string;
          p_model?: string;
          p_year?: string;
          p_submodel?: string;
          p_submodel2?: string;
          p_submodel3?: string;
        };
        Returns: {
          sku: string;
          type: string;
          make: string;
          model: string;
          year_generation: string;
          parent_generation: string;
          submodel1: string;
          submodel2: string;
          submodel3: string;
          product: string;
          display_color: string;
          msrp: number;
          price: number;
          quantity: string;
          display_id: string;
          make_slug: string;
          model_slug: string;
          year_options: string;
        }[];
      };
      get_seat_cover_products_sorted_by_color_20240401: {
        Args: {
          p_type?: string;
          p_cover?: string;
          p_make?: string;
          p_model?: string;
          p_year?: string;
          p_submodel?: string;
          p_submodel2?: string;
          p_submodel3?: string;
        };
        Returns: {
          sku: string;
          type: string;
          make: string;
          model: string;
          year_generation: string;
          parent_generation: string;
          submodel1: string;
          submodel2: string;
          submodel3: string;
          product: string;
          display_color: string;
          msrp: number;
          price: number;
          quantity: number;
          display_id: string;
          make_slug: string;
          model_slug: string;
          year_options: string;
        }[];
      };
      get_seat_cover_products_sorted_by_color_20240503: {
        Args: {
          p_type?: string;
          p_cover?: string;
          p_make?: string;
          p_model?: string;
          p_year?: string;
          p_submodel?: string;
          p_submodel2?: string;
          p_submodel3?: string;
        };
        Returns: {
          sku: string;
          type: string;
          make: string;
          model: string;
          year_generation: string;
          parent_generation: string;
          submodel1: string;
          submodel2: string;
          submodel3: string;
          product: string;
          display_color: string;
          msrp: number;
          price: number;
          quantity: string;
          display_id: string;
          make_slug: string;
          model_slug: string;
          year_options: string;
        }[];
      };
      get_seat_cover_products_sorted_by_color_20240529: {
        Args: {
          p_type?: string;
          p_cover?: string;
          p_make?: string;
          p_model?: string;
          p_year?: string;
          p_submodel?: string;
          p_submodel2?: string;
          p_submodel3?: string;
        };
        Returns: {
          sku: string;
          type: string;
          make: string;
          model: string;
          year_generation: string;
          parent_generation: string;
          submodel1: string;
          submodel2: string;
          submodel3: string;
          product: string;
          display_color: string;
          msrp: number;
          price: number;
          quantity: string;
          display_id: string;
          make_slug: string;
          model_slug: string;
          year_options: string;
          display_set: string;
        }[];
      };
      get_seat_covers_product_reviews_summary: {
        Args: {
          type?: string;
          make?: string;
          model?: string;
          year?: string;
          submodel?: string;
          submodel2?: string;
        };
        Returns: {
          total_reviews: number;
          average_score: number;
        }[];
      };
      get_unique_years: {
        Args: {
          type_id_web: number;
        };
        Returns: {
          id: number;
          name: string;
        }[];
      };
      get_unique_years_20240529: {
        Args: {
          type_id_web: number;
        };
        Returns: {
          id: number;
          name: string;
        }[];
      };
      get_unique_years_old: {
        Args: {
          type_id_web: number;
        };
        Returns: {
          id: number;
          name: string;
        }[];
      };
      get_unique_years_web: {
        Args: {
          type_id_web: number;
        };
        Returns: {
          year_id: number;
          year: string;
        }[];
      };
      search_seat_cover: {
        Args: {
          p_type: string;
          p_cover: string;
          p_make: string;
          p_model: string;
          p_year: number;
          p_submodel: string;
          p_submodel2: string;
          p_submodel3: string;
        };
        Returns: {
          sku: string;
          type: string;
          make: string;
          model: string;
          year_generation: number;
          parent_generation: number;
          submodel1: string;
          submodel2: string;
          submodel3: string;
          product: string;
          display_color: string;
          msrp: number;
          price: number;
          quantity: number;
          display_id: string;
          make_slug: string;
          model_slug: string;
          year_options: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
