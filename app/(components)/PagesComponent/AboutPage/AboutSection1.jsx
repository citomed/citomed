import H2Text from "../../Shared/Texts/H2Text";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import SharedPictureWithText from "../../Shared/SharedPictureWithText/SharedPictureWithText";

const AboutSection1 = ({ data }) => {
  return (
    <div className="mb-[80px]">
      <div className="flex items-center justify-center">
        <H2Text
          text={data?.about?.title}
          customStyle={`text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold'] text-[--color-blue]`}
        />
      </div>
      <div className="mt-[80px] 1xl:mt-[40px] md:mt-[20px] relative md:px-[10px]">
        <SharedPictureWithText
          bgColor={`bg-[--bg-55] `}
          h2Class={`text-[24px] 1xl:text-[20px] lg:text-[16px] md:text-[14px] text-[#fff] font-[600]`}
          maxWidth={`max-w-[588px]`}
          img={`${process.env.NEXT_PUBLIC_PICTURE}/${data?.about?.image}`}
          title={data?.about?.text}
        />

        <div className="flex flex-col ">
          <Paragraph
            customStyle={`mt-[40px] text-[16px] md:text-[13px] text-[--color-blue] about_description`}
            text={data?.about?.description}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection1;
