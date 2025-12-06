import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Leaders from "@/app/(components)/Pages/Leaders/Leaders";
import { generateKeywordsFromWords } from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code) => {
  const leaders = await fetchData(code, "leaders");
  const settings = await fetchData(code, "settings");
  const translate = await fetchTranslations(code);
  const leaders_address = translate?.leaders_address;
  return { leaders, translate, leaders_address, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { leaders_address, settings } = await getData(code);
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(settings?.description);

    return {
      title: `${settings?.title} - ${leaders_address}`,
      description: settings?.description,
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${leaders_address}`,
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
  const { leaders, translate } = await getData(code);
  return (
    <>
      <Header params={code} translate={translate} />
      <Leaders
        leaders_address={translate?.leaders_address}
        sincerely={translate?.sincerely}
        leaders={leaders}
        leaders_name={translate?.leaders_name}
        citomed_head={translate?.citomed_head}
      />
      <Footer params={code} reserved={translate?.reserved} />
    </>
  );
}
