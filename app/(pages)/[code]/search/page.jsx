import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";

import SearchsPage from "@/app/(components)/Pages/SearchsPage/SearchsPage";

const getData = async (params) => {
  const translate = await fetchTranslations(params?.code);
  const search_page_title = translate?.search_page_title;
  return { translate, search_page_title };
};

export async function generateMetadata({ params }) {
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;
  const { search_page_title } = await getData(params);

  return {
    title: `${data?.title} - ${search_page_title}`,
    description: data?.description,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${search_page_title}`,
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
  const { translate } = await getData(params);
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <SearchsPage
        params={params?.code}
        found_search_1={translate?.found_search_1}
        found_search_2={translate?.found_search_2}
      />
       <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
