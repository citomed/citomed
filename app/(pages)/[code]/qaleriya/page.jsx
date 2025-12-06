import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Galllery from "@/app/(components)/Pages/Gallery/Galllery";
import { generateKeywordsFromWords } from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code) => {
  const data = await fetchData(code, "gallery");
  const translate = await fetchTranslations(code);
  const settings = await fetchData(code, "settings");
  const media_center = translate?.media_center;
  const media_center_long = translate?.media_center_long;
  return { data, translate, media_center, media_center_long, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { media_center, media_center_long, settings } = await getData(code);
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(media_center_long);

    return {
      title: `${settings?.title} - ${media_center}`,
      description: media_center_long,
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${media_center}`,
        description: media_center_long,
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
  const { translate, data } = await getData(code);
  return (
    <>
      <Header translate={translate} params={code} />
      <Galllery
        data={data}
        media_center={translate?.media_center}
        media_center_long={translate?.media_center_long}
        tr_gallery={translate?.gallery}
        for_kiv={translate?.for_kiv}
      />
      <Footer params={code} reserved={translate?.reserved} />
    </>
  );
}
