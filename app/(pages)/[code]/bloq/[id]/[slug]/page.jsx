import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import BlogItem from "@/app/(components)/Pages/Blog/BlogItem";
import { generateKeywordsFromWords } from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code, id, slug) => {
  const blogs_slug = await fetchData(code, `blogs/${id}/${slug}`);
  const translate = await fetchTranslations(code);
  return { blogs_slug, translate };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { blogs_slug } = await getData(code);
    const data = await fetchData(code, "settings");
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${blogs_slug?.item?.cover}`;
    const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(blogs_slug?.item?.text);

    return {
      title: `${data?.title} - ${blogs_slug?.item?.name}`,
      description: blogs_slug?.item?.text,
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${data?.title} - ${blogs_slug?.item?.name}`,
        description: blogs_slug?.item?.text,
        keywords: generatedKeywords,
        url: `${baseUrl}/${code}`,
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
  const { code, id, slug } = await params;
  const { translate, blogs_slug } = await getData(code, id, slug);
  return (
    <>
      <Header translate={translate} params={code} />
      <BlogItem
        params={code}
        instagram={blogs_slug?.instagram}
        data={blogs_slug?.item}
        similar_blogs={translate?.similar_blogs}
        single_images={blogs_slug?.images}
      />
      <Footer params={code} reserved={translate?.reserved} />
    </>
  );
}
