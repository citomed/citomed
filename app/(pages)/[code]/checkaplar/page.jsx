import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Chekcups from "@/app/(components)/Pages/Chekcups/Chekcups";
import { generateKeywordsFromWords } from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code) => {
  const checkups = await fetchData(code, "checkups");
  const translate = await fetchTranslations(code);
  const tr_checkup = translate?.chekcups;
  const chekcups_long = translate?.chekcups_long;
  const settings = await fetchData(code, "settings");
  return { checkups, translate, tr_checkup, chekcups_long, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { tr_checkup, chekcups_long, settings } = await getData(code);

    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(chekcups_long);

    return {
      title: `${settings?.title} - ${tr_checkup}`,
      description: chekcups_long,
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${tr_checkup}`,
        description: chekcups_long,
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
  const { translate, checkups } = await getData(code);
  return (
    <>
      <Header params={code} translate={translate} />
      <Chekcups
        tr_checkup={translate?.chekcups}
        chekcups_long={translate?.chekcups_long}
        tr_includes={translate?.package_includes}
        data={checkups}
        params={code}
        added={translate?.added_to_card}
        add={translate?.add_to_card}
        valyuta={translate?.valyuta}
      />
      <Footer params={code} reserved={translate?.reserved} />
    </>
  );
}
