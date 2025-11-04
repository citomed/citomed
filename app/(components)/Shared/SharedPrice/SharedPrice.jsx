import React from "react";

const SharedPrice = ({ text1, text2 }) => {
  return (
    <>
      <div className="border border-[--color-blue] text-[--color-blue] font-[600] text-[20px] 1xl:text-[16px] lg:text-[14px]
       rounded-[10px] py-[14px] 1xl:py-[5px] px-[12px] lg:py-[2px] price flex items-center gap-[12px]">
        <h3>{text1}</h3>
        <span>{text2}</span>
      </div>
    </>
  );
};

export default SharedPrice;
