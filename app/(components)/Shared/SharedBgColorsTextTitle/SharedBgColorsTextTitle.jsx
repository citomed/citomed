import Paragraph from "../Paragraph/Paragraph";

const SharedBgColorsTextTitle = ({ text1, text2 }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="bg-[--bg-f6] p-[32px] lg:p-[16px] rounded-[20px]">
          <Paragraph
            customStyle={`text-[--color-blue] text-[20px] 1xl:text-[16px] md:text-[13px] font-['SFProText-Bold']`}
            text={text1}
          />
        </div>
        <div className="mt-[32px]">
          <Paragraph
            customStyle={`text-[--color-blue] text-[16px] 1xl:text-[14px] md:text-[13px]`}
            text={text2}
          />
        </div>
      </div>
    </>
  );
};

export default SharedBgColorsTextTitle;
