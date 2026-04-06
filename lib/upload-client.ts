/**
 * Client-side file upload — gets a signed URL from the server,
 * then uploads directly to Supabase Storage from the browser.
 * Bypasses Netlify's serverless function body size limit.
 */

import { createSignedUploadUrl } from '@/app/admin/actions';

export async function uploadFileDirect(file: File): Promise<string> {
  // 1. Get a signed upload URL from the server (tiny request, no file payload)
  const { signedUrl, publicUrl } = await createSignedUploadUrl(file.name);

  // 2. Upload the file directly to Supabase Storage using the signed URL
  const res = await fetch(signedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Upload failed: ${res.status} ${text}`);
  }

  return publicUrl;
}
