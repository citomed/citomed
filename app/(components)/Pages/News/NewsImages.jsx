"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import "swiper/css/navigation";
import { useVideoModal } from "../../Shared/CustumYoutubeModal/useVideoModal";
import CustumYoutubeModal from "../../Shared/CustumYoutubeModal/CustumYoutubeModal";

const NewsImages = ({ data }) => {
  const { isModalOpen, handleCloseModal, currentVideoUrl, containerRef } =
    useVideoModal();
  return (
    <>
      <div ref={containerRef} className=" relative w-full">
        <div
          className={`${
            data?.length > 2 ? "flex items-center h-full w-full" : ""
          }`}
        >
          <div className="h-full  flex pr-[40px] md:pr-[20px] md:w-[70px]">
            <button className="swiper-button-prev-custom bg-[#fff] h-full">
              <Image
                src={`/swiper-left.svg`}
                width={40}
                height={40}
                alt="swiper-left"
              />
            </button>
          </div>
          <Swiper
            autoHeight={true}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              340: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              540: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2.3,
                spaceBetween: 20,
              },
            }}
            className="mySwiper "
          >
            {data &&
              data?.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="relative">
                    <Image
                      width={1000}
                      height={200}
                      alt={i}
                      src={`${process.env.NEXT_PUBLIC_PICTURE}/${item?.name}`}
                    />
                    {item?.video_link !== null && (
                      <>
                        <img
                          className="absolute top-0 right-0 left-0 w-full h-full"
                          src={`/home/section1/linear.png`}
                          alt={item?.id || i}
                        />
                        <span
                          data-videolink={item?.video_link}
                          className="play-button absolute top-[50%] left-[50%] translate-x-[-50%] cursor-pointer translate-y-[-50%] bg-[#55c4ef] w-[48px] h-[48px] rounded-full flex items-center justify-center"
                        >
                          <img
                            alt="play"
                            src="/play.png"
                            className="max-w-[120px]"
                          />
                        </span>
                      </>
                    )}
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="h-full  flex pl-[40px] md:pl-[20px]">
            <button className="swiper-button-next-custom bg-[#fff] h-full">
              <Image
                src={`/swiper-left.svg`}
                width={40}
                height={40}
                alt="swiper-left"
                className="rotate-180 md:w-[70px]"
              />
            </button>
          </div>
        </div>
      </div>
      <CustumYoutubeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        videoUrl={currentVideoUrl}
      />
    </>
  );
};

export default NewsImages;
