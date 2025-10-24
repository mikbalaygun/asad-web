// app/[locale]/hakkimizda/yonetim-kurulu/page.tsx
import { getAllBoardMembers } from '@/lib/api/board-members';
import { BoardMember } from '@/lib/types/board-member';
import { getStrapiMedia } from '@/lib/strapi';
import BoardMembersClient from '@/components/BoardMembersClient';

export const metadata = {
  title: 'Yönetim Kurulu | ASAD',
  description: 'ASAD yönetim kurulu üyeleri',
};

export default async function BoardMembersPage({
  params: { locale },
}: {
  params: { locale: 'tr' | 'en' };
}) {
  let membersData: BoardMember[] = [];
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
    photo: m.photo ? getStrapiMedia(m.photo.url) : undefined,
  }));

  return <BoardMembersClient members={formattedMembers} locale={locale} />;
}
