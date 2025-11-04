import React from "react";
import Main from "../../ChildComponent/Main/Main";
import Section from "../../ChildComponent/Section/Section";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import H2Text from "../../Shared/Texts/H2Text";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import SharedTabs from "../../Shared/SharedTabs/SharedTabs";
import GalleryContent from "./GalleryContent";
import KivContent from "./KivContent";

const Galllery = ({
  media_center,
  media_center_long,
  for_kiv,
  tr_gallery,
  data,
}) => {
  return (
    <Main>
      <Section ngClass={`mb-[80px] min-h-[70vh]`}>
        <Max1200>
          <FlexCenter customClass={`flex-col `}>
            <H2Text
              text={media_center}
              customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
            />
            <Paragraph
              customStyle={`text-[16px] text-[--color-5b] mt-[24px] md:text-[14px] md:mt-[10px] text-center w-[50%] lg:w-full`}
              text={media_center_long}
            />
            <div className="w-full mt-[80px] 1xl:mt-[40px] md:mt-[20px]">
              <SharedTabs
                data1={data?.gallery}
                data2={data?.kiv}
                tab1name={tr_gallery}
                tab2Name={for_kiv}
                h2Class="text-[--color-blue] text-[16px] md:text-[14px] py-[11px] px-[41px] md:px-[20px] md:py-[6px] rounded-[60px] font-['SFProText-Bold']"
                activeTabClass={`bg-[--bg-55] rounded-[60px]`}
                customStyle={`border border-[--bg-55] rounded-[60px] p-[8px] flex items-center gap-4 w-max m-auto`}
                tab1Content={<GalleryContent data={data?.gallery} />}
                tab2Content={<KivContent data={data?.kiv} />}
              />
            </div>
          </FlexCenter>
        </Max1200>
      </Section>
    </Main>
  );
};

export default Galllery;
