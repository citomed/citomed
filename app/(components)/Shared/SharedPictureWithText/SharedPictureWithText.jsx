import Image from "next/image";
import React from "react";
import H2Text from "../Texts/H2Text";

const SharedPictureWithText = ({ img, title, bgColor, h2Class, maxWidth }) => {
  return (
    <div className="relative ">
      <Image
        src={img}
        width={1000}
        height={500}
        alt={title}
        className="w-full object-cover h-[500px] lg:h-[300px] rounded-[20px]"
      />
      <div className="mt-[-110px] lg:mt-[-80px] relative z-[20]">
        <div className={` ${maxWidth} m-auto`}>
          <div
            className={`${bgColor} rounded-[20px] flex items-center justify-center`}
          >
            <H2Text
              customStyle={`${h2Class}  text-center p-[32px]  lg:p-[16px] md:text-[14px]`}
              text={title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedPictureWithText;
