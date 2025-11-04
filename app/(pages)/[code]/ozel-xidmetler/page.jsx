import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import PrivarteServices from "@/app/(components)/Pages/PrivateServices/PrivarteServices";

const getData = async (params) => {
  const private_services = await fetchData(params?.code, "private_services");
  const translate = await fetchTranslations(params?.code);
  const privateservives = translate?.privateservives;
  const privateservives_long = translate?.privateservives_long;
  return { private_services, translate, privateservives, privateservives_long };
};

export async function generateMetadata({ params }) {
  const { privateservives, privateservives_long } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;

  const stripHTML = (html) => html?.replace(/<[^>]*>/g, "").trim();
  return {
    title: `${data?.title} - ${privateservives}`,
    description: stripHTML(privateservives_long),
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${privateservives}`,
      description: stripHTML(privateservives_long),
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
  const { private_services, translate } = await getData(params);
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <PrivarteServices
        privateservives={translate?.privateservives}
        privateservives_long={translate?.privateservives_long}
        data={private_services}
        params={params?.code}
        read_more={translate?.read_more}
      />
      <Footer
        reserved={translate?.reserved}
        footer_card_1={translate?.footer_card_1}
        footer_card_2={translate?.footer_card_2}
        footer_card_3={translate?.footer_card_3}
        linkName="chekcups"
        params={params?.code}
      />
    </>
  );
}
