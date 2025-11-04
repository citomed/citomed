import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Collaboration from "@/app/(components)/Pages/Collaboration/Collaboration";

const getData = async (params) => {
  const corporative = await fetchData(params?.code, "corporative");
  const translate = await fetchTranslations(params?.code);
  const meta_title = corporative?.data?.title;
  const meta_description = corporative?.data?.text1;
  return { corporative, translate, meta_title, meta_description };
};

export async function generateMetadata({ params }) {
  const { meta_title, meta_description } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;
  const stripHTML = (html) => html?.replace(/<[^>]*>/g, "").trim();
  return {
    title: `${data?.title} - ${meta_title}`,
    description: stripHTML(meta_description),
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${meta_title}`,
      description: stripHTML(meta_description),
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
  const { translate, corporative } = await getData(params);
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <Collaboration
        corporative={corporative}
        form_text1={translate?.corporative_form_text1}
        form_text2={translate?.corporative_form_text2}
        pl_name={translate?.private_name}
        pl_surname={translate?.private_surname}
        btn_name={translate?.btn_name}
        pl_company={translate?.placeholder_company}
        btn_sending={translate?.btn_sending}
        contact_form_1={translate?.contact_form_1}
        swal_error_8={translate?.swal_error_8}
        swal_error_1={translate?.swal_error_1}
        params={params?.code}
      />
      <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
