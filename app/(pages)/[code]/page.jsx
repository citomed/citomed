import {
  fetchData,
  fetchData2,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import HomePage from "@/app/(components)/Pages/Home/HomePage";
import Popup from "@/app/(components)/Popup/Popup";
import { generateKeywordsFromWords } from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code) => {
  const main = await fetchData(code, "main_page");
  const home_sections = await fetchData2("home_sections");
  const popup = await fetchData(code, "popup");
  const settings = await fetchData(code, "settings");
  const translate = await fetchTranslations(code);
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
  try {
    const { code } = await params;
    const { translate_home_page, settings } = await getData(code);
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(settings?.description);

    return {
      title: `${settings?.title} - ${translate_home_page}`,
      description: settings?.description,
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${translate_home_page}`,
        description: settings?.description,
        keywords: generatedKeywords,
        url: `${baseUrl}`,
        siteName: `${baseUrl}`,
        type: "website",
        image: logoUrl,
        images: [
          {
            url: logoUrl,
            secure_url: logoUrl,
            width: 100,
            height: 60,
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
  const { main, translate, popup, settings, home_sections } = await getData(
    code
  );
  return (
    <>
      <Header params={code} translate={translate} />
      <HomePage
        params={code}
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
        params={code}
        reserved={translate?.reserved}
      />
      <Popup data={popup} read_more={translate?.read_more} />
    </>
  );
}
