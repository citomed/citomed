import Main from "../../ChildComponent/Main/Main";
import Section from "../../ChildComponent/Section/Section";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import H2Text from "../../Shared/Texts/H2Text";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import ServicesGrid from "../../Shared/ServicesGrid/ServicesGrid";

const PrivarteServices = ({
  data,
  params,
  read_more,
  privateservives,
  privateservives_long,
}) => {
  return (
    <Main>
      <Section ngClass="min-h-screen md:min-h-max md:px-[10px]">
        <Max1200>
          <FlexCenter customClass={`flex-col`}>
            <H2Text
              text={privateservives}
              customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
            />
            <Paragraph
              customStyle={`text-[16px] md:text-[14px] text-[--color-5b] mt-[24px] md:mt-[10px] text-center w-[50%] lg:w-full`}
              text={privateservives_long}
            />
            <ServicesGrid
              services={data}
              params={params}
              read_more={read_more}
              services_slug="ozel-xidmetler"
              customStyle="col-span-3 xl:col-span-4 lg:col-span-6 md:col-span-12"
              ngClass={`mt-[80px] md:mt-[40px] mb-[80px] md:mb-[40px] gap-[24px]`}
            />
          </FlexCenter>
        </Max1200>
      </Section>
    </Main>
  );
};

export default PrivarteServices;
