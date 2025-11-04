import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import AboutPage from "@/app/(components)/Pages/About/AboutPage";

const getData = async (params) => {
  const data_about = await fetchData(params?.code, "about_page");
  const translate = await fetchTranslations(params?.code);
  const about_page_tr = translate?.about_page;
  return { data_about, translate, about_page_tr };
};

export async function generateMetadata({ params }) {
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;
  const { about_page_tr } = await getData(params);
  return {
    title: `${data?.title} - ${about_page_tr}`,
    description: data?.description,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${about_page_tr}`,
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
  const { data_about, translate } = await getData(params);

  return (
    <>
      <Header params={params?.code} translate={translate} />
      <AboutPage
        our_goal={translate?.our_goal}
        out_values={translate?.values}
        data={data_about}
      />
       <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
