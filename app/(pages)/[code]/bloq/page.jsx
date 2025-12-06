import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Blog from "@/app/(components)/Pages/Blog/Blog";

const getData = async (code) => {
  const blogs = await fetchData(code, "blogs");
  const translate = await fetchTranslations(code);
  const settings = await fetchData(params?.code, "settings");
  const tr_blogs = translate?.blogs;
  const tr_blogs_long = translate?.blogs_long;
  return { blogs, translate, tr_blogs, tr_blogs_long, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { tr_blogs, tr_blogs_long, settings } = await getData(code);

    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;

    const generatedKeywords = generateKeywordsFromWords(tr_blogs_long);

    return {
      title: `${settings?.title} - ${tr_blogs}`,
      description: tr_blogs_long,
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${tr_blogs}`,
        description: tr_blogs_long,
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
  const { translate, blogs } = await getData(code);
  return (
    <>
      <Header translate={translate} params={code} />
      <Blog
        tr_blogs={translate?.blogs}
        tr_blogs_long={translate?.blogs_long}
        data={blogs?.data}
        params={code}
        read_more={translate?.read_more}
        not_found_blog={translate?.not_found_blog}
      />
      <Footer params={code} reserved={translate?.reserved} />
    </>
  );
}
