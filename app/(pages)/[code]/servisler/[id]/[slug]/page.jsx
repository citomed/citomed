import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import ServicesSingle from "@/app/(components)/Pages/Services/ServicesSingle";

const getData = async (params) => {
  const translate = await fetchTranslations(params?.code);
  const category3 = await fetchData(
    params?.code,
    `services/${params?.id}/${params?.slug}`
  );

  return { translate, category3 };
};

export async function generateMetadata({ params }) {
  const { category3 } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;

  const stripHTML = (html) => html?.replace(/<[^>]*>/g, "").trim();
  return {
    title: `${data?.title} - ${category3?.item?.title}`,
    description: stripHTML(category3?.item?.short_desc),
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${category3?.item?.title}`,
      description: stripHTML(category3?.item?.short_desc),
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
  const { translate, category3 } = await getData(params);
  return (
    <>
      <Header translate={translate} params={params?.code} />
      <ServicesSingle
        data={category3}
        params={params?.code}
        all={translate?.all}
        see_more={translate?.see_more}
        our_services={translate?.our_services}
        our_doctors={translate?.our_doctors}
        treatment_directions={translate?.treatment_directions}
      />
      <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
