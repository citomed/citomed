  import he from 'he';
  export function toSlug(text) {
    return text
      ?.toLowerCase()
      ?.replace(/ə/g, "e")
      ?.replace(/ı/g, "i")
      ?.replace(/ç/g, "c")
      ?.replace(/ş/g, "s")
      ?.replace(/ü/g, "u")
      ?.replace(/ö/g, "o")
      ?.replace(/[^\w\s-]/g, "")
      ?.trim()
      ?.replace(/\s+/g, "-");
  }

  export function toSlug2(str) {
    // Azərbaycan hərflərini ingilis hərfləri ilə əvəz et
    const azToEnMap = {
      'ə': 'e',
      'Ə': 'e',
      'ç': 'c',
      'Ç': 'c',
      'ş': 's',
      'Ş': 's',
      'ğ': 'g',
      'Ğ': 'g',
      'ı': 'i',
      'I': 'i',
      'ö': 'o',
      'Ö': 'o',
      'ü': 'u',
      'Ü': 'u',
      'à': 'a',
      'á': 'a',
      'ä': 'a',
      'â': 'a',
      'ã': 'a',
      'å': 'a',
      'è': 'e',
      'é': 'e',
      'ë': 'e',
      'ê': 'e',
      'ì': 'i',
      'í': 'i',
      'ï': 'i',
      'î': 'i',
      'ò': 'o',
      'ó': 'o',
      'ö': 'o',
      'ô': 'o',
      'ù': 'u',
      'ú': 'u',
      'ü': 'u',
      'û': 'u',
      'ñ': 'n',
      'Ñ': 'n',
    };

    str = str.replace(/[^\u0000-\u007E]/g, ch => azToEnMap[ch] || ''); // Əvəz et

    return str
      .toLowerCase()
      .replace(/[()]/g, '') // mötərizələri sil
      .replace(/[^a-z0-9]+/g, '-') // hər şeyi "-" ilə əvəz et
      .replace(/^-+|-+$/g, ''); // baş və son "-" işarələrini sil
  }

  export const stripHTML = (html) => {
    if (!html) return ""
    const text1 = html
      .replace(/<[^>]*>/g, "") // 1. HTML taglarını sil (örn: <b>, <p>)
      .replace(/&nbsp;/g, " ") // 2. &nbsp; karakterlerini boşlukla değiştir
      .replace(/&quot;/g, "") // 3. &quot; karakterlerini tamamen sil (istenen bu)
      .replace(/&amp;/g, "&") // 4. &amp; karakterlerini & ile değiştir
      .replace(/&#39;/g, "'") // 5. &#39; karakterlerini ' ile değiştir
      .replace(/\s+/g, " ") // 6. Birden fazla boşluğu tek boşluğa indirge
      .trim();

    const text2 = he?.decode(text1);

    return text2
  };

  export const generateKeywordsFromWords = (text) => {
    if (!text) return "";

    // 1. Mətni ilkin təmizləmədən keçiririk (HTML taglar və s.)
    let cleanText = stripHTML(text)

    let decodedText = he?.decode(cleanText);

    decodedText = decodedText.replace(/".*?"/g, '');

    // 3. Qalan mətni boşluq və ya vergülə görə sözlərə bölürük.
    // filter(Boolean) boş elementləri silir.
    const words = decodedText.split(/[ ,]+/).filter(Boolean);

    // 4. Nəticəni aralarına vergül qoyaraq birləşdiririk.
    return words.join(',');
  };