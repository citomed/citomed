import {
  fetchData,
  fetchTranslations,
} from "@/app/(components)/fetchData/fetchData";
import Footer from "@/app/(components)/Layout/Footer/Footer";
import Header from "@/app/(components)/Layout/Header/Header";
import Franchising from "@/app/(components)/Pages/Franchising/Franchising";
import {
  generateKeywordsFromWords,
  stripHTML,
} from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";

const getData = async (code) => {
  const franchising = await fetchData(code, "franchising");
  const settings = await fetchData(code, "settings");
  const translate = await fetchTranslations(code);
  const meta_title = franchising?.data?.title;
  const meta_description = franchising?.data?.text1;
  return { franchising, translate, meta_title, meta_description, settings };
};

export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    const { meta_title, meta_description, settings } = await getData(code);
    const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
    const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
    const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
    const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
    const generatedKeywords = generateKeywordsFromWords(meta_description);

    return {
      title: `${settings?.title} - ${meta_title}`,
      description: stripHTML(meta_description),
      keywords: generatedKeywords,
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: `${settings?.title} - ${meta_title}`,
        description: stripHTML(meta_description),
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

export async function generateMetadata({ params }) {
  const { meta_title, meta_description, settings } = await getData(params);

  const baseUrl = `${process.env.NEXT_PUBLIC_FAKE_DOMEN}`;
  const pictureBaseUrl = process.env.NEXT_PUBLIC_PICTURE;
  const logoUrl = `${pictureBaseUrl}/${settings?.logo}`;
  const faviconUrl = `${pictureBaseUrl}/${settings?.favicon}`;
  const stripHTML = (html) => html?.replace(/<[^>]*>/g, "").trim();
  return {
    title: `${settings?.title} - ${meta_title}`,
    description: stripHTML(meta_description),
    icons: {
      icon: faviconUrl,
      apple: faviconUrl,
    },
    openGraph: {
      title: `${settings?.title} - ${meta_title}`,
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
  const { code } = await params;
  const { translate, franchising } = await getData(code);
  return (
    <>
      <Header params={code} translate={translate} />
      <Franchising
        franchising={franchising}
        form_text1={translate?.franchising_form_text1}
        form_text2={translate?.franchising_form_text2}
        pl_name={translate?.private_name}
        pl_surname={translate?.private_surname}
        btn_name={translate?.btn_name}
        pl_company={translate?.placeholder_company}
        btn_sending={translate?.btn_sending}
        params={code}
        contact_form_1={translate?.contact_form_1}
        swal_error_8={translate?.swal_error_8}
        swal_error_1={translate?.swal_error_1}
      />
      <Footer params={code} reserved={translate?.reserved} />
    </>
  );
}
