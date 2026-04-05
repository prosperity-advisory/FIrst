"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Script from "next/script";

const TOKEN_ENDPOINT = "/api/chat-token";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    WebChat: any;
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const initChat = useCallback(async () => {
    if (initialized || !chatRef.current) return;
    if (!window.WebChat?.renderWebChat || !window.WebChat?.createDirectLine) {
      setError("Chat is loading. Please try again in a moment.");
      return;
    }

    setInitialized(true);

    try {
      const res = await fetch(TOKEN_ENDPOINT);
      if (!res.ok) {
        setError("Unable to connect. Please try again later.");
        setInitialized(false);
        return;
      }
      const data = await res.json();
      const token = data.token;

      if (!token) {
        setError("Unable to connect. Please try again later.");
        setInitialized(false);
        return;
      }

      const directLine = window.WebChat.createDirectLine({ token });

      window.WebChat.renderWebChat(
        {
          directLine,
          styleOptions: {
            // Colors — site aesthetic
            accent: "#C9A84C",
            backgroundColor: "#FFFFFF",
            bubbleBackground: "#F4F6F0",
            bubbleBorderColor: "#D5DDD8",
            bubbleBorderRadius: 8,
            bubbleFromUserBackground: "#14392B",
            bubbleFromUserBorderColor: "#14392B",
            bubbleFromUserBorderRadius: 8,
            bubbleFromUserTextColor: "#FFFFFF",
            bubbleTextColor: "#4B5B52",

            // Avatar
            botAvatarInitials: "PA",
            botAvatarBackgroundColor: "#14392B",
            userAvatarInitials: "You",
            userAvatarBackgroundColor: "#C9A84C",

            // Send box
            sendBoxBackground: "#FFFFFF",
            sendBoxButtonColor: "#C9A84C",
            sendBoxButtonColorOnHover: "#DBBF6A",
            sendBoxTextColor: "#4B5B52",
            sendBoxBorderTop: "1px solid #D5DDD8",
            sendBoxPlaceholderColor: "#6B7E72",

            // Suggested actions
            suggestedActionBackground: "#FFFFFF",
            suggestedActionBorderColor: "#C9A84C",
            suggestedActionTextColor: "#14392B",

            // Typography
            primaryFont: "'DM Sans', sans-serif",
            fontSizeSmall: "13px",
            rootHeight: "100%",
            rootWidth: "100%",
            hideUploadButton: true,
          },
        },
        chatRef.current
      );
    } catch (err) {
      console.error("Chat connection issue:", err);
      setError("Unable to connect. Please try again later.");
      setInitialized(false);
    }
  }, [initialized]);

  useEffect(() => {
    if (open && sdkReady && !initialized) {
      initChat();
    }
  }, [open, sdkReady, initialized, initChat]);

  function handleRetry() {
    setError(null);
    setInitialized(false);
  }

  return (
    <>
      <Script
        src="https://cdn.botframework.com/botframework-webchat/latest/webchat.js"
        strategy="lazyOnload"
        onLoad={() => setSdkReady(true)}
      />

      {/* Chat panel */}
      <div
        className={`fixed bottom-20 right-4 sm:right-6 z-[999] w-[min(380px,calc(100vw-2rem))] transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(11,42,30,0.2)] border border-border flex flex-col" style={{ height: "min(520px, calc(100dvh - 120px))" }}>
          {/* Header with logo */}
          <div className="bg-navy px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/single-logo-trimmed.png"
                alt=""
                width={429}
                height={464}
                className="h-8 w-auto object-contain"
              />
              <div>
                <p className="text-white text-sm font-semibold leading-tight font-serif">
                  Prosperity Assistant
                </p>
                <p className="text-white/50 text-[11px]">Ask us anything</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/50 hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Chat body */}
          <div ref={chatRef} className="flex-1 bg-white min-h-0" />

          {/* Error state */}
          {error && (
            <div className="absolute inset-0 top-[52px] flex items-center justify-center bg-white">
              <div className="flex flex-col items-center gap-3 px-6 text-center">
                <p className="text-sm text-slate">{error}</p>
                <button
                  onClick={handleRetry}
                  className="text-sm font-medium text-gold hover:text-gold-light transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-4 right-4 sm:right-6 z-[999] w-14 h-14 rounded-full shadow-[0_4px_20px_rgba(11,42,30,0.25)] flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_28px_rgba(11,42,30,0.35)] ${
          open ? "bg-slate rotate-0" : "bg-navy"
        }`}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-white fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-white fill-none stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
