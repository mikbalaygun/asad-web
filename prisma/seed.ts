import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Create admin user
    const password = await hash("admin123", 12);

    const adminUser = await prisma.user.upsert({
        where: { email: "admin@asad.org.tr" },
        update: {},
        create: {
            email: "admin@asad.org.tr",
            name: "Admin",
            password,
            role: "admin",
        },
    });

    console.log("✅ Admin user created:", adminUser.email);

    // Create sample news (optional)
    const sampleNews = await prisma.news.upsert({
        where: { id: 1 },
        update: {},
        create: {
            title: "ASAD Admin Paneline Hoş Geldiniz",
            slug: "asad-admin-paneline-hos-geldiniz",
            excerpt: "Yeni admin panelimiz ile içeriklerinizi kolayca yönetebilirsiniz.",
            content: "<p>Bu yeni admin paneli ile haberler, makaleler, projeler ve daha fazlasını kolayca yönetebilirsiniz.</p><p>Sol menüden istediğiniz modüle giderek içerik ekleyebilir, düzenleyebilir veya silebilirsiniz.</p>",
            category: "Duyuru",
            publishedTime: new Date(),
            isActive: true,
            locale: "tr",
        },
    });

    console.log("✅ Sample news created:", sampleNews.title);

    console.log("🎉 Seeding complete!");
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
