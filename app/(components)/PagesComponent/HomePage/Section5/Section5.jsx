import Max1200 from "@/app/(components)/ChildComponent/Max1200/Max1200";
import Section from "@/app/(components)/ChildComponent/Section/Section";

import SectionTopTitles from "@/app/(components)/Shared/SectionTopTitles/SectionTopTitles";
import SharedDoctorSlice from "@/app/(components)/Shared/SharedDoctorSlice/SharedDoctorSlice";

const Section5 = ({
  data_doctots,
  params,
  all_btn,
  mb = "",
  home_doctor_text_1,
  home_doctor_text_2,
}) => {
  return (
    <Section ngClass={`bg-[--bg-f6] py-[80px] xl:py-[40px]`}>
      <Max1200>
        <SectionTopTitles
          text1={home_doctor_text_1}
          href={`/${params}/hekimler`}
          h2Class={`text-[--color-blue] text-5xl 1xl:text-[35px] lg:text-[25px] md:text-[20px]  font-['SFProText-Bold'] text-[48px] lg:mb-[20px] md:mb-0`}
          sharedClass={`flex items-center gap-4 text-[--color-blue] border  text-[14px]  border-[--color-blue]  py-[15px] px-[47px] md:px-[20px] md:py-[8px] lg:py-[10px] rounded-[60px] `}
          text2={all_btn}
          mb={mb}
          customImgClass="filter1"
          pcustomStyle={`text-[--color-5b] text-[16px] md:text-[13px] md:text-center`}
          text3={home_doctor_text_2}
        />
        <SharedDoctorSlice
          params={params}
          data_doctots={data_doctots}
          doctor_img={`w-full h-full object-cover div_transition group-hover:scale-110`}
        />
      </Max1200>
    </Section>
  );
};

export default Section5;
