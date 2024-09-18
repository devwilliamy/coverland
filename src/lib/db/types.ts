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
      _Orders: {
        Row: {
          billing_address_city: string | null
          billing_address_country: string | null
          billing_address_line_1: string | null
          billing_address_line_2: string | null
          billing_address_postal_code: string | null
          billing_address_state: string | null
          billing_customer_name: string | null
          card_amount: number | null
          card_brand: string | null
          card_exp_month: string | null
          card_exp_year: string | null
          card_fingerprint: string | null
          card_funding: string | null
          card_last_four: string | null
          created_at: string | null
          created_at_pst: string | null
          currency: string | null
          customer_email: string | null
          customer_id: number | null
          customer_name: string | null
          customer_phone: string | null
          id: number
          notes: string | null
          order_date: string | null
          order_id: string | null
          payment_date: string | null
          payment_gateway: string | null
          payment_gateway_customer_id: string | null
          payment_method: string | null
          payment_method_id: string | null
          payment_status: string | null
          shipping_address_city: string | null
          shipping_address_country: string | null
          shipping_address_line_1: string | null
          shipping_address_line_2: string | null
          shipping_address_postal_code: string | null
          shipping_address_state: string | null
          shipping_carrier: string | null
          shipping_previous_status: string | null
          shipping_service: string | null
          shipping_status: string | null
          shipping_status_last_updated: string | null
          shipping_status_last_updated_pst: string | null
          shipping_tracking_number: string | null
          skus: string | null
          status: string | null
          total_amount: number | null
          total_discount_amount: number | null
          total_original_amount: number | null
          total_tax: number | null
          transaction_id: string | null
          updated_at: string | null
          wallet_type: string | null
        }
        Insert: {
          billing_address_city?: string | null
          billing_address_country?: string | null
          billing_address_line_1?: string | null
          billing_address_line_2?: string | null
          billing_address_postal_code?: string | null
          billing_address_state?: string | null
          billing_customer_name?: string | null
          card_amount?: number | null
          card_brand?: string | null
          card_exp_month?: string | null
          card_exp_year?: string | null
          card_fingerprint?: string | null
          card_funding?: string | null
          card_last_four?: string | null
          created_at?: string | null
          created_at_pst?: string | null
          currency?: string | null
          customer_email?: string | null
          customer_id?: number | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: number
          notes?: string | null
          order_date?: string | null
          order_id?: string | null
          payment_date?: string | null
          payment_gateway?: string | null
          payment_gateway_customer_id?: string | null
          payment_method?: string | null
          payment_method_id?: string | null
          payment_status?: string | null
          shipping_address_city?: string | null
          shipping_address_country?: string | null
          shipping_address_line_1?: string | null
          shipping_address_line_2?: string | null
          shipping_address_postal_code?: string | null
          shipping_address_state?: string | null
          shipping_carrier?: string | null
          shipping_previous_status?: string | null
          shipping_service?: string | null
          shipping_status?: string | null
          shipping_status_last_updated?: string | null
          shipping_status_last_updated_pst?: string | null
          shipping_tracking_number?: string | null
          skus?: string | null
          status?: string | null
          total_amount?: number | null
          total_discount_amount?: number | null
          total_original_amount?: number | null
          total_tax?: number | null
          transaction_id?: string | null
          updated_at?: string | null
          wallet_type?: string | null
        }
        Update: {
          billing_address_city?: string | null
          billing_address_country?: string | null
          billing_address_line_1?: string | null
          billing_address_line_2?: string | null
          billing_address_postal_code?: string | null
          billing_address_state?: string | null
          billing_customer_name?: string | null
          card_amount?: number | null
          card_brand?: string | null
          card_exp_month?: string | null
          card_exp_year?: string | null
          card_fingerprint?: string | null
          card_funding?: string | null
          card_last_four?: string | null
          created_at?: string | null
          created_at_pst?: string | null
          currency?: string | null
          customer_email?: string | null
          customer_id?: number | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: number
          notes?: string | null
          order_date?: string | null
          order_id?: string | null
          payment_date?: string | null
          payment_gateway?: string | null
          payment_gateway_customer_id?: string | null
          payment_method?: string | null
          payment_method_id?: string | null
          payment_status?: string | null
          shipping_address_city?: string | null
          shipping_address_country?: string | null
          shipping_address_line_1?: string | null
          shipping_address_line_2?: string | null
          shipping_address_postal_code?: string | null
          shipping_address_state?: string | null
          shipping_carrier?: string | null
          shipping_previous_status?: string | null
          shipping_service?: string | null
          shipping_status?: string | null
          shipping_status_last_updated?: string | null
          shipping_status_last_updated_pst?: string | null
          shipping_tracking_number?: string | null
          skus?: string | null
          status?: string | null
          total_amount?: number | null
          total_discount_amount?: number | null
          total_original_amount?: number | null
          total_tax?: number | null
          transaction_id?: string | null
          updated_at?: string | null
          wallet_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_Orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      _Orders_20240812_backup: {
        Row: {
          billing_address_city: string | null
          billing_address_country: string | null
          billing_address_line_1: string | null
          billing_address_line_2: string | null
          billing_address_postal_code: string | null
          billing_address_state: string | null
          billing_customer_name: string | null
          card_amount: number | null
          card_brand: string | null
          card_fingerprint: string | null
          card_funding: string | null
          created_at: string | null
          created_at_pst: string | null
          currency: string | null
          customer_email: string | null
          customer_id: number | null
          customer_name: string | null
          customer_phone: string | null
          id: number | null
          notes: string | null
          order_date: string | null
          order_id: string | null
          payment_date: string | null
          payment_gateway: string | null
          payment_gateway_customer_id: string | null
          payment_method: string | null
          payment_method_id: string | null
          payment_status: string | null
          shipping_address_city: string | null
          shipping_address_country: string | null
          shipping_address_line_1: string | null
          shipping_address_line_2: string | null
          shipping_address_postal_code: string | null
          shipping_address_state: string | null
          shipping_carrier: string | null
          shipping_previous_status: string | null
          shipping_service: string | null
          shipping_status: string | null
          shipping_status_last_updated: string | null
          shipping_status_last_updated_pst: string | null
          shipping_tracking_number: string | null
          skus: string | null
          status: string | null
          total_amount: number | null
          total_discount_amount: number | null
          total_original_amount: number | null
          transaction_id: string | null
          updated_at: string | null
          wallet_type: string | null
        }
        Insert: {
          billing_address_city?: string | null
          billing_address_country?: string | null
          billing_address_line_1?: string | null
          billing_address_line_2?: string | null
          billing_address_postal_code?: string | null
          billing_address_state?: string | null
          billing_customer_name?: string | null
          card_amount?: number | null
          card_brand?: string | null
          card_fingerprint?: string | null
          card_funding?: string | null
          created_at?: string | null
          created_at_pst?: string | null
          currency?: string | null
          customer_email?: string | null
          customer_id?: number | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: number | null
          notes?: string | null
          order_date?: string | null
          order_id?: string | null
          payment_date?: string | null
          payment_gateway?: string | null
          payment_gateway_customer_id?: string | null
          payment_method?: string | null
          payment_method_id?: string | null
          payment_status?: string | null
          shipping_address_city?: string | null
          shipping_address_country?: string | null
          shipping_address_line_1?: string | null
          shipping_address_line_2?: string | null
          shipping_address_postal_code?: string | null
          shipping_address_state?: string | null
          shipping_carrier?: string | null
          shipping_previous_status?: string | null
          shipping_service?: string | null
          shipping_status?: string | null
          shipping_status_last_updated?: string | null
          shipping_status_last_updated_pst?: string | null
          shipping_tracking_number?: string | null
          skus?: string | null
          status?: string | null
          total_amount?: number | null
          total_discount_amount?: number | null
          total_original_amount?: number | null
          transaction_id?: string | null
          updated_at?: string | null
          wallet_type?: string | null
        }
        Update: {
          billing_address_city?: string | null
          billing_address_country?: string | null
          billing_address_line_1?: string | null
          billing_address_line_2?: string | null
          billing_address_postal_code?: string | null
          billing_address_state?: string | null
          billing_customer_name?: string | null
          card_amount?: number | null
          card_brand?: string | null
          card_fingerprint?: string | null
          card_funding?: string | null
          created_at?: string | null
          created_at_pst?: string | null
          currency?: string | null
          customer_email?: string | null
          customer_id?: number | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: number | null
          notes?: string | null
          order_date?: string | null
          order_id?: string | null
          payment_date?: string | null
          payment_gateway?: string | null
          payment_gateway_customer_id?: string | null
          payment_method?: string | null
          payment_method_id?: string | null
          payment_status?: string | null
          shipping_address_city?: string | null
          shipping_address_country?: string | null
          shipping_address_line_1?: string | null
          shipping_address_line_2?: string | null
          shipping_address_postal_code?: string | null
          shipping_address_state?: string | null
          shipping_carrier?: string | null
          shipping_previous_status?: string | null
          shipping_service?: string | null
          shipping_status?: string | null
          shipping_status_last_updated?: string | null
          shipping_status_last_updated_pst?: string | null
          shipping_tracking_number?: string | null
          skus?: string | null
          status?: string | null
          total_amount?: number | null
          total_discount_amount?: number | null
          total_original_amount?: number | null
          transaction_id?: string | null
          updated_at?: string | null
          wallet_type?: string | null
        }
        Relationships: []
      }
      _Orders_20240815_forIDFix_backup: {
        Row: {
          billing_address_city: string | null
          billing_address_country: string | null
          billing_address_line_1: string | null
          billing_address_line_2: string | null
          billing_address_postal_code: string | null
          billing_address_state: string | null
          billing_customer_name: string | null
          card_amount: number | null
          card_brand: string | null
          card_fingerprint: string | null
          card_funding: string | null
          created_at: string | null
          created_at_pst: string | null
          currency: string | null
          customer_email: string | null
          customer_id: number | null
          customer_name: string | null
          customer_phone: string | null
          id: number | null
          notes: string | null
          order_date: string | null
          order_id: string | null
          payment_date: string | null
          payment_gateway: string | null
          payment_gateway_customer_id: string | null
          payment_method: string | null
          payment_method_id: string | null
          payment_status: string | null
          shipping_address_city: string | null
          shipping_address_country: string | null
          shipping_address_line_1: string | null
          shipping_address_line_2: string | null
          shipping_address_postal_code: string | null
          shipping_address_state: string | null
          shipping_carrier: string | null
          shipping_previous_status: string | null
          shipping_service: string | null
          shipping_status: string | null
          shipping_status_last_updated: string | null
          shipping_status_last_updated_pst: string | null
          shipping_tracking_number: string | null
          skus: string | null
          status: string | null
          total_amount: number | null
          total_discount_amount: number | null
          total_original_amount: number | null
          transaction_id: string | null
          updated_at: string | null
          wallet_type: string | null
        }
        Insert: {
          billing_address_city?: string | null
          billing_address_country?: string | null
          billing_address_line_1?: string | null
          billing_address_line_2?: string | null
          billing_address_postal_code?: string | null
          billing_address_state?: string | null
          billing_customer_name?: string | null
          card_amount?: number | null
          card_brand?: string | null
          card_fingerprint?: string | null
          card_funding?: string | null
          created_at?: string | null
          created_at_pst?: string | null
          currency?: string | null
          customer_email?: string | null
          customer_id?: number | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: number | null
          notes?: string | null
          order_date?: string | null
          order_id?: string | null
          payment_date?: string | null
          payment_gateway?: string | null
          payment_gateway_customer_id?: string | null
          payment_method?: string | null
          payment_method_id?: string | null
          payment_status?: string | null
          shipping_address_city?: string | null
          shipping_address_country?: string | null
          shipping_address_line_1?: string | null
          shipping_address_line_2?: string | null
          shipping_address_postal_code?: string | null
          shipping_address_state?: string | null
          shipping_carrier?: string | null
          shipping_previous_status?: string | null
          shipping_service?: string | null
          shipping_status?: string | null
          shipping_status_last_updated?: string | null
          shipping_status_last_updated_pst?: string | null
          shipping_tracking_number?: string | null
          skus?: string | null
          status?: string | null
          total_amount?: number | null
          total_discount_amount?: number | null
          total_original_amount?: number | null
          transaction_id?: string | null
          updated_at?: string | null
          wallet_type?: string | null
        }
        Update: {
          billing_address_city?: string | null
          billing_address_country?: string | null
          billing_address_line_1?: string | null
          billing_address_line_2?: string | null
          billing_address_postal_code?: string | null
          billing_address_state?: string | null
          billing_customer_name?: string | null
          card_amount?: number | null
          card_brand?: string | null
          card_fingerprint?: string | null
          card_funding?: string | null
          created_at?: string | null
          created_at_pst?: string | null
          currency?: string | null
          customer_email?: string | null
          customer_id?: number | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: number | null
          notes?: string | null
          order_date?: string | null
          order_id?: string | null
          payment_date?: string | null
          payment_gateway?: string | null
          payment_gateway_customer_id?: string | null
          payment_method?: string | null
          payment_method_id?: string | null
          payment_status?: string | null
          shipping_address_city?: string | null
          shipping_address_country?: string | null
          shipping_address_line_1?: string | null
          shipping_address_line_2?: string | null
          shipping_address_postal_code?: string | null
          shipping_address_state?: string | null
          shipping_carrier?: string | null
          shipping_previous_status?: string | null
          shipping_service?: string | null
          shipping_status?: string | null
          shipping_status_last_updated?: string | null
          shipping_status_last_updated_pst?: string | null
          shipping_tracking_number?: string | null
          skus?: string | null
          status?: string | null
          total_amount?: number | null
          total_discount_amount?: number | null
          total_original_amount?: number | null
          transaction_id?: string | null
          updated_at?: string | null
          wallet_type?: string | null
        }
        Relationships: []
      }
      _Orders_backup_20240604_1658: {
        Row: {
          billing_address_city: string | null
          billing_address_country: string | null
          billing_address_line_1: string | null
          billing_address_line_2: string | null
          billing_address_postal_code: string | null
          billing_address_state: string | null
          billing_customer_name: string | null
          card_amount: number | null
          card_brand: string | null
          card_fingerprint: string | null
          card_funding: string | null
          created_at: string | null
          currency: string | null
          customer_email: string | null
          customer_id: number | null
          customer_name: string | null
          customer_phone: string | null
          id: number | null
          notes: string | null
          order_date: string | null
          order_id: string | null
          payment_date: string | null
          payment_gateway: string | null
          payment_gateway_customer_id: string | null
          payment_method: string | null
          payment_method_id: string | null
          payment_status: string | null
          shipping_address_city: string | null
          shipping_address_country: string | null
          shipping_address_line_1: string | null
          shipping_address_line_2: string | null
          shipping_address_postal_code: string | null
          shipping_address_state: string | null
          shipping_carrier: string | null
          shipping_tracking_number: string | null
          skus: string | null
          status: string | null
          total_amount: number | null
          transaction_id: string | null
          updated_at: string | null
          wallet_type: string | null
        }
        Insert: {
          billing_address_city?: string | null
          billing_address_country?: string | null
          billing_address_line_1?: string | null
          billing_address_line_2?: string | null
          billing_address_postal_code?: string | null
          billing_address_state?: string | null
          billing_customer_name?: string | null
          card_amount?: number | null
          card_brand?: string | null
          card_fingerprint?: string | null
          card_funding?: string | null
          created_at?: string | null
          currency?: string | null
          customer_email?: string | null
          customer_id?: number | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: number | null
          notes?: string | null
          order_date?: string | null
          order_id?: string | null
          payment_date?: string | null
          payment_gateway?: string | null
          payment_gateway_customer_id?: string | null
          payment_method?: string | null
          payment_method_id?: string | null
          payment_status?: string | null
          shipping_address_city?: string | null
          shipping_address_country?: string | null
          shipping_address_line_1?: string | null
          shipping_address_line_2?: string | null
          shipping_address_postal_code?: string | null
          shipping_address_state?: string | null
          shipping_carrier?: string | null
          shipping_tracking_number?: string | null
          skus?: string | null
          status?: string | null
          total_amount?: number | null
          transaction_id?: string | null
          updated_at?: string | null
          wallet_type?: string | null
        }
        Update: {
          billing_address_city?: string | null
          billing_address_country?: string | null
          billing_address_line_1?: string | null
          billing_address_line_2?: string | null
          billing_address_postal_code?: string | null
          billing_address_state?: string | null
          billing_customer_name?: string | null
          card_amount?: number | null
          card_brand?: string | null
          card_fingerprint?: string | null
          card_funding?: string | null
          created_at?: string | null
          currency?: string | null
          customer_email?: string | null
          customer_id?: number | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: number | null
          notes?: string | null
          order_date?: string | null
          order_id?: string | null
          payment_date?: string | null
          payment_gateway?: string | null
          payment_gateway_customer_id?: string | null
          payment_method?: string | null
          payment_method_id?: string | null
          payment_status?: string | null
          shipping_address_city?: string | null
          shipping_address_country?: string | null
          shipping_address_line_1?: string | null
          shipping_address_line_2?: string | null
          shipping_address_postal_code?: string | null
          shipping_address_state?: string | null
          shipping_carrier?: string | null
          shipping_tracking_number?: string | null
          skus?: string | null
          status?: string | null
          total_amount?: number | null
          transaction_id?: string | null
          updated_at?: string | null
          wallet_type?: string | null
        }
        Relationships: []
      }
      _Orders_TEST: {
        Row: {
          billing_address_city: string | null
          billing_address_country: string | null
          billing_address_line_1: string | null
          billing_address_line_2: string | null
          billing_address_postal_code: string | null
          billing_address_state: string | null
          billing_customer_name: string | null
          card_amount: number | null
          card_brand: string | null
          card_exp_month: string | null
          card_exp_year: string | null
          card_fingerprint: string | null
          card_funding: string | null
          card_last_four: string | null
          created_at: string | null
          created_at_pst: string | null
          currency: string | null
          customer_email: string | null
          customer_id: number | null
          customer_name: string | null
          customer_phone: string | null
          id: number
          notes: string | null
          order_date: string | null
          order_id: string | null
          payment_date: string | null
          payment_gateway: string | null
          payment_gateway_customer_id: string | null
          payment_method: string | null
          payment_method_id: string | null
          payment_status: string | null
          shipping_address_city: string | null
          shipping_address_country: string | null
          shipping_address_line_1: string | null
          shipping_address_line_2: string | null
          shipping_address_postal_code: string | null
          shipping_address_state: string | null
          shipping_carrier: string | null
          shipping_previous_status: string | null
          shipping_service: string | null
          shipping_status: string | null
          shipping_status_last_updated: string | null
          shipping_status_last_updated_pst: string | null
          shipping_tracking_number: string | null
          skus: string | null
          status: string | null
          total_amount: number | null
          total_discount_amount: number | null
          total_original_amount: number | null
          total_tax: number | null
          transaction_id: string | null
          updated_at: string | null
          wallet_type: string | null
        }
        Insert: {
          billing_address_city?: string | null
          billing_address_country?: string | null
          billing_address_line_1?: string | null
          billing_address_line_2?: string | null
          billing_address_postal_code?: string | null
          billing_address_state?: string | null
          billing_customer_name?: string | null
          card_amount?: number | null
          card_brand?: string | null
          card_exp_month?: string | null
          card_exp_year?: string | null
          card_fingerprint?: string | null
          card_funding?: string | null
          card_last_four?: string | null
          created_at?: string | null
          created_at_pst?: string | null
          currency?: string | null
          customer_email?: string | null
          customer_id?: number | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: number
          notes?: string | null
          order_date?: string | null
          order_id?: string | null
          payment_date?: string | null
          payment_gateway?: string | null
          payment_gateway_customer_id?: string | null
          payment_method?: string | null
          payment_method_id?: string | null
          payment_status?: string | null
          shipping_address_city?: string | null
          shipping_address_country?: string | null
          shipping_address_line_1?: string | null
          shipping_address_line_2?: string | null
          shipping_address_postal_code?: string | null
          shipping_address_state?: string | null
          shipping_carrier?: string | null
          shipping_previous_status?: string | null
          shipping_service?: string | null
          shipping_status?: string | null
          shipping_status_last_updated?: string | null
          shipping_status_last_updated_pst?: string | null
          shipping_tracking_number?: string | null
          skus?: string | null
          status?: string | null
          total_amount?: number | null
          total_discount_amount?: number | null
          total_original_amount?: number | null
          total_tax?: number | null
          transaction_id?: string | null
          updated_at?: string | null
          wallet_type?: string | null
        }
        Update: {
          billing_address_city?: string | null
          billing_address_country?: string | null
          billing_address_line_1?: string | null
          billing_address_line_2?: string | null
          billing_address_postal_code?: string | null
          billing_address_state?: string | null
          billing_customer_name?: string | null
          card_amount?: number | null
          card_brand?: string | null
          card_exp_month?: string | null
          card_exp_year?: string | null
          card_fingerprint?: string | null
          card_funding?: string | null
          card_last_four?: string | null
          created_at?: string | null
          created_at_pst?: string | null
          currency?: string | null
          customer_email?: string | null
          customer_id?: number | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: number
          notes?: string | null
          order_date?: string | null
          order_id?: string | null
          payment_date?: string | null
          payment_gateway?: string | null
          payment_gateway_customer_id?: string | null
          payment_method?: string | null
          payment_method_id?: string | null
          payment_status?: string | null
          shipping_address_city?: string | null
          shipping_address_country?: string | null
          shipping_address_line_1?: string | null
          shipping_address_line_2?: string | null
          shipping_address_postal_code?: string | null
          shipping_address_state?: string | null
          shipping_carrier?: string | null
          shipping_previous_status?: string | null
          shipping_service?: string | null
          shipping_status?: string | null
          shipping_status_last_updated?: string | null
          shipping_status_last_updated_pst?: string | null
          shipping_tracking_number?: string | null
          skus?: string | null
          status?: string | null
          total_amount?: number | null
          total_discount_amount?: number | null
          total_original_amount?: number | null
          total_tax?: number | null
          transaction_id?: string | null
          updated_at?: string | null
          wallet_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_Orders_TEST_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Accessories: {
        Row: {
          description: string[] | null
          id: number
          images: string | null
          msrp: number | null
          sku: string | null
          title: string | null
        }
        Insert: {
          description?: string[] | null
          id: number
          images?: string | null
          msrp?: number | null
          sku?: string | null
          title?: string | null
        }
        Update: {
          description?: string[] | null
          id?: number
          images?: string | null
          msrp?: number | null
          sku?: string | null
          title?: string | null
        }
        Relationships: []
      }
      Blogs: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image_path: string | null
          Name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image_path?: string | null
          Name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image_path?: string | null
          Name?: string | null
        }
        Relationships: []
      }
      car_cover_preorder_20240904: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          feature: string | null
          gtin: string | null
          id: number
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          MPN: string | null
          msrp: number | null
          parent_generation: string | null
          preorder_date: string | null
          preorder_discount: number | null
          preorder_true: boolean | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs sku": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          gtin?: string | null
          id: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          MPN?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          MPN?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      car_cover_preorder_20240911: {
        Row: {
          id: number
          preorder_date: string | null
          preorder_discount: number | null
          preorder_true: boolean | null
          sku: string | null
          "skulabs sku": string | null
        }
        Insert: {
          id: number
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Update: {
          id?: number
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Relationships: []
      }
      hyeon_20240912: {
        Row: {
          display_color: string | null
          display_set: string | null
          id: number
          MPN: string | null
          sku: string | null
          "skulabs sku": string | null
        }
        Insert: {
          display_color?: string | null
          display_set?: string | null
          id: number
          MPN?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Update: {
          display_color?: string | null
          display_set?: string | null
          id?: number
          MPN?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Relationships: []
      }
      Make: {
        Row: {
          created_at: string
          id: number
          name: string | null
          slug: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          slug?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          slug?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      Model: {
        Row: {
          created_at: string
          id: number
          name: string | null
          slug: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          slug?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          slug?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      new_size_20240906: {
        Row: {
          id: number
          MPN: string | null
          sku: string | null
          "skulabs sku": string | null
        }
        Insert: {
          id: number
          MPN?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Update: {
          id?: number
          MPN?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Relationships: []
      }
      order_id_sequences: {
        Row: {
          date: string
          last_sequence: number | null
          product_type: string
        }
        Insert: {
          date: string
          last_sequence?: number | null
          product_type: string
        }
        Update: {
          date?: string
          last_sequence?: number | null
          product_type?: string
        }
        Relationships: []
      }
      order_items_being_removed_20240816: {
        Row: {
          created_at: string | null
          discount_amount: number | null
          id: number | null
          new_product_id: number | null
          order_id: number | null
          original_price: number | null
          price: number | null
          product_id: number | null
          quantity: number | null
          skus: string | null
        }
        Insert: {
          created_at?: string | null
          discount_amount?: number | null
          id?: number | null
          new_product_id?: number | null
          order_id?: number | null
          original_price?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
          skus?: string | null
        }
        Update: {
          created_at?: string | null
          discount_amount?: number | null
          id?: number | null
          new_product_id?: number | null
          order_id?: number | null
          original_price?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
          skus?: string | null
        }
        Relationships: []
      }
      order_items_being_removed_20240820: {
        Row: {
          created_at: string | null
          discount_amount: number | null
          id: number | null
          new_product_id: number | null
          order_id: number | null
          original_price: number | null
          price: number | null
          product_id: number | null
          quantity: number | null
          skus: string | null
        }
        Insert: {
          created_at?: string | null
          discount_amount?: number | null
          id?: number | null
          new_product_id?: number | null
          order_id?: number | null
          original_price?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
          skus?: string | null
        }
        Update: {
          created_at?: string | null
          discount_amount?: number | null
          id?: number | null
          new_product_id?: number | null
          order_id?: number | null
          original_price?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
          skus?: string | null
        }
        Relationships: []
      }
      order_taxes: {
        Row: {
          id: number
          jurisdiction: string
          order_id: number
          tax_amount: number
          tax_rate: number
          tax_type: string
          taxable_amount: number
        }
        Insert: {
          id?: number
          jurisdiction: string
          order_id: number
          tax_amount: number
          tax_rate: number
          tax_type: string
          taxable_amount: number
        }
        Update: {
          id?: number
          jurisdiction?: string
          order_id?: number
          tax_amount?: number
          tax_rate?: number
          tax_type?: string
          taxable_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_taxes_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "_Orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_taxes_test: {
        Row: {
          id: number
          jurisdiction: string
          order_id: number
          tax_amount: number
          tax_rate: number
          tax_type: string
          taxable_amount: number
        }
        Insert: {
          id?: number
          jurisdiction: string
          order_id: number
          tax_amount: number
          tax_rate: number
          tax_type: string
          taxable_amount: number
        }
        Update: {
          id?: number
          jurisdiction?: string
          order_id?: number
          tax_amount?: number
          tax_rate?: number
          tax_type?: string
          taxable_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_taxes_test_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "_Orders_TEST"
            referencedColumns: ["id"]
          },
        ]
      }
      orderItems_table: {
        Row: {
          created_at: string
          discount_amount: number | null
          id: number
          order_id: number | null
          original_price: number | null
          price: number | null
          product_id: number | null
          quantity: number | null
          tax_amount: number | null
          total_amount: number | null
        }
        Insert: {
          created_at?: string
          discount_amount?: number | null
          id?: number
          order_id?: number | null
          original_price?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
          tax_amount?: number | null
          total_amount?: number | null
        }
        Update: {
          created_at?: string
          discount_amount?: number | null
          id?: number
          order_id?: number | null
          original_price?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
          tax_amount?: number | null
          total_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orderItems_table_duplicate_duplicate_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "_Orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orderItems_table_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["id"]
          },
        ]
      }
      orderItems_table_20240812_backup: {
        Row: {
          created_at: string | null
          discount_amount: number | null
          id: number | null
          order_id: number | null
          original_price: number | null
          price: number | null
          product_id: number | null
          quantity: number | null
        }
        Insert: {
          created_at?: string | null
          discount_amount?: number | null
          id?: number | null
          order_id?: number | null
          original_price?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
        }
        Update: {
          created_at?: string | null
          discount_amount?: number | null
          id?: number | null
          order_id?: number | null
          original_price?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
        }
        Relationships: []
      }
      orderItems_table_20240815_forIDFix_backup: {
        Row: {
          created_at: string | null
          discount_amount: number | null
          id: number | null
          order_id: number | null
          original_price: number | null
          price: number | null
          product_id: number | null
          quantity: number | null
        }
        Insert: {
          created_at?: string | null
          discount_amount?: number | null
          id?: number | null
          order_id?: number | null
          original_price?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
        }
        Update: {
          created_at?: string | null
          discount_amount?: number | null
          id?: number | null
          order_id?: number | null
          original_price?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
        }
        Relationships: []
      }
      orderItems_table_20240815_forIDFix_NEW: {
        Row: {
          created_at: string | null
          discount_amount: number | null
          id: number | null
          order_id: number | null
          original_price: number | null
          price: number | null
          product_id: number | null
          quantity: number | null
        }
        Insert: {
          created_at?: string | null
          discount_amount?: number | null
          id?: number | null
          order_id?: number | null
          original_price?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
        }
        Update: {
          created_at?: string | null
          discount_amount?: number | null
          id?: number | null
          order_id?: number | null
          original_price?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orderItems_table_20240815_forIDFix_NEW_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Products_20240816_old_2"
            referencedColumns: ["id"]
          },
        ]
      }
      orderItems_table_TEST: {
        Row: {
          created_at: string
          discount_amount: number | null
          id: number
          order_id: number | null
          original_price: number | null
          price: number | null
          product_id: number | null
          quantity: number | null
          tax_amount: number | null
          total_amount: number | null
        }
        Insert: {
          created_at?: string
          discount_amount?: number | null
          id?: number
          order_id?: number | null
          original_price?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
          tax_amount?: number | null
          total_amount?: number | null
        }
        Update: {
          created_at?: string
          discount_amount?: number | null
          id?: number
          order_id?: number | null
          original_price?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
          tax_amount?: number | null
          total_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orderItems_table_TEST_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "_Orders_TEST"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orderItems_table_TEST_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["id"]
          },
        ]
      }
      orderItems_table_TEST_20240815_forIDFix_NEW: {
        Row: {
          created_at: string | null
          discount_amount: number | null
          id: number | null
          order_id: number | null
          original_price: number | null
          price: number | null
          product_id: number | null
          quantity: number | null
        }
        Insert: {
          created_at?: string | null
          discount_amount?: number | null
          id?: number | null
          order_id?: number | null
          original_price?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
        }
        Update: {
          created_at?: string | null
          discount_amount?: number | null
          id?: number | null
          order_id?: number | null
          original_price?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orderItems_table_TEST_20240815_forIDFix_NEW_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Products_20240816_old_2"
            referencedColumns: ["id"]
          },
        ]
      }
      orderItems_table_TEST_duplicate: {
        Row: {
          created_at: string
          discount_amount: number | null
          id: number
          order_id: number | null
          original_price: number | null
          preorder_discount: number | null
          price: number | null
          product_id: number | null
          quantity: number | null
        }
        Insert: {
          created_at?: string
          discount_amount?: number | null
          id?: number
          order_id?: number | null
          original_price?: number | null
          preorder_discount?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
        }
        Update: {
          created_at?: string
          discount_amount?: number | null
          id?: number
          order_id?: number | null
          original_price?: number | null
          preorder_discount?: number | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orderItems_table_TEST_duplicate_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "_Orders_TEST"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orderItems_table_TEST_duplicate_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Products_20240813_old"
            referencedColumns: ["id"]
          },
        ]
      }
      parent_generation_year_generation_fix_20240814: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          display_set: string | null
          feature: string | null
          gtin: string | null
          id: number
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          mpn: string | null
          msrp: number | null
          parent_generation: string | null
          preorder: string | null
          preorder_date: string | null
          preorder_discount: string | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs SKU": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: string | null
          preorder_date?: string | null
          preorder_discount?: string | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: string | null
          preorder_date?: string | null
          preorder_discount?: string | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      preorder_20240911: {
        Row: {
          id: number
          preorder_date: string | null
          preorder_discount: number | null
          preorder_true: boolean | null
          sku: string | null
          "skulabs sku": string | null
        }
        Insert: {
          id: number
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Update: {
          id?: number
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Relationships: []
      }
      preorder_update_20240910: {
        Row: {
          id: number
          preorder_date: string | null
          preorder_discount: number | null
          preorder_true: boolean | null
          sku: string | null
          "skulabs sku": string | null
        }
        Insert: {
          id: number
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Update: {
          id?: number
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Relationships: []
      }
      product_new_sku_20240905: {
        Row: {
          display_color: string | null
          display_id: string | null
          display_set: string | null
          gtin: string | null
          id: number | null
          make: string | null
          model: string | null
          MPN: string | null
          parent_generation: string | null
          preorder_date: string | null
          preorder_discount: string | null
          preorder_true: boolean | null
          quantity: string | null
          sku: string | null
          "skulabs sku": string | null
          submodel1: string | null
          submodel2: string | null
          type: string | null
          year_generation: string | null
        }
        Insert: {
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          model?: string | null
          MPN?: string | null
          parent_generation?: string | null
          preorder_date?: string | null
          preorder_discount?: string | null
          preorder_true?: boolean | null
          quantity?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Update: {
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          model?: string | null
          MPN?: string | null
          parent_generation?: string | null
          preorder_date?: string | null
          preorder_discount?: string | null
          preorder_true?: boolean | null
          quantity?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      "Product-Metadata": {
        Row: {
          description: string | null
          id: string | null
          URL: string | null
        }
        Insert: {
          description?: string | null
          id?: string | null
          URL?: string | null
        }
        Update: {
          description?: string | null
          id?: string | null
          URL?: string | null
        }
        Relationships: []
      }
      Products: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          display_set: string | null
          feature: string | null
          gtin: string | null
          id: number
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          mpn: string | null
          msrp: number | null
          parent_generation: string | null
          preorder: boolean | null
          preorder_date: string | null
          preorder_discount: number | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs SKU": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      Products_20240617: {
        Row: {
          display_color: string | null
          display_id: string | null
          display_set: string | null
          id: number
          make: string | null
          model: string | null
          parent_generation: string | null
          sku: string | null
          "skulabs SKU": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
        }
        Insert: {
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          id: number
          make?: string | null
          model?: string | null
          parent_generation?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Update: {
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          id?: number
          make?: string | null
          model?: string | null
          parent_generation?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      Products_20240813_old: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          display_set: string | null
          feature: string | null
          gtin: string | null
          id: number
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          mpn: string | null
          msrp: number | null
          parent_generation: string | null
          preorder: boolean | null
          preorder_date: string | null
          preorder_discount: number | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs SKU": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      Products_20240815: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          display_set: string | null
          feature: string | null
          gtin: string | null
          id: number | null
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          mpn: string | null
          msrp: number | null
          parent_generation: string | null
          preorder: boolean | null
          preorder_date: string | null
          preorder_discount: number | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs SKU": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      Products_20240815_new: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          display_set: string | null
          feature: string | null
          gtin: string | null
          id: number | null
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          mpn: string | null
          msrp: number | null
          parent_generation: string | null
          preorder: boolean | null
          preorder_date: string | null
          preorder_discount: number | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs SKU": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      Products_20240816_old: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          display_set: string | null
          feature: string | null
          gtin: string | null
          id: number
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          mpn: string | null
          msrp: number | null
          parent_generation: string | null
          preorder: boolean | null
          preorder_date: string | null
          preorder_discount: number | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs SKU": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      Products_20240816_old_2: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          display_set: string | null
          feature: string | null
          gtin: string | null
          id: number
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          mpn: string | null
          msrp: number | null
          parent_generation: string | null
          preorder: boolean | null
          preorder_date: string | null
          preorder_discount: number | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs SKU": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      Products_20240820_backup: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          display_set: string | null
          feature: string | null
          gtin: string | null
          id: number | null
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          mpn: string | null
          msrp: number | null
          parent_generation: string | null
          preorder: boolean | null
          preorder_date: string | null
          preorder_discount: number | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs SKU": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      Products_20240820_old: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          display_set: string | null
          feature: string | null
          gtin: string | null
          id: number
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          mpn: string | null
          msrp: number | null
          parent_generation: string | null
          preorder: boolean | null
          preorder_date: string | null
          preorder_discount: number | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs SKU": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      Products_20240821_backup: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          display_set: string | null
          feature: string | null
          gtin: string | null
          id: number | null
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          mpn: string | null
          msrp: number | null
          parent_generation: string | null
          preorder: boolean | null
          preorder_date: string | null
          preorder_discount: number | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs SKU": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      Products_20240821_old: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          display_set: string | null
          feature: string | null
          gtin: string | null
          id: number
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          mpn: string | null
          msrp: number | null
          parent_generation: string | null
          preorder: boolean | null
          preorder_date: string | null
          preorder_discount: number | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs SKU": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      Products_20240828_backup: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          display_set: string | null
          feature: string | null
          gtin: string | null
          id: number | null
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          mpn: string | null
          msrp: number | null
          parent_generation: string | null
          preorder: boolean | null
          preorder_date: string | null
          preorder_discount: number | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs SKU": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      Products_20240828_new: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          display_set: string | null
          feature: string | null
          gtin: string | null
          id: number | null
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          mpn: string | null
          msrp: number | null
          parent_generation: string | null
          preorder: boolean | null
          preorder_date: string | null
          preorder_discount: number | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs SKU": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      Products_20240828_old: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          display_set: string | null
          feature: string | null
          gtin: string | null
          id: number
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          mpn: string | null
          msrp: number | null
          parent_generation: string | null
          preorder: boolean | null
          preorder_date: string | null
          preorder_discount: number | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs SKU": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      products_20240906_new_br: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          display_set: string | null
          feature: string | null
          gtin: string | null
          id: number | null
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          mpn: string | null
          msrp: number | null
          parent_generation: string | null
          preorder: boolean | null
          preorder_date: string | null
          preorder_discount: number | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs SKU": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          mpn?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      Products_backup_20240730: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          display_set: string | null
          feature: string | null
          id: number
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          msrp: number | null
          parent_generation: string | null
          preorder: boolean | null
          preorder_date: string | null
          preorder_discount: number | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs SKU": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          id: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          id?: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder?: boolean | null
          preorder_date?: string | null
          preorder_discount?: number | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs SKU"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      relations_product: {
        Row: {
          created_at: string | null
          id: number | null
          make_id: number | null
          model_id: number | null
          product_id: number | null
          type_id: number | null
          updated_at: string | null
          year_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "relations_product_20240828_combined_make_id_fkey"
            columns: ["make_id"]
            isOneToOne: false
            referencedRelation: "Make"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240828_combined_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "Model"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240828_combined_product_id_fkey_2"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240828_combined_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "Type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240828_combined_year_id_fkey"
            columns: ["year_id"]
            isOneToOne: false
            referencedRelation: "Years"
            referencedColumns: ["id"]
          },
        ]
      }
      relations_product_20240617_backup: {
        Row: {
          created_at: string | null
          id: number | null
          make_id: number | null
          model_id: number | null
          product_id: number | null
          type_id: number | null
          updated_at: string | null
          year_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Relationships: []
      }
      relations_product_20240709_backup: {
        Row: {
          created_at: string | null
          id: number
          make_id: number
          model_id: number
          product_id: number
          type_id: number
          updated_at: string | null
          year_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          make_id: number
          model_id: number
          product_id: number
          type_id: number
          updated_at?: string | null
          year_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          make_id?: number
          model_id?: number
          product_id?: number
          type_id?: number
          updated_at?: string | null
          year_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "relations_product_20240709_backup_make_id_fkey"
            columns: ["make_id"]
            isOneToOne: false
            referencedRelation: "Make"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240709_backup_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "Model"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240709_backup_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Products_20240813_old"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240709_backup_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "Type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240709_backup_year_id_fkey"
            columns: ["year_id"]
            isOneToOne: false
            referencedRelation: "Years"
            referencedColumns: ["id"]
          },
        ]
      }
      relations_product_20240813_old: {
        Row: {
          created_at: string | null
          id: number
          make_id: number
          model_id: number
          product_id: number
          type_id: number
          updated_at: string | null
          year_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          make_id: number
          model_id: number
          product_id: number
          type_id: number
          updated_at?: string | null
          year_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          make_id?: number
          model_id?: number
          product_id?: number
          type_id?: number
          updated_at?: string | null
          year_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "relations_product_20240709_old_make_id_fkey"
            columns: ["make_id"]
            isOneToOne: false
            referencedRelation: "Make"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240709_old_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "Model"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240709_old_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Products_20240813_old"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240709_old_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "Type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240709_old_year_id_fkey"
            columns: ["year_id"]
            isOneToOne: false
            referencedRelation: "Years"
            referencedColumns: ["id"]
          },
        ]
      }
      relations_product_20240814: {
        Row: {
          created_at: string | null
          id: number | null
          make_id: number | null
          model_id: number | null
          product_id: number | null
          type_id: number | null
          updated_at: string | null
          year_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Relationships: []
      }
      relations_product_20240820_backup: {
        Row: {
          created_at: string | null
          id: number | null
          make_id: number | null
          model_id: number | null
          product_id: number | null
          type_id: number | null
          updated_at: string | null
          year_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Relationships: []
      }
      relations_product_20240820_old: {
        Row: {
          created_at: string | null
          id: number | null
          make_id: number | null
          model_id: number | null
          product_id: number | null
          type_id: number | null
          updated_at: string | null
          year_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "relations_product_20240816_make_id_fkey"
            columns: ["make_id"]
            isOneToOne: false
            referencedRelation: "Make"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240816_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "Model"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240816_product_id_fkey_2"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Products_20240820_old"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240816_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "Type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240816_year_id_fkey"
            columns: ["year_id"]
            isOneToOne: false
            referencedRelation: "Years"
            referencedColumns: ["id"]
          },
        ]
      }
      relations_product_20240821_old: {
        Row: {
          created_at: string | null
          id: number | null
          make_id: number | null
          model_id: number | null
          product_id: number | null
          type_id: number | null
          updated_at: string | null
          year_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "relations_product_20240820_make_id_fkey"
            columns: ["make_id"]
            isOneToOne: false
            referencedRelation: "Make"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240820_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "Model"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240820_product_id_fkey_2"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Products_20240821_old"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240820_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "Type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240820_year_id_fkey"
            columns: ["year_id"]
            isOneToOne: false
            referencedRelation: "Years"
            referencedColumns: ["id"]
          },
        ]
      }
      relations_product_20240828: {
        Row: {
          created_at: string | null
          id: number | null
          make_id: number | null
          model_id: number | null
          product_id: number | null
          type_id: number | null
          updated_at: string | null
          year_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Relationships: []
      }
      relations_product_20240828_dkgr: {
        Row: {
          created_at: string | null
          id: number | null
          make_id: number | null
          model_id: number | null
          product_id: number | null
          type_id: number | null
          updated_at: string | null
          year_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Relationships: []
      }
      relations_product_20240828_old: {
        Row: {
          created_at: string | null
          id: number | null
          make_id: number | null
          model_id: number | null
          product_id: number | null
          type_id: number | null
          updated_at: string | null
          year_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "relations_product_20240821_make_id_fkey"
            columns: ["make_id"]
            isOneToOne: false
            referencedRelation: "Make"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240821_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "Model"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240821_product_id_fkey_2"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Products_20240828_old"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240821_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "Type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_20240821_year_id_fkey"
            columns: ["year_id"]
            isOneToOne: false
            referencedRelation: "Years"
            referencedColumns: ["id"]
          },
        ]
      }
      relations_product_go_test: {
        Row: {
          created_at: string | null
          id: number | null
          make_id: number | null
          model_id: number | null
          product_id: number | null
          type_id: number | null
          updated_at: string | null
          year_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "relations_product_go_test_make_id_fkey"
            columns: ["make_id"]
            isOneToOne: false
            referencedRelation: "Make"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_go_test_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "Model"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_go_test_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Products_20240820_old"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_go_test_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "Type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relations_product_go_test_year_id_fkey"
            columns: ["year_id"]
            isOneToOne: false
            referencedRelation: "Years"
            referencedColumns: ["id"]
          },
        ]
      }
      relations_product_new_br_20240809: {
        Row: {
          created_at: string | null
          id: number | null
          make_id: number | null
          model_id: number | null
          product_id: number | null
          type_id: number | null
          updated_at: string | null
          year_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number | null
          make_id?: number | null
          model_id?: number | null
          product_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          year_id?: number | null
        }
        Relationships: []
      }
      reviews_car_covers: {
        Row: {
          gpt_review_id: string | null
          helpful: number | null
          id: number | null
          make: string | null
          make_slug: string | null
          Mirror: string | null
          model: string | null
          model_slug: string | null
          parent_generation: string | null
          product_name: string | null
          product_type: string | null
          rating_stars: number | null
          recommend: string | null
          review_author: string | null
          review_description: string | null
          review_image: string | null
          review_title: string | null
          reviewed_at: string | null
          Size: string | null
          sku: string | null
          submodel1: string | null
          submodel2: string | null
          type: string | null
          verified_status: string | null
          year_generation: string | null
        }
        Insert: {
          gpt_review_id?: string | null
          helpful?: number | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          Mirror?: string | null
          model?: string | null
          model_slug?: string | null
          parent_generation?: string | null
          product_name?: string | null
          product_type?: string | null
          rating_stars?: number | null
          recommend?: string | null
          review_author?: string | null
          review_description?: string | null
          review_image?: string | null
          review_title?: string | null
          reviewed_at?: string | null
          Size?: string | null
          sku?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          verified_status?: string | null
          year_generation?: string | null
        }
        Update: {
          gpt_review_id?: string | null
          helpful?: number | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          Mirror?: string | null
          model?: string | null
          model_slug?: string | null
          parent_generation?: string | null
          product_name?: string | null
          product_type?: string | null
          rating_stars?: number | null
          recommend?: string | null
          review_author?: string | null
          review_description?: string | null
          review_image?: string | null
          review_title?: string | null
          reviewed_at?: string | null
          Size?: string | null
          sku?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          verified_status?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      reviews_seat_covers: {
        Row: {
          gpt_review_id: string | null
          helpful: number | null
          id: number
          make: string | null
          make_slug: string | null
          Mirror: string | null
          model: string | null
          model_slug: string | null
          parent_generation: string | null
          product_name: string | null
          product_type: string | null
          rating_stars: number | null
          recommend: string | null
          review_author: string | null
          review_description: string | null
          review_image: string | null
          review_title: string | null
          reviewed_at: string | null
          Size: string | null
          sku: string | null
          submodel1: string | null
          submodel2: string | null
          type: string | null
          verified_status: string | null
          year_generation: string | null
        }
        Insert: {
          gpt_review_id?: string | null
          helpful?: number | null
          id?: number
          make?: string | null
          make_slug?: string | null
          Mirror?: string | null
          model?: string | null
          model_slug?: string | null
          parent_generation?: string | null
          product_name?: string | null
          product_type?: string | null
          rating_stars?: number | null
          recommend?: string | null
          review_author?: string | null
          review_description?: string | null
          review_image?: string | null
          review_title?: string | null
          reviewed_at?: string | null
          Size?: string | null
          sku?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          verified_status?: string | null
          year_generation?: string | null
        }
        Update: {
          gpt_review_id?: string | null
          helpful?: number | null
          id?: number
          make?: string | null
          make_slug?: string | null
          Mirror?: string | null
          model?: string | null
          model_slug?: string | null
          parent_generation?: string | null
          product_name?: string | null
          product_type?: string | null
          rating_stars?: number | null
          recommend?: string | null
          review_author?: string | null
          review_description?: string | null
          review_image?: string | null
          review_title?: string | null
          reviewed_at?: string | null
          Size?: string | null
          sku?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          verified_status?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      seat_cover_dark_gray_20240828: {
        Row: {
          gtin: string | null
          id: number | null
          preorder_date: string | null
          preorder_discount: string | null
          preorder_true: boolean | null
        }
        Insert: {
          gtin?: string | null
          id?: number | null
          preorder_date?: string | null
          preorder_discount?: string | null
          preorder_true?: boolean | null
        }
        Update: {
          gtin?: string | null
          id?: number | null
          preorder_date?: string | null
          preorder_discount?: string | null
          preorder_true?: boolean | null
        }
        Relationships: []
      }
      seat_cover_front_20240913: {
        Row: {
          display_color: string | null
          display_set: string | null
          gtin: string | null
          id: number | null
          make: string | null
          model: string | null
          MPN: string | null
          parent_generation: string | null
          preorder_date: string | null
          preorder_discount: number | null
          preorder_true: boolean | null
          sku: string | null
          "skulabs sku": string | null
          submodel1: string | null
          submodel2: string | null
          type: string | null
          year_generation: string | null
        }
        Insert: {
          display_color?: string | null
          display_set?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          model?: string | null
          MPN?: string | null
          parent_generation?: string | null
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Update: {
          display_color?: string | null
          display_set?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          model?: string | null
          MPN?: string | null
          parent_generation?: string | null
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      seat_cover_preorder_20240911: {
        Row: {
          id: number
          preorder_date: string | null
          preorder_discount: number | null
          preorder_true: boolean | null
          sku: string | null
          "skulabs sku": string | null
        }
        Insert: {
          id: number
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Update: {
          id?: number
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Relationships: []
      }
      seat_cover_preorder_front_20240913_20240916: {
        Row: {
          display_color: string | null
          display_set: string | null
          gtin: string | null
          id: number
          make: string | null
          model: string | null
          MPN: string | null
          parent_generation: string | null
          preorder_date: string | null
          preorder_discount: string | null
          preorder_true: boolean | null
          quantity: string | null
          sku: string | null
          "skulabs sku": string | null
          submodel1: string | null
          submodel2: string | null
          type: string | null
          year_generation: string | null
        }
        Insert: {
          display_color?: string | null
          display_set?: string | null
          gtin?: string | null
          id: number
          make?: string | null
          model?: string | null
          MPN?: string | null
          parent_generation?: string | null
          preorder_date?: string | null
          preorder_discount?: string | null
          preorder_true?: boolean | null
          quantity?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Update: {
          display_color?: string | null
          display_set?: string | null
          gtin?: string | null
          id?: number
          make?: string | null
          model?: string | null
          MPN?: string | null
          parent_generation?: string | null
          preorder_date?: string | null
          preorder_discount?: string | null
          preorder_true?: boolean | null
          quantity?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      seat_cover_preorder_front_20240913_20240916_2: {
        Row: {
          display_color: string | null
          display_set: string | null
          gtin: string | null
          id: number | null
          make: string | null
          model: string | null
          MPN: string | null
          parent_generation: string | null
          preorder_date: string | null
          preorder_discount: number | null
          preorder_true: boolean | null
          quantity: string | null
          sku: string | null
          "skulabs sku": string | null
          submodel1: string | null
          submodel2: string | null
          type: string | null
          year_generation: string | null
        }
        Insert: {
          display_color?: string | null
          display_set?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          model?: string | null
          MPN?: string | null
          parent_generation?: string | null
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          quantity?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Update: {
          display_color?: string | null
          display_set?: string | null
          gtin?: string | null
          id?: number | null
          make?: string | null
          model?: string | null
          MPN?: string | null
          parent_generation?: string | null
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          quantity?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      seat_cover_preorder_front_20240916_ck: {
        Row: {
          id: number
          preorder_date: string | null
          preorder_discount: number | null
          preorder_true: boolean | null
          sku: string | null
          "skulabs sku": string | null
        }
        Insert: {
          id: number
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Update: {
          id?: number
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Relationships: []
      }
      seat_cover_preorder_full_20240815: {
        Row: {
          display_set: string | null
          GTIN: string | null
          id: number | null
          MPN: string | null
          preorder_date: string | null
          preorder_discount: number | null
          preorder_true: boolean | null
          sku: string | null
          "skulabs sku": string | null
        }
        Insert: {
          display_set?: string | null
          GTIN?: string | null
          id?: number | null
          MPN?: string | null
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Update: {
          display_set?: string | null
          GTIN?: string | null
          id?: number | null
          MPN?: string | null
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Relationships: []
      }
      seat_cover_preorder_full_20240815_full: {
        Row: {
          banner: string | null
          display_color: string | null
          display_id: string | null
          display_set: string | null
          feature: string | null
          GTIN: number | null
          id: number | null
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          MPN: string | null
          msrp: number | null
          parent_generation: string | null
          preorder_date: string | null
          preorder_discount: number | null
          preorder_true: boolean | null
          price: number | null
          product: string | null
          product_video_360: string | null
          product_video_carousel: string | null
          product_video_carousel_thumbnail: string | null
          product_video_zoom: string | null
          quantity: string | null
          sku: string | null
          "skulabs sku": string | null
          submodel1: string | null
          submodel2: string | null
          submodel3: string | null
          type: string | null
          year_generation: string | null
          year_options: string | null
        }
        Insert: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          GTIN?: number | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          MPN?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Update: {
          banner?: string | null
          display_color?: string | null
          display_id?: string | null
          display_set?: string | null
          feature?: string | null
          GTIN?: number | null
          id?: number | null
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          MPN?: string | null
          msrp?: number | null
          parent_generation?: string | null
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          price?: number | null
          product?: string | null
          product_video_360?: string | null
          product_video_carousel?: string | null
          product_video_carousel_thumbnail?: string | null
          product_video_zoom?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          submodel3?: string | null
          type?: string | null
          year_generation?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      seat_cover_preorder_full_20240913: {
        Row: {
          display_color: string | null
          display_set: string | null
          gtin: number | null
          id: number | null
          make: string | null
          model: string | null
          MPN: string | null
          parent_generation: string | null
          preorder_date: string | null
          preorder_discount: number | null
          preorder_true: boolean | null
          sku: string | null
          "skulabs sku": string | null
          submodel1: string | null
          submodel2: string | null
          type: string | null
          year_generation: string | null
        }
        Insert: {
          display_color?: string | null
          display_set?: string | null
          gtin?: number | null
          id?: number | null
          make?: string | null
          model?: string | null
          MPN?: string | null
          parent_generation?: string | null
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Update: {
          display_color?: string | null
          display_set?: string | null
          gtin?: number | null
          id?: number | null
          make?: string | null
          model?: string | null
          MPN?: string | null
          parent_generation?: string | null
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      seat_cover_preorder_full_20240913_20240916: {
        Row: {
          display_color: string | null
          display_id: string | null
          gtin: string | null
          id: number
          make: string | null
          model: string | null
          MPN: string | null
          parent_generation: string | null
          preorder_discount: string | null
          preorder_true: boolean | null
          "Preorder-date": string | null
          quantity: string | null
          sku: string | null
          "skulabs sku": string | null
          submodel1: string | null
          submodel2: string | null
          type: string | null
          year_generation: string | null
        }
        Insert: {
          display_color?: string | null
          display_id?: string | null
          gtin?: string | null
          id: number
          make?: string | null
          model?: string | null
          MPN?: string | null
          parent_generation?: string | null
          preorder_discount?: string | null
          preorder_true?: boolean | null
          "Preorder-date"?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Update: {
          display_color?: string | null
          display_id?: string | null
          gtin?: string | null
          id?: number
          make?: string | null
          model?: string | null
          MPN?: string | null
          parent_generation?: string | null
          preorder_discount?: string | null
          preorder_true?: boolean | null
          "Preorder-date"?: string | null
          quantity?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      seat_cover_preorder_full_20240913_20240916_2: {
        Row: {
          display_color: string | null
          display_set: string | null
          gtin: string | null
          id: number
          make: string | null
          model: string | null
          MPN: string | null
          parent_generation: string | null
          preorder_date: string | null
          preorder_discount: number | null
          preorder_true: boolean | null
          quantity: string | null
          sku: string | null
          "skulabs sku": string | null
          submodel1: string | null
          submodel2: string | null
          type: string | null
          year_generation: string | null
        }
        Insert: {
          display_color?: string | null
          display_set?: string | null
          gtin?: string | null
          id: number
          make?: string | null
          model?: string | null
          MPN?: string | null
          parent_generation?: string | null
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          quantity?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Update: {
          display_color?: string | null
          display_set?: string | null
          gtin?: string | null
          id?: number
          make?: string | null
          model?: string | null
          MPN?: string | null
          parent_generation?: string | null
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          quantity?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      seat_cover_preorder_full_20240916: {
        Row: {
          id: number
          MPN: string | null
          preorder_date: string | null
          preorder_discount: number | null
          preorder_true: boolean | null
          sku: string | null
          "skulabs sku": string | null
        }
        Insert: {
          id: number
          MPN?: string | null
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Update: {
          id?: number
          MPN?: string | null
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Relationships: []
      }
      sku_lab_sku_item_id_map: {
        Row: {
          created_at: string
          id: number
          item_id: string | null
          sku: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          item_id?: string | null
          sku?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          item_id?: string | null
          sku?: string | null
          type?: string | null
        }
        Relationships: []
      }
      Type: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      type_make_model: {
        Row: {
          created_at: string
          id: number
          make: string | null
          make_slug: string | null
          model: string | null
          model_slug: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          make?: string | null
          make_slug?: string | null
          model?: string | null
          model_slug?: string | null
          type?: string | null
        }
        Relationships: []
      }
      type_make_year_distinct: {
        Row: {
          display_id: string | null
          id: string | null
          make: string | null
          make_slug: string | null
          parent_generation: string | null
          type: string | null
          year_options: string | null
        }
        Insert: {
          display_id?: string | null
          id?: string | null
          make?: string | null
          make_slug?: string | null
          parent_generation?: string | null
          type?: string | null
          year_options?: string | null
        }
        Update: {
          display_id?: string | null
          id?: string | null
          make?: string | null
          make_slug?: string | null
          parent_generation?: string | null
          type?: string | null
          year_options?: string | null
        }
        Relationships: []
      }
      update_20240916: {
        Row: {
          id: number
          preorder_date: string | null
          preorder_discount: number | null
          preorder_true: boolean | null
          sku: string | null
          "skulabs sku": string | null
        }
        Insert: {
          id: number
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Update: {
          id?: number
          preorder_date?: string | null
          preorder_discount?: number | null
          preorder_true?: boolean | null
          sku?: string | null
          "skulabs sku"?: string | null
        }
        Relationships: []
      }
      update_hyeon_20240910: {
        Row: {
          display_color: string | null
          gtin: string | null
          id: number
          make: string | null
          model: string | null
          MPN: string | null
          parent_generation: string | null
          sku: string | null
          "skulabs sku": string | null
          submodel1: string | null
          submodel2: string | null
          type: string | null
          year_generation: string | null
        }
        Insert: {
          display_color?: string | null
          gtin?: string | null
          id: number
          make?: string | null
          model?: string | null
          MPN?: string | null
          parent_generation?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Update: {
          display_color?: string | null
          gtin?: string | null
          id?: number
          make?: string | null
          model?: string | null
          MPN?: string | null
          parent_generation?: string | null
          sku?: string | null
          "skulabs sku"?: string | null
          submodel1?: string | null
          submodel2?: string | null
          type?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          address: string | null
          address_2: string | null
          city: string | null
          created_at: string
          email: string | null
          id: number
          image_path: string | null
          last_name: string | null
          name: string | null
          password: string | null
          phone: string | null
          pincode: string | null
          shipping_address: string | null
          shipping_address_2: string | null
          shipping_city: string | null
          shipping_pincode: string | null
          shipping_state: string | null
          state: string | null
        }
        Insert: {
          address?: string | null
          address_2?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          id?: number
          image_path?: string | null
          last_name?: string | null
          name?: string | null
          password?: string | null
          phone?: string | null
          pincode?: string | null
          shipping_address?: string | null
          shipping_address_2?: string | null
          shipping_city?: string | null
          shipping_pincode?: string | null
          shipping_state?: string | null
          state?: string | null
        }
        Update: {
          address?: string | null
          address_2?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          id?: number
          image_path?: string | null
          last_name?: string | null
          name?: string | null
          password?: string | null
          phone?: string | null
          pincode?: string | null
          shipping_address?: string | null
          shipping_address_2?: string | null
          shipping_city?: string | null
          shipping_pincode?: string | null
          shipping_state?: string | null
          state?: string | null
        }
        Relationships: []
      }
      what_is_going_on_20240815: {
        Row: {
          make: string | null
          model: string | null
          new_id: number | null
          new_sku: string | null
          old_id: number | null
          old_sku: string | null
          parent_generation: string | null
          submodel1: string | null
          submodel2: string | null
          year_generation: string | null
        }
        Insert: {
          make?: string | null
          model?: string | null
          new_id?: number | null
          new_sku?: string | null
          old_id?: number | null
          old_sku?: string | null
          parent_generation?: string | null
          submodel1?: string | null
          submodel2?: string | null
          year_generation?: string | null
        }
        Update: {
          make?: string | null
          model?: string | null
          new_id?: number | null
          new_sku?: string | null
          old_id?: number | null
          old_sku?: string | null
          parent_generation?: string | null
          submodel1?: string | null
          submodel2?: string | null
          year_generation?: string | null
        }
        Relationships: []
      }
      Years: {
        Row: {
          created_at: string
          id: number
          name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      filter_records:
        | {
            Args: {
              from_date: string
              to_date: string
            }
            Returns: {
              billing_address_city: string | null
              billing_address_country: string | null
              billing_address_line_1: string | null
              billing_address_line_2: string | null
              billing_address_postal_code: string | null
              billing_address_state: string | null
              billing_customer_name: string | null
              card_amount: number | null
              card_brand: string | null
              card_exp_month: string | null
              card_exp_year: string | null
              card_fingerprint: string | null
              card_funding: string | null
              card_last_four: string | null
              created_at: string | null
              created_at_pst: string | null
              currency: string | null
              customer_email: string | null
              customer_id: number | null
              customer_name: string | null
              customer_phone: string | null
              id: number
              notes: string | null
              order_date: string | null
              order_id: string | null
              payment_date: string | null
              payment_gateway: string | null
              payment_gateway_customer_id: string | null
              payment_method: string | null
              payment_method_id: string | null
              payment_status: string | null
              shipping_address_city: string | null
              shipping_address_country: string | null
              shipping_address_line_1: string | null
              shipping_address_line_2: string | null
              shipping_address_postal_code: string | null
              shipping_address_state: string | null
              shipping_carrier: string | null
              shipping_previous_status: string | null
              shipping_service: string | null
              shipping_status: string | null
              shipping_status_last_updated: string | null
              shipping_status_last_updated_pst: string | null
              shipping_tracking_number: string | null
              skus: string | null
              status: string | null
              total_amount: number | null
              total_discount_amount: number | null
              total_original_amount: number | null
              total_tax: number | null
              transaction_id: string | null
              updated_at: string | null
              wallet_type: string | null
            }[]
          }
        | {
            Args: {
              from_date: string
              to_date: string
            }
            Returns: {
              billing_address_city: string | null
              billing_address_country: string | null
              billing_address_line_1: string | null
              billing_address_line_2: string | null
              billing_address_postal_code: string | null
              billing_address_state: string | null
              billing_customer_name: string | null
              card_amount: number | null
              card_brand: string | null
              card_exp_month: string | null
              card_exp_year: string | null
              card_fingerprint: string | null
              card_funding: string | null
              card_last_four: string | null
              created_at: string | null
              created_at_pst: string | null
              currency: string | null
              customer_email: string | null
              customer_id: number | null
              customer_name: string | null
              customer_phone: string | null
              id: number
              notes: string | null
              order_date: string | null
              order_id: string | null
              payment_date: string | null
              payment_gateway: string | null
              payment_gateway_customer_id: string | null
              payment_method: string | null
              payment_method_id: string | null
              payment_status: string | null
              shipping_address_city: string | null
              shipping_address_country: string | null
              shipping_address_line_1: string | null
              shipping_address_line_2: string | null
              shipping_address_postal_code: string | null
              shipping_address_state: string | null
              shipping_carrier: string | null
              shipping_previous_status: string | null
              shipping_service: string | null
              shipping_status: string | null
              shipping_status_last_updated: string | null
              shipping_status_last_updated_pst: string | null
              shipping_tracking_number: string | null
              skus: string | null
              status: string | null
              total_amount: number | null
              total_discount_amount: number | null
              total_original_amount: number | null
              total_tax: number | null
              transaction_id: string | null
              updated_at: string | null
              wallet_type: string | null
            }[]
          }
      get_current_user_and_timeout: {
        Args: Record<PropertyKey, never>
        Returns: {
          user_name: string
          statement_timeout: string
        }[]
      }
      get_current_user_and_timeout_and_set_timeout: {
        Args: Record<PropertyKey, never>
        Returns: {
          user_name: string
          statement_timeout: string
        }[]
      }
      get_daily_order_totals: {
        Args: {
          days_ago?: number
        }
        Returns: {
          order_date: string
          order_count: number
          daily_total_amount: number
        }[]
      }
      get_default_seat_cover_products_sorted_by_color: {
        Args: {
          p_type?: string
          p_cover?: string
        }
        Returns: {
          id: number
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
          quantity: string
          display_id: string
          make_slug: string
          model_slug: string
          year_options: string
          display_set: string
          preorder: boolean
          preorder_date: string
          preorder_discount: number
          gtin: string
          mpn: string
        }[]
      }
      get_default_seat_cover_products_sorted_by_color_20240828: {
        Args: {
          p_type?: string
          p_cover?: string
        }
        Returns: {
          id: number
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
          quantity: string
          display_id: string
          make_slug: string
          model_slug: string
          year_options: string
          display_set: string
          preorder: boolean
          preorder_date: string
          preorder_discount: number
          gtin: string
          mpn: string
        }[]
      }
      get_default_seat_cover_products_sorted_by_color_20240913: {
        Args: {
          p_type?: string
          p_cover?: string
        }
        Returns: {
          id: number
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
          quantity: string
          display_id: string
          make_slug: string
          model_slug: string
          year_options: string
          display_set: string
          preorder: boolean
          preorder_date: string
          preorder_discount: number
          gtin: string
          mpn: string
        }[]
      }
      get_distinct_makes_by_type: {
        Args: {
          type: string
        }
        Returns: {
          make: string
        }[]
      }
      get_distinct_makes_by_type_seatcover: {
        Args: {
          type: string
        }
        Returns: {
          make: string
        }[]
      }
      get_distinct_models_by_type_make: {
        Args: {
          type: string
          make: string
        }
        Returns: {
          model: string
        }[]
      }
      get_distinct_models_by_type_make_slug: {
        Args: {
          type: string
          make: string
        }
        Returns: {
          model: string
        }[]
      }
      get_distinct_parent_generations: {
        Args: {
          type: string
          make: string
          model: string
        }
        Returns: {
          parent_generation: string
        }[]
      }
      get_distinct_review_images: {
        Args: {
          p_table_name: string
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
          verified_status: string
          recommend: string
        }[]
      }
      get_distinct_review_images_20240619: {
        Args: {
          p_table_name: string
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
      get_distinct_sku_lab_skus: {
        Args: Record<PropertyKey, never>
        Returns: {
          "skulabs SKU": string
        }[]
      }
      get_distinct_year_generation_by_type_make_model_year: {
        Args: {
          type: string
          make: string
          model: string
          year: string
        }
        Returns: {
          year_generation: string
        }[]
      }
      get_distinct_years_by_type_make_model: {
        Args: {
          type: string
          make: string
          model: string
        }
        Returns: {
          year_options: string
        }[]
      }
      get_hourly_orders_summary: {
        Args: Record<PropertyKey, never>
        Returns: {
          hour: number
          car_cover_orders_count: number
          seat_cover_orders_count: number
        }[]
      }
      get_hourly_orders_summary_last_few_days: {
        Args: Record<PropertyKey, never>
        Returns: {
          hour: string
          total_completed_orders_count: number
        }[]
      }
      get_last_day_orders: {
        Args: Record<PropertyKey, never>
        Returns: {
          order_id: number
          customer_name: string
          sku: string
          transaction_id: number
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
      get_make_relation: {
        Args: {
          year_id_web: number
          type_id_web: number
        }
        Returns: {
          id: number
          name: string
        }[]
      }
      get_make_relations: {
        Args: {
          year_id_web: number
          type_id_web: number
        }
        Returns: {
          make_id: number
          name: string
        }[]
      }
      get_make_relations_web: {
        Args: {
          year_id_web: number
          type_id_web: number
        }
        Returns: {
          id: number
          name: string
        }[]
      }
      get_model_by_type_id_make_id_relation: {
        Args: {
          type_id_web: number
          make_id_web: number
        }
        Returns: {
          id: number
          name: string
        }[]
      }
      get_next_sequence: {
        Args: {
          p_type: string
          p_date: string
        }
        Returns: string
      }
      get_orders_summary_last_30_days: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at_pst: string
          complete_orders_count: number
          completed_orders_count: number
          total_completed_orders_count: number
          pending_orders_count: number
          cl_pre_orders_pending_count: number
          cl_pre_orders_not_pending_count: number
        }[]
      }
      get_orders_summary_last_7_days: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at_pst: string
          complete_orders_count: number
          completed_orders_count: number
          total_completed_orders_count: number
          pending_orders_count: number
          cl_pre_orders_pending_count: number
          cl_pre_orders_not_pending_count: number
        }[]
      }
      get_orders_summary_last_day: {
        Args: Record<PropertyKey, never>
        Returns: {
          hour: string
          complete_orders_count: number
          completed_orders_count: number
          total_completed_orders_count: number
          pending_orders_count: number
          cl_pre_orders_pending_count: number
          cl_pre_orders_not_pending_count: number
        }[]
      }
      get_product_reviews_summary: {
        Args: {
          table_name: string
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
      get_product_reviews_summary_20240619: {
        Args: {
          table_name: string
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
      get_public_tables: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
        }[]
      }
      get_seat_cover_products_sorted_by_color: {
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
          id: number
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
          quantity: string
          display_id: string
          make_slug: string
          model_slug: string
          year_options: string
          display_set: string
          preorder: boolean
          preorder_date: string
          preorder_discount: number
          gtin: string
          mpn: string
          "skulabs SKU": string
        }[]
      }
      get_seat_cover_products_sorted_by_color_20240815_forIDFix_NEW: {
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
          id: number
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
          quantity: string
          display_id: string
          make_slug: string
          model_slug: string
          year_options: string
          display_set: string
          preorder: boolean
          preorder_date: string
          preorder_discount: number
          gtin: string
          mpn: string
        }[]
      }
      get_seat_cover_products_sorted_by_color_20240828: {
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
          id: number
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
          quantity: string
          display_id: string
          make_slug: string
          model_slug: string
          year_options: string
          display_set: string
          preorder: boolean
          preorder_date: string
          preorder_discount: number
          gtin: string
          mpn: string
          "skulabs SKU": string
        }[]
      }
      get_seat_cover_products_sorted_by_color_20240913: {
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
          id: number
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
          quantity: string
          display_id: string
          make_slug: string
          model_slug: string
          year_options: string
          display_set: string
          preorder: boolean
          preorder_date: string
          preorder_discount: number
          gtin: string
          mpn: string
          "skulabs SKU": string
        }[]
      }
      get_seat_cover_products_sorted_by_color_preorder_20240709: {
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
          quantity: string
          display_id: string
          make_slug: string
          model_slug: string
          year_options: string
          display_set: string
          preorder: boolean
          preorder_date: string
          preorder_discount: number
        }[]
      }
      get_seat_cover_products_sorted_by_color_preview: {
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
          quantity: string
          display_id: string
          make_slug: string
          model_slug: string
          year_options: string
          display_set: string
          preorder: boolean
          preorder_date: string
          preorder_discount: number
        }[]
      }
      get_statement_timeout: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_table_columns: {
        Args: {
          p_table_name: string
        }
        Returns: {
          column_name: string
        }[]
      }
      get_unique_years: {
        Args: {
          type_id_web: number
        }
        Returns: {
          id: number
          name: string
        }[]
      }
      get_unique_years_web: {
        Args: {
          type_id_web: number
        }
        Returns: {
          year_id: number
          year: string
        }[]
      }
      hello_world: {
        Args: Record<PropertyKey, never>
        Returns: string
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
