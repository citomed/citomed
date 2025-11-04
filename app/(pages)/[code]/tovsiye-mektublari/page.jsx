import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Recommendation from "@/app/(components)/Pages/Recommendation/Recommendation";

const getData = async (params) => {
  const recommendation = await fetchData(params?.code, "recommendation");
  const translate = await fetchTranslations(params?.code);
  const recommendation_tr = translate?.recommendation;
  return { recommendation, translate, recommendation_tr };
};

export async function generateMetadata({ params }) {
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;
  const { recommendation_tr } = await getData(params);

  return {
    title: `${data?.title} - ${recommendation_tr}`,
    description: data?.description,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${recommendation_tr}`,
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
  const { translate, recommendation } = await getData(params);
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <Recommendation
        tr_recommendation={translate?.recommendation}
        recommendation_long={translate?.recommendation_long}
        data={recommendation}
        see_more={translate?.see_more}
      />
       <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
