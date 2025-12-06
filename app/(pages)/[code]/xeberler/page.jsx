import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import News from "@/app/(components)/Pages/News/News";

const getData = async (code) => {
  const news = await fetchData(code, "news");
  const settings = await fetchData(code, "settings");
  const translate = await fetchTranslations(code);
  const tr_news = translate?.news;
  const news_long = translate?.news_long;
  return { news, translate, tr_news, news_long, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { tr_news, news_long, settings } = await getData(code);
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(news_long);

    return {
      title: `${settings?.title} - ${tr_news}`,
      description: news_long,
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${tr_news}`,
        description: news_long,
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
  const { translate, news } = await getData(code);
  return (
    <>
      <Header translate={translate} params={code} />
      <News
        params={code}
        tr_news={translate?.news}
        news_long={translate?.news_long}
        data={news?.data}
        readMore={translate?.read_more}
        not_found_news={translate?.not_found_news}
      />
      <Footer params={code} reserved={translate?.reserved} />
    </>
  );
}
