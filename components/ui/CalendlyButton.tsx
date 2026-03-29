"use client";

import { useState } from "react";
import { PopupModal } from "react-calendly";

const CALENDLY_URL =
  "https://calendly.com/prosperityplanningandadvisory/clarity-session";

/* Site theme colors passed to Calendly's embed */
const PAGE_SETTINGS = {
  primaryColor: "14392B",
  textColor: "4B5B52",
  backgroundColor: "ffffff",
};

interface CalendlyButtonProps {
  children: React.ReactNode;
  className?: string;
  url?: string;
}

export function CalendlyButton({
  children,
  className = "",
  url = CALENDLY_URL,
}: CalendlyButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      {open && (
        <PopupModal
          url={url}
          rootElement={document.body}
          onModalClose={() => setOpen(false)}
          open={open}
          pageSettings={PAGE_SETTINGS}
        />
      )}
    </>
  );
}
