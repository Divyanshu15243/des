export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      award_items: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image: string | null
          sort_order: number | null
          status: string
          title: string
          updated_at: string
          year: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          sort_order?: number | null
          status?: string
          title: string
          updated_at?: string
          year?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          sort_order?: number | null
          status?: string
          title?: string
          updated_at?: string
          year?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string | null
          category: string | null
          content: string | null
          created_at: string
          featured_image: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          og_image: string | null
          publish_date: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_image?: string | null
          publish_date?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_image?: string | null
          publish_date?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cities: {
        Row: {
          created_at: string
          featured_image: string | null
          id: string
          name: string
          slug: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          featured_image?: string | null
          id?: string
          name: string
          slug: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          featured_image?: string | null
          id?: string
          name?: string
          slug?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          is_read: boolean | null
          message: string
          name: string
          phone: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          is_read?: boolean | null
          message: string
          name: string
          phone?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean | null
          message?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      feature_items: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          image: string | null
          sort_order: number | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image?: string | null
          sort_order?: number | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image?: string | null
          sort_order?: number | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      home_hero: {
        Row: {
          created_at: string
          cta_link: string | null
          cta_text: string | null
          id: string
          mode: string
          overlay_text: string | null
          updated_at: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          id?: string
          mode?: string
          overlay_text?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          id?: string
          mode?: string
          overlay_text?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      home_slides: {
        Row: {
          created_at: string
          cta_link: string | null
          cta_text: string | null
          enabled: boolean | null
          heading: string | null
          hero_id: string | null
          id: string
          image: string | null
          sort_order: number | null
          subheading: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          enabled?: boolean | null
          heading?: string | null
          hero_id?: string | null
          id?: string
          image?: string | null
          sort_order?: number | null
          subheading?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          enabled?: boolean | null
          heading?: string | null
          hero_id?: string | null
          id?: string
          image?: string | null
          sort_order?: number | null
          subheading?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "home_slides_hero_id_fkey"
            columns: ["hero_id"]
            isOneToOne: false
            referencedRelation: "home_hero"
            referencedColumns: ["id"]
          },
        ]
      }
      popups: {
        Row: {
          body: string | null
          created_at: string
          cta_link: string | null
          cta_text: string | null
          frequency: string
          id: string
          image: string | null
          schedule_end: string | null
          schedule_start: string | null
          selected_pages: string[] | null
          status: string
          target_pages: string
          title: string
          trigger_seconds: number | null
          updated_at: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          frequency?: string
          id?: string
          image?: string | null
          schedule_end?: string | null
          schedule_start?: string | null
          selected_pages?: string[] | null
          status?: string
          target_pages?: string
          title: string
          trigger_seconds?: number | null
          updated_at?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          frequency?: string
          id?: string
          image?: string | null
          schedule_end?: string | null
          schedule_start?: string | null
          selected_pages?: string[] | null
          status?: string
          target_pages?: string
          title?: string
          trigger_seconds?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      roadshows: {
        Row: {
          agenda: Json | null
          amenities: Json | null
          banner_image: string | null
          city_id: string | null
          created_at: string
          destinations: Json | null
          end_date: string
          faqs: Json | null
          full_description: string | null
          gallery_images: string[] | null
          id: string
          investment_highlights: Json | null
          meta_description: string | null
          meta_title: string | null
          og_image: string | null
          registration_link: string | null
          short_description: string | null
          slug: string
          speakers: Json | null
          start_date: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          venue: string | null
        }
        Insert: {
          agenda?: Json | null
          amenities?: Json | null
          banner_image?: string | null
          city_id?: string | null
          created_at?: string
          destinations?: Json | null
          end_date: string
          faqs?: Json | null
          full_description?: string | null
          gallery_images?: string[] | null
          id?: string
          investment_highlights?: Json | null
          meta_description?: string | null
          meta_title?: string | null
          og_image?: string | null
          registration_link?: string | null
          short_description?: string | null
          slug: string
          speakers?: Json | null
          start_date: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          venue?: string | null
        }
        Update: {
          agenda?: Json | null
          amenities?: Json | null
          banner_image?: string | null
          city_id?: string | null
          created_at?: string
          destinations?: Json | null
          end_date?: string
          faqs?: Json | null
          full_description?: string | null
          gallery_images?: string[] | null
          id?: string
          investment_highlights?: Json | null
          meta_description?: string | null
          meta_title?: string | null
          og_image?: string | null
          registration_link?: string | null
          short_description?: string | null
          slug?: string
          speakers?: Json | null
          start_date?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roadshows_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
