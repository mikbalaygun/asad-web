'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AuditMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image?: string;
  email: string;
  phone?: string;
  expertise?: string[];
}

function AuditMemberCard({ member, index }: { member: AuditMember; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group"
    >
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-ocean-cyan/30 transition-all duration-500 h-full">
        <div className="p-8">
          {/* Header with Image */}
          <div className="flex items-start gap-6 mb-6">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-ocean-navy/20 flex-shrink-0">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-ocean-cyan/10 to-ocean-navy/10 flex items-center justify-center">
                  <svg className="w-12 h-12 text-ocean-cyan/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-ocean-cyan transition-colors">
                {member.name}
              </h3>
              <p className="text-ocean-cyan text-sm font-semibold uppercase tracking-wider mb-3">
                {member.position}
              </p>
            </div>
          </div>

          {/* Bio */}
          <p className={`text-white/70 leading-relaxed mb-4 ${!isExpanded && 'line-clamp-3'}`}>
            {member.bio}
          </p>

          {member.bio.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-ocean-cyan text-sm font-medium hover:text-ocean-cyan/80 transition-colors mb-4"
            >
              {isExpanded ? 'Daha az göster' : 'Devamını oku'}
            </button>
          )}

          {/* Expertise */}
          {member.expertise && member.expertise.length > 0 && (
            <div className="mb-6">
              <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Uzmanlık Alanları</h4>
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-ocean-cyan/10 text-ocean-cyan text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-3 text-white/60 hover:text-ocean-cyan text-sm transition-colors group/link"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/link:bg-ocean-cyan/10 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="truncate">{member.email}</span>
            </a>
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                className="flex items-center gap-3 text-white/60 hover:text-ocean-cyan text-sm transition-colors group/link"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/link:bg-ocean-cyan/10 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>{member.phone}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AuditBoardPage() {
  const auditMembers: AuditMember[] = [
    {
      id: 1,
      name: 'Mustafa Çelik',
      position: 'Denetim Kurulu Başkanı',
      bio: 'Mali müşavir ve yeminli mali müşavir unvanlarına sahip. 25 yıllık denetim ve danışmanlık deneyimi. Dernek mali işlerinin şeffaf ve düzenli yürütülmesini sağlıyor.',
      email: 'mustafa.celik@asad.org.tr',
      phone: '+90 (532) 555 0201',
      expertise: ['Mali Denetim', 'İç Kontrol', 'Risk Yönetimi', 'Uyumluluk'],
    },
    {
      id: 2,
      name: 'Fatma Aydın',
      position: 'Denetim Kurulu Üyesi',
      bio: 'İşletme yönetimi doktorası sahibi. Kurumsal yönetim ve iç denetim konularında uzman. Derneğimizin operasyonel süreçlerinin etkinliğini değerlendiriyor.',
      email: 'fatma.aydin@asad.org.tr',
      phone: '+90 (532) 555 0202',
      expertise: ['İç Denetim', 'Süreç Yönetimi', 'Kurumsal Yönetim'],
    },
    {
      id: 3,
      name: 'Hakan Yıldırım',
      position: 'Denetim Kurulu Üyesi',
      bio: 'Hukuk fakültesi mezunu, dernekler hukuku konusunda deneyimli. Derneğimizin tüm faaliyetlerinin yasal uygunluğunu kontrol ediyor.',
      email: 'hakan.yildirim@asad.org.tr',
      phone: '+90 (532) 555 0203',
      expertise: ['Hukuki Uyumluluk', 'Dernekler Hukuku', 'Sözleşme Yönetimi'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-deep via-ocean-deep to-ocean-navy">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/50 to-transparent" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-white/60 mb-8"
          >
            <Link href="/" className="hover:text-ocean-cyan transition-colors">
              Ana Sayfa
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/hakkimizda" className="hover:text-ocean-cyan transition-colors">
              Hakkımızda
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/90">Denetleme Kurulu</span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Denetleme Kurulu
            </h1>
            <p className="text-xl text-white/70">
              Derneğimizin şeffaf ve düzenli yönetimini sağlayan denetim ekibimiz
            </p>
          </motion.div>
        </div>
      </section>

      {/* Audit Members Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {auditMembers.map((member, index) => (
              <AuditMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}