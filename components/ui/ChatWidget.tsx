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
  const [showTooltip, setShowTooltip] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const tooltipDismissed = useRef(false);

  // Show the attention tooltip after 4 seconds, hide after 12
  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (!tooltipDismissed.current && !open) setShowTooltip(true);
    }, 4000);
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 16000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [open]);

  // Hide tooltip when chat opens
  useEffect(() => {
    if (open) {
      setShowTooltip(false);
      tooltipDismissed.current = true;
    }
  }, [open]);

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

      // Store middleware: send startConversation event when Direct Line connects
      // This triggers the bot's Greeting topic in Copilot Studio
      const store = window.WebChat.createStore(
        {},
        ({ dispatch }: { dispatch: (action: unknown) => void }) =>
          (next: (action: { type: string }) => unknown) =>
          (action: { type: string }) => {
            if (action.type === "DIRECT_LINE/CONNECT_FULFILLED") {
              dispatch({
                type: "DIRECT_LINE/POST_ACTIVITY",
                meta: { method: "keyboard" },
                payload: {
                  activity: {
                    channelData: { postBack: true },
                    name: "startConversation",
                    type: "event",
                  },
                },
              });
            }
            return next(action);
          }
      );

      window.WebChat.renderWebChat(
        {
          directLine,
          store,
          styleOptions: {
            // Colors
            accent: "#C9A84C",
            backgroundColor: "#FFFFFF",

            // Bot bubbles
            bubbleBackground: "#F4F6F0",
            bubbleBorderColor: "#E8ECE5",
            bubbleBorderRadius: 12,
            bubbleBorderWidth: 1,
            bubbleTextColor: "#4B5B52",
            bubbleNubSize: 6,
            bubbleNubOffset: "bottom",

            // User bubbles
            bubbleFromUserBackground: "#14392B",
            bubbleFromUserBorderColor: "#14392B",
            bubbleFromUserBorderRadius: 12,
            bubbleFromUserBorderWidth: 0,
            bubbleFromUserTextColor: "#FFFFFF",
            bubbleFromUserNubSize: 6,
            bubbleFromUserNubOffset: "bottom",

            // Spacing
            bubbleMaxWidth: 320,
            groupTimestamp: 5000,
            showAvatarInGroup: "status",

            // Avatar
            botAvatarInitials: "PA",
            botAvatarBackgroundColor: "#14392B",
            avatarBorderRadius: "50%",
            avatarSize: 32,
            userAvatarInitials: "You",
            userAvatarBackgroundColor: "#C9A84C",

            // Send box
            sendBoxBackground: "#FAFBF8",
            sendBoxButtonColor: "#C9A84C",
            sendBoxButtonColorOnHover: "#DBBF6A",
            sendBoxButtonColorOnFocus: "#DBBF6A",
            sendBoxTextColor: "#4B5B52",
            sendBoxBorderTop: "1px solid #E8ECE5",
            sendBoxPlaceholderColor: "#6B7E72",
            sendBoxHeight: 50,
            sendBoxTextWrap: true,
            micButtonColorOnDictate: "#C9A84C",
            hideSendBox: false,

            // Suggested actions
            suggestedActionBackground: "#FFFFFF",
            suggestedActionBorderColor: "#C9A84C",
            suggestedActionBorderRadius: 20,
            suggestedActionTextColor: "#14392B",
            suggestedActionHeight: 36,

            // Typography
            primaryFont: "'DM Sans', sans-serif",
            monospaceFont: "monospace",
            fontSizeSmall: "13px",
            subtle: "#6B7E72",

            // Timestamps
            timestampColor: "#6B7E72",
            timestampFormat: "relative",

            // Layout
            rootHeight: "100%",
            rootWidth: "100%",
            hideUploadButton: true,
            paddingRegular: 12,
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
        className={`fixed bottom-24 right-4 sm:right-6 z-[999] w-[min(400px,calc(100vw-2rem))] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-[0.92] translate-y-3 pointer-events-none"
        }`}
      >
        <div
          className="rounded-2xl overflow-hidden shadow-[0_16px_60px_rgba(11,42,30,0.22)] border border-border/60 flex flex-col"
          style={{ height: "min(560px, calc(100dvh - 140px))" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-navy to-navy-deep px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/images/single-logo-trimmed.png"
                  alt=""
                  width={429}
                  height={464}
                  className="h-9 w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                />
                {/* Online indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-navy-deep" />
              </div>
              <div>
                <p className="text-white text-[15px] font-semibold leading-tight font-serif tracking-wide">
                  Prosperity Assistant
                </p>
                <p className="text-white/45 text-[11px] mt-0.5">
                  Typically replies instantly
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/40 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
              aria-label="Close chat"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat body */}
          <div ref={chatRef} className="flex-1 bg-white min-h-0" />

          {/* Error state */}
          {error && (
            <div className="absolute inset-0 top-[64px] flex items-center justify-center bg-white">
              <div className="flex flex-col items-center gap-3 px-6 text-center">
                <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center mb-1">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-slate-light fill-none stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <p className="text-sm text-slate">{error}</p>
                <button
                  onClick={handleRetry}
                  className="text-sm font-semibold text-gold hover:text-gold-light transition-colors mt-1"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Powered by footer */}
          <div className="shrink-0 bg-white border-t border-border/40 px-4 py-1.5 text-center">
            <p className="text-[10px] text-slate-light/60 tracking-wide">
              Powered by Prosperity Planning & Advisory
            </p>
          </div>
        </div>
      </div>

      {/* Attention tooltip */}
      <div
        className={`fixed bottom-[88px] right-[76px] sm:right-[84px] z-[998] transition-all duration-500 ${
          showTooltip && !open
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="relative bg-white rounded-xl shadow-[0_8px_30px_rgba(11,42,30,0.15)] border border-border/60 px-4 py-3 max-w-[220px]">
          <button
            onClick={() => { setShowTooltip(false); tooltipDismissed.current = true; }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full border border-border shadow-sm flex items-center justify-center text-slate-light hover:text-slate transition-colors"
            aria-label="Dismiss"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <p className="text-[13px] text-navy font-medium leading-snug">
            Have a question?
          </p>
          <p className="text-[12px] text-slate-light mt-0.5 leading-snug">
            Chat with our AI assistant
          </p>
          {/* Arrow pointing to button */}
          <div className="absolute -bottom-[6px] right-4 w-3 h-3 bg-white border-r border-b border-border/60 rotate-45" />
        </div>
      </div>

      {/* Floating launcher */}
      <div className="fixed bottom-4 right-4 sm:right-6 z-[999] flex items-center gap-3">
        <button
          onClick={() => setOpen(!open)}
          className={`group relative w-[60px] h-[60px] rounded-full shadow-[0_6px_24px_rgba(11,42,30,0.3)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_32px_rgba(11,42,30,0.4)] ${
            open ? "bg-slate" : "bg-navy"
          }`}
          aria-label={open ? "Close chat" : "Open chat"}
        >
          {/* Pulse ring — attention animation */}
          {!open && !tooltipDismissed.current && (
            <span className="absolute inset-0 rounded-full bg-gold/30 animate-ping" />
          )}

          {open ? (
            <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-white fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <Image
              src="/images/single-logo-trimmed.png"
              alt="Chat with us"
              width={429}
              height={464}
              className="h-8 w-auto object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
            />
          )}
        </button>
      </div>

      {/* Global WebChat style overrides */}
      <style jsx global>{`
        /* Send box input — taller, better padding */
        .webchat__send-box__main {
          padding: 8px 12px !important;
        }
        .webchat__send-box-text-box__input,
        .webchat__send-box-text-box__text-area {
          padding: 10px 14px !important;
          font-size: 14px !important;
          min-height: 44px !important;
          border-radius: 10px !important;
          background: #FAFBF8 !important;
          border: 1px solid #E8ECE5 !important;
          transition: border-color 0.2s !important;
        }
        .webchat__send-box-text-box__input:focus,
        .webchat__send-box-text-box__text-area:focus {
          border-color: #C9A84C !important;
          outline: none !important;
        }
        /* Send button */
        .webchat__send-box__button {
          border-radius: 10px !important;
          margin-left: 6px !important;
        }
        /* Message bubbles — better spacing and typography */
        .webchat__bubble__content {
          padding: 10px 14px !important;
          font-size: 14px !important;
          line-height: 1.6 !important;
        }
        /* Scrollbar */
        .webchat__basic-transcript {
          scrollbar-width: thin !important;
          scrollbar-color: #D5DDD8 transparent !important;
        }
        .webchat__basic-transcript::-webkit-scrollbar {
          width: 5px !important;
        }
        .webchat__basic-transcript::-webkit-scrollbar-thumb {
          background: #D5DDD8 !important;
          border-radius: 10px !important;
        }
        /* Avatar text */
        .webchat__initialsAvatar {
          font-size: 11px !important;
          font-weight: 600 !important;
          font-family: 'DM Sans', sans-serif !important;
        }
        /* Suggested actions */
        .webchat__suggested-action__button {
          font-size: 13px !important;
          font-weight: 500 !important;
          padding: 6px 16px !important;
          transition: all 0.2s !important;
        }
        .webchat__suggested-action__button:hover {
          background: #F4F6F0 !important;
        }
        /* Timestamp styling */
        .webchat__row--timestamp {
          font-size: 10px !important;
        }
      `}</style>
    </>
  );
}
