import { useState, useRef, useEffect } from "react";

export const useVideoModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
  const containerRef = useRef(null);

  const handleOpenModal = (videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setTimeout(() => {
      setCurrentVideoUrl(null);
    }, 300);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (event) => {
      const playButton = event.target.closest(".play-button");
      if (playButton) {
        const videoLink = playButton.getAttribute("data-videolink");
        if (videoLink) {
          handleOpenModal(videoLink);
        }
      }
    };

    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, []);

  return {
    containerRef,
    isModalOpen,
    currentVideoUrl,
    handleCloseModal,
  };
};
