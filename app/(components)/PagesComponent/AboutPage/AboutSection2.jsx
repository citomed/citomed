import React from "react";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import H2Text from "../../Shared/Texts/H2Text";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import AboutComponent from "./AboutComponents/AboutComponent";

const AboutSection2 = ({ data, our_goal }) => {
  const meqsedimiz = [
    {
      id: 1,
      text: `${data?.about?.blue_card_top_text1}`,
      title: `${data?.about?.blue_card1_editor}`,
    },
    {
      id: 2,
      text: `${data?.about?.blue_card_top_text2}`,
      title: `${data?.about?.blue_card2_editor}`,
    },
    {
      id: 3,
      text: `${data?.about?.blue_card_top_text3}`,
      title: `${data?.about?.blue_card3_editor}`,
    },
  ];

  return (
    <div className="bg-[--bg-f6] py-[80px] xl:py-[40px] md:py-[20px]">
      <Max1200>
        <div className="flex justify-center items-center flex-col">
          <H2Text
            text={our_goal}
            customStyle={`font-['SFProText-Bold'] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px]  text-[--color-blue]`}
          />
          <Paragraph
            customStyle={`font-[600] text-[24px] 1xl:text-[20px] lg:text-[16px] text-[--color-blue] mt-[40px] md:mt-[10px] md:text-[13px] text-center`}
            text={data?.about?.card1_title}
          />
        </div>
        <ul className="mt-[80px] md:mt-[40px] grid grid-cols-12 gap-[24px]">
          {meqsedimiz?.map((item, i) => (
            <AboutComponent key={i} item={item} customStyle={`bg-[--bg-55]`} />
          ))}
        </ul>
      </Max1200>
    </div>
  );
};

export default AboutSection2;
