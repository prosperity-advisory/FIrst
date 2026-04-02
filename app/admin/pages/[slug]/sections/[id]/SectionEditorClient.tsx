"use client";

import { useState, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { FieldDefinition } from "@/lib/component-registry";
import { updateSectionContent } from "@/app/admin/actions";
import { showToast } from "@/components/admin/Toast";
import {
  FieldGroup,
  setNestedValue,
  type AnyRecord,
} from "@/components/admin/FieldRenderer";

// ---------------------------------------------------------------------------
// Main editor component
// ---------------------------------------------------------------------------

export function SectionEditorClient({
  section,
  pageTitle,
  slug,
  componentLabel,
  fields,
}: {
  section: AnyRecord;
  pageTitle: string;
  slug: string;
  componentLabel: string;
  fields: FieldDefinition[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState<AnyRecord>(section.content ?? {});
  const [saved, setSaved] = useState(false);

  const updateField = useCallback(
    (path: string[], value: unknown) => {
      setContent((prev) => setNestedValue(prev, path, value));
      setSaved(false);
    },
    []
  );

  function handleSave() {
    setSaved(false);
    startTransition(async () => {
      try {
        await updateSectionContent(section.id, content);
        setSaved(true);
        showToast("success", "Section saved");
        router.refresh();
      } catch (err) {
        showToast("error", err instanceof Error ? err.message : "Failed to save");
      }
    });
  }

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-5">
        <Link href="/admin" className="hover:text-gray-700 transition-colors">
          Pages
        </Link>
        <ChevronRight />
        <Link
          href={`/admin/pages/${slug}`}
          className="hover:text-gray-700 transition-colors"
        >
          {pageTitle}
        </Link>
        <ChevronRight />
        <span className="text-gray-900 font-medium">{componentLabel}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          {componentLabel}
        </h1>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm text-green-600 font-medium">Saved</span>
          )}
          <button
            onClick={handleSave}
            disabled={isPending}
            className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {fields.length === 0 ? (
          <p className="text-sm text-gray-500">
            No field definitions found for component type &quot;{section.component_type}&quot;.
          </p>
        ) : (
          <FieldGroup
            fields={fields}
            values={content}
            path={[]}
            onUpdate={updateField}
          />
        )}
      </div>

      {/* Bottom save */}
      <div className="mt-6 flex items-center justify-between">
        <Link
          href={`/admin/pages/${slug}`}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          &larr; Back to page
        </Link>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm text-green-600 font-medium">Saved</span>
          )}
          <button
            onClick={handleSave}
            disabled={isPending}
            className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 text-gray-400 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
