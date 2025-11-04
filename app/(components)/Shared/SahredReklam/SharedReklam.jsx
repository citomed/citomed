import React from "react";
import H2Text from "../Texts/H2Text";

import Max1200 from "../../ChildComponent/Max1200/Max1200";
import Link from "next/link";

const SharedReklam = ({
  linkBg,
  pText,
  h2Text,
  linkText,
  link,
  customClass,
}) => {
  return (
    <>
      <div className={`${customClass} md:px-[20px]`}>
        <Max1200>
          <div className="grid grid-cols-12 gap-6  ">
            <div className="flex flex-col col-span-12">
              <H2Text
                text={h2Text}
                customStyle={`text-[30px] 1xl:text-[25px]  lg:text-[20px] md:text-[18px] w-max lg:w-auto  text-[#fff] font-['SFProText-Bold'] mb-10 `}
              />
            </div>
            <div className="col-span-12">
              <div className="flex justify-between lg:flex-col ">
                <p className="text-[#fff] max-w-[65%] lg:max-w-full   text-[16px] 1xl:text-[14px] xl:text-[12px]">
                  {pText}
                </p>
                <Link
                  href={link}
                  className={`${linkBg} relative md:mt-[20px] z-[40] cursor-pointer w-max flex items-center gap-[20px] px-[64px] xl:px-[20px] py-[17.5px] md:py-[10px] h-max  text-[#fff] capitalize rounded-[60px] text-[14px]`}
                >
                  <h3 className="w-full"> {linkText}</h3>
                  <img src="/right.svg" alt={h2Text} />
                </Link>
              </div>
            </div>
          </div>
        </Max1200>
      </div>
    </>
  );
};

export default SharedReklam;
