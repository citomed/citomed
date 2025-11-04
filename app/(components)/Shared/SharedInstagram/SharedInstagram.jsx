"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";

const SharedInstagram = ({ data_instagram }) => {
  const [instagramData, setInstagramData] = useState([]);

  useEffect(() => {
    if (!data_instagram) return;

    const updatedData = data_instagram.map((item) => {
      if (!item.time) {
        // If time is false, use image2
        return { ...item, image: item.image2 }; // image2'yi kullan ve isExpired'i kaldir
      }

      // Correct date parsing:
      const [day, month, year] = item.time.split('.');
      const expiryDate = new Date(year, month - 1, day); // month - 1 because months are 0-indexed
      const currentDate = new Date();

      if (expiryDate < currentDate) {
        // Time has expired, use image2
        return { ...item, image: item.image2 }; //image2'yi kullan ve isExpired'i kaldir
      } else {
        return item; // No change needed
      }
    });

    setInstagramData(updatedData);
  }, [data_instagram]);


  return (
    <>
      <Swiper
        loop={true}
        speed={1200}
        spaceBetween={30}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="h-full w-full"
      >
        {instagramData &&
          instagramData?.map((cur, i) => (
            <SwiperSlide key={i} className="h-full w-full">
              <Link
                href={`${cur?.link}`}
                target="_blank"
                className="flex h-full w-full"
              >
                <div className="rounded-[13px] overflow-hidden">
                  <Image
                    alt={i}
                    src={`${process.env.NEXT_PUBLIC_PICTURE}/${cur?.image}`}
                    width={1000}
                    height={566}
                    className="w-full lg:h-[300px] h-full object-contain "
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default SharedInstagram;