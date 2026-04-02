"use client";

import { useState, useTransition, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  uploadImage,
  updateMediaAltText,
  deleteMediaItem,
} from "@/app/admin/actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MediaItem = Record<string, any>;

export function MediaLibraryClient({
  initialItems,
}: {
  initialItems: MediaItem[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState<MediaItem[]>(initialItems);
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    (files: FileList | null) => {
      if (!files?.length) return;
      startTransition(async () => {
        for (const file of Array.from(files)) {
          const fd = new FormData();
          fd.append("file", file);
          try {
            await uploadImage(fd);
          } catch (err) {
            alert(
              "Upload failed: " + (err instanceof Error ? err.message : err)
            );
          }
        }
        router.refresh();
      });
    },
    [router, startTransition]
  );

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    handleUpload(e.dataTransfer.files);
  }

  function handleDelete(item: MediaItem) {
    if (!confirm(`Delete "${item.filename}"? This cannot be undone.`)) return;
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    if (selected?.id === item.id) setSelected(null);
    startTransition(async () => {
      await deleteMediaItem(item.id, item.url);
      router.refresh();
    });
  }

  function handleCopyUrl(url: string) {
    navigator.clipboard.writeText(url);
  }

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">
        Media Library
      </h1>

      {/* Upload area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`mb-6 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragging
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400 bg-white"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleUpload(e.target.files)}
          className="hidden"
        />
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 mx-auto mb-2 text-gray-400 stroke-current fill-none stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
        </svg>
        <p className="text-sm text-gray-600 font-medium">
          {isPending
            ? "Uploading..."
            : "Drop images here or click to upload"}
        </p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP, SVG</p>
      </div>

      {/* Grid + Detail panel */}
      <div className="flex gap-6">
        {/* Grid */}
        <div className="flex-1 min-w-0">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-12">
              No images uploaded yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    setSelected(selected?.id === item.id ? null : item)
                  }
                  className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selected?.id === item.id
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
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

        {/* Detail panel */}
        {selected && (
          <DetailPanel
            item={selected}
            onClose={() => setSelected(null)}
            onDelete={() => handleDelete(selected)}
            onCopyUrl={() => handleCopyUrl(selected.url)}
            onUpdate={(updated) => {
              setSelected(updated);
              setItems((prev) =>
                prev.map((i) => (i.id === updated.id ? updated : i))
              );
            }}
          />
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Detail panel
// ---------------------------------------------------------------------------

function DetailPanel({
  item,
  onClose,
  onDelete,
  onCopyUrl,
  onUpdate,
}: {
  item: MediaItem;
  onClose: () => void;
  onDelete: () => void;
  onCopyUrl: () => void;
  onUpdate: (item: MediaItem) => void;
}) {
  const [altText, setAltText] = useState(item.alt_text ?? "");
  const [altSaved, setAltSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  // Reset state when item changes
  if (altText !== (item.alt_text ?? "") && !isPending) {
    setAltText(item.alt_text ?? "");
    setAltSaved(false);
  }

  function handleSaveAlt() {
    setAltSaved(false);
    startTransition(async () => {
      await updateMediaAltText(item.id, altText);
      onUpdate({ ...item, alt_text: altText });
      setAltSaved(true);
    });
  }

  function handleCopy() {
    onCopyUrl();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const uploadDate = new Date(item.uploaded_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const fileSize = item.file_size
    ? item.file_size < 1024
      ? `${item.file_size} B`
      : item.file_size < 1048576
        ? `${(item.file_size / 1024).toFixed(1)} KB`
        : `${(item.file_size / 1048576).toFixed(1)} MB`
    : "Unknown";

  return (
    <div className="w-72 bg-white rounded-xl border border-gray-200 overflow-hidden shrink-0">
      {/* Preview */}
      <div className="relative aspect-video bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.url}
          alt={item.alt_text || item.filename}
          className="w-full h-full object-contain"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 bg-white/80 rounded-md text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* File info */}
        <div>
          <p className="text-sm font-medium text-gray-900 truncate">
            {item.filename}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {fileSize} &middot; {uploadDate}
          </p>
        </div>

        {/* URL + Copy */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            URL
          </label>
          <div className="flex gap-1.5">
            <input
              type="text"
              readOnly
              value={item.url}
              className="flex-1 min-w-0 rounded-md border border-gray-200 px-2 py-1.5 text-xs text-gray-600 bg-gray-50 truncate"
            />
            <button
              onClick={handleCopy}
              className="shrink-0 px-2.5 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* Alt text */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Alt Text
          </label>
          <textarea
            value={altText}
            onChange={(e) => {
              setAltText(e.target.value);
              setAltSaved(false);
            }}
            rows={2}
            className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="flex items-center gap-2 mt-1.5">
            <button
              onClick={handleSaveAlt}
              disabled={isPending}
              className="text-xs font-medium text-blue-600 hover:text-blue-800 disabled:opacity-50 transition-colors"
            >
              {isPending ? "Saving..." : "Save Alt Text"}
            </button>
            {altSaved && (
              <span className="text-xs text-green-600">Saved</span>
            )}
          </div>
        </div>

        {/* Delete */}
        <button
          onClick={onDelete}
          className="w-full text-center text-sm text-red-600 hover:text-red-800 font-medium py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          Delete Image
        </button>
      </div>
    </div>
  );
}
