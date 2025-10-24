'use client';

import Image from 'next/image';

interface AtaturkQuoteSectionProps {
  locale: string;
}

export default function AtaturkQuoteSection({ locale }: AtaturkQuoteSectionProps) {
  const content = {
    tr: {
      quote: "Arkadaşlar! En güzel coğrafi vaziyette ve üç tarafı denizle çevrili olan Türkiye; endüstrisi, ticareti ve sporu ile en ileri denizci millet yetiştirmek kabiliyetindedir. Bu kabiliyetten istifadeyi bilmeliyiz; denizciliği, Türkün büyük ülküsü olarak düşünmeli ve onu az zamanda başarmalıyız.",
      author: "Gazi Mustafa Kemal Atatürk"
    },
    en: {
      quote: "Friends! Turkey, located in the most beautiful geographical position and surrounded by sea on three sides, has the capability to raise the most advanced maritime nation with its industry, commerce and sports. We must know how to benefit from this capability; we must think of maritime affairs as the great ideal of the Turk and achieve it in a short time.",
      author: "Gazi Mustafa Kemal Atatürk"
    }
  };

  const t = content[locale as keyof typeof content] || content.tr;

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-mid" />
      
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto opacity-0 animate-fadeIn">
          <div className="relative backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ocean-cyan to-transparent" />
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-ocean-cyan/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-ocean-cyan/10 rounded-full blur-3xl" />
            
            <div className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
              {/* Atatürk Image */}
              <div className="relative shrink-0">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-ocean-cyan/30 shadow-xl">
                  <Image
                    src="/hero/ataturk.png"
                    alt="Mustafa Kemal Atatürk"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                {/* Decorative Corners */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-ocean-cyan/50 rounded-tl-lg" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-ocean-cyan/50 rounded-br-lg" />
              </div>

              {/* Quote Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Quote Icon */}
                <svg className="w-8 h-8 md:w-10 md:h-10 text-ocean-cyan/30 mb-4 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <blockquote className="text-white/90 text-base md:text-lg leading-relaxed mb-6 italic">
                  {t.quote}
                </blockquote>

                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-12 h-[2px] bg-gradient-to-r from-ocean-cyan to-transparent" />
                  <cite className="not-italic text-ocean-cyan font-semibold text-sm md:text-base">
                    {t.author}
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}