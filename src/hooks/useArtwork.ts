import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import type { Artwork } from '../types/database.types'

export function useArtwork() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  async function uploadArtwork(
    file: File,
    metadata: Omit<Artwork, 'id' | 'created_at' | 'user_id' | 'image_url'>
  ) {
    try {
      setLoading(true)
      if (!user?.id) throw new Error('No user logged in')

      // 1. Upload image to Storage
      const fileExt = file.name.split('.').pop()
      const filePath = `${user.id}/${Date.now()}.${fileExt}`

      const { error: uploadError, data } = await supabase.storage
        .from('artworks')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 2. Create artwork record in database
      const { error: insertError } = await supabase
        .from('artworks')
        .insert({
          ...metadata,
          user_id: user.id,
          image_url: data.path
        })

      if (insertError) throw insertError

      return { error: null }
    } catch (error) {
      console.error('Error uploading artwork:', error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  async function getArtworks(options?: {
    userId?: string
    style?: string
    region?: string
  }) {
    try {
      setLoading(true)
      let query = supabase.from('artworks').select('*')

      if (options?.userId) query = query.eq('user_id', options.userId)
      if (options?.style) query = query.eq('style', options.style)
      if (options?.region) query = query.eq('region', options.region)

      const { data, error } = await query

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching artworks:', error)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  return {
    uploadArtwork,
    getArtworks,
    loading
  }
}
