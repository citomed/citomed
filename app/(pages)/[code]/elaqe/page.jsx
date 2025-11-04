import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Contact from "@/app/(components)/Pages/Contact/Contact";

const getData = async (params) => {
  const data = await fetchData(params?.code, "contact");
  const translate = await fetchTranslations(params?.code);
  const contact_text_1 = translate?.contact_text_1;
  const contact_text_1_long = translate?.contact_text_1_long;
  return { translate, data, contact_text_1, contact_text_1_long };
};

export async function generateMetadata({ params }) {
  const { contact_text_1, contact_text_1_long } = await getData(params);
  const data = await fetchData(params?.code, "settings");
  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${data?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${data?.favicon}`;
  const stripHTML = (html) => html?.replace(/<[^>]*>/g, "").trim();
  return {
    title: `${data?.title} - ${contact_text_1}`,
    description: stripHTML(contact_text_1_long),
    icons: {
      icon: faviconUrl, // Dinamik favicon URL-i
      apple: faviconUrl, // Əgər apple-touch-icon da eynidirsə
    },
    openGraph: {
      title: `${data?.title} - ${contact_text_1}`,
      description: stripHTML(contact_text_1_long),
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
  const { translate, data } = await getData(params);
  return (
    <>
      <Header translate={translate} params={params?.code} />
      <Contact
        contact_text_1={translate?.contact_text_1}
        contact_text_1_long={translate?.contact_text_1_long}
        tr_offer={translate?.offer}
        tr_comment={translate?.comment_irad}
        tr_fullname={translate?.fullname}
        tr_message={translate?.message}
        btn_send={translate?.btn_name}
        btn_sending={translate?.btn_sending}
        write_on_whatsapp={translate?.write_on_whatsapp}
        contact_blue_card_text1={translate?.contact_blue_card_text1}
        contact_blue_card_text2={translate?.contact_blue_card_text2}
        data={data}
        params={params?.code}
        read_more={translate?.read_more}
        contact_form_1={translate?.contact_form_1}
        swal_error_8={translate?.swal_error_8}
        swal_error_1={translate?.swal_error_1}
        contact_time={translate?.contact_time}
      />
      <Footer params={params?.code} reserved={translate?.reserved} />
    </>
  );
}
