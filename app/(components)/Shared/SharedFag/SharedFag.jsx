"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const MyAccordionItem = ({ handleToggle, active, faq }) => {
  const contentEl = useRef();

  return (
    <div className="col-span-6 lg:col-span-12 ">
      <div className="rc-accordion-header">
        <div
          className={`flex items-center cursor-pointer justify-between bg-[--bg-f6] rounded-t-[10px]  trans px-[12px] py-[16px] ${
            active === faq?.id ? "border border-[--bg-b4]" : ""
          }`}
          onClick={() => handleToggle(faq?.id)}
        >
          <h5 className="relative mb-[0] text-[--color-blue] text-[15px] md:text-[13px] font-['SFProText-Medium'] trans w-[80%]">
            {faq?.sual}
          </h5>
          <Image
            width={12}
            height={12}
            src="/down.svg"
            className={` ${active === faq?.id ? "rotate-180" : "rotate-0"}`}
            alt="faq"
          />
        </div>
      </div>
      <div
        ref={contentEl}
        className={`rc-collapse relative overflow-hidden h-0 trans_height rounded-b-[10px] ${
          active === faq?.id ? "show border border-[--bg-b4] " : ""
        }`}
        style={
          active === faq?.id
            ? { height: contentEl.current.scrollHeight }
            : { height: "0px" }
        }
      >
        <div className="rc-accordion-body bg-[--bg-f6] rounded-b-[10px] px-[12px] py-[16px] ">
          <p className="mb-0 text-[14px] text-[--color-blue]">{faq?.cavab}</p>
        </div>
      </div>
    </div>
  );
};

const SharedFag = ({ data, fag }) => {
  const [active, setActive] = useState(null);

  const handleToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <>
      <div>
        <h3 className="text-[#003B71] font-bold text-3xl lg:text-lg text-center mb-10">
          {fag}
        </h3>
        <ul className="grid grid-cols-12 gap-[24px]">
          {data?.map((faq) => (
            <MyAccordionItem
              key={faq?.id}
              active={active}
              handleToggle={handleToggle}
              faq={faq}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default SharedFag;
