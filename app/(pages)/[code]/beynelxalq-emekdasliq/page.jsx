import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import International from "@/app/(components)/Pages/International/International";
import {
  generateKeywordsFromWords,
  stripHTML,
} from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code) => {
  const international = await fetchData(code, "international");
  const settings = await fetchData(code, "settings");
  const translate = await fetchTranslations(code);
  const meta_title = international?.data?.title;
  const meta_description = international?.data?.text1;
  return { international, translate, meta_title, meta_description, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { meta_title, meta_description, settings } = await getData(code);

    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;

    const generatedKeywords = generateKeywordsFromWords(meta_description);

    return {
      title: `${settings?.title} - ${meta_title}`,
      description: stripHTML(meta_description),
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${meta_title}`,
        description: stripHTML(meta_description),
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
            alt: data?.title,
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
  const { translate, international } = await getData(code);
  return (
    <>
      <Header params={code} translate={translate} />
      <International data={international?.data} />
      <Footer params={code} reserved={translate?.reserved} />
    </>
  );
}
