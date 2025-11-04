import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Leaders from "@/app/(components)/Pages/Leaders/Leaders";

const getData = async (params) => {
  const leaders = await fetchData(params?.code, "leaders");
  const translate = await fetchTranslations(params?.code);
  const leaders_address = translate?.leaders_address;
  return { leaders, translate, leaders_address };
};

export async function generateMetadata({ params }) {
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const { leaders_address } = await getData(params);
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;

  return {
    title: `${data?.title} - ${leaders_address}`,
    description: data?.description,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${leaders_address}`,
      description: data?.meta_description,
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
  const { leaders, translate } = await getData(params);
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <Leaders
        leaders_address={translate?.leaders_address}
        sincerely={translate?.sincerely}
        leaders={leaders}
        leaders_name={translate?.leaders_name}
        citomed_head={translate?.citomed_head}
      />
       <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
