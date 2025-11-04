"use client";
import CustumYoutubeModal from "@/app/(components)/Shared/CustumYoutubeModal/CustumYoutubeModal";
import { useVideoModal } from "@/app/(components)/Shared/CustumYoutubeModal/useVideoModal";
import Image from "next/image";
import React from "react";

const Section_1_Video = ({
  videoLink,
  linear,
  img,
  height,
  imgClass = "",
  main_div = "",
  imageDiv = "",
}) => {
  const { isModalOpen, handleCloseModal, currentVideoUrl, containerRef } =
    useVideoModal();
  return (
    <>
      <div ref={containerRef} className={`relative h-full ${main_div}`}>
        <div className={imageDiv}>
          <img
            width={1000}
            height={height}
            src={img}
            alt="section1"
            className={`${imgClass} w-full `}
          />
        </div>

        <img
          className="absolute top-0 right-0 left-0 w-full h-full"
          alt="linear"
          src={linear}
        />
        {videoLink && (
          <span
            data-videolink={videoLink}
            className="play-button absolute top-[50%] left-[50%] translate-x-[-50%] cursor-pointer translate-y-[-50%]  "
          >
            <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#55c4ef] relative">
              <img
                alt="play"
                src="/play-video.svg"
                className="max-w-[120px] absolute top-[50%] left-[54%] translate-x-[-50%] translate-y-[-50%]"
              />
            </div>
          </span>
        )}
      </div>
      <CustumYoutubeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        videoUrl={currentVideoUrl}
      />
    </>
  );
};

export default Section_1_Video;
