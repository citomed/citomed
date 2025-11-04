import Max1200 from "@/app/(components)/ChildComponent/Max1200/Max1200";
import Section from "@/app/(components)/ChildComponent/Section/Section";
import IsNew from "@/app/(components)/Shared/IsNew/IsNew";
import Paragraph from "@/app/(components)/Shared/Paragraph/Paragraph";
import SectionTopTitles from "@/app/(components)/Shared/SectionTopTitles/SectionTopTitles";
import H2Text from "@/app/(components)/Shared/Texts/H2Text";
import React from "react";

const Section4 = ({ data_translate, data }) => {
  return (
    <Section ngClass={`mb-20`}>
      <Max1200>
        <SectionTopTitles
          text1={data_translate?.section4_text_1}
          href={""}
          h2Class={`text-[--color-blue] text-[48px] 1xl:text-[35px] lg:text-[20px] lg:mb-5 md:mb-0 font-['SFProText-Bold']`}
          sharedClass={`inline-flex h-max items-center gap-4 text-[--color-blue] text-[14px] border rounded-[60px] border-[--color-blue] py-[15px] lg:py-[10px] px-[47px] md:px-[20px] md:py-[6px] `}
          text2={data_translate?.all}
          customImgClass="filter1"
          pcustomStyle={`text-[--color-5b] text-[16px] md:text-[13px] md:text-center`}
          text3={data_translate?.section4_text_2}
        />

        <div className="grid grid-cols-12 gap-6 mt-14">
          {data &&
            data?.map((item, i) => (
              <div
                key={i}
                className="col-span-4 xl:col-span-6 md:col-span-12 div_transition hover:scale-105"
              >
                <div className="flex justify-between flex-col gap-12  h-full bg-[--bg-55] p-8 rounded-[10px]">
                  <H2Text
                    text={item?.title}
                    customStyle={`text-[--color-blue] text-[24px] md:text-[20px] font-semibold`}
                  />
                  <Paragraph customStyle={`text-[14px] `} text={item?.text} />
                  <div className="flex justify-between items-center">
                    {item?.label && (
                      <IsNew
                        text={item?.label}
                        customStyle={`bg-[#f32735] rounded-3xl uppercase text-white font-semibold px-[14px] py-[3px] text-[12px]  border-[4px] border-[#3db2df]`}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Max1200>
    </Section>
  );
};

export default Section4;
