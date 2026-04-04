"use client";

import { useState } from "react";
import type { FieldDefinition } from "@/lib/component-registry";
import { SITE_ROUTES, getGroupedRoutes } from "@/lib/admin-routes";

const CUSTOM_VALUE = "__custom__";

interface UrlPickerProps {
  field: FieldDefinition;
  value: string;
  path: string[];
  onUpdate: (path: string[], value: unknown) => void;
}

export function UrlPicker({ field, value, path, onUpdate }: UrlPickerProps) {
  const isKnownRoute = SITE_ROUTES.some((r) => r.value === value);
  const [isCustom, setIsCustom] = useState(!isKnownRoute && !!value);
  const grouped = getGroupedRoutes();

  function handleSelect(selected: string) {
    if (selected === CUSTOM_VALUE) {
      setIsCustom(true);
      // Don't clear the value — let user type
    } else {
      setIsCustom(false);
      onUpdate(path, selected);
    }
  }

  return (
    <div>
      <div className="mb-1">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
        {field.hint && (
          <p className="text-xs text-gray-400 mt-0.5">{field.hint}</p>
        )}
      </div>

      <select
        value={isCustom ? CUSTOM_VALUE : value || ""}
        onChange={(e) => handleSelect(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      >
        <option value="">— Select a page or link —</option>
        {grouped.map((group) => (
          <optgroup key={group.group} label={group.group}>
            {group.options.map((route) => (
              <option key={route.value} value={route.value}>
                {route.label}
              </option>
            ))}
          </optgroup>
        ))}
        <optgroup label="Other">
          <option value={CUSTOM_VALUE}>Custom URL...</option>
        </optgroup>
      </select>

      {isCustom && (
        <input
          type="url"
          value={value || ""}
          onChange={(e) => onUpdate(path, e.target.value)}
          placeholder="https://... or /path or #anchor"
          className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}
    </div>
  );
}
