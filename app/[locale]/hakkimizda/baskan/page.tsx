// app/[locale]/hakkimizda/baskan/page.tsx
import { getPresident, getMediaUrl } from '@/lib/api/president';
import PresidentClient from '@/components/PresidentClient';

export const metadata = {
  title: 'Başkan | ASAD',
  description: 'ASAD Başkanı',
};

export default async function PresidentPage({
  params,
}: {
  params: Promise<{ locale: 'tr' | 'en' }>;
}) {
  const { locale } = await params;

  let presidentData = null;
  try {
    presidentData = await getPresident();
  } catch (error) {
    console.error('Failed to fetch president:', error);
  }

  if (!presidentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ocean-deep">
        <p className="text-white/60 text-lg">
          {locale === 'tr' ? 'Başkan bilgisi bulunamadı.' : 'President information not found.'}
        </p>
      </div>
    );
  }

  // Use English message for EN locale, Turkish for TR
  const messageContent = locale === 'en' && presidentData.messageEn
    ? presidentData.messageEn
    : presidentData.message;

  const htmlContent = typeof messageContent === 'string'
    ? messageContent
    : JSON.stringify(messageContent);

  const formattedPresident = {
    firstName: presidentData.firstName,
    lastName: presidentData.lastName,
    photo: getMediaUrl(presidentData.photo),
    message: htmlContent,
    phone: presidentData.phone,
    email: presidentData.email,
  };

  return <PresidentClient president={formattedPresident} locale={locale} />;
}