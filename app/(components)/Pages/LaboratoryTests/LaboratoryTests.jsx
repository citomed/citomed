import Main from "../../ChildComponent/Main/Main";
import Section from "../../ChildComponent/Section/Section";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import H2Text from "../../Shared/Texts/H2Text";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import LabarotoryCard from "./LabarotoryCard";

const LaboratoryTests = ({
  laboratory_tests,
  laboratory_tests_long,
  params,
  data,
  see_more,
}) => {
  return (
    <Main>
      <Section ngClass="min-h-screen md:min-h-max md:px-[10px]">
        <Max1200>
          <FlexCenter customClass={`flex-col`}>
            <H2Text
              text={laboratory_tests}
              customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
            />
            <Paragraph
              customStyle={`text-[16px] md:text-[13px] text-[--color-5b] mt-[24px] md:mt-[10px] text-center w-[50%] lg:w-full`}
              text={laboratory_tests_long}
            />
            <div className="w-full my-[80px] md:my-[40px]">
              <ul className="grid grid-cols-12 gap-[24px] ">
                {data &&
                  data?.map((item, i) => (
                    <LabarotoryCard
                      see_more={see_more}
                      params={params}
                      key={i}
                      item={item}
                      line_clamp="line-clamp-3"
                    />
                  ))}
              </ul>
            </div>
          </FlexCenter>
        </Max1200>
      </Section>
    </Main>
  );
};

export default LaboratoryTests;
