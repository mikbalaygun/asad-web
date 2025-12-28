// app/[locale]/hakkimizda/yonetim-kurulu/page.tsx
import { getAllBoardMembers, getMediaUrl } from '@/lib/api/board-members';
import BoardMembersClient from '@/components/BoardMembersClient';

export const metadata = {
  title: 'Yönetim Kurulu | ASAD',
  description: 'ASAD yönetim kurulu üyeleri',
};

export default async function BoardMembersPage({
  params,
}: {
  params: Promise<{ locale: 'tr' | 'en' }>;
}) {
  const { locale } = await params;
  let membersData = [];
  try {
    membersData = await getAllBoardMembers();
  } catch (error) {
    console.error('Failed to fetch board members:', error);
  }

  const formattedMembers = membersData.map((m) => ({
    id: m.id,
    firstName: m.firstName,
    lastName: m.lastName,
    role: m.role,
    photo: getMediaUrl(m.photo),
  }));

  return <BoardMembersClient members={formattedMembers} locale={locale} />;
}
