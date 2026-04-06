/**
 * Client-side file upload — sends files directly to Supabase Storage
 * from the browser, bypassing the serverless function body size limit.
 */

import { supabase } from '@/lib/supabase';

export async function uploadFileDirect(file: File): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'bin';
  const storagePath = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('media')
    .upload(storagePath, file, { contentType: file.type, upsert: false });

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from('media').getPublicUrl(storagePath);
  return data.publicUrl;
}
