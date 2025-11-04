import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Career from "@/app/(components)/Pages/Career/Career";

const getData = async (params) => {
  const career = await fetchData(params?.code, "career");
  const translate = await fetchTranslations(params?.code);
  const tr_career = translate?.career;
  const tr_career_long = translate?.tr_career_long;
  return { career, translate, tr_career, tr_career_long };
};

export async function generateMetadata({ params }) {
  const { tr_career, tr_career_long } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;

  return {
    title: `${data?.title} - ${tr_career}`,
    description: tr_career_long,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${tr_career}`,
      description: tr_career_long,
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
  const { translate, career } = await getData(params);
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <Career
        data={career}
        tr_career={translate?.career}
        tr_career_long={translate?.tr_career_long}
        params={params?.code}
        carrer_emekHaqqiText={translate?.carrer_emekHaqqiText}
        carrer_tecrubeText={translate?.carrer_tecrubeText}
        last_resort={translate?.last_resort}
        readMore={translate?.read_more}
      />
      <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
