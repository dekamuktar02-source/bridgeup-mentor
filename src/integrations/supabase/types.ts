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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          cover_letter: string
          created_at: string
          id: string
          opportunity_id: string
          status: string
          user_id: string
        }
        Insert: {
          cover_letter?: string
          created_at?: string
          id?: string
          opportunity_id: string
          status?: string
          user_id: string
        }
        Update: {
          cover_letter?: string
          created_at?: string
          id?: string
          opportunity_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_listings: {
        Row: {
          available: boolean
          biography: string
          expertise: string[]
          id: string
          location: string
          name: string
          organisation: string
          sample: boolean
          title: string
          user_id: string | null
        }
        Insert: {
          available?: boolean
          biography?: string
          expertise?: string[]
          id?: string
          location?: string
          name: string
          organisation?: string
          sample?: boolean
          title: string
          user_id?: string | null
        }
        Update: {
          available?: boolean
          biography?: string
          expertise?: string[]
          id?: string
          location?: string
          name?: string
          organisation?: string
          sample?: boolean
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentor_listings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mentorships: {
        Row: {
          created_at: string
          goals: string
          id: string
          mentor_id: string
          message: string
          seeker_id: string
          status: string
        }
        Insert: {
          created_at?: string
          goals?: string
          id?: string
          mentor_id: string
          message: string
          seeker_id: string
          status?: string
        }
        Update: {
          created_at?: string
          goals?: string
          id?: string
          mentor_id?: string
          message?: string
          seeker_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentorships_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentor_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentorships_seeker_id_fkey"
            columns: ["seeker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          id: string
          read: boolean
          title: string
          user_id: string
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          read?: boolean
          title: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          read?: boolean
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunities: {
        Row: {
          arrangement: string
          created_at: string
          deadline: string
          description: string
          id: string
          location: string
          organisation: string
          owner_id: string | null
          salary: string
          sample: boolean
          skills: string[]
          status: string
          title: string
          type: string
        }
        Insert: {
          arrangement?: string
          created_at?: string
          deadline: string
          description?: string
          id?: string
          location: string
          organisation: string
          owner_id?: string | null
          salary?: string
          sample?: boolean
          skills?: string[]
          status?: string
          title: string
          type?: string
        }
        Update: {
          arrangement?: string
          created_at?: string
          deadline?: string
          description?: string
          id?: string
          location?: string
          organisation?: string
          owner_id?: string | null
          salary?: string
          sample?: boolean
          skills?: string[]
          status?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organisations: {
        Row: {
          description: string
          id: string
          name: string
          owner_id: string
          verified: boolean
          website: string
        }
        Insert: {
          description?: string
          id?: string
          name: string
          owner_id: string
          verified?: boolean
          website?: string
        }
        Update: {
          description?: string
          id?: string
          name?: string
          owner_id?: string
          verified?: boolean
          website?: string
        }
        Relationships: [
          {
            foreignKeyName: "organisations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_projects: {
        Row: {
          created_at: string
          description: string
          id: string
          skills: string[]
          title: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          skills?: string[]
          title: string
          url?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          skills?: string[]
          title?: string
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_documents: {
        Row: {
          cv_path: string
          employer_visible: boolean
          user_id: string
        }
        Insert: {
          cv_path: string
          employer_visible?: boolean
          user_id: string
        }
        Update: {
          cv_path?: string
          employer_visible?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          biography: string
          career_goals: string
          career_interests: string[]
          certifications: string
          created_at: string
          education: string
          employer_visible: boolean
          employment_status: string
          full_name: string
          headline: string
          id: string
          industries: string[]
          location: string
          portfolio_url: string
          skills: string[]
          terms_accepted: boolean
          work_experience: string
        }
        Insert: {
          avatar_url?: string | null
          biography?: string
          career_goals?: string
          career_interests?: string[]
          certifications?: string
          created_at?: string
          education?: string
          employer_visible?: boolean
          employment_status?: string
          full_name?: string
          headline?: string
          id: string
          industries?: string[]
          location?: string
          portfolio_url?: string
          skills?: string[]
          terms_accepted?: boolean
          work_experience?: string
        }
        Update: {
          avatar_url?: string | null
          biography?: string
          career_goals?: string
          career_interests?: string[]
          certifications?: string
          created_at?: string
          education?: string
          employer_visible?: boolean
          employment_status?: string
          full_name?: string
          headline?: string
          id?: string
          industries?: string[]
          location?: string
          portfolio_url?: string
          skills?: string[]
          terms_accepted?: boolean
          work_experience?: string
        }
        Relationships: []
      }
      saved_opportunities: {
        Row: {
          created_at: string
          opportunity_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          opportunity_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          opportunity_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_opportunities_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_opportunities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          completed: boolean
          feedback: string
          id: string
          meeting_url: string
          mentorship_id: string
          notes: string
          scheduled_at: string
        }
        Insert: {
          completed?: boolean
          feedback?: string
          id?: string
          meeting_url?: string
          mentorship_id: string
          notes?: string
          scheduled_at: string
        }
        Update: {
          completed?: boolean
          feedback?: string
          id?: string
          meeting_url?: string
          mentorship_id?: string
          notes?: string
          scheduled_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_mentorship_id_fkey"
            columns: ["mentorship_id"]
            isOneToOne: false
            referencedRelation: "mentorships"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
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
      app_role: "job_seeker" | "mentor" | "employer" | "admin"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["job_seeker", "mentor", "employer", "admin"],
    },
  },
} as const
