import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Basket from "@/app/(components)/Pages/Basket/Basket";
import { generateKeywordsFromWords } from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code) => {
  const translate = await fetchTranslations(code);
  const settings = await fetchData(code, "settings");
  const basket = translate?.baket;
  return { translate, settings, basket };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { basket, settings } = await getData(code);
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(settings?.description);

    return {
      title: `${settings?.title} - ${basket}`,
      description: settings?.description,
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${basket}`,
        description: settings?.description,
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
  const { translate } = await getData(code);
  return (
    <>
      <Header params={code} translate={translate} />
      <Basket
        params={code}
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
      <Footer params={code} reserved={translate?.reserved} />
    </>
  );
}
