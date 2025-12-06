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
import {
  generateKeywordsFromWords,
  stripHTML,
} from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";
import H2Text from "@/app/(components)/Shared/Texts/H2Text";
import Image from "next/image";

const getData = async (params) => {
  const main = await fetchData(params?.code, "main_page");
  const popup = await fetchData(params?.code, "popup");
  const settings = await fetchData(params?.code, "settings");
  const translate = await fetchTranslations(params?.code);
  const page_not_found = translate?.page_not_found;
  const home_page = translate?.home_page;
  return { main, popup, translate, page_not_found, home_page, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { page_not_found, meta_description, settings } = await getData(code);

    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;

    const generatedKeywords = generateKeywordsFromWords(meta_description);

    return {
      title: `${settings?.title} - ${page_not_found}`,
      description: settings?.description,
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${page_not_found}`,
        description: settings?.description,
        keywords: generatedKeywords,
        url: `${baseUrl}`,
        siteName: `${process.env.NEXT_PUBLIC_FAKE_DOMEN_2}`,
        type: "website",
        image: logoUrl,
        images: [
          {
            url: logoUrl,
            secure_url: logoUrl,
            width: 600,
            height: 600,
            type: "image/png",
            alt: data?.title,
          },
        ],
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}

export default async function page({ params }) {
  const { code } = await params;
  const { translate, page_not_found, home_page } = await getData(code);
  return (
    <>
      <Header params={code} translate={translate} />
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
                href={`/${code}`}
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
      <Footer params={code} reserved={translate?.reserved} />
    </>
  );
}
