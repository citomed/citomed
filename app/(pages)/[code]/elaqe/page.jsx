import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Contact from "@/app/(components)/Pages/Contact/Contact";
import {
  generateKeywordsFromWords,
  stripHTML,
} from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code) => {
  const data = await fetchData(code, "contact");
  const settings = await fetchData(code, "settings");
  const translate = await fetchTranslations(code);
  const contact_text_1 = translate?.contact_text_1;
  const contact_text_1_long = translate?.contact_text_1_long;
  return { translate, data, contact_text_1, contact_text_1_long, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { contact_text_1, contact_text_1_long, settings } = await getData(
      code
    );
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(contact_text_1_long);

    return {
      title: `${settings?.title} - ${contact_text_1}`,
      description: stripHTML(contact_text_1_long),
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${contact_text_1}`,
        description: stripHTML(contact_text_1_long),
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
  const { translate, data } = await getData(code);
  return (
    <>
      <Header translate={translate} params={code} />
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
        params={code}
        read_more={translate?.read_more}
        contact_form_1={translate?.contact_form_1}
        swal_error_8={translate?.swal_error_8}
        swal_error_1={translate?.swal_error_1}
        contact_time={translate?.contact_time}
      />
      <Footer params={code} reserved={translate?.reserved} />
    </>
  );
}
