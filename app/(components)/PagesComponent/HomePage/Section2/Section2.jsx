import Max1200 from "@/app/(components)/ChildComponent/Max1200/Max1200";
import Section from "@/app/(components)/ChildComponent/Section/Section";
import SectionTopTitles from "@/app/(components)/Shared/SectionTopTitles/SectionTopTitles";
import ServicesGrid from "@/app/(components)/Shared/ServicesGrid/ServicesGrid";

const Section2 = ({ data_translate, data_services_cats, params }) => {
  return (
    <Section
      ngClass={`bg-[#0d2a68] w-full mt-20  py-[80px] lg:py-[30px] mb-20`}
    >
      <Max1200>
        <SectionTopTitles
          text1={data_translate?.ozel1}
          href={`${params}/ozel-xidmetler`}
          text2={data_translate?.all}
          customImgClass="filter0 "
          text3={data_translate?.ozel_long}
          h2Class={`text-[#fff] text-[48px] 1xl:text-[35px] lg:text-[25px] md:text-[20px]  font-['SFProText-Bold']`}
          sharedClass={`flex items-center gap-4 text-[#fff] md:mt-[10px] border rounded-[60px] border-[#fff] px-[47px] lg:px-[25px] lg:py-[12px] py-[17.5px] md:py-[6px] text-[14px]`}
          pcustomStyle="text-[#fff] text-[16px] lg:text-[14px] md:text-[12px] md:text-center w-[70%] lg:w-full"
        />
        <ServicesGrid
          services={data_services_cats}
          customStyle="col-span-3 xl:col-span-4 md:col-span-6 sm:col-span-12"
          ngClass={`mt-20 gap-[24px]`}
          params={params}
          services_slug={`ozel-xidmetler`}
          href={`${params}/ozel-xidmetler`}
          read_more={data_translate?.read_more}
          text2={data_translate?.all}
        />
      </Max1200>
    </Section>
  );
};

export default Section2;
