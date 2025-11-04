import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Blog from "@/app/(components)/Pages/Blog/Blog";

const getData = async (params) => {
  const blogs = await fetchData(params?.code, "blogs");
  const translate = await fetchTranslations(params?.code);
  const tr_blogs = translate?.blogs;
  const tr_blogs_long = translate?.blogs_long;
  return { blogs, translate, tr_blogs, tr_blogs_long };
};

export async function generateMetadata({ params }) {
  const { tr_blogs, tr_blogs_long } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;

  return {
    title: `${data?.title} - ${tr_blogs}`,
    description: tr_blogs_long,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${tr_blogs}`,
      description: tr_blogs_long,
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
  const { translate, blogs } = await getData(params);
  return (
    <>
      <Header translate={translate} params={params?.code} />
      <Blog
        tr_blogs={translate?.blogs}
        tr_blogs_long={translate?.blogs_long}
        data={blogs?.data}
        params={params?.code}
        read_more={translate?.read_more}
        not_found_blog={translate?.not_found_blog}
      />
      <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
