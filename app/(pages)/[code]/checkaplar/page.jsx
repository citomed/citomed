import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Chekcups from "@/app/(components)/Pages/Chekcups/Chekcups";

const getData = async (params) => {
  const checkups = await fetchData(params?.code, "checkups");
  const translate = await fetchTranslations(params?.code);
  const tr_checkup = translate?.chekcups;
  const chekcups_long = translate?.chekcups_long;
  return { checkups, translate, tr_checkup, chekcups_long };
};

export async function generateMetadata({ params }) {
  const { tr_checkup, chekcups_long } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;

  return {
    title: `${data?.title} - ${tr_checkup}`,
    description: chekcups_long,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${tr_checkup}`,
      description: chekcups_long,
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
  const { translate, checkups } = await getData(params);
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <Chekcups
        tr_checkup={translate?.chekcups}
        chekcups_long={translate?.chekcups_long}
        tr_includes={translate?.package_includes}
        data={checkups}
        params={params?.code}
        added={translate?.added_to_card}
        add={translate?.add_to_card}
        valyuta={translate?.valyuta}
      />
      <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
