import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import News from "@/app/(components)/Pages/News/News";

const getData = async (params) => {
  const news = await fetchData(params?.code, "news");
  const translate = await fetchTranslations(params?.code);
  const tr_news = translate?.news;
  const news_long = translate?.news_long;
  return { news, translate, tr_news, news_long };
};

export async function generateMetadata({ params }) {
  const { tr_news, news_long } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;

  return {
    title: `${data?.title} - ${tr_news}`,
    description: news_long,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${tr_news}`,
      description: news_long,
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
  const { translate, news } = await getData(params);
  return (
    <>
      <Header translate={translate} params={params?.code} />
      <News
        params={params?.code}
        tr_news={translate?.news}
        news_long={translate?.news_long}
        data={news?.data}
        readMore={translate?.read_more}
        not_found_news={translate?.not_found_news}
      />
      <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
