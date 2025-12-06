import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import NewItem from "@/app/(components)/Pages/News/NewItem";
import { generateKeywordsFromWords } from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code, id, slug) => {
  const news_slug = await fetchData(code, `news/${id}/${slug}`);
  const settings = await fetchData(code, "settings");
  const translate = await fetchTranslations(code);
  return { news_slug, translate, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { news_slug, settings } = await getData(code);
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(news_slug?.item?.text);

    return {
      title: `${settings?.title} - ${news_slug?.item?.name}`,
      description: news_slug?.item?.text,
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${news_slug?.item?.name}`,
        description: news_slug?.item?.text,
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
  const { code, id, slug } = await params;
  const { translate, news_slug } = await getData(code, id, slug);
  return (
    <>
      <Header translate={translate} params={code} />
      <NewItem
        data={news_slug?.item}
        similar_news={translate?.similar_news}
        instagram={news_slug?.instagram}
        random_data={news_slug?.random_news}
        params={code}
        single_images={news_slug?.images}
      />
      <Footer params={code} reserved={translate?.reserved} />
    </>
  );
}
