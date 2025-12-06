import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import OurDoctorsPage from "@/app/(components)/Pages/Doctors/Doctors";
import { generateKeywordsFromWords } from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code) => {
  const doctors = await fetchData(code, "doctors");
  const settings = await fetchData(code, "settings");
  const translate = await fetchTranslations(code);
  const tr_doctor = translate?.doctors;
  const tr_doctors_long = translate?.doctors_long;
  return { doctors, translate, tr_doctor, tr_doctors_long, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { settings, tr_doctor, tr_doctors_long } = await getData(code);
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(tr_doctors_long);

    return {
      title: `${settings?.title} - ${tr_doctor}`,
      description: tr_doctors_long,
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${tr_doctor}`,
        description: tr_doctors_long,
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
  const { doctors, translate } = await getData(code);
  return (
    <>
      <Header params={code} translate={translate} />
      <OurDoctorsPage
        params={code}
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
        params={code}
      />
    </>
  );
}
