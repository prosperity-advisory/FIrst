"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  label: string;
  description: string;
  projectionLimitation?: string;
};

type IllustrationContent = {
  disclosure: string;
  gallery: {
    title: string;
    introduction: string;
    completenessNotice: string;
    items: GalleryItem[];
  };
};

export function IllustrationPreview({ illustrations }: { illustrations: IllustrationContent }) {
  const { gallery } = illustrations;
  const [enlargedImage, setEnlargedImage] = useState<GalleryItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (enlargedImage && element && !element.open) element.showModal();
  }, [enlargedImage]);

  return (
    <section aria-labelledby="planning-examples-heading" className="mt-10 rounded-2xl border border-white/15 bg-[#0b3326] p-4 shadow-[0_18px_50px_rgba(0,0,0,.18)] sm:p-6 lg:p-7">
      <div className="mb-6 max-w-4xl">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#F4C050]">Illustrative examples</p>
        <h3 id="planning-examples-heading" className="font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
          {gallery.title}
        </h3>
        <p className="mt-3 text-base leading-7 text-white/85">{gallery.introduction}</p>
        <p className="mt-3 text-base leading-7 text-white/90">
          <strong className="font-bold text-white">These illustrations are examples—not a complete financial plan.</strong>{" "}
          {gallery.completenessNotice.replace(/^These illustrations are examples—not a complete financial plan\.\s*/u, "")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {gallery.items.map((item, index) => (
          <article key={`${item.title}-${index}`} className="overflow-hidden rounded-xl border border-white/15 bg-[#082a20]">
            <button
              type="button"
              onClick={() => setEnlargedImage(item)}
              aria-label={`Enlarge ${item.title}, ${item.label}`}
              className="group block w-full p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#F4C050]"
            >
              <div className="flex h-[22rem] items-center justify-center overflow-hidden rounded-lg bg-[#e9ede9] p-2 sm:h-[26rem]">
                <Image src={item.src} alt={item.alt} width={1200} height={1800} sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 92vw" unoptimized className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.015]" />
              </div>
              <div className="pt-4">
                <span className="inline-flex rounded-full border border-[#F4C050]/40 bg-[#F4C050]/10 px-2.5 py-1 text-xs font-semibold leading-5 text-[#F4C050]">
                  {item.label}
                </span>
                <h4 className="mt-3 font-serif text-lg font-semibold leading-snug text-white">{item.title}</h4>
                <p className="mt-2 min-h-12 text-sm leading-6 text-white/75">{item.description}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-[#F4C050]">Enlarge example</span>
              </div>
            </button>
          </article>
        ))}
      </div>

      <p className="mt-6 border-t border-white/15 pt-4 text-xs leading-5 text-white/65">{illustrations.disclosure}</p>

      <dialog
        ref={dialog}
        aria-labelledby="illustration-dialog-title"
        onClose={() => setEnlargedImage(null)}
        className="m-auto max-h-[92dvh] max-w-[96vw] overflow-hidden rounded-xl border border-[#d9d9d9] bg-white p-0 text-[#0D0D0D] shadow-2xl backdrop:bg-black/75"
      >
        {enlargedImage && (
          <div className="flex max-h-[92dvh] w-[min(96vw,1100px)] flex-col">
            <div className="flex items-start justify-between gap-4 border-b border-[#d9d9d9] px-4 py-3 sm:px-5">
              <div>
                <h4 id="illustration-dialog-title" className="font-serif text-lg font-semibold text-[#0F3D2E]">{enlargedImage.title}</h4>
                <p className="mt-1 text-sm font-medium text-[#315447]">{enlargedImage.label}</p>
                {enlargedImage.projectionLimitation && (
                  <p className="mt-2 max-w-3xl text-sm leading-5 text-[#343434]">{enlargedImage.projectionLimitation}</p>
                )}
              </div>
              <button type="button" onClick={() => dialog.current?.close()} className="min-h-10 shrink-0 rounded-md border border-[#0F3D2E]/20 px-3 py-2 text-sm font-semibold text-[#0F3D2E] hover:bg-[#f3f6f2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F3D2E]">
                Close preview <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="relative min-h-0 flex-1 bg-[#f3f6f2] p-3 sm:p-5">
              <Image src={enlargedImage.src} alt={enlargedImage.alt} width={1200} height={1800} sizes="96vw" unoptimized className="mx-auto h-[min(72dvh,800px)] w-full object-contain" />
            </div>
            <p className="border-t border-[#d9d9d9] px-4 py-3 text-sm leading-5 text-[#343434] sm:px-5">{enlargedImage.description}</p>
          </div>
        )}
      </dialog>
    </section>
  );
}
