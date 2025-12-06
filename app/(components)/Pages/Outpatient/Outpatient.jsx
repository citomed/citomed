"use client";
import Main from "../../ChildComponent/Main/Main";
import Section from "../../ChildComponent/Section/Section";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import H2Text from "../../Shared/Texts/H2Text";
import Paragraph from "../../Shared/Paragraph/Paragraph";

import OutpatientCard from "./OutpatientCard";

const Outpatient = ({ all_data, params, see_more, noData, bir }) => {
  return (
    <Main>
      <Section ngClass="min-h-screen md:min-h-max md:px-[10px]">
        <Max1200>
          <FlexCenter customClass={`flex-col mb-[80px] md:mb-[30px]`}>
            {all_data?.data && all_data?.data?.length > 0 ? (
              <>
                <H2Text
                  text={all_data?.parent_title}
                  customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
                />
                <Paragraph
                  customStyle={`text-[16px] md:text-[13px] text-[--color-5b] mt-[24px] md:mt-[15px] text-center w-[50%] lg:w-full`}
                  text={all_data?.parent_text}
                />
                <div className="w-full mt-[80px] md:mt-[40px]">
                  <ul className="grid grid-cols-12 gap-[24px] w-full">
                    {all_data.data.map((item, i) => (
                      <OutpatientCard
                        see_more={see_more}
                        params={params}
                        item={item}
                        key={i}
                        slug_id={all_data.parent_id}
                        slug={all_data.parent_slug}
                      />
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <H2Text
                text={noData}
                customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] font-['SFProText-Bold'] text-center`}
              />
            )}
          </FlexCenter>
        </Max1200>
      </Section>
    </Main>
  );
};

export default Outpatient;
