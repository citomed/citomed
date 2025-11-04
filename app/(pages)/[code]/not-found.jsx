import FlexCenter from "@/app/(components)/ChildComponent/FlexCenter/FlexCenter";
import Main from "@/app/(components)/ChildComponent/Main/Main";
import Max1200 from "@/app/(components)/ChildComponent/Max1200/Max1200";
import Section from "@/app/(components)/ChildComponent/Section/Section";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import SharedLink from "@/app/(components)/Shared/Link/SharedLink";
import H2Text from "@/app/(components)/Shared/Texts/H2Text";
import Image from "next/image";

const NotFound = ({ params }) => {
  return (
    <>
      <Header />
      <Main>
        <Section ngClass="min-h-[70vh]">
          <Max1200 customClass="min-h-[70vh]">
            <FlexCenter customClass={`flex-col  `}>
              <H2Text
                text={`Səhifə tapılmadı`}
                customStyle={`text-[--color-blue] text-[26px] font-['SFProText-Bold'] mb-[80px]`}
              />
              <Image
                width={384}
                height={275}
                alt="not_found"
                src={`/404.png`}
              />
              <SharedLink
                href={`/az`}
                text={`Əsas Səhifə`}
                customStyle={`flex items-center bg-[--bg-55] mt-[80px] gap-[12px]  rounded-[60px] px-[47px] py-[17.5px]`}
                src="/right.svg"
                customImgClass="filter1"
                h2Class="text-[16px] text-[--color-blue]"
              />
            </FlexCenter>
          </Max1200>
        </Section>
      </Main>
      <Footer params={params?.code} />
    </>
  );
};

export default NotFound;
