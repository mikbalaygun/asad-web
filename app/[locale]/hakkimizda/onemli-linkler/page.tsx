import ImportantLinksClient from "@/components/ImportantLinksClient";

export const metadata = {
    title: "Önemli Linkler | ASAD",
    description: "Sektörle ilgili önemli kurum ve kuruluşların bağlantıları",
};

export default async function ImportantLinksPage({
    params,
}: {
    params: Promise<{ locale: "tr" | "en" }>;
}) {
    const { locale } = await params;
    return <ImportantLinksClient locale={locale} />;
}
