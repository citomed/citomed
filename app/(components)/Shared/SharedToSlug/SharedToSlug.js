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