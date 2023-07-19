import defaultSettings from '@/settings';

const title = defaultSettings.title || 'kBlog';

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        // return `${pageTitle} - ${title}`;
        return `${title} - ${pageTitle}`;
    }
    return `${title}`;
}
