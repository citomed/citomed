import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import BlogItem from "@/app/(components)/Pages/Blog/BlogItem";

const getData = async (params) => {
  const blogs_slug = await fetchData(
    params?.code,
    `blogs/${params?.id}/${params?.slug}`
  );
  const translate = await fetchTranslations(params?.code);
  return { blogs_slug, translate };
};

export async function generateMetadata({ params }) {
  const { blogs_slug } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${blogs_slug?.item?.cover}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;
  const stripHTML = (html) => html?.replace(/<[^>]*>/g, "").trim();
  return {
    title: `${data?.title} - ${blogs_slug?.item?.name}`,
    description: blogs_slug?.item?.text,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${blogs_slug?.item?.name}`,
      description: blogs_slug?.item?.text,
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
  const { translate, blogs_slug } = await getData(params);
  return (
    <>
      <Header translate={translate} params={params?.code} />
      <BlogItem
        params={params?.code}
        instagram={blogs_slug?.instagram}
        data={blogs_slug?.item}
        similar_blogs={translate?.similar_blogs}
        single_images={blogs_slug?.images}
      />
      <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
