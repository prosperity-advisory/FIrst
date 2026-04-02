"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { componentRegistry } from "@/lib/component-registry";
import {
  updatePageMeta,
  toggleSectionVisibility,
  swapSectionOrder,
  addSection,
  deleteSection,
} from "@/app/admin/actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PageRow = Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SectionRow = Record<string, any>;

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function PageEditorClient({
  page,
  sections: initialSections,
  slug,
}: {
  page: PageRow;
  sections: SectionRow[];
  slug: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Page metadata form state
  const [title, setTitle] = useState(page.title ?? "");
  const [metaDescription, setMetaDescription] = useState(
    page.meta_description ?? ""
  );
  const [ogImage, setOgImage] = useState(page.og_image ?? "");
  const [metaSaved, setMetaSaved] = useState(false);

  // Sections state (local copy for optimistic updates)
  const [sections, setSections] = useState<SectionRow[]>(initialSections);

  // Add-section dropdown
  const [showAddMenu, setShowAddMenu] = useState(false);

  // -------------------------------------------------------------------------
  // Save metadata
  // -------------------------------------------------------------------------

  function handleSaveMeta() {
    setMetaSaved(false);
    startTransition(async () => {
      await updatePageMeta(page.id, {
        title,
        meta_description: metaDescription,
        og_image: ogImage,
      });
      setMetaSaved(true);
      router.refresh();
    });
  }

  // -------------------------------------------------------------------------
  // Visibility toggle
  // -------------------------------------------------------------------------

  function handleToggleVisibility(section: SectionRow) {
    const newVal = !section.is_visible;
    // Optimistic update
    setSections((prev) =>
      prev.map((s) =>
        s.id === section.id ? { ...s, is_visible: newVal } : s
      )
    );
    startTransition(async () => {
      await toggleSectionVisibility(section.id, newVal);
      router.refresh();
    });
  }

  // -------------------------------------------------------------------------
  // Reorder
  // -------------------------------------------------------------------------

  function handleMoveUp(index: number) {
    if (index === 0) return;
    const a = sections[index];
    const b = sections[index - 1];

    // Optimistic swap
    const next = [...sections];
    next[index - 1] = { ...a, sort_order: b.sort_order };
    next[index] = { ...b, sort_order: a.sort_order };
    setSections(next);

    startTransition(async () => {
      await swapSectionOrder(
        { id: a.id, sort_order: a.sort_order },
        { id: b.id, sort_order: b.sort_order }
      );
      router.refresh();
    });
  }

  function handleMoveDown(index: number) {
    if (index === sections.length - 1) return;
    const a = sections[index];
    const b = sections[index + 1];

    const next = [...sections];
    next[index + 1] = { ...a, sort_order: b.sort_order };
    next[index] = { ...b, sort_order: a.sort_order };
    setSections(next);

    startTransition(async () => {
      await swapSectionOrder(
        { id: a.id, sort_order: a.sort_order },
        { id: b.id, sort_order: b.sort_order }
      );
      router.refresh();
    });
  }

  // -------------------------------------------------------------------------
  // Add section
  // -------------------------------------------------------------------------

  function handleAddSection(componentType: string) {
    setShowAddMenu(false);
    const nextOrder =
      sections.length > 0
        ? Math.max(...sections.map((s) => s.sort_order)) + 1
        : 0;

    startTransition(async () => {
      await addSection(page.id, componentType, nextOrder);
      router.refresh();
    });
  }

  // -------------------------------------------------------------------------
  // Delete section
  // -------------------------------------------------------------------------

  function handleDeleteSection(sectionId: string) {
    if (!confirm("Delete this section? This cannot be undone.")) return;

    setSections((prev) => prev.filter((s) => s.id !== sectionId));
    startTransition(async () => {
      await deleteSection(sectionId);
      router.refresh();
    });
  }

  // -------------------------------------------------------------------------
  // Resolve public URL
  // -------------------------------------------------------------------------

  const publicUrl = slug === "_home" ? "/" : `/${slug}`;

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="max-w-4xl">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">
            Edit: {page.title}
          </h1>
        </div>
        <a
          href={publicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          View Live Page
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>
      </div>

      {/* ================================================================= */}
      {/* PAGE METADATA                                                     */}
      {/* ================================================================= */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Page Metadata</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Page Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OG Image URL
            </label>
            <input
              type="text"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {ogImage && (
              <div className="mt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ogImage}
                  alt="OG preview"
                  className="h-24 rounded border border-gray-200 object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveMeta}
              disabled={isPending}
              className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isPending ? "Saving..." : "Save Metadata"}
            </button>
            {metaSaved && (
              <span className="text-sm text-green-600 font-medium">Saved</span>
            )}
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* SECTIONS MANAGER                                                  */}
      {/* ================================================================= */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Sections</h2>
        </div>

        {sections.length === 0 ? (
          <div className="px-6 py-8 text-center text-sm text-gray-500">
            No sections yet. Add one below.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {sections.map((section, i) => {
              const def = componentRegistry[section.component_type];
              const label = def?.label ?? section.component_type;

              return (
                <div
                  key={section.id}
                  className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50/50 transition-colors"
                >
                  {/* Reorder buttons */}
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={() => handleMoveUp(i)}
                      disabled={i === 0 || isPending}
                      className="p-0.5 rounded text-gray-400 hover:text-gray-700 disabled:opacity-25 transition-colors"
                      title="Move up"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
                      >
                        <path d="M18 15l-6-6-6 6" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleMoveDown(i)}
                      disabled={i === sections.length - 1 || isPending}
                      className="p-0.5 rounded text-gray-400 hover:text-gray-700 disabled:opacity-25 transition-colors"
                      title="Move down"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  </div>

                  {/* Section info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">
                      {label}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {section.component_type}
                    </div>
                  </div>

                  {/* Visibility toggle */}
                  <button
                    onClick={() => handleToggleVisibility(section)}
                    disabled={isPending}
                    className={`p-1.5 rounded transition-colors ${
                      section.is_visible
                        ? "text-gray-600 hover:text-gray-900"
                        : "text-gray-300 hover:text-gray-500"
                    }`}
                    title={section.is_visible ? "Visible — click to hide" : "Hidden — click to show"}
                  >
                    {section.is_visible ? (
                      <svg
                        viewBox="0 0 24 24"
                        className="w-[18px] h-[18px] stroke-current fill-none stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        className="w-[18px] h-[18px] stroke-current fill-none stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    )}
                  </button>

                  {/* Edit content button */}
                  <Link
                    href={`/admin/pages/${slug}/sections/${section.id}`}
                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Edit Content
                  </Link>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDeleteSection(section.id)}
                    disabled={isPending}
                    className="p-1.5 rounded text-gray-300 hover:text-red-500 transition-colors"
                    title="Delete section"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Add Section */}
        <div className="px-6 py-4 border-t border-gray-200 relative">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Section
          </button>

          {showAddMenu && (
            <div className="absolute left-6 bottom-full mb-2 w-80 bg-white rounded-xl border border-gray-200 shadow-lg max-h-80 overflow-y-auto z-10">
              {Object.entries(componentRegistry).map(([key, def]) => (
                <button
                  key={key}
                  onClick={() => handleAddSection(key)}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                >
                  <div className="text-sm font-medium text-gray-900">
                    {def.label}
                  </div>
                  {def.description && (
                    <div className="text-xs text-gray-500 mt-0.5">
                      {def.description}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
