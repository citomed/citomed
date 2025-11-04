import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import LaboratoryTests from "@/app/(components)/Pages/LaboratoryTests/LaboratoryTests";

const getData = async (params) => {
  const data = await fetchData(params?.code, "laboratory_tests");
  const translate = await fetchTranslations(params?.code);
  const laboratory_tests = translate?.laboratory_tests;
  const laboratory_tests_long = translate?.laboratory_tests_long;
  return { data, translate, laboratory_tests, laboratory_tests_long };
};

export async function generateMetadata({ params }) {
  const { laboratory_tests, laboratory_tests_long } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;

  return {
    title: `${data?.title} - ${laboratory_tests}`,
    description: laboratory_tests_long,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${laboratory_tests}`,
      description: laboratory_tests_long,
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
  const { translate, data } = await getData(params);
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <LaboratoryTests
        laboratory_tests={translate?.laboratory_tests}
        laboratory_tests_long={translate?.laboratory_tests_long}
        params={params?.code}
        data={data?.data}
        see_more={translate?.see_more}
      />
      <Footer
        params={params?.code}
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
