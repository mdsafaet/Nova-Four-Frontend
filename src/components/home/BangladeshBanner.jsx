
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

      if (dialog.open) {
        dialog.close();
      }

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
      className="
        fixed inset-0 m-auto
        w-[calc(100%_-_2.5rem)]
        max-w-[440px]
        max-h-[85dvh]
        overflow-y-auto
        rounded-2xl
        border-0
        bg-white
        p-0
        shadow-[0_20px_70px_rgba(0,0,0,0.25)]
        backdrop:bg-black/60

        open:animate-[bannerEnter_0.35s_ease-out]
      "
    >
      <div className="relative overflow-hidden rounded-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close announcement"
          autoFocus
          className="
            absolute right-3 top-3 z-10
            flex h-8 w-8
            cursor-pointer
            items-center justify-center
            rounded-full
            border border-white/20
            bg-black/60
            text-white
            backdrop-blur-md
            transition-all duration-200
            hover:scale-110
            hover:bg-black/85
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-white
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Banner Image */}
        <img
          src="/images/bangladesh-banner.jpg"
          alt="Nova Bangladesh announcement"
          className="
            block
            h-auto
            w-full
            max-h-[80dvh]
            object-contain
          "
          decoding="async"
        />
      </div>

      <style>
        {`
          @keyframes bannerEnter {
            from {
              opacity: 0;
              transform: scale(0.94) translateY(12px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            dialog {
              animation: none !important;
            }
          }
        `}
      </style>
    </dialog>
  );
}
