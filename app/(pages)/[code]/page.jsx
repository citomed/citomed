import {
  fetchData,
  fetchData2,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import HomePage from "@/app/(components)/Pages/Home/HomePage";
import Popup from "@/app/(components)/Popup/Popup";

const getData = async (params) => {
  const main = await fetchData(params?.code, "main_page");
  const home_sections = await fetchData2("home_sections");
  const popup = await fetchData(params?.code, "popup");
  const settings = await fetchData(params?.code, "settings");
  const translate = await fetchTranslations(params?.code);
  const translate_home_page = translate?.home_page;
  return {
    main,
    popup,
    translate,
    translate_home_page,
    settings,
    home_sections,
  };
};

export async function generateMetadata({ params }) {
  const data = await fetchData(params?.code, "settings");
  const { translate_home_page } = await getData(params);
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;

  return {
    title: `${data?.title} - ${translate_home_page}`,
    description: data?.description,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${translate_home_page}`,
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
  const { main, translate, popup, settings, home_sections } = await getData(
    params
  );
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <HomePage
        params={params?.code}
        data_sldier={main?.slayder}
        data_doctots={main?.doctors}
        data_insatgram={main?.banners}
        data_services_cats={main?.xidmet_cats}
        data_translate={translate}
        home_doctor_text_1={translate?.home_doctor_text_1}
        home_doctor_text_2={translate?.home_doctor_text_2}
        all_btn={translate?.all}
        data_xestelikler={main?.xestelikler}
        home_sections={home_sections}
      />
      <Footer
        settings={settings}
        params={params?.code}
        reserved={translate?.reserved}
      />
      <Popup data={popup} read_more={translate?.read_more} />
    </>
  );
}
