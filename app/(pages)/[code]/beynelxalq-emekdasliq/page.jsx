import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import International from "@/app/(components)/Pages/International/International";

const getData = async (params) => {
  const international = await fetchData(params?.code, "international");
  const translate = await fetchTranslations(params?.code);
  const meta_title = international?.data?.title;
  const meta_description = international?.data?.text1;
  return { international, translate, meta_title, meta_description };
};

export async function generateMetadata({ params }) {
  const { meta_title, meta_description } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;
  const stripHTML = (html) => html?.replace(/<[^>]*>/g, "").trim();
  return {
    title: `${data?.title} - ${meta_title}`,
    description: stripHTML(meta_description),
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${meta_title}`,
      description: stripHTML(meta_description),
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
  const { translate, international } = await getData(params);
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <International data={international?.data} />
      <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
