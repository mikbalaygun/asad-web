'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BoardMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image?: string;
  email: string;
  phone?: string;
  specialties?: string[];
}

function MemberCard({ member, index }: { member: BoardMember; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="group h-full opacity-0 animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-ocean-cyan/30 transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-80 overflow-hidden bg-ocean-navy/20">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-ocean-cyan/10 to-ocean-navy/10 flex items-center justify-center">
              <svg className="w-32 h-32 text-ocean-cyan/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-ocean-cyan transition-colors">
              {member.name}
            </h3>
            <p className="text-ocean-cyan text-sm font-semibold uppercase tracking-wider">
              {member.position}
            </p>
          </div>

          <p className={`text-white/70 text-sm leading-relaxed mb-4 ${!isExpanded && 'line-clamp-3'}`}>
            {member.bio}
          </p>

          {member.bio.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-ocean-cyan text-sm font-medium hover:text-ocean-cyan/80 transition-colors mb-4 text-left"
            >
              {isExpanded ? 'Daha az göster' : 'Devamını oku'}
            </button>
          )}

          {member.specialties && member.specialties.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {member.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-ocean-cyan/10 text-ocean-cyan text-xs font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact */}
          <div className="mt-auto pt-4 border-t border-white/10 space-y-2">
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-2 text-white/60 hover:text-ocean-cyan text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="truncate">{member.email}</span>
            </a>
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                className="flex items-center gap-2 text-white/60 hover:text-ocean-cyan text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{member.phone}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ManagementBoardPage() {
  const boardMembers: BoardMember[] = [
    { id: 1, name: 'Ahmet Yılmaz', position: 'Başkan', bio: 'Sualtı sporları alanında 20 yılı aşkın deneyime sahip. PADI Master Instructor ve teknik dalış eğitmeni.', email: 'ahmet.yilmaz@asad.org.tr', phone: '+90 (532) 555 0101', specialties: ['Teknik Dalış', 'Eğitmen', 'Sualtı Arkeolojisi'] },
    { id: 2, name: 'Mehmet Kaya', position: 'Başkan Yardımcısı', bio: 'Deniz biyolojisi alanında doktora yapmış, sualtı araştırmaları konusunda uzman.', email: 'mehmet.kaya@asad.org.tr', phone: '+90 (532) 555 0102', specialties: ['Deniz Biyolojisi', 'Araştırma', 'Fotoğrafçılık'] },
    { id: 3, name: 'Ayşe Demir', position: 'Genel Sekreter', bio: 'İşletme mezunu, dernek yönetimi ve organizasyon konularında deneyimli.', email: 'ayse.demir@asad.org.tr', phone: '+90 (532) 555 0103', specialties: ['Organizasyon', 'İdari İşler', 'Üye İlişkileri'] },
    { id: 4, name: 'Can Öztürk', position: 'Sayman', bio: 'Mali müşavir olarak çalışan Can Bey, derneğimizin tüm mali işlerini titizlikle yönetiyor.', email: 'can.ozturk@asad.org.tr', phone: '+90 (532) 555 0104', specialties: ['Mali İşler', 'Bütçe', 'Raporlama'] },
    { id: 5, name: 'Zeynep Arslan', position: 'Üye', bio: 'Sosyal medya ve dijital pazarlama uzmanı.', email: 'zeynep.arslan@asad.org.tr', specialties: ['Sosyal Medya', 'Pazarlama', 'İletişim'] },
    { id: 6, name: 'Burak Şahin', position: 'Üye', bio: 'Çevre mühendisi ve sualtı temizlik projelerinin koordinatörü.', email: 'burak.sahin@asad.org.tr', specialties: ['Çevre', 'Sürdürülebilirlik', 'Proje Yönetimi'] },
    { id: 7, name: 'Elif Yıldız', position: 'Üye', bio: 'Sualtı fotoğrafçısı ve video prodüktör.', email: 'elif.yildiz@asad.org.tr', specialties: ['Fotoğrafçılık', 'Video', 'Medya'] },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/news/news-4.png" alt="Background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/80 via-ocean-deep/85 to-ocean-deep" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6 opacity-0 animate-fadeIn">
            <Link href="/" className="hover:text-ocean-cyan transition-colors">Ana Sayfa</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/hakkimizda" className="hover:text-ocean-cyan transition-colors">Hakkımızda</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/90">Yönetim Kurulu</span>
          </div>

          <div className="mb-12 opacity-0 animate-slideUp" style={{ animationDelay: '100ms' }}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Yönetim Kurulu</h1>
            <p className="text-xl text-white/70 max-w-3xl">
              Derneğimizi başarıya taşıyan deneyimli ve tutkulu ekibimiz
            </p>
          </div>
        </div>
      </section>

      {/* Board Members Grid */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-mid" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {boardMembers.map((member, index) => (
              <MemberCard key={member.id} member={member} index={index} />
            ))}
          </div>

          {/* Contact CTA */}
          <div className="backdrop-blur-lg bg-gradient-to-br from-ocean-cyan/10 to-ocean-navy/10 border border-ocean-cyan/20 rounded-2xl p-10 text-center opacity-0 animate-slideUp" style={{ animationDelay: '300ms' }}>
            <h3 className="text-3xl font-bold text-white mb-4">Bizimle İletişime Geçin</h3>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Yönetim kurulumuzla iletişime geçmek veya derneğimiz hakkında daha fazla bilgi almak için
            </p>
            <Link href="/iletisim">
              <button className="px-8 py-4 bg-ocean-cyan text-ocean-deep font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 hover:scale-105">
                <span>İletişime Geç</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}