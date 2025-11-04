import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Services from "@/app/(components)/Pages/Services/Services";

const getData = async (params) => {
  const translate = await fetchTranslations(params?.code);
  const category = await fetchData(params?.code, "category");
  const services_tr = translate?.services;
  const services_long = translate?.services_long;
  return { translate, category, services_tr, services_long };
};

export async function generateMetadata({ params }) {
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;
  const { services_tr, services_long } = await getData(params);
  const stripHTML = (html) => html?.replace(/<[^>]*>/g, "").trim();
  return {
    title: `${data?.title} - ${services_tr}`,
    description: stripHTML(services_long),
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${services_tr}`,
      description: stripHTML(services_long),
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
  const { translate, category } = await getData(params);
  return (
    <>
      <Header translate={translate} params={params?.code} />
      <Services
        category={category}
        tr_services={translate?.services}
        services_long={translate?.services_long}
        params={params?.code}
        read_more={translate?.read_more}
      />
      <Footer
        params={params?.code}
        reserved={translate?.reserved}
        footer_card_1={translate?.section_3_text_1}
        footer_card_2={translate?.section_3_text_2}
        footer_card_3={translate?.footer_card3}
        linkName={"chekcups"}
      />
    </>
  );
}
