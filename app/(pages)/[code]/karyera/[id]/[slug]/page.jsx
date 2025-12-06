import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import CareerItem from "@/app/(components)/Pages/Career/CareerItem";
import {
  generateKeywordsFromWords,
  stripHTML,
} from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code, id, slug) => {
  const career_slug = await fetchData(code, `career/${id}/${slug}`);
  const settings = await fetchData(code, "settings");
  const translate = await fetchTranslations(code);
  return { career_slug, translate, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { settings, career_slug } = await getData(code);
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(career_slug?.text1);

    return {
      title: `${settings?.title} - ${career_slug?.title}`,
      description: stripHTML(career_slug?.text1),
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${career_slug?.title}`,
        description: stripHTML(career_slug?.text1),
        keywords: generatedKeywords,
        url: `${baseUrl}`,
        siteName: `${process.env.NEXT_PUBLIC_FAKE_DOMEN_2}`,
        type: "website",
        image: logoUrl,
        images: [
          {
            url: logoUrl,
            secure_url: logoUrl,
            width: 100,
            height: 60,
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
  const { translate, career_slug } = await getData(code, id, slug);
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
      <Header params={code} translate={translate} />
      <CareerItem
        data={career_slug}
        text1={translate?.main_job_responsibilities}
        text2={translate?.candidate_requirements}
        carrer_emekHaqqiText={translate?.carrer_emekHaqqiText}
        carrer_tecrubeText={translate?.carrer_tecrubeText}
        last_resort={translate?.last_resort}
        workplace={translate?.workplace}
        work_schedule_text={translate?.work_schedule_text}
        params={code}
        career_form={career_form}
      />
      <Footer params={code} reserved={translate?.reserved} />
    </>
  );
}
