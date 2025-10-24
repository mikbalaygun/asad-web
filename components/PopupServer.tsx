// components/PopupServer.tsx
import { getPopupForPage } from '@/lib/api/popups';
import { getStrapiMedia } from '@/lib/strapi';
import PopupModal from '@/components/PopupModal';

interface Props {
  locale: string;
  pagePath: string;
}

export default async function PopupServer({ locale, pagePath }: Props) {
  try {
    // Normalize page path
    const normalizedPath = pagePath
      .replace(`/${locale}`, '') // Remove locale
      .replace(/^\//, '') // Remove leading slash
      .split('/')[0] || 'home'; // Get first segment or 'home'

    const popup = await getPopupForPage(normalizedPath, locale as 'tr' | 'en');

    if (!popup) {
      return null;
    }

    // Format data for client component
    const popupData = {
      id: popup.id,
      title: popup.title,
      desktopImage: popup.image ? getStrapiMedia(popup.image.url) : '',
      mobileImage: popup.mobileImage 
        ? getStrapiMedia(popup.mobileImage.url) 
        : (popup.image ? getStrapiMedia(popup.image.url) : ''),
      linkUrl: popup.linkUrl,
      linkText: popup.linkText,
      closeDelay: popup.closeDelay || 0,
      displayFrequency: popup.displayFrequency,
    };

    return <PopupModal {...popupData} />;
  } catch (error) {
    console.error('[PopupServer] Error:', error);
    return null;
  }
}