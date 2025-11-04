import Main from "../../ChildComponent/Main/Main";
import Section from "../../ChildComponent/Section/Section";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import H2Text from "../../Shared/Texts/H2Text";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import SharedTabsContent1 from "../../Shared/SharedTabs/SharedTabsContents";

const Recommendation = ({
  tr_recommendation,
  recommendation_long,
  data,
  see_more,
}) => {
  return (
    <Main>
      <Section ngClass={`mb-[80px] min-h-[65vh] md:min-h-min md:px-[10px]`}>
        <Max1200>
          <FlexCenter customClass={`flex-col`}>
            <H2Text
              text={tr_recommendation}
              customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
            />
            <Paragraph
              customStyle={`text-[16px] md:text-[14px] text-[--color-5b] mt-[24px] md:mt-[10px] text-center w-[50%] lg:w-full`}
              text={recommendation_long}
            />
            <div className="w-full mt-[80px] lg:mt-[40px]">
              <SharedTabsContent1 data={data} see_more={see_more} />
            </div>
          </FlexCenter>
        </Max1200>
      </Section>
    </Main>
  );
};

export default Recommendation;
