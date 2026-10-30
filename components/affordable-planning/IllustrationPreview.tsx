"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
type IllustrationContent = {
  planPages: { src: string; alt: string; label: string }[];
  budgetPreview: { src: string; alt: string; label: string };
  disclosure: string;
};

type PreviewImage = IllustrationContent["planPages"][number] | IllustrationContent["budgetPreview"];

export function IllustrationPreview({ illustrations }: { illustrations: IllustrationContent }) {
  const planPages = illustrations.planPages;
  const budgetPreview = illustrations.budgetPreview;
  const [activeTab, setActiveTab] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [enlargedImage, setEnlargedImage] = useState<PreviewImage | null>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (enlargedImage && element && !element.open) element.showModal();
  }, [enlargedImage]);

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, current: number) {
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (current + 1) % 2;
    if (event.key === "ArrowLeft") next = (current + 1) % 2;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = 1;
    if (next !== null) {
      event.preventDefault();
      setActiveTab(next);
      tabs.current[next]?.focus();
    }
  }

  const selected = activeTab === 0 ? planPages[activePage] : budgetPreview;

  return (
    <div className="mt-10 rounded-2xl border border-white/15 bg-[#0b3326] p-4 shadow-[0_18px_50px_rgba(0,0,0,.18)] sm:p-6 lg:p-7">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#F4C050]">Illustrative examples</p>
          <h3 className="font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">See What Your Financial Plan Could Look Like</h3>
        </div>
        <button
          type="button"
          onClick={() => setEnlargedImage(selected)}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#F4C050]/70 px-4 py-2 text-sm font-semibold text-[#F4C050] transition hover:bg-[#F4C050]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4C050]"
        >
          Enlarge preview
        </button>
      </div>

      <div role="tablist" aria-label="Choose a planning illustration" className="mb-5 grid grid-cols-2 rounded-lg border border-white/15 bg-[#082a20] p-1">
        <button
          ref={(node) => { tabs.current[0] = node; }}
          id="illustration-tab-plan"
          type="button"
          role="tab"
          aria-selected={activeTab === 0}
          aria-controls="illustration-panel"
          tabIndex={activeTab === 0 ? 0 : -1}
          onClick={() => setActiveTab(0)}
          onKeyDown={(event) => handleTabKeyDown(event, 0)}
          className={`min-h-11 rounded-md px-3 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4C050] ${activeTab === 0 ? "bg-[#F4C050] text-[#0D0D0D]" : "text-white/80 hover:text-white"}`}
        >
          Your Financial Plan
        </button>
        <button
          ref={(node) => { tabs.current[1] = node; }}
          id="illustration-tab-budget"
          type="button"
          role="tab"
          aria-selected={activeTab === 1}
          aria-controls="illustration-panel"
          tabIndex={activeTab === 1 ? 0 : -1}
          onClick={() => setActiveTab(1)}
          onKeyDown={(event) => handleTabKeyDown(event, 1)}
          className={`min-h-11 rounded-md px-3 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4C050] ${activeTab === 1 ? "bg-[#F4C050] text-[#0D0D0D]" : "text-white/80 hover:text-white"}`}
        >
          Your Budget Workbook
        </button>
      </div>

      <div id="illustration-panel" role="tabpanel" aria-labelledby={activeTab === 0 ? "illustration-tab-plan" : "illustration-tab-budget"}>
        {activeTab === 0 ? (
          <>
            <div role="group" aria-label="Choose a financial plan sample page" className="mb-4 flex flex-wrap gap-2">
              {planPages.map((page, index) => (
                <button
                  key={page.src}
                  type="button"
                  aria-pressed={activePage === index}
                  onClick={() => setActivePage(index)}
                  className={`min-h-10 rounded-full border px-3 py-2 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4C050] sm:text-sm ${activePage === index ? "border-[#F4C050] bg-[#F4C050]/15 text-[#F4C050]" : "border-white/20 text-white/75 hover:border-white/50 hover:text-white"}`}
                >
                  <span className="mr-1.5 text-[#F4C050]">0{index + 1}</span>{page.label}
                </button>
              ))}
            </div>
            <div className="relative mx-auto flex h-[min(62vh,36rem)] min-h-[20rem] items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-[#e9ede9] p-2 sm:p-3">
              <Image src={selected.src} alt={selected.alt} width={1547} height={2002} sizes="(min-width: 1024px) 40vw, (min-width: 640px) 70vw, 88vw" unoptimized className="h-full w-full object-contain" />
            </div>
            <p className="mt-3 text-center text-xs text-white/60">Sample page {activePage + 1} of 3 · fictional household</p>
          </>
        ) : (
          <>
            <div className="relative mx-auto flex h-[min(62vh,36rem)] min-h-[20rem] items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-[#e9ede9] p-2 sm:p-3">
              <Image src={budgetPreview.src} alt={budgetPreview.alt} width={1980} height={1400} sizes="(min-width: 1024px) 70vw, 92vw" unoptimized className="h-full w-full object-contain" />
            </div>
            <p className="mt-3 text-center text-sm font-semibold text-white">An example of an editable Excel budget</p>
            <p className="mt-1 text-center text-xs leading-5 text-white/65">This static preview is an image, not an editable spreadsheet. When appropriate and supported by sufficient client financial information, a budget workbook may be an additional planning tool.</p>
          </>
        )}
      </div>

      <p className="mt-5 border-t border-white/15 pt-4 text-xs leading-5 text-white/65">{illustrations.disclosure}</p>

      <dialog
        ref={dialog}
        aria-labelledby="illustration-dialog-title"
        onClose={() => setEnlargedImage(null)}
        className="m-auto max-h-[92dvh] max-w-[96vw] overflow-hidden rounded-xl border border-[#d9d9d9] bg-white p-0 text-[#0D0D0D] shadow-2xl backdrop:bg-black/75"
      >
        {enlargedImage && (
          <div className="flex max-h-[92dvh] w-[min(96vw,1100px)] flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-[#d9d9d9] px-4 py-3 sm:px-5">
              <h4 id="illustration-dialog-title" className="font-serif text-lg font-semibold text-[#0F3D2E]">{enlargedImage.label}</h4>
              <button type="button" onClick={() => dialog.current?.close()} className="min-h-10 rounded-md border border-[#0F3D2E]/20 px-3 py-2 text-sm font-semibold text-[#0F3D2E] hover:bg-[#f3f6f2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F3D2E]">
                Close preview <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="relative min-h-0 flex-1 bg-[#f3f6f2] p-3 sm:p-5">
              <Image src={enlargedImage.src} alt={enlargedImage.alt} width={enlargedImage === budgetPreview ? 1980 : 1547} height={enlargedImage === budgetPreview ? 1400 : 2002} sizes="96vw" unoptimized className="mx-auto h-[min(78dvh,900px)] w-full object-contain" />
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
