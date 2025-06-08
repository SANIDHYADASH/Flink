export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      shares: {
        Row: {
          id: string
          user_id: string
          type: 'file' | 'text'
          name: string
          title: string | null
          content: string
          file_type: string | null
          file_size: number | null
          access_code: string
          has_password: boolean
          password_hash: string | null
          expires_at: string | null
          created_at: string
          download_count: number
          file_path: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: 'file' | 'text'
          name: string
          title?: string | null
          content: string
          file_type?: string | null
          file_size?: number | null
          access_code: string
          has_password?: boolean
          password_hash?: string | null
          expires_at?: string | null
          created_at?: string
          download_count?: number
          file_path?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'file' | 'text'
          name?: string
          title?: string | null
          content?: string
          file_type?: string | null
          file_size?: number | null
          access_code?: string
          has_password?: boolean
          password_hash?: string | null
          expires_at?: string | null
          created_at?: string
          download_count?: number
          file_path?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}