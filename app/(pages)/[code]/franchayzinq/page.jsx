import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Franchising from "@/app/(components)/Pages/Franchising/Franchising";

const getData = async (params) => {
  const franchising = await fetchData(params?.code, "franchising");
  const translate = await fetchTranslations(params?.code);
  const meta_title = franchising?.data?.title;
  const meta_description = franchising?.data?.text1;
  return { franchising, translate, meta_title, meta_description };
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
      icon: faviconUrl,
      apple: faviconUrl,
    },
    openGraph: {
      title: `${data?.title} - ${meta_title}`,
      description: stripHTML(meta_description),
      url: baseUrl,
      siteName: `${process.env.NEXT_PUBLIC_FAKE_DOMEN_2}`,
      images: [
        {
          url: logoUrl, 
          secure_url: logoUrl, 
          width: 600,
          height: 600,
        },
      ],
    },
  };
}

export default async function page({ params }) {
  const { translate, franchising } = await getData(params);
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <Franchising
        franchising={franchising}
        form_text1={translate?.franchising_form_text1}
        form_text2={translate?.franchising_form_text2}
        pl_name={translate?.private_name}
        pl_surname={translate?.private_surname}
        btn_name={translate?.btn_name}
        pl_company={translate?.placeholder_company}
        btn_sending={translate?.btn_sending}
        params={params?.code}
        contact_form_1={translate?.contact_form_1}
        swal_error_8={translate?.swal_error_8}
        swal_error_1={translate?.swal_error_1}
      />
      <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
