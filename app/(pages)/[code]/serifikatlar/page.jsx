import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Certificats from "@/app/(components)/Pages/Certificats/Certificats";

const getData = async (params) => {
  const certificats = await fetchData(params?.code, "certificats");
  const translate = await fetchTranslations(params?.code);
  const certificates_tr = translate?.certificates;
  return { certificats, translate, certificates_tr };
};

export async function generateMetadata({ params }) {
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;
  const { certificates_tr } = await getData(params);

  return {
    title: `${data?.title} - ${certificates_tr}`,
    description: data?.description,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${certificates_tr}`,
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
  const { translate, certificats } = await getData(params);
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <Certificats
        text_certificates={translate?.certificates}
        certificates_long={translate?.certificates_long}
        data={certificats}
        see_more={translate?.see_more}
        certificats_success={translate?.certificats_success}
      />
    <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
