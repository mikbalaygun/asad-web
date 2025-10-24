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
          instagram: contactInfo.instagram,
          facebook: contactInfo.facebook,
          twitter: contactInfo.twitter,
          youtube: contactInfo.youtube,
        } : null}
      />
    );
  } catch (error) {
    console.error('[FooterServer] Error loading contact info:', error);
    // Hata durumunda sosyal medya olmadan render et
    return <Footer locale={locale} contactInfo={null} />;
  }
}