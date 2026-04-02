"use client";

import { useState, useEffect, useCallback } from "react";

interface ToastMessage {
  id: number;
  type: "success" | "error";
  text: string;
}

let toastId = 0;
let globalAddToast: ((type: "success" | "error", text: string) => void) | null = null;

export function showToast(type: "success" | "error", text: string) {
  globalAddToast?.(type, text);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: "success" | "error", text: string) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  useEffect(() => {
    globalAddToast = addToast;
    return () => { globalAddToast = null; };
  }, [addToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-[slideIn_0.2s_ease-out] ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round] shrink-0">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round] shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          )}
          {toast.text}
        </div>
      ))}
    </div>
  );
}
