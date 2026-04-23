export enum SitemapPage {
    HOME = 'home',
    ABOUT = 'about',
    SERVICES = 'services',
    PROJECTS = 'projects',
    NEWS = 'news',
    BLOG = 'blog',
    CORPORATE = 'corporate',
}

export const SITEMAP_PAGE_PATHS: Record<SitemapPage, string> = {
    [SitemapPage.HOME]: '/',
    [SitemapPage.ABOUT]: '/haqqimizda',
    [SitemapPage.SERVICES]: '/xidmetler',
    [SitemapPage.PROJECTS]: '/layihe',
    [SitemapPage.NEWS]: '/xeberler',
    [SitemapPage.BLOG]: '/bloq',
    [SitemapPage.CORPORATE]: '/korporativ',
};
