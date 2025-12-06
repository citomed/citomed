import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import PrivarteServices from "@/app/(components)/Pages/PrivateServices/PrivarteServices";
import {
  generateKeywordsFromWords,
  stripHTML,
} from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code) => {
  const private_services = await fetchData(code, "private_services");
  const settings = await fetchData(code, "settings");
  const translate = await fetchTranslations(code);
  const privateservives = translate?.privateservives;
  const privateservives_long = translate?.privateservives_long;
  return {
    private_services,
    translate,
    privateservives,
    privateservives_long,
    settings,
  };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { settings, privateservives, privateservives_long } = await getData(
      code
    );
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(privateservives_long);

    return {
      title: `${settings?.title} - ${privateservives}`,
      description: stripHTML(privateservives_long),
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${privateservives}`,
        description: stripHTML(privateservives_long),
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
  const { private_services, translate } = await getData(code);
  return (
    <>
      <Header params={code} translate={translate} />
      <PrivarteServices
        privateservives={translate?.privateservives}
        privateservives_long={translate?.privateservives_long}
        data={private_services}
        params={code}
        read_more={translate?.read_more}
      />
      <Footer
        reserved={translate?.reserved}
        footer_card_1={translate?.footer_card_1}
        footer_card_2={translate?.footer_card_2}
        footer_card_3={translate?.footer_card_3}
        linkName="chekcups"
        params={code}
      />
    </>
  );
}
