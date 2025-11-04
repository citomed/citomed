import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Galllery from "@/app/(components)/Pages/Gallery/Galllery";

const getData = async (params) => {
  const data = await fetchData(params?.code, "gallery");
  const translate = await fetchTranslations(params?.code);
  const media_center = translate?.media_center;
  const media_center_long = translate?.media_center_long;
  return { data, translate, media_center, media_center_long };
};

export async function generateMetadata({ params }) {
  const { media_center, media_center_long } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;

  return {
    title: `${data?.title} - ${media_center}`,
    description: media_center_long,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${media_center}`,
      description: media_center_long,
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
  const { translate, data } = await getData(params);
  return (
    <>
      <Header translate={translate} params={params?.code} />
      <Galllery
        data={data}
        media_center={translate?.media_center}
        media_center_long={translate?.media_center_long}
        tr_gallery={translate?.gallery}
        for_kiv={translate?.for_kiv}
      />
      <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
