import Section from "@/app/(components)/ChildComponent/Section/Section";
import SharedReklam from "@/app/(components)/Shared/SahredReklam/SharedReklam";

const Section3 = ({ data_translate, params }) => {
  return (
    <Section ngClass={`bg-[#0d2a68]`}>
      <SharedReklam
        linkBg={`bg-[--bg-red] px-[29px] py-[17.5px]`}
        customClass="beforesection relative after:bg-[url('/home/section3/bg.png')] p-20 1xl:px-10 lg:px-4 py-20 mb-20"
        h2Text={data_translate?.section_3_text_1}
        linkText={data_translate?.checkup}
        link={`/${params}/checkaplar`}
        pText={data_translate?.section_3_text_2}
      />
    </Section>
  );
};

export default Section3;
