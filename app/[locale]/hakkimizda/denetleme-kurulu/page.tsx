// app/[locale]/hakkimizda/denetleme-kurulu/page.tsx
import { getAllAuditBoardMembers, getMediaUrl } from '@/lib/api/audit-boards';
import BoardMembersClient from '@/components/BoardMembersClient';

export const metadata = {
  title: 'Denetim Kurulu | ASAD',
  description: 'ASAD denetim kurulu üyeleri',
};

export default async function DenetimKuruluPage({
  params,
}: {
  params: Promise<{ locale: 'tr' | 'en' }>;
}) {
  const { locale } = await params;
  let membersData = [];
  try {
    membersData = await getAllAuditBoardMembers();
  } catch (error) {
    console.error('Failed to fetch audit board members:', error);
  }

  const formattedMembers = membersData.map((m) => ({
    id: m.id,
    firstName: m.firstName,
    lastName: m.lastName,
    role: m.role,
    photo: getMediaUrl(m.photo),
  }));

  const title = locale === 'tr' ? 'Denetim Kurulu' : 'Audit Board';
  const subtitle = locale === 'tr' ? 'ASAD denetim kurulu üyeleri' : 'ASAD audit board members';

  return (
    <BoardMembersClient
      members={formattedMembers}
      locale={locale}
      title={title}
      subtitle={subtitle}
      breadcrumbLabel={title}
    />
  );
}
