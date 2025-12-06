import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import PrivateServiceSingle from "@/app/(components)/Pages/PrivateServices/PrivateServiceSingle";
import {
  generateKeywordsFromWords,
  stripHTML,
} from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (params) => {
  const p_slug = await fetchData(
    params?.code,
    `p/${params?.id}/${params?.slug}`
  );
  const settings = await fetchData(params?.code, "settings");
  const translate = await fetchTranslations(params?.code);
  return { p_slug, translate, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { settings, p_slug } = await getData(params);
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(p_slug?.item?.text1);

    return {
      title: `${settings?.title}- ${p_slug?.item?.title}`,
      description: stripHTML(p_slug?.item?.text1),
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title}- ${p_slug?.item?.title}`,
        description: stripHTML(p_slug?.item?.text1),
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
  const { p_slug, translate } = await getData(params);

  return (
    <>
      <Header params={params?.code} translate={translate} />
      <PrivateServiceSingle
        params={params?.code}
        data={p_slug}
        read_more={translate?.read_more}
        asked_questions={translate?.asked_questions}
        other_services={translate?.other_services}
        pressure_chamber={translate?.pressure_chamber}
        private_name={translate?.private_name}
        private_surname={translate?.private_surname}
        private_birth={translate?.private_birth}
        private_gender={translate?.private_gender}
        private_when_came={translate?.private_when_came}
        form_men={translate?.form_men}
        form_women={translate?.form_women}
        form_text1={translate?.private_services_text1}
        form_text2={translate?.private_services_text2}
        btn_name={translate?.btn_name}
        btn_sending={translate?.btn_sending}
        contact_form_1={translate?.contact_form_1}
        swal_error_8={translate?.swal_error_8}
        swal_error_1={translate?.swal_error_1}
      />
      <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
