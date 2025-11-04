import H2Text from "../Texts/H2Text";
import Paragraph from "../Paragraph/Paragraph";
import Link from "next/link";

const SectionTopTitles = ({
  text1,
  href,
  text2,
  customImgClass,
  text3,
  h2Class,
  sharedClass = "",
  pcustomStyle,
  mb,
}) => {
  return (
    <>
      <div className={`flex flex-col ${mb}`}>
        <div
          className={`flex justify-between items-center  lg:flex-wrap md:flex-col `}
        >
          <H2Text text={text1} customStyle={h2Class} />
          {href && (
            <Link href={href} className={`${sharedClass} md:hidden`}>
              <h3>{text2}</h3>
              <img src="/right.svg" alt="right" className={customImgClass} />
            </Link>
          )}
        </div>
        <div className={`mt-6 `}>
          <Paragraph text={text3} customStyle={pcustomStyle} />
        </div>
      </div>
    </>
  );
};

export default SectionTopTitles;
