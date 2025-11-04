import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Partners from "@/app/(components)/Pages/Partners/Partners";

const getData = async (params) => {
  const partners = await fetchData(params?.code, "partners");
  const translate = await fetchTranslations(params?.code);
  const partners_tr = translate?.partners;
  return { partners, translate, partners_tr };
};

export async function generateMetadata({ params }) {
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;
  const { partners_tr } = await getData(params);

  return {
    title: `${data?.title} - ${partners_tr}`,
    description: data?.description,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${partners_tr}`,
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
  const { translate, partners } = await getData(params);
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <Partners
        data={partners}
        tr_partners={translate?.partners}
        partners_long={translate?.partners_long}
      />
       <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
