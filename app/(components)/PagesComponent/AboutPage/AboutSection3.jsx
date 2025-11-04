import H2Text from "../../Shared/Texts/H2Text";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import AboutComponent from "./AboutComponents/AboutComponent";

const AboutSection3 = ({ data, out_values }) => {
  const deyerler = [
    {
      id: 1,
      text: data?.about?.white_card1_top_text1,
      title: data?.about?.white_card1_editor,
    },
    {
      id: 2,
      text: data?.about?.white_card1_top_text2,
      title: data?.about?.white_card2_editor,
    },
    {
      id: 3,
      text: data?.about?.white_card1_top_text3,
      title: data?.about?.white_card3_editor,
    },
  ].filter((item) => item.text && item.title); // Filter out items with missing text or title

  return (
    <div className="pt-[80px]">
      <div className="flex justify-center items-center flex-col">
        <H2Text
          text={out_values}
          customStyle={`font-['SFProText-Bold'] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] text-[--color-blue]`}
        />
        <Paragraph
          customStyle={`font-[600] text-[24px]  1xl:text-[20px] lg:text-[16px] md:text-[13px] text-[--color-blue] mt-[40px] md:mt-[20px] text-center`}
          text={data?.about?.card2_title}
        />
      </div>
      <div className="mb-[80px]">
        <ul className="mt-[80px] grid grid-cols-12 gap-[24px] h-full">
          {deyerler?.map((item, i) => (
            <AboutComponent
              key={i}
              item={item}
              customStyle={`border border-[--bg-55]`}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutSection3;
