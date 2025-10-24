'use client';

import Image from 'next/image';
import Link from 'next/link';

interface BoardMember {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  photo?: string;
}

interface Props {
  members: BoardMember[];
  locale: 'tr' | 'en';
  title?: string;          // <— eklendi
  subtitle?: string;       // <— eklendi
  breadcrumbLabel?: string;// <— eklendi (opsiyonel)
}

function MemberCard({ member }: { member: BoardMember }) {
  return (
    <div className="group">
      <div className="relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:shadow-xl hover:border-ocean-cyan/30 transition-all duration-300">
        <div className="relative w-full aspect-square overflow-hidden bg-ocean-navy/20">
          {member.photo ? (
            <Image
              src={member.photo}
              alt={`${member.firstName} ${member.lastName}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-ocean-cyan/10 to-ocean-navy/10 flex items-center justify-center">
              <svg className="w-24 h-24 text-ocean-cyan/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-transparent to-transparent" />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white/95 mb-1">
            {member.firstName} {member.lastName}
          </h3>
          <p className="text-ocean-cyan text-sm font-medium">
            {member.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BoardMembersClient({
  members,
  locale,
  title,
  subtitle,
  breadcrumbLabel,
}: Props) {
  const defaultTitle = locale === 'tr' ? 'Yönetim Kurulu' : 'Board Members';
  const defaultSubtitle =
    locale === 'tr'
      ? "ASAD'ı yöneten deneyimli ve tutkulu ekibimiz"
      : 'Our experienced and passionate team managing ASAD';

  const heading = title ?? defaultTitle;
  const sub = subtitle ?? defaultSubtitle;
  const crumb = breadcrumbLabel ?? heading;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/news/news-1.png"
            alt={heading}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/80 via-ocean-deep/70 to-ocean-deep" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href={`/${locale}`} className="hover:text-ocean-cyan transition-colors">
              {locale === 'tr' ? 'Ana Sayfa' : 'Home'}
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href={`/${locale}/hakkimizda`} className="hover:text-ocean-cyan transition-colors">
              {locale === 'tr' ? 'Hakkımızda' : 'About'}
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/90">{crumb}</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {heading}
            </h1>
            <p className="text-lg text-white/70">{sub}</p>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="relative py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-mid" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {members.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/60 text-lg">
                {locale === 'tr' ? 'Üye bulunamadı.' : 'No members found.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
