import type { Metadata } from 'next';
import '../globals.css';
import Navbar from '@/components/Navbar';
import FooterServer from '@/components/FooterServer';
import PopupServer from '@/components/PopupServer';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import tr from '@/messages/tr.json';
import en from '@/messages/en.json';
import { I18nProvider } from '@/components/i18n';

export const metadata: Metadata = {
  title: 'ASAD - Anadolu Su Altı Araştırmaları ve Sporları Derneği',
  description: "Anadolu'nun sualtı zenginliklerini keşfedin",
};

// 🔧 async yapıyoruz ve params'ı await ediyoruz
export default async function RootLayout(
  props: { children: React.ReactNode; params: Promise<{ locale: 'tr' | 'en' }> }
) {
  const { children, params } = props;
  const { locale } = await params; // ✅ kritik satır

  const fullDict = locale === 'tr' ? tr : en;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dict = (fullDict as any).messages ?? fullDict;

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <GoogleAnalytics />

        <I18nProvider locale={locale} dict={dict}>
          <Navbar />
          <main className="relative">{children}</main>
          <FooterServer locale={locale} />

          {/* Pop-up Sistemi - En sona eklendi */}
          <PopupServer locale={locale} pagePath={`/${locale}`} />
        </I18nProvider>
      </body>
    </html>
  );
}