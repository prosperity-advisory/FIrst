"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { getMediaItems, recordMediaUpload } from "@/app/admin/actions";
import { uploadFileDirect } from "@/lib/upload-client";
import { showToast } from "@/components/admin/Toast";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MediaItem = Record<string, any>;

export function MediaPickerModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setFetchError(null);
    getMediaItems()
      .then(setItems)
      .catch((err) => setFetchError(err instanceof Error ? err.message : "Failed to load media"))
      .finally(() => setLoading(false));
  }, [open]);

  function handleUpload(files: FileList | null) {
    if (!files?.length) return;
    const file = files[0];
    if (file.size > MAX_FILE_SIZE) {
      showToast("error", "Image too large. Max 10MB.");
      return;
    }
    startTransition(async () => {
      try {
        const url = await uploadFileDirect(file);
        await recordMediaUpload({ filename: file.name, url, mime_type: file.type, file_size: file.size });
        onSelect(url);
      } catch (err) {
        showToast("error", "Upload failed: " + (err instanceof Error ? err.message : err));
      }
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 shrink-0">
          <h2 className="font-semibold text-gray-900">Media Library</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors disabled:opacity-50"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              {isPending ? "Uploading..." : "Upload New"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleUpload(e.target.files)}
              className="hidden"
            />
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <p className="text-sm text-gray-500 text-center py-12">
              Loading...
            </p>
          ) : fetchError ? (
            <p className="text-sm text-red-500 text-center py-12">
              {fetchError}
            </p>
          ) : items.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-12">
              No images yet. Upload one above.
            </p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.url)}
                  className="group relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.alt_text || item.filename}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-white truncate">
                      {item.filename}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
