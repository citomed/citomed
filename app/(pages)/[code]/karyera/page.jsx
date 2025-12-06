import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Career from "@/app/(components)/Pages/Career/Career";
import { generateKeywordsFromWords } from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code) => {
  const career = await fetchData(code, "career");
  const settings = await fetchData(code, "settings");
  const translate = await fetchTranslations(code);
  const tr_career = translate?.career;
  const tr_career_long = translate?.tr_career_long;
  return { career, translate, tr_career, tr_career_long, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { settings, tr_career, tr_career_long } = await getData(code);
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(tr_career_long);

    return {
      title: `${settings?.title} - ${tr_career}`,
      description: tr_career_long,
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${tr_career}`,
        description: tr_career_long,
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
  const { code } = await params;
  const { translate, career } = await getData(code);
  return (
    <>
      <Header params={code} translate={translate} />
      <Career
        data={career}
        tr_career={translate?.career}
        tr_career_long={translate?.tr_career_long}
        params={code}
        carrer_emekHaqqiText={translate?.carrer_emekHaqqiText}
        carrer_tecrubeText={translate?.carrer_tecrubeText}
        last_resort={translate?.last_resort}
        readMore={translate?.read_more}
      />
      <Footer params={code} reserved={translate?.reserved} />
    </>
  );
}
