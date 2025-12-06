import {
    NextResponse
} from "next/server";

const defaultLocale = "az";
const locales = ["az", "en", "ru"];

export function middleware(request) {
    const {
        pathname
    } = request.nextUrl;

    // 1. Redirect: /az -> /
    if (
        pathname === `/${defaultLocale}` ||
        pathname.startsWith(`/${defaultLocale}/`)
    ) {
        const newPath = pathname.replace(`/${defaultLocale}`, "");
        // Redirect edərkən də parametrləri qorumaq üçün search-i əlavə edirik
        const url = new URL(newPath || "/", request.url);
        url.search = request.nextUrl.search;
        return NextResponse.redirect(url);
    }

    // 2. Rewrite: /xidmetler -> /az/xidmetler
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        // BURASI DÜZƏLDİLDİ:
        // URL-i kopyalayırıq ki, query parametrləri (filter, page və s.) silinməsin
        const url = request.nextUrl.clone();
        url.pathname = `/${defaultLocale}${pathname}`;

        return NextResponse.rewrite(url);
    }
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg).*)",
    ],
};