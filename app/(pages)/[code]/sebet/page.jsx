import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Basket from "@/app/(components)/Pages/Basket/Basket";

export async function generateMetadata({ params }) {
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;

  return {
    title: `${data?.title} - Səbət`,
    description: data?.description,
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - Səbət`,
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

const getData = async (params) => {
  const translate = await fetchTranslations(params?.code);
  return { translate };
};

export default async function page({ params }) {
  const { translate } = await getData(params);
  return (
    <>
      <Header params={params?.code} translate={translate} />
      <Basket
        params={params?.code}
        tr_basket={translate?.baket}
        basket_long={translate?.basket_long}
        private_name={translate?.private_name}
        private_surname={translate?.private_surname}
        private_birth={translate?.private_birth}
        private_gender={translate?.private_gender}
        private_when_came={translate?.private_when_came}
        form_men={translate?.form_men}
        form_women={translate?.form_women}
        form_text1={translate?.form_text1}
        form_text2={translate?.form_text2}
        btn_name={translate?.btn_name}
        btn_sending={translate?.btn_sending}
        valyuta={translate?.valyuta}
        final_price={translate?.final_price}
        cart_is_empty={translate?.cart_is_empty}
        contact_form_1={translate?.contact_form_1}
        swal_error_8={translate?.swal_error_8}
        swal_error_1={translate?.swal_error_1}
      />
       <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
