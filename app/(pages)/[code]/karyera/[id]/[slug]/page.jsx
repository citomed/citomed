import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import CareerItem from "@/app/(components)/Pages/Career/CareerItem";

const getData = async (params) => {
  const career_slug = await fetchData(
    params?.code,
    `career/${params?.id}/${params?.slug}`
  );
  const translate = await fetchTranslations(params?.code);
  return { career_slug, translate };
};

export async function generateMetadata({ params }) {
  const { career_slug } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;
  const stripHTML = (html) => html?.replace(/<[^>]*>/g, "").trim();
  return {
    title: `${data?.title} - ${career_slug?.title}`,
    description: stripHTML(career_slug?.text1),
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${career_slug?.title}`,
      description: stripHTML(career_slug?.text1),
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
  const { translate, career_slug } = await getData(params);
  const career_form = [];
  career_form.push(
    translate?.swal_error_1,
    translate?.swal_error_2,
    translate?.swal_error_3,
    translate?.swal_error_4,
    translate?.swal_error_5,
    translate?.swal_error_6,
    translate?.swal_error_7,
    translate?.swal_error_8,
    translate?.swal_error_9,
    translate?.swal_error_10,
    translate?.swal_error_11,
    translate?.swal_error_12,
    translate?.swal_error_13,
    translate?.swal_error_14,
    translate?.swal_error_15,
    translate?.swal_error_16,
    translate?.btn_name,
    translate?.btn_sending,
    translate?.swal_error_17
  );
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <CareerItem
        data={career_slug}
        text1={translate?.main_job_responsibilities}
        text2={translate?.candidate_requirements}
        carrer_emekHaqqiText={translate?.carrer_emekHaqqiText}
        carrer_tecrubeText={translate?.carrer_tecrubeText}
        last_resort={translate?.last_resort}
        workplace={translate?.workplace}
        work_schedule_text={translate?.work_schedule_text}
        params={params?.code}
        career_form={career_form}
      />
      <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
