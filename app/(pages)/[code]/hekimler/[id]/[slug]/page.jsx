import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import DcotorItem from "@/app/(components)/Pages/Doctors/DcotorItem";
import {
  generateKeywordsFromWords,
  stripHTML,
} from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code, id, slug) => {
  const data_docs = await fetchData(code, `doctors/${id}/${slug}`);
  const translate = await fetchTranslations(code);
  const settings = await fetchData(code, "settings");
  return { data_docs, translate, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code, id, slug } = await params;
    const { data_docs, settings } = await getData(code, id, slug);
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${data_docs?.data?.file}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(data_docs?.data?.text1);

    return {
      title: `${settings?.title} - ${data_docs?.data?.title}`,
      description: stripHTML(data_docs?.data?.text1),
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${data_docs?.data?.title}`,
        description: stripHTML(data_docs?.data?.text1),
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
  const { translate, data_docs } = await getData(code, id, slug);
  return (
    <>
      <Header params={code} translate={translate} />
      <DcotorItem
        params={code}
        data={data_docs?.data}
        education={translate?.education}
        treatment_directions={translate?.treatment_directions}
        doctor_reduqest={translate?.doctor_reduqest}
        data_doctors_random={data_docs?.doctors}
        other_doctors={translate?.other_doctors}
        other_doctors_long={translate?.other_doctors_long}
        placeholder_birthday={translate?.private_birth}
        placeholder_gender={translate?.private_gender}
        placeholder_name={translate?.private_name}
        placeholder_surname={translate?.private_surname}
        private_gender={translate?.private_gender}
        placeholder_when_came={translate?.private_when_came}
        form_men={translate?.form_men}
        form_women={translate?.form_women}
        btn_name={translate?.btn_name}
        btn_sending={translate?.btn_sending}
        form_text1={translate?.doctor_form_text}
        form_text2={translate?.doctor_form_text_long}
        all={translate?.all}
        contact_form_1={translate?.contact_form_1}
        swal_error_8={translate?.swal_error_8}
        swal_error_1={translate?.swal_error_1}
        tr_doctors_long={translate?.doctors_long}
      />
      <Footer params={code} reserved={translate?.reserved} />
    </>
  );
}
