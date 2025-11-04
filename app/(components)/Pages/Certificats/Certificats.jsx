import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import Main from "../../ChildComponent/Main/Main";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import Section from "../../ChildComponent/Section/Section";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import SharedTabs from "../../Shared/SharedTabs/SharedTabs";
import SharedTabsContents from "../../Shared/SharedTabs/SharedTabsContents";
import H2Text from "../../Shared/Texts/H2Text";

const Certificats = ({
  text_certificates,
  certificates_long,
  data,
  see_more,
  certificats_success,
}) => {
  const certificats = data?.filter((item) => item.type === 0);
  const ugur = data?.filter((item) => item.type === 1);
  return (
    <Main>
      <Section ngClass={`mb-[80px] min-h-[60vh] md:min-h-max md:px-[10px]`}>
        <Max1200>
          <FlexCenter customClass={`flex-col`}>
            <H2Text
              text={text_certificates}
              customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
            />
            <Paragraph
              customStyle={`text-[16px] text-[--color-5b] mt-[24px] md:mt-[10px] md:text-[13px] text-center w-[50%] lg:w-full`}
              text={certificates_long}
            />
            <div className="w-full mt-[80px] md:mt-[20px]">
              <SharedTabs
                data1={certificats}
                data2={ugur}
                tab1name={text_certificates}
                tab2Name={certificats_success}
                h2Class="text-[--color-blue] text-[16px] md:text-[13px] py-[11px] px-[41px] md:px-[20px] md:py-[7px] rounded-[60px] font-['SFProText-Bold']"
                activeTabClass={`bg-[--bg-55] rounded-[60px]`}
                customStyle={`border border-[--bg-55] rounded-[60px] p-[8px] flex items-center gap-4 w-max m-auto`}
                tab1Content={
                  <SharedTabsContents see_more={see_more} data={certificats} />
                }
                tab2Content={
                  <SharedTabsContents see_more={see_more} data={ugur} />
                }
              />
            </div>
          </FlexCenter>
        </Max1200>
      </Section>
    </Main>
  );
};

export default Certificats;
