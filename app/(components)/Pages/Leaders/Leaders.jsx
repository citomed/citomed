import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import Main from "../../ChildComponent/Main/Main";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import Section from "../../ChildComponent/Section/Section";
import H2Text from "../../Shared/Texts/H2Text";
import RoundedPicture from "../../Shared/RoundedPicture/RoundedPicture";
import Paragraph from "../../Shared/Paragraph/Paragraph";

const Leaders = ({
  leaders_address,
  leaders,
  sincerely,
  leaders_name,
  citomed_head,
}) => {
  return (
    <Main>
      <Section ngClass={`pb-[80px] md:px-[10px]`}>
        <Max1200>
          <FlexCenter customClass={`my-[80px] 1xl:m-[40px] md:m-[20px]`}>
            <H2Text
              customStyle={`font-['SFProText-Bold'] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] text-[--color-blue]`}
              text={leaders_address}
            />
          </FlexCenter>

          <div className="bg-[--bg-f6] rounded-[20px] mt-[23rem] 1xl:mt-[18rem] md:mt-[16em]">
            <FlexCenter customClass={`flex-col`}>
              <RoundedPicture
                customClass={`mt-[-14rem]`}
                picture={`${process.env.NEXT_PUBLIC_PICTURE}/${leaders?.image}`}
                img2={`/home/section5/linear.png`}
                width={362}
                height={362}
                roundedPicWidth="w-[250px]  h-[250px] md:w-[180px] md:h-[180px]"
                name={leaders_address}
                alt1={leaders?.title1}
              />
              <H2Text
                text={leaders?.title1}
                customStyle={`py-[60px] px-[90px]  xl:px-[40px] lg:px-[20px] xl:py-[30px] text-center font-['Montserrat'] text-[32px] 1xl:text-[25px] lg:text-[20px] md:text-[16px] text-[--color-blue]`}
              />
            </FlexCenter>
          </div>
          <div>
            <Paragraph
              customStyle={`my-[80px] lg:my-[20px] text-[--color-blue] text-[16px] md:text-[13px] `}
              text={leaders?.text1}
            />
          </div>
          <FlexCenter customClass={`flex-col`}>
            <H2Text
              text={sincerely}
              customStyle={`font-[700] text-[24px] md:text-[20px] text-[--color-blue]`}
            />
            <H2Text
              text={leaders_name}
              customStyle={`font-[700] text-[24px] md:text-[20px] text-[--color-blue]`}
            />
            <Paragraph
              text={citomed_head}
              customStyle={`font-[300] text-[24px] md:text-[20px] text-[--color-blue] pt-[20px]`}
            />
          </FlexCenter>
        </Max1200>
      </Section>
    </Main>
  );
};

export default Leaders;
