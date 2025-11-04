import FlexCenter from "@/app/(components)/ChildComponent/FlexCenter/FlexCenter";
import Main from "@/app/(components)/ChildComponent/Main/Main";
import Max1200 from "@/app/(components)/ChildComponent/Max1200/Max1200";
import Section from "@/app/(components)/ChildComponent/Section/Section";
import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import SharedLink from "@/app/(components)/Shared/Link/SharedLink";
import H2Text from "@/app/(components)/Shared/Texts/H2Text";
import Image from "next/image";

const getData = async (params) => {
  const main = await fetchData(params?.code, "main_page");
  const popup = await fetchData(params?.code, "popup");
  const translate = await fetchTranslations(params?.code);
  const page_not_found = translate?.page_not_found;
  const home_page = translate?.home_page;
  return { main, popup, translate, page_not_found, home_page };
};

export async function generateMetadata({ params }) {
  const data = await fetchData(params?.code, "settings");
  const { page_not_found } = await getData(params);
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;

  return {
    title: `${data?.title} - ${page_not_found}`,
    description: data?.description,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${page_not_found}`,
      description: data?.meta_description,
      url: baseUrl,
      siteName: `${process.env.NEXT_PUBLIC_FAKE_DOMEN_2}`,
      images: [
        {
          url: logoUrl, // Dinamik logo URL-i
          secure_url: logoUrl, // Dinamik logo URL-i
          width: 600,
          height: 600,
        },
      ],
    },
  };
}

export default async function page({ params }) {
  const { translate, page_not_found, home_page } = await getData(params);
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <Main>
        <Section ngClass="min-h-[70vh]">
          <Max1200 customClass="min-h-[70vh]">
            <FlexCenter customClass={`flex-col  `}>
              <H2Text
                text={page_not_found}
                customStyle={`text-[--color-blue] text-[26px] font-['SFProText-Bold'] mb-[80px]`}
              />
              <Image
                width={384}
                height={275}
                alt="not_found"
                src={`/404.png`}
              />
              <SharedLink
                href={`/${params?.code}`}
                text={home_page}
                customStyle={`flex items-center bg-[--bg-55] mt-[80px] gap-[12px]  rounded-[60px] px-[47px] py-[17.5px]`}
                src="/right.svg"
                customImgClass="filter1"
                h2Class="text-[16px] text-[--color-blue]"
              />
            </FlexCenter>
          </Max1200>
        </Section>
      </Main>
      <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
