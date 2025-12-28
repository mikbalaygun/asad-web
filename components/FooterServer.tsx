// components/FooterServer.tsx
import { getContactInfo } from '@/lib/api/contact';
import Footer from '@/components/Footer';

interface Props {
  locale: string;
}

export default async function FooterServer({ locale }: Props) {
  try {
    // İletişim bilgilerini çek (sosyal medya linkleri için)
    const contactInfo = await getContactInfo();

    return (
      <Footer
        locale={locale}
        contactInfo={contactInfo ? {
          instagram: contactInfo.instagram || undefined,
          facebook: contactInfo.facebook || undefined,
          twitter: contactInfo.twitter || undefined,
          youtube: contactInfo.youtube || undefined,
          nextsocial: contactInfo.nextsocial || undefined,
        } : null}
      />
    );
  } catch (error) {
    console.error('[FooterServer] Error loading contact info:', error);
    // Hata durumunda sosyal medya olmadan render et
    return <Footer locale={locale} contactInfo={null} />;
  }
}