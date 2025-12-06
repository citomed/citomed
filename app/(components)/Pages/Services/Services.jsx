import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import Main from "../../ChildComponent/Main/Main";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import Section from "../../ChildComponent/Section/Section";
import Paragraph from "../../Shared/Paragraph/Paragraph";

import ServicesGrid from "../../Shared/ServicesGrid/ServicesGrid";
import H2Text from "../../Shared/Texts/H2Text";

const Services = ({
  tr_services,
  services_long,
  category,
  params,
  read_more,
}) => {
  return (
    <Main>
      <Section ngClass="min-h-screen md:min-h-max md:px-[10px]">
        <Max1200>
          <FlexCenter customClass={`flex-col`}>
            <H2Text
              text={tr_services}
              customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
            />
            <Paragraph
              customStyle={`text-[16px] text-[--color-5b] mt-[24px] md:m-[10px] md:text-[13px] text-center w-[50%] lg:w-full`}
              text={services_long}
            />
            <ServicesGrid
              params={params}
              read_more={read_more}
              services_slug={"servis"}
              services={category}
              customStyle="col-span-4 lg:col-span-6 md:col-span-12"
              ngClass={`mt-[80px] md:mt-[20px] mb-[80px] md:mb-[40px] gap-[24px]`}
            />
          </FlexCenter>
        </Max1200>
      </Section>
    </Main>
  );
};

export default Services;
