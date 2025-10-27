// app/[locale]/hakkimizda/baskan/page.tsx
import { getPresident } from '@/lib/api/president';
import { President } from '@/lib/types/president';
import { getStrapiMedia } from '@/lib/strapi';
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
  
  let presidentData: President | null = null;
  try {
    presidentData = await getPresident(locale); // 👈 locale parametresini ekledik
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

  // İçeriği HTML'e çevir
  let htmlContent = '';
  if (typeof presidentData.message === 'string') {
    const paragraphs = presidentData.message.split('\n\n');
    htmlContent = paragraphs
      .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
      .join('');
  } else {
    htmlContent = convertBlocksToHTML(presidentData.message);
  }

  const formattedPresident = {
    firstName: presidentData.firstName,
    lastName: presidentData.lastName,
    photo: presidentData.photo ? getStrapiMedia(presidentData.photo.url) : undefined,
    message: htmlContent,
    phone: presidentData.phone,
    email: presidentData.email,
  };

  return <PresidentClient president={formattedPresident} locale={locale} />;
}

// Strapi blocks'u HTML'e çevir
function convertBlocksToHTML(blocks: any): string {
  if (!blocks) return '';
  if (typeof blocks === 'string') return `<p>${blocks}</p>`;
  if (!Array.isArray(blocks)) return '';
  if (blocks.length === 0) return '';

  return blocks
    .map((block) => {
      if (block.type === 'paragraph') {
        const text = block.children
          .map((child: any) => {
            let content = child.text || '';
            if (child.bold) content = `<strong>${content}</strong>`;
            if (child.italic) content = `<em>${content}</em>`;
            if (child.underline) content = `<u>${content}</u>`;
            return content;
          })
          .join('');
        return `<p>${text}</p>`;
      }
      return '';
    })
    .join('\n');
}