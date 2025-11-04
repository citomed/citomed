import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import LabSingle from "@/app/(components)/Pages/LaboratoryTests/LabSingle";

const getData = async (params) => {
  const data_labs = await fetchData(
    params?.code,
    `lab/${params?.id}/${params?.slug}`
  );
  const translate = await fetchTranslations(params?.code);
  const head_title = data_labs?.parent_laboratory_title;
  const head_title2 = data_labs?.parent_laboratory_text;

  return { data_labs, translate, head_title, head_title2 };
};

export async function generateMetadata({ params }) {
  const { head_title, head_title2 } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;
  const stripHTML = (html) => html?.replace(/<[^>]*>/g, "").trim();
  return {
    title: `${data?.title} - ${head_title}`,
    description: stripHTML(head_title2),
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${head_title}`,
      description: stripHTML(head_title2),
      url: baseUrl,
      siteName: `${process.env.NEXT_PUBLIC_FAKE_DOMEN_2}`,
      images: [
        {
          url: logoUrl, // Dinamik logo URL-i
          secure_url: logoUrl, // Dinamik logo URL-i
          width: 600,
          height: 600,
        },
      ],
    },
  };
}

export default async function page({ params }) {
  const { translate, data_labs } = await getData(params);
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <LabSingle
        data_labs={data_labs}
        params={params?.code}
        head_title={data_labs?.parent_laboratory_title}
        head_title2={data_labs?.parent_laboratory_text}
        data={data_labs?.data}
        valyuta={translate?.valyuta}
        added={translate?.added_to_card}
        add={translate?.add_to_card}
      />
      <Footer
        reserved={translate?.reserved}
        params={params?.code}
        footer_card_1={translate?.section_3_text_1}
        footer_card_2={translate?.section_3_text_2}
        footer_card_3={translate?.checkup}
        slug={`lab/${params?.id}/${params?.slug}`}
        linkName={"chekcups"}
        special_bg="bg-[--bg-red]"
      />
    </>
  );
}
