"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const LoadingSpinner = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
    <div
      className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-white border-t-transparent"
      role="status"
      aria-live="polite"
      aria-label="Yuklemir..."
    ></div>
  </div>
);

const GalleryContent = ({ data }) => {
  // State'lerde ve fonksiyonlarda değişiklik yok.
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const openModal = (index) => {
    setIsImageLoading(true);
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
    setIsImageLoading(false);
  };

  const findNextValidIndex = (startIndex) => {
    let nextIndex = (startIndex + 1) % data.length;
    while (nextIndex !== startIndex) {
      if (data[nextIndex] && data[nextIndex].image_2) return nextIndex;
      nextIndex = (nextIndex + 1) % data.length;
    }
    return startIndex;
  };

  const findPreviousValidIndex = (startIndex) => {
    let prevIndex = (startIndex - 1 + data.length) % data.length;
    while (prevIndex !== startIndex) {
      if (data[prevIndex] && data[prevIndex].image_2) return prevIndex;
      prevIndex = (prevIndex - 1 + data.length) % data.length;
    }
    return startIndex;
  };

  const goToNext = () => {
    const nextValidIndex = findNextValidIndex(selectedIndex);
    if (nextValidIndex !== selectedIndex) {
      setIsImageLoading(true);
      setSelectedIndex(nextValidIndex);
    }
  };

  const goToPrevious = () => {
    const prevValidIndex = findPreviousValidIndex(selectedIndex);
    if (prevValidIndex !== selectedIndex) {
      setIsImageLoading(true);
      setSelectedIndex(prevValidIndex);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") {
        closeModal();
      }
      // Sadece yükleme bittiğinde ok tuşları çalışsın
      if (!isImageLoading) {
        if (e.key === "ArrowRight") goToNext();
        else if (e.key === "ArrowLeft") goToPrevious();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, data, isImageLoading]); // isImageLoading'i dependency array'e ekledik

  const selectedImage = selectedIndex !== null ? data[selectedIndex] : null;

  // --- JSX DEĞİŞİKLİKLERİ BURADA ---
  const modalContent =
    selectedImage && isBrowser
      ? createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[9999]"
            onClick={closeModal}
          >
            {/* KONTROL BUTONLARI: Sadece yükleme bittiğinde gösterilir */}
            {!isImageLoading && (
              <>
                {/* Sol Ok Butonu */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all"
                  aria-label="Önceki Resim"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Sağ Ok Butonu */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all"
                  aria-label="Sonraki Resim"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* RESİM CONTAINER'I */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              {isImageLoading && <LoadingSpinner />}

              {/* Kapatma Butonu: Sadece yükleme bittiğinde gösterilir */}
              {!isImageLoading && (
                <button
                  onClick={closeModal}
                  className="absolute -top-3 -right-3 md:-top-5 md:-right-5 text-white text-3xl bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-all z-20"
                  aria-label="Bagla"
                >
                  ×
                </button>
              )}

              {/* Resim her zaman render edilir, sadece opacity'si değişir */}
              <Image
                key={selectedIndex}
                width={800}
                height={600}
                alt={selectedImage?.id || "gallery-image-large"}
                src={`${process.env.NEXT_PUBLIC_PICTURE}/${selectedImage?.image_2}`}
                onLoadingComplete={() => setIsImageLoading(false)}
                className={`rounded-lg max-w-[85vw] max-h-[80vh] w-auto h-auto object-contain transition-opacity duration-300 ${
                  isImageLoading ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>
          </div>,
          document.body
        )
      : null;

  // Galeri Grid JSX'i (değişiklik yok)
  return (
    <>
      <div className="grid grid-cols-12 gap-[24px]">
        {data?.map((cur, i) => {
          const isClickable = cur && cur.image_2;
          return (
            <div
              key={cur?.id || i}
              className={`col-span-3 xl:col-span-4 lg:col-span-6 md:col-span-12 ${
                isClickable ? "cursor-pointer group" : ""
              }`}
              onClick={isClickable ? () => openModal(i) : undefined}
            >
              <Image
                width={1000}
                height={180}
                alt={cur?.id || "gallery-image"}
                src={`${process.env.NEXT_PUBLIC_PICTURE}/${cur?.image}`}
                className={`rounded-[10px] h-[200px] md:h-[180px] w-full object-cover transform transition-transform duration-300 ${
                  isClickable ? "group-hover:scale-105" : ""
                }`}
              />
            </div>
          );
        })}
      </div>
      {modalContent}
    </>
  );
};

export default GalleryContent;
