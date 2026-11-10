import { useEffect, useRef } from "react";
import { useCountry } from "../../context/country";

const STORAGE_KEY = "nova-bd-image-banner-dismissed";

export default function BangladeshBanner() {
  const country = useCountry();

  if (country.id !== "bangladesh") return null;

  return <BangladeshBannerModal />;
}

function BangladeshBannerModal() {
  const dialogRef = useRef(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      // Show normally if storage is unavailable.
    }

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    dialog.showModal();
    document.body.style.overflow = "hidden";

    const restorePage = () => {
      document.body.style.overflow = previousOverflow;

      if (
        previouslyFocused instanceof HTMLElement &&
        previouslyFocused.isConnected
      ) {
        previouslyFocused.focus();
      }
    };

    dialog.addEventListener("close", restorePage);

    return () => {
      dialog.removeEventListener("close", restorePage);
      dialog.close();
      restorePage();
    };
  }, []);

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Close normally if storage is unavailable.
    }

    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Nova Bangladesh announcement"
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;

        const bounds = event.currentTarget.getBoundingClientRect();

        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        ) {
          dismiss();
        }
      }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-3xl overflow-auto rounded-2xl border-0 bg-white p-0 shadow-2xl backdrop:bg-black/70"
    >
      <div className="relative">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close announcement"
          autoFocus
          className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-black/75 text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>

        <img
          src="/images/bangladesh-banner.jpg"
          alt="Nova Bangladesh announcement"
          className="block h-auto w-full"
          decoding="async"
        />
      </div>
    </dialog>
  );
}