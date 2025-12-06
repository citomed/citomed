import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Services from "@/app/(components)/Pages/Services/Services";
import {
  generateKeywordsFromWords,
  stripHTML,
} from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code) => {
  const translate = await fetchTranslations(code);
  const category = await fetchData(code, "category");
  const settings = await fetchData(code, "settings");
  const services_tr = translate?.services;
  const services_long = translate?.services_long;
  return { translate, category, services_tr, services_long, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { services_tr, services_long, settings } = await getData(code);
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(settings?.description);

    return {
      title: `${settings?.title} - ${services_tr}`,
      description: stripHTML(services_long),
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${services_tr}`,
        description: stripHTML(services_long),
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
  const { translate, category } = await getData(code);
  return (
    <>
      <Header translate={translate} params={code} />
      <Services
        category={category}
        tr_services={translate?.services}
        services_long={translate?.services_long}
        params={code}
        read_more={translate?.read_more}
      />
      <Footer
        params={code}
        reserved={translate?.reserved}
        footer_card_1={translate?.section_3_text_1}
        footer_card_2={translate?.section_3_text_2}
        footer_card_3={translate?.footer_card3}
        linkName={"chekcups"}
      />
    </>
  );
}
