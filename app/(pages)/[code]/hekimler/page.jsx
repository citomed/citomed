import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import OurDoctorsPage from "@/app/(components)/Pages/Doctors/Doctors";

const getData = async (params) => {
  const doctors = await fetchData(params?.code, "doctors");
  const translate = await fetchTranslations(params?.code);
  const tr_doctor = translate?.doctors;
  const tr_doctors_long = translate?.doctors_long;
  return { doctors, translate, tr_doctor, tr_doctors_long };
};

export async function generateMetadata({ params }) {
  const { tr_doctor, tr_doctors_long } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;
  return {
    title: `${data?.title} - ${tr_doctor}`,
    description: tr_doctors_long,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${tr_doctor}`,
      description: tr_doctors_long,
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
  const { doctors, translate } = await getData(params);
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <OurDoctorsPage
        params={params?.code}
        data={doctors}
        tr_doctor={translate?.doctors}
        tr_doctors_long={translate?.doctors_long}
        doctor_cats={translate?.choose_a_specialization}
        not_found={translate?.not_found_doctor}
      />
      <Footer
        reserved={translate?.reserved}
        footer_card_1={translate?.footer_card_1}
        footer_card_2={translate?.footer_card_2}
        footer_card_3={translate?.footer_card_3}
        linkName="chekcups"
        params={params?.code}
      />
    </>
  );
}
