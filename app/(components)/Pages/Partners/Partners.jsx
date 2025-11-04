import Image from "next/image";
import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import Main from "../../ChildComponent/Main/Main";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import Section from "../../ChildComponent/Section/Section";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import H2Text from "../../Shared/Texts/H2Text";
import Link from "next/link";

const Partners = ({ partners_long, tr_partners, data }) => {
  return (
    <Main>
      <Section ngClass="mb-[80px] min-h-[65vh] md:min-h-max md:px-[10px]">
        <Max1200>
          <FlexCenter customClass={`flex-col`}>
            <H2Text
              text={tr_partners}
              customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
            />
            <Paragraph
              customStyle={`text-[16px] md:text-[14px] text-[--color-5b] mt-[24px] md:mt-[10px] text-center w-[50%] lg:w-full`}
              text={partners_long}
            />
            <div className="w-full mt-[80px] md:mt-[40px]">
              <ul className="grid grid-cols-12 gap-[24px] w-full">
                {data &&
                  data.map((item, i) => (
                    <li key={i} className="col-span-3 xl:col-span-4 lg:col-span-6 md:col-span-12">
                      {item?.link ? (
                        <Link
                          href={item.link}
                          target="_blank"
                          className="flex items-center justify-center border border-[--bg-b4] rounded-[10px] p-[40px]"
                        >
                          <Image
                            width={196}
                            height={100}
                            alt={item?.id}
                            src={`${process.env.NEXT_PUBLIC_PICTURE}/${item?.image}`}
                          />
                        </Link>
                      ) : (
                        <div className="flex items-center justify-center border border-[--bg-b4] rounded-[10px] p-[40px]">
                          <Image
                            width={196}
                            height={100}
                            alt={item?.id}
                            src={`${process.env.NEXT_PUBLIC_PICTURE}/${item?.image}`}
                          />
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </FlexCenter>
        </Max1200>
      </Section>
    </Main>
  );
};

export default Partners;
