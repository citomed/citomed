import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import NewItem from "@/app/(components)/Pages/News/NewItem";

const getData = async (params) => {
  const news_slug = await fetchData(
    params?.code,
    `news/${params?.id}/${params?.slug}`
  );
  const translate = await fetchTranslations(params?.code);
  return { news_slug, translate };
};

export async function generateMetadata({ params }) {
  const { news_slug } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${news_slug?.item?.cover}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;
  const stripHTML = (html) => html?.replace(/<[^>]*>/g, "").trim();
  return {
    title: `${data?.title} - ${news_slug?.item?.name}`,
    description: news_slug?.item?.text,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${news_slug?.item?.name}`,
      description: news_slug?.item?.text,
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
  const { translate, news_slug } = await getData(params);
  return (
    <>
      <Header translate={translate} params={params?.code} />
      <NewItem
        data={news_slug?.item}
        similar_news={translate?.similar_news}
        instagram={news_slug?.instagram}
        random_data={news_slug?.random_news}
        params={params?.code}
        single_images={news_slug?.images}
      />
      <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
