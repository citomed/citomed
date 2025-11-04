import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import DcotorItem from "@/app/(components)/Pages/Doctors/DcotorItem";

const getData = async (params) => {
  const data_docs = await fetchData(
    params?.code,
    `doctors/${params?.id}/${params?.slug}`
  );
  const translate = await fetchTranslations(params?.code);
  return { data_docs, translate };
};

export async function generateMetadata({ params }) {
  const { data_docs } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data_docs?.data?.file}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;
  const stripHTML = (html) => html?.replace(/<[^>]*>/g, "").trim();
  return {
    title: `${data?.title} - ${data_docs?.data?.title}`,
    description: stripHTML(data_docs?.data?.text1),
    icons: {
      icon: faviconUrl,
      apple: faviconUrl,
    },
    openGraph: {
      title: `${data?.title} - ${data_docs?.data?.title}`,
      description: stripHTML(data_docs?.data?.text1),
      url: baseUrl,
      siteName: `${process.env.NEXT_PUBLIC_FAKE_DOMEN_2}`,
      images: [
        {
          url: logoUrl,
          secure_url: logoUrl,
          width: 600,
          height: 600,
        },
      ],
    },
  };
}

export default async function page({ params }) {
  const { translate, data_docs } = await getData(params);
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <DcotorItem
        params={params?.code}
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
      <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
