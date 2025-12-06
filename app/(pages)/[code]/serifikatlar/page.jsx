import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Certificats from "@/app/(components)/Pages/Certificats/Certificats";
import { generateKeywordsFromWords } from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code) => {
  const certificats = await fetchData(code, "certificats");
  const settings = await fetchData(code, "settings");
  const translate = await fetchTranslations(code);
  const certificates_tr = translate?.certificates;
  return { certificats, translate, certificates_tr, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { certificates_tr, settings } = await getData(code);
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(settings?.description);

    return {
      title: `${settings?.title} - ${certificates_tr}`,
      description: settings?.description,
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${certificates_tr}`,
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
  const { translate, certificats } = await getData(code);
  return (
    <>
      <Header params={code} translate={translate} />
      <Certificats
        text_certificates={translate?.certificates}
        certificates_long={translate?.certificates_long}
        data={certificats}
        see_more={translate?.see_more}
        certificats_success={translate?.certificats_success}
      />
      <Footer params={code} reserved={translate?.reserved} />
    </>
  );
}
