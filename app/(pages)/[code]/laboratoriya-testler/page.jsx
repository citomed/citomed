import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import LaboratoryTests from "@/app/(components)/Pages/LaboratoryTests/LaboratoryTests";
import { generateKeywordsFromWords } from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code) => {
  const data = await fetchData(code, "laboratory_tests");
  const settings = await fetchData(code, "settings");
  const translate = await fetchTranslations(code);
  const laboratory_tests = translate?.laboratory_tests;
  const laboratory_tests_long = translate?.laboratory_tests_long;
  return { data, translate, laboratory_tests, laboratory_tests_long, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { settings, laboratory_tests, laboratory_tests_long } = await getData(
      code
    );
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(laboratory_tests_long);

    return {
      title: `${settings?.title} - ${laboratory_tests}`,
      description: laboratory_tests_long,
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${laboratory_tests}`,
        description: laboratory_tests_long,
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
            alt: settings?.title,
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
  const { translate, data } = await getData(code);
  return (
    <>
      <Header params={code} translate={translate} />
      <LaboratoryTests
        laboratory_tests={translate?.laboratory_tests}
        laboratory_tests_long={translate?.laboratory_tests_long}
        params={code}
        data={data?.data}
        see_more={translate?.see_more}
      />
      <Footer
        params={code}
        reserved={translate?.reserved}
        footer_card_1={translate?.footer_card_1}
        footer_card_2={translate?.footer_card_2}
        footer_card_3={translate?.checkup}
        linkName="chekcups"
        special_bg="bg-[--bg-red]"
      />
    </>
  );
}
