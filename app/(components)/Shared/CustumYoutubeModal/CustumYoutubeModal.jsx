"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom"; // createPortal'ı içe aktarın
import { CgClose } from "react-icons/cg";

// getEmbedUrl helper fonksiyonu (Değişiklik yok, aynı kalıyor)
const getEmbedUrl = (url) => {
  // ... (Mevcut kodunuz burada)
  if (!url) return "";
  try {
    const urlObj = new URL(url);
    let videoId = null;

    if (
      urlObj.hostname.includes("youtube.com") &&
      urlObj.searchParams.has("v")
    ) {
      videoId = urlObj.searchParams.get("v");
    } else if (
      urlObj.hostname.includes("youtube.com") &&
      urlObj.pathname.includes("/shorts/")
    ) {
      const pathParts = urlObj.pathname.split("/");
      videoId = pathParts[pathParts.length - 1];
    } else if (urlObj.hostname.includes("youtu.be")) {
      videoId = urlObj.pathname.substring(1);
    }

    if (videoId) {
      const cleanVideoId = videoId.split("?")[0];
      return `https://www.youtube.com/embed/${cleanVideoId}?autoplay=0`;
    }

    return url;
  } catch (error) {
    console.error("Video URL'si ayrıştırılırken hata oluştu:", error);
    return "";
  }
};

const ManualModal = ({ isOpen, onClose, videoUrl }) => {
  // Portal hedefi için state.
  // Bu, bileşenin yalnızca client tarafında render edilmesini sağlar.
  const [portalNode, setPortalNode] = useState(null);

  // Bileşen mount olduğunda portal hedefi olan #modal-root'u bul.
  useEffect(() => {
    const node = document.getElementById("modal-root");
    setPortalNode(node);
  }, []);

  // Effect to handle Escape key press and scroll lock
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.documentElement.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const embedUrl = getEmbedUrl(videoUrl);

  // Modal'ın JSX içeriği
  const modalContent = (
    // Backdrop / Overlay
    <div
      className={`fixed inset-0 z-[12200] flex items-center justify-center transition-opacity duration-300 ease-out ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } bg-black bg-opacity-70`}
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className={`bg-transparent flex justify-center items-center rounded-lg shadow-xl transform transition-all duration-300 ease-out w-full max-w-4xl mx-4 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl z-10"
          aria-label="Close modal"
        >
          <CgClose />
        </button>

        {/* Video Iframe Container */}
        {/* Not: Daha iyi responsiveness için iframe'in w ve h'sini kaldırdım, 
            artık parent'ı olan aspect-ratio div'ini dolduracak. */}
        <div className="w-full aspect-w-16 aspect-h-9">
          {embedUrl && embedUrl.includes("youtube.com/embed") ? (
            <iframe
              className="w-full h-[350px]" // w-full ve h-full, aspect-ratio container'ına uymasını sağlar
              src={embedUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
              Video yüklenemedi veya geçersiz URL.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Eğer modal açık değilse veya portal hedefi henüz bulunamadıysa hiçbir şey render etme.
  if (!isOpen || !portalNode) {
    return null;
  }

  // Modal açık ve portal hedefi mevcutsa, modal içeriğini portala render et.
  return createPortal(modalContent, portalNode);
};

export default ManualModal;
