import { supabaseUserDB } from './supabase'

/**
 * Upload foto barang hilang/temuan ke Supabase Storage Bucket 'lostfound-images'
 * dan mengembalikan Public URL.
 */
export async function uploadLostFoundImage(
  base64Data: string,
  prefix: string = 'report'
): Promise<string> {
  try {
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)

    if (!matches || matches.length !== 3) {
      if (base64Data.startsWith('http')) return base64Data
      return base64Data
    }

    const mimeType = matches[1]
    const base64Content = matches[2]
    const buffer = Buffer.from(base64Content, 'base64')

    const fileExt = mimeType.split('/')[1] || 'jpg'
    const fileName = `${prefix}_${Date.now()}.${fileExt}`
    const filePath = `items/${fileName}`

    const { data, error } = await supabaseUserDB.storage
      .from('lostfound-images')
      .upload(filePath, buffer, {
        contentType: mimeType,
        upsert: true,
      })

    if (error) {
      console.warn('Storage upload error (fallback ke base64):', error.message)
      return base64Data
    }

    const { data: publicUrlData } = supabaseUserDB.storage
      .from('lostfound-images')
      .getPublicUrl(data.path)

    return publicUrlData.publicUrl
  } catch (err: any) {
    console.error('Catch in uploadLostFoundImage:', err)
    return base64Data
  }
}
