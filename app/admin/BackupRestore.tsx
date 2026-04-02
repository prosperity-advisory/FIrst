"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { takeSnapshot, restoreSnapshot } from "@/app/admin/actions";

interface SnapshotInfo {
  created_at: string;
  pages: number;
  sections: number;
  settings: number;
  media: number;
}

export function BackupRestore({
  snapshot,
}: {
  snapshot: SnapshotInfo | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function handleSnapshot() {
    setMessage(null);
    startTransition(async () => {
      try {
        const result = await takeSnapshot();
        setMessage({
          type: "success",
          text: `Snapshot saved — ${result.pages} pages, ${result.sections} sections, ${result.settings} settings, ${result.media} media`,
        });
        router.refresh();
      } catch (err) {
        setMessage({ type: "error", text: err instanceof Error ? err.message : "Snapshot failed" });
      }
    });
  }

  function handleRestore() {
    if (!confirm("This will REPLACE all current CMS data with the saved snapshot. Are you sure?")) return;
    setMessage(null);
    startTransition(async () => {
      try {
        const result = await restoreSnapshot();
        setMessage({
          type: "success",
          text: `Restored — ${result.pages} pages, ${result.sections} sections, ${result.settings} settings, ${result.media} media`,
        });
        router.refresh();
      } catch (err) {
        setMessage({ type: "error", text: err instanceof Error ? err.message : "Restore failed" });
      }
    });
  }

  const snapshotDate = snapshot
    ? new Date(snapshot.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Backup & Restore</h3>
          {snapshotDate ? (
            <p className="text-xs text-gray-500 mt-1">
              Last snapshot: {snapshotDate}
              <span className="text-gray-400 ml-1">
                ({snapshot!.pages}p, {snapshot!.sections}s)
              </span>
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">No snapshot yet</p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSnapshot}
          disabled={isPending}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          {isPending ? "Working..." : "Save Snapshot"}
        </button>
        <button
          onClick={handleRestore}
          disabled={isPending || !snapshot}
          className="flex-1 inline-flex items-center justify-center gap-2 border border-amber-300 text-amber-700 text-sm font-medium px-3 py-2 rounded-lg hover:bg-amber-50 disabled:opacity-50 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
          >
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Restore
        </button>
      </div>

      {message && (
        <p className={`text-xs mt-3 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}
