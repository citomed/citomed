import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import LabSingle from "@/app/(components)/Pages/LaboratoryTests/LabSingle";
import {
  generateKeywordsFromWords,
  stripHTML,
} from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code, id, slug) => {
  const data_labs = await fetchData(code, `lab/${id}/${slug}`);
  const settings = await fetchData(code, "settings");
  const translate = await fetchTranslations(code);
  const head_title = data_labs?.parent_laboratory_title;
  const head_title2 = data_labs?.parent_laboratory_text;

  return { data_labs, translate, head_title, head_title2, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { head_title, head_title2, settings } = await getData(code);
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${data_docs?.data?.file}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(head_title2);

    return {
      title: `${settings?.title} - ${head_title}`,
      description: stripHTML(head_title2),
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${head_title}`,
        description: stripHTML(head_title2),
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
  const { code, id, slug } = await params;
  const { translate, data_labs } = await getData(code, id, slug);
  return (
    <>
      <Header params={code} translate={translate} />
      <LabSingle
        data_labs={data_labs}
        params={code}
        head_title={data_labs?.parent_laboratory_title}
        head_title2={data_labs?.parent_laboratory_text}
        data={data_labs?.data}
        valyuta={translate?.valyuta}
        added={translate?.added_to_card}
        add={translate?.add_to_card}
      />
      <Footer
        reserved={translate?.reserved}
        params={code}
        footer_card_1={translate?.section_3_text_1}
        footer_card_2={translate?.section_3_text_2}
        footer_card_3={translate?.checkup}
        slug={`lab/${id}/${slug}`}
        linkName={"chekcups"}
        special_bg="bg-[--bg-red]"
      />
    </>
  );
}
