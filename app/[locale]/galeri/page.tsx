import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Galeri | ASAD',
  description: 'Foto ve video galerisi',
};

export default async function Gallery({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  // Varsayılan olarak foto galerisine yönlendir
  redirect(`/${locale}/galeri/foto`);
}