"use client";

import { useState, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { FieldDefinition } from "@/lib/component-registry";
import { updateSiteSettings } from "@/app/admin/actions";
import { showToast } from "@/components/admin/Toast";
import {
  FieldGroup,
  setNestedValue,
  type AnyRecord,
} from "@/components/admin/FieldRenderer";

interface SettingsSection {
  key: string;
  label: string;
  fields: FieldDefinition[];
  values: AnyRecord;
}

export function SettingsEditorClient({
  sections,
}: {
  sections: SettingsSection[];
}) {
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">
        Site Settings
      </h1>
      <div className="space-y-6">
        {sections.map((section) => (
          <SettingsCard key={section.key} section={section} />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Individual settings card — each has its own state + save button
// ---------------------------------------------------------------------------

function SettingsCard({ section }: { section: SettingsSection }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState<AnyRecord>(section.values);
  const [saved, setSaved] = useState(false);

  const updateField = useCallback((path: string[], value: unknown) => {
    setValues((prev) => setNestedValue(prev, path, value));
    setSaved(false);
  }, []);

  function handleSave() {
    setSaved(false);
    startTransition(async () => {
      try {
        await updateSiteSettings(section.key, values);
        setSaved(true);
        showToast("success", `${section.label} saved`);
        router.refresh();
      } catch (err) {
        showToast("error", err instanceof Error ? err.message : "Failed to save");
      }
    });
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">{section.label}</h2>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm text-green-600 font-medium">Saved</span>
          )}
          <button
            onClick={handleSave}
            disabled={isPending}
            className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      <div className="p-6">
        <FieldGroup
          fields={section.fields}
          values={values}
          path={[]}
          onUpdate={updateField}
        />
      </div>
    </div>
  );
}
