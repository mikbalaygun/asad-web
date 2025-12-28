import '../globals.css';

export const metadata = {
  title: 'Giriş Yap - ASAD',
  description: 'ASAD Yönetim Paneli Giriş',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
