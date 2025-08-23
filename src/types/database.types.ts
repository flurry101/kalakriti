export interface Profile {
  id: string
  username: string
  full_name: string
  avatar_url: string | null
  art_styles: string[]
  location: string
  created_at: string
  artworks_count: number
  followers_count: number
  following_count: number
}

export interface Artwork {
  id: string
  user_id: string
  title: string
  description: string
  image_url: string
  tags: string[]
  style: string
  region: string
  created_at: string
  likes_count: number
  comments_count: number
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'id' | 'created_at'>
        Update: Partial<Profile>
      }
      artworks: {
        Row: Artwork
        Insert: Omit<Artwork, 'id' | 'created_at'>
        Update: Partial<Artwork>
      }
    }
  }
}
