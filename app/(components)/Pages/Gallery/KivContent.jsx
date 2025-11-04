import React from "react";
import H2Text from "../../Shared/Texts/H2Text";
import Paragraph from "../../Shared/Paragraph/Paragraph";

const KivContent = ({ data }) => {
  return (
    <>
      <div className="grid grid-cols-12 gap-[24px]">
        {data &&
          data?.map((item, i) => (
            <div
              key={i}
              className="col-span-3 xl:col-span-4 lg:col-span-6 md:col-span-12 border border-[--color-blue] p-[32px] 1xl:p-[16px] rounded-[10px] flex flex-col"
            >
              <H2Text
                text={item?.name1}
                customStyle={`text-[--color-blue] text-[16px] font-['SFProText-Bold']`}
              />
              <Paragraph
                text={item?.name2}
                customStyle={`text-[16px] text-[--color-5b] mt-[24px] `}
              />
              <div className="flex justify-end mt-[34px]">
                <a
                  target="_blank"
                  download={`${process.env.NEXT_PUBLIC_PICTURE}/${item?.file}`}
                  href={`${process.env.NEXT_PUBLIC_PICTURE}/${item?.file}`}
                >
                  <img alt="download" src="/rounded_down.svg" />
                </a>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default KivContent;
