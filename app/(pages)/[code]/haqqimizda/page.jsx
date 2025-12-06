import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import AboutPage from "@/app/(components)/Pages/About/AboutPage";
import { generateKeywordsFromWords } from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code) => {
  const data_about = await fetchData(code, "about_page");
  const settings = await fetchData(code, "settings");
  const translate = await fetchTranslations(code);
  const about_page_tr = translate?.about_page;
  return { data_about, translate, about_page_tr, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { about_page_tr, settings } = await getData(code);
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(settings?.description);

    return {
      title: `${settings?.title} - ${about_page_tr}`,
      description: settings?.description,
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${about_page_tr}`,
        description: settings?.description,
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
  const { data_about, translate } = await getData(code);

  return (
    <>
      <Header params={code} translate={translate} />
      <AboutPage
        our_goal={translate?.our_goal}
        out_values={translate?.values}
        data={data_about}
      />
      <Footer params={code} reserved={translate?.reserved} />
    </>
  );
}
