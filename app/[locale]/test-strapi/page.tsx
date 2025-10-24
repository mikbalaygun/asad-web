import { getAllNews } from '@/lib/api/news';
import { getStrapiMedia } from '@/lib/strapi';
import Image from 'next/image';

export default async function TestStrapiPage({
  params,
}: {
  params: Promise<{ locale: 'tr' | 'en' }>;
}) {
  const { locale } = await params;
  const news = await getAllNews(locale);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Strapi Bağlantı Testi - {locale === 'tr' ? 'Türkçe' : 'English'}
      </h1>

      {news.length === 0 ? (
        <div className="p-6 bg-red-100 text-red-700 rounded-lg">
          ❌ Haber bulunamadı. Strapi çalışıyor mu?
        </div>
      ) : (
        <div className="p-6 bg-green-100 text-green-700 rounded-lg mb-8">
          ✅ Bağlantı Başarılı! {news.length} haber bulundu.
        </div>
      )}

      <div className="grid gap-6">
        {news.map((item) => (
          <div key={item.id} className="border rounded-lg p-6 bg-white shadow">
            {item.coverImage?.url && (
              <div className="relative w-full h-64 mb-4">
                <Image
                  src={getStrapiMedia(item.coverImage.url)}
                  alt={item.Title}
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
            <h2 className="text-2xl font-bold mb-2">{item.Title}</h2>
            <p className="text-gray-600 mb-2">{item.excerpt}</p>
            <div className="text-sm text-gray-500">
              Kategori: {item.category} | Slug: {item.slug} | Locale: {item.locale}
            </div>
            {item.localizations && item.localizations.length > 0 && (
              <div className="mt-3 text-sm text-blue-600">
                🌐 Çeviriler: {item.localizations.map(l => l.locale).join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}