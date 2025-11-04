import SharedVideoWithInstagram from "@/app/(components)/Shared/SharedVideoWithInstagram/SharedVideoWithInstagram";
import Section from "../../../ChildComponent/Section/Section";
import Max1200 from "@/app/(components)/ChildComponent/Max1200/Max1200";

const Section_1 = ({ data_sldier, data_insatgram }) => {
  return (
    <Section ngClass={`mt-16 xl:mt-0`}>
      <Max1200>
        <SharedVideoWithInstagram
          height={400}
          linear={`/home/section1/linear.png`}
          imgVideo={`${process.env.NEXT_PUBLIC_PICTURE}/${data_sldier?.image}`}
          imgInstagram={data_insatgram}
          videoLink={`${data_sldier?.link}`}
          text1={`${data_sldier?.text}`}
          imgClass="md:h-[300px]"
          imageDiv="h-[300px]"
        />
      </Max1200>
    </Section>
  );
};

export default Section_1;
