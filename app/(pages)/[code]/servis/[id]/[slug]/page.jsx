import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Outpatient from "@/app/(components)/Pages/Outpatient/Outpatient";
import {
  generateKeywordsFromWords,
  stripHTML,
} from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (params) => {
  const translate = await fetchTranslations(params?.code);
  const category = await fetchData(
    params?.code,
    `s/cats/${params?.id}/${params?.slug}`
  );
  const settings = await fetchData(params?.code, "settings");

  return { translate, category, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { category, settings } = await getData(params);
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(category?.parent_text);

    return {
      title: `${settings?.title} - ${category?.parent_title}`,
      description: stripHTML(category?.parent_text),
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${category?.parent_title}`,
        description: stripHTML(category?.parent_text),
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
  const { translate, category, meta_title } = await getData(params);
  return (
    <>
      <Header translate={translate} params={params?.code} />
      <Outpatient
        bir={meta_title}
        params={params?.code}
        all_data={category}
        noData={translate?.noData}
        see_more={translate?.see_more}
      />
      <Footer
        reserved={translate?.reserved}
        params={params?.code}
        footer_card_1={translate?.section_3_text_1}
        footer_card_2={translate?.section_3_text_2}
        footer_card_3={translate?.footer_card3}
        linkName={"chekcups"}
        slug={`servis/${params?.id}/${params?.slug}`}
      />
    </>
  );
}
