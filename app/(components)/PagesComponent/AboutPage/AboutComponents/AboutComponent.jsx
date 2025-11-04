import Paragraph from "@/app/(components)/Shared/Paragraph/Paragraph";
import H2Text from "@/app/(components)/Shared/Texts/H2Text";

const AboutComponent = ({ item, customStyle }) => {
  return (
    <>
      <li
        className={`col-span-4 lg:col-span-6 md:col-span-12 flex div_transition hover:scale-105 items-center justify-between h-full flex-col text-center  p-[32px] md:p-[20px] rounded-[10px] ${customStyle}`}
      >
        <div className="grid grid-cols-12">
          <div className="col-span-12 min-h-[100px] md:min-h-[40px]">
            <H2Text
              customStyle={`font-[600] text-[24px] md:text-[18px] mb-[32px] text-[--color-blue]  h-full `}
              text={item?.text}
            />
          </div>
          <div className="col-span-12">
            <Paragraph
              customStyle={`text-[14px] md:text-[12px] text-[--color-blue]`}
              text={item?.title}
            />
          </div>
        </div>
      </li>
    </>
  );
};

export default AboutComponent;
