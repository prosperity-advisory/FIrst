"use client";

import { useState } from "react";
import type { FieldDefinition } from "@/lib/component-registry";
import { uploadImage } from "@/app/admin/actions";
import { MediaPickerModal } from "@/components/admin/MediaPickerModal";
import { showToast } from "@/components/admin/Toast";
import { UrlPicker } from "@/components/admin/UrlPicker";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyRecord = Record<string, any>;

// ---------------------------------------------------------------------------
// Immutable nested set helper
// ---------------------------------------------------------------------------

export function setNestedValue(
  obj: AnyRecord,
  path: string[],
  value: unknown
): AnyRecord {
  if (path.length === 0) return obj;
  if (path.length === 1) {
    return { ...obj, [path[0]]: value };
  }
  const [head, ...rest] = path;
  const child = obj[head];

  if (Array.isArray(child)) {
    const idx = Number(rest[0]);
    if (rest.length === 1) {
      const next = [...child];
      next[idx] = value;
      return { ...obj, [head]: next };
    }
    const next = [...child];
    next[idx] = setNestedValue(
      (child[idx] as AnyRecord) ?? {},
      rest.slice(1),
      value
    );
    return { ...obj, [head]: next };
  }

  return {
    ...obj,
    [head]: setNestedValue((child as AnyRecord) ?? {}, rest, value),
  };
}

// ---------------------------------------------------------------------------
// Recursive field group renderer
// ---------------------------------------------------------------------------

export function FieldGroup({
  fields,
  values,
  path,
  onUpdate,
}: {
  fields: FieldDefinition[];
  values: AnyRecord;
  path: string[];
  onUpdate: (path: string[], value: unknown) => void;
}) {
  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <FieldRenderer
          key={field.name}
          field={field}
          value={values?.[field.name]}
          path={[...path, field.name]}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Single field renderer — dispatches by type
// ---------------------------------------------------------------------------

function FieldRenderer({
  field,
  value,
  path,
  onUpdate,
}: {
  field: FieldDefinition;
  value: unknown;
  path: string[];
  onUpdate: (path: string[], value: unknown) => void;
}) {
  switch (field.type) {
    case "text":
      return (
        <TextInput
          field={field}
          value={(value as string) ?? ""}
          path={path}
          onUpdate={onUpdate}
          type="text"
        />
      );
    case "url":
      return (
        <UrlPicker
          field={field}
          value={(value as string) ?? ""}
          path={path}
          onUpdate={onUpdate}
        />
      );
    case "select":
      return (
        <SelectInput
          field={field}
          value={(value as string) ?? ""}
          path={path}
          onUpdate={onUpdate}
        />
      );
    case "number":
      return (
        <NumberInput
          field={field}
          value={value as number}
          path={path}
          onUpdate={onUpdate}
        />
      );
    case "textarea":
      return (
        <TextareaInput
          field={field}
          value={(value as string) ?? ""}
          path={path}
          onUpdate={onUpdate}
          rows={3}
        />
      );
    case "richtext":
      return (
        <TextareaInput
          field={field}
          value={(value as string) ?? ""}
          path={path}
          onUpdate={onUpdate}
          rows={6}
        />
      );
    case "image":
      return (
        <ImageInput
          field={field}
          value={(value as string) ?? ""}
          path={path}
          onUpdate={onUpdate}
        />
      );
    case "file":
      return (
        <FileInput
          field={field}
          value={(value as string) ?? ""}
          path={path}
          onUpdate={onUpdate}
        />
      );
    case "boolean":
      return (
        <BooleanToggle
          field={field}
          value={!!value}
          path={path}
          onUpdate={onUpdate}
        />
      );
    case "group":
      return (
        <GroupField
          field={field}
          value={(value as AnyRecord) ?? {}}
          path={path}
          onUpdate={onUpdate}
        />
      );
    case "array":
      return (
        <ArrayField
          field={field}
          value={(value as AnyRecord[]) ?? []}
          path={path}
          onUpdate={onUpdate}
        />
      );
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Text input
// ---------------------------------------------------------------------------

function TextInput({
  field,
  value,
  path,
  onUpdate,
  type,
}: {
  field: FieldDefinition;
  value: string;
  path: string[];
  onUpdate: (path: string[], value: unknown) => void;
  type: string;
}) {
  return (
    <div>
      <FieldLabel field={field} />
      <input
        type={type}
        value={value}
        onChange={(e) => onUpdate(path, e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Select input
// ---------------------------------------------------------------------------

function SelectInput({
  field,
  value,
  path,
  onUpdate,
}: {
  field: FieldDefinition;
  value: string;
  path: string[];
  onUpdate: (path: string[], value: unknown) => void;
}) {
  return (
    <div>
      <FieldLabel field={field} />
      <select
        value={value}
        onChange={(e) => onUpdate(path, e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      >
        <option value="">— Select —</option>
        {(field.options ?? []).map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Number input
// ---------------------------------------------------------------------------

function NumberInput({
  field,
  value,
  path,
  onUpdate,
}: {
  field: FieldDefinition;
  value: number | undefined;
  path: string[];
  onUpdate: (path: string[], value: unknown) => void;
}) {
  return (
    <div>
      <FieldLabel field={field} />
      <input
        type="number"
        value={value ?? ""}
        onChange={(e) =>
          onUpdate(path, e.target.value === "" ? "" : Number(e.target.value))
        }
        className="w-full max-w-xs rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Textarea input (auto-expanding)
// ---------------------------------------------------------------------------

function TextareaInput({
  field,
  value,
  path,
  onUpdate,
  rows,
}: {
  field: FieldDefinition;
  value: string;
  path: string[];
  onUpdate: (path: string[], value: unknown) => void;
  rows: number;
}) {
  return (
    <div>
      <FieldLabel field={field} />
      <textarea
        value={value}
        onChange={(e) => onUpdate(path, e.target.value)}
        rows={rows}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
        onInput={(e) => {
          const el = e.currentTarget;
          el.style.height = "auto";
          el.style.height = el.scrollHeight + "px";
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Image input with upload + preview
// ---------------------------------------------------------------------------

function ImageInput({
  field,
  value,
  path,
  onUpdate,
}: {
  field: FieldDefinition;
  value: string;
  path: string[];
  onUpdate: (path: string[], value: unknown) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      showToast("error", "Image too large. Max 10MB. Try compressing it first.");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const url = await uploadImage(fd);
      onUpdate(path, url);
      showToast("success", "Image uploaded");
    } catch (err) {
      showToast("error", "Upload failed: " + (err instanceof Error ? err.message : err));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <FieldLabel field={field} />
      <div className="flex items-start gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onUpdate(path, e.target.value)}
          placeholder="Image URL"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <label className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors shrink-0">
          {uploading ? "Uploading..." : "Upload"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
            disabled={uploading}
          />
        </label>
        <button
          type="button"
          onClick={() => setShowPicker(true)}
          className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors shrink-0"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 stroke-current fill-none stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          Library
        </button>
      </div>
      {value && (
        <div className="mt-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className="h-24 rounded border border-gray-200 object-cover"
          />
        </div>
      )}
      <MediaPickerModal
        open={showPicker}
        onClose={() => setShowPicker(false)}
        onSelect={(url) => {
          onUpdate(path, url);
          setShowPicker(false);
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// File input (PDF / document upload)
// ---------------------------------------------------------------------------

function FileInput({
  field,
  value,
  path,
  onUpdate,
}: {
  field: FieldDefinition;
  value: string;
  path: string[];
  onUpdate: (path: string[], value: unknown) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      showToast("error", "File too large. Max 10MB.");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const url = await uploadImage(fd);
      onUpdate(path, url);
      showToast("success", "File uploaded");
    } catch (err) {
      showToast("error", "Upload failed: " + (err instanceof Error ? err.message : err));
    } finally {
      setUploading(false);
    }
  }

  const filename = value ? value.split("/").pop() : null;

  return (
    <div>
      <FieldLabel field={field} />
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onUpdate(path, e.target.value)}
          placeholder="PDF / document URL"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <label className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors shrink-0">
          {uploading ? "Uploading..." : "Upload PDF"}
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFile}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>
      {value && (
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round] text-red-500">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <a href={value} target="_blank" rel="noopener noreferrer" className="hover:underline truncate max-w-xs">
            {filename}
          </a>
          <button
            type="button"
            onClick={() => onUpdate(path, "")}
            className="text-gray-400 hover:text-red-500 transition-colors ml-1"
            title="Remove file"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Boolean toggle
// ---------------------------------------------------------------------------

function BooleanToggle({
  field,
  value,
  path,
  onUpdate,
}: {
  field: FieldDefinition;
  value: boolean;
  path: string[];
  onUpdate: (path: string[], value: unknown) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <FieldLabel field={field} inline />
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onUpdate(path, !value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          value ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Group field — nested fieldset
// ---------------------------------------------------------------------------

function GroupField({
  field,
  value,
  path,
  onUpdate,
}: {
  field: FieldDefinition;
  value: AnyRecord;
  path: string[];
  onUpdate: (path: string[], value: unknown) => void;
}) {
  if (!field.fields) return null;
  return (
    <fieldset className="border border-gray-200 rounded-lg p-4">
      <legend className="px-2 text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-400 ml-0.5">*</span>}
      </legend>
      <FieldGroup
        fields={field.fields}
        values={value}
        path={path}
        onUpdate={onUpdate}
      />
    </fieldset>
  );
}

// ---------------------------------------------------------------------------
// Array field — list of sub-forms with add/remove/reorder
// ---------------------------------------------------------------------------

function ArrayField({
  field,
  value,
  path,
  onUpdate,
}: {
  field: FieldDefinition;
  value: AnyRecord[];
  path: string[];
  onUpdate: (path: string[], value: unknown) => void;
}) {
  const itemFields = field.itemFields ?? [];
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});

  function addItem() {
    const empty: AnyRecord = {};
    for (const f of itemFields) {
      if (f.type === "array") empty[f.name] = [];
      else if (f.type === "group") empty[f.name] = {};
      else if (f.type === "boolean") empty[f.name] = false;
      else if (f.type === "number") empty[f.name] = "";
      else empty[f.name] = "";
    }
    onUpdate(path, [...value, empty]);
  }

  function removeItem(index: number) {
    if (!confirm("Remove this item?")) return;
    onUpdate(
      path,
      value.filter((_, i) => i !== index)
    );
  }

  function moveItem(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onUpdate(path, next);
  }

  function toggleCollapse(index: number) {
    setCollapsed((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  function getSummary(item: AnyRecord): string {
    for (const f of itemFields) {
      if (
        (f.type === "text" || f.type === "textarea" || f.type === "richtext") &&
        item[f.name]
      ) {
        const val = String(item[f.name]);
        return val.length > 60 ? val.slice(0, 57) + "..." : val;
      }
    }
    return "(empty)";
  }

  return (
    <div>
      <FieldLabel field={field} />
      <div className="space-y-2 mt-1">
        {value.length === 0 && (
          <p className="text-xs text-gray-400 italic py-2">No items yet</p>
        )}
        {value.map((item, i) => {
          const isCollapsed = collapsed[i] ?? true;
          return (
            <div
              key={i}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border-b border-gray-100">
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => moveItem(i, -1)}
                    disabled={i === 0}
                    className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-25"
                    title="Move up"
                  >
                    <ChevronUp />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(i, 1)}
                    disabled={i === value.length - 1}
                    className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-25"
                    title="Move down"
                  >
                    <ChevronDown />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => toggleCollapse(i)}
                  className="flex-1 text-left flex items-center gap-2 min-w-0"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-4 h-4 text-gray-400 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round] transition-transform ${
                      isCollapsed ? "" : "rotate-90"
                    }`}
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  <span className="text-sm text-gray-700 truncate">
                    <span className="text-gray-400 font-mono text-xs mr-1.5">
                      {i + 1}.
                    </span>
                    {getSummary(item)}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                  title="Remove item"
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

              {!isCollapsed && (
                <div className="p-4">
                  <FieldGroup
                    fields={itemFields}
                    values={item}
                    path={[...path, String(i)]}
                    onUpdate={onUpdate}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="mt-2 inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add {field.label.replace(/s$/, "")}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared UI pieces
// ---------------------------------------------------------------------------

function FieldLabel({
  field,
  inline,
}: {
  field: FieldDefinition;
  inline?: boolean;
}) {
  return (
    <div className={inline ? "" : "mb-1"}>
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {field.hint && (
        <p className="text-xs text-gray-400 mt-0.5">{field.hint}</p>
      )}
    </div>
  );
}

function ChevronUp() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
