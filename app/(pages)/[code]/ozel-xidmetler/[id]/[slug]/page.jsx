import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import PrivateServiceSingle from "@/app/(components)/Pages/PrivateServices/PrivateServiceSingle";

const getData = async (params) => {
  const p_slug = await fetchData(
    params?.code,
    `p/${params?.id}/${params?.slug}`
  );
  const translate = await fetchTranslations(params?.code);
  return { p_slug, translate };
};

export async function generateMetadata({ params }) {
  const { p_slug } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;

  const stripHTML = (html) => html?.replace(/<[^>]*>/g, "").trim();

  return {
    title: `${data?.title}- ${p_slug?.item?.title}`,
    description: stripHTML(p_slug?.item?.text1),
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title}-${p_slug?.item?.title}`,
      description: stripHTML(p_slug?.item?.text1),
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
