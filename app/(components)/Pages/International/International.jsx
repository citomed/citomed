import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import Main from "../../ChildComponent/Main/Main";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import Section from "../../ChildComponent/Section/Section";
import Section_1_Video from "../../PagesComponent/HomePage/Section1/Section_1_Components/Section_1_Video";
import Paragraph from "../../Shared/Paragraph/Paragraph";

import SharedPictureWithText from "../../Shared/SharedPictureWithText/SharedPictureWithText";
import H2Text from "../../Shared/Texts/H2Text";

const International = ({ data }) => {
  return (
    <Main>
      <Section ngClass="md:px-[10px]">
        <Max1200>
          <FlexCenter customClass={`flex-col`}>
            <H2Text
              text={data?.title}
              customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
            />
            <div className="mt-[80px] xl:mt-[40px] md:mt-[20px]">
              <SharedPictureWithText
                bgColor={`bg-[--bg-f6] `}
                h2Class={`text-[16px] text-[--color-blue] font-[400]`}
                maxWidth={`max-w-[792px]`}
                img={`${process.env.NEXT_PUBLIC_PICTURE}/${data?.image}`}
                title={data?.text1}
              />
            </div>
            <div className="px-[102px] xl:px-0 mt-[80px] md:mt-[20px]  w-full">
              <div className="flex flex-col">
                <Paragraph
                  customStyle={`text-[16px] text-[--color-blue] mt-[24px] md:text-[14px]`}
                  text={data?.text2}
                />
              </div>
            </div>
          </FlexCenter>

          <div className="my-[80px] md:my-[20px]">
            <Section_1_Video
              linear={`/about/lineaar.png`}
              img={`${process.env.NEXT_PUBLIC_PICTURE}/${data?.video_image}`}
              height={400}
              videoLink={data?.video}
              imgClass="h-[480px] md:h-[300px]"
            />
          </div>
        </Max1200>
      </Section>
    </Main>
  );
};

export default International;
