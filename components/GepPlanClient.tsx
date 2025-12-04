// components/GepPlanClient.tsx
'use client';

import { GepTeamMember, GepDocument } from '@/lib/types/gep';
import { Download, ExternalLink, Users, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface GepPlanClientProps {
  members: GepTeamMember[];
  documents: GepDocument[];
  locale: 'tr' | 'en';
  title: string;
  subtitle: string;
  breadcrumbLabel: string;
}

export default function GepPlanClient({
  members,
  documents,
  locale,
  title,
  subtitle,
  breadcrumbLabel,
}: GepPlanClientProps) {
  const texts = {
    tr: {
      home: 'Ana Sayfa',
      about: 'Hakkımızda',
      teamTitle: 'GEP Birimi',
      documentsTitle: 'GEP Plan Dokümanları',
      view: 'Görüntüle',
      download: 'İndir',
      teamDescription: 'GEP biriminde çalışan ekip üyelerimiz',
    },
    en: {
      home: 'Home',
      about: 'About',
      teamTitle: 'GEP Unit',
      documentsTitle: 'GEP Plan Documents',
      view: 'View',
      download: 'Download',
      teamDescription: 'Our team members working in the GEP unit',
    },
  } as const;

  const t = texts[locale];
  const filteredDocs = documents.filter((doc) => doc.language === locale);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/news/news-2.png"
            alt={title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/80 via-ocean-deep/70 to-ocean-deep" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link
              href={`/${locale}`}
              className="hover:text-ocean-cyan transition-colors"
            >
              {t.home}
            </Link>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <Link
              href={`/${locale}/hakkimizda`}
              className="hover:text-ocean-cyan transition-colors"
            >
              {t.about}
            </Link>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-white/90">{breadcrumbLabel}</span>
          </div>

          {/* Title */}
          <div className="max-w-4xl">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-ocean-cyan/20 border border-ocean-cyan/30 mb-6">
              <FileText className="w-10 h-10 text-ocean-cyan" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {title}
            </h1>
            <p className="text-lg text-white/70">{subtitle}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-mid" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Team */}
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-ocean-cyan/20 border border-ocean-cyan/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-ocean-cyan" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {t.teamTitle}
                </h2>
              </div>
              <p className="text-white/60 mb-8">{t.teamDescription}</p>

              <div className="grid md:grid-cols-2 gap-6">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="group relative backdrop-blur-lg bg-gradient-to-br from-ocean-cyan/10 to-ocean-deep/20 border border-ocean-cyan/20 rounded-xl p-6 hover:border-ocean-cyan/40 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ocean-cyan to-ocean-deep flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        {member.firstName.charAt(0)}
                        {member.lastName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-ocean-cyan transition-colors">
                          {member.firstName} {member.lastName}
                        </h3>
                        <p className="text-ocean-cyan/80 font-medium">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-3">
                  {t.documentsTitle}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-ocean-cyan to-ocean-deep mx-auto rounded-full" />
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="group backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-ocean-cyan/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <FileText className="w-10 h-10 text-white" />
                    </div>

                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-ocean-cyan transition-colors">
                        {doc.title}
                      </h3>
                      {doc.description && (
                        <p className="text-white/60 text-sm mb-3">
                          {doc.description}
                        </p>
                      )}
                      <span className="inline-block px-3 py-1 rounded-full bg-ocean-cyan/20 border border-ocean-cyan/30 text-ocean-cyan text-sm font-semibold">
                        {doc.year}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* View button */}
                      <Link
                        href={`/pdf/${doc.fileName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-ocean-cyan to-ocean-deep text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-ocean-cyan/20 transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {t.view}
                      </Link>

                      {/* Download button */}
                      <a
                        href={`/pdf/${doc.fileName}`}
                        download
                        className="flex-1 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <Download className="w-4 h-4" />
                        {t.download}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
