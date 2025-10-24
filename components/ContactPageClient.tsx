'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { ContactInfo } from '@/lib/types/contact';

interface ContactPageProps {
  locale: string;
  contactInfo: ContactInfo | null;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPageClient({ locale, contactInfo }: ContactPageProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const content = {
    tr: {
      breadcrumb: 'Ana Sayfa',
      title: 'İletişim',
      subtitle: 'Sorularınız, önerileriniz veya iş birliği teklifleriniz için bizimle iletişime geçin',
      address: 'Adres',
      phone: 'Telefon',
      email: 'E-posta',
      workingHours: 'Çalışma Saatleri',
      workingHoursContent: 'Pazartesi - Cuma: 09:00 - 18:00',
      formTitle: 'Mesaj Gönderin',
      formSubtitle: 'Aşağıdaki formu doldurarak bize ulaşabilirsiniz',
      nameLabel: 'Ad Soyad',
      namePlaceholder: 'Adınız ve soyadınız',
      emailLabel: 'E-posta',
      emailPlaceholder: 'ornek@email.com',
      phoneLabel: 'Telefon',
      phonePlaceholder: '+90 (5__) ___ __ __',
      subjectLabel: 'Konu',
      subjectPlaceholder: 'Konu seçiniz',
      messageLabel: 'Mesajınız',
      messagePlaceholder: 'Mesajınızı buraya yazınız...',
      submitButton: 'Mesaj Gönder',
      submitting: 'Gönderiliyor...',
      successMessage: 'Mesajınız başarıyla gönderildi!',
      errorMessage: 'Bir hata oluştu. Lütfen tekrar deneyin.',
      socialTitle: 'Sosyal Medya',
      socialSubtitle: 'Sosyal medya hesaplarımızdan bizi takip edin',
      quickContactTitle: 'Hızlı İletişim',
      quickContactSubtitle: 'Acil durumlar için doğrudan arayabilirsiniz',
      callNow: 'Hemen Ara',
      mapTitle: 'Konumumuz',
      subjects: [
        'Genel Bilgi',
        'Üyelik',
        'Etkinlikler',
        'Eğitimler',
        'Sponsorluk',
        'Diğer'
      ]
    },
    en: {
      breadcrumb: 'Home',
      title: 'Contact',
      subtitle: 'Get in touch with us for your questions, suggestions or collaboration offers',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      workingHours: 'Working Hours',
      workingHoursContent: 'Monday - Friday: 09:00 - 18:00',
      formTitle: 'Send Message',
      formSubtitle: 'You can reach us by filling out the form below',
      nameLabel: 'Full Name',
      namePlaceholder: 'Your name and surname',
      emailLabel: 'Email',
      emailPlaceholder: 'example@email.com',
      phoneLabel: 'Phone',
      phonePlaceholder: '+90 (5__) ___ __ __',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Select subject',
      messageLabel: 'Your Message',
      messagePlaceholder: 'Write your message here...',
      submitButton: 'Send Message',
      submitting: 'Sending...',
      successMessage: 'Your message has been sent successfully!',
      errorMessage: 'An error occurred. Please try again.',
      socialTitle: 'Social Media',
      socialSubtitle: 'Follow us on our social media accounts',
      quickContactTitle: 'Quick Contact',
      quickContactSubtitle: 'You can call directly for urgent matters',
      callNow: 'Call Now',
      mapTitle: 'Our Location',
      subjects: [
        'General Information',
        'Membership',
        'Events',
        'Training',
        'Sponsorship',
        'Other'
      ]
    }
  };

  const t = content[locale as keyof typeof content] || content.tr;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Strapi'ye form gönderimi eklenecek
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  // Sosyal medya linkleri - Strapi'den
  const socialPlatforms = [
    { 
      name: 'Instagram', 
      url: contactInfo?.instagram,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    { 
      name: 'Facebook', 
      url: contactInfo?.facebook,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    { 
      name: 'Twitter', 
      url: contactInfo?.twitter,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    { 
      name: 'YouTube', 
      url: contactInfo?.youtube,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    { 
      name: 'Next Social', 
      url: contactInfo?.nextSocial,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.87-.96-7-5.54-7-9V8.3l7-3.5 7 3.5V11c0 3.46-3.13 8.04-7 9zm-1-7h2v2h-2v-2zm0-6h2v4h-2V7z"/>
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/gallery/gallery-5.png"
            alt="Contact Background"
            fill
            className="object-cover"
            priority
            quality={75}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/80 via-ocean-deep/85 to-ocean-deep" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6 opacity-0 animate-fadeIn">
            <Link href={`/${locale}`} className="hover:text-ocean-cyan transition-colors">
              {t.breadcrumb}
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/90">{t.title}</span>
          </div>

          {/* Title */}
          <div className="mb-12 opacity-0 animate-slideUp" style={{ animationDelay: '100ms' }}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{t.title}</h1>
            <p className="text-xl text-white/70 max-w-3xl">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      {contactInfo && (
        <section className="relative py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-mid" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {/* Address */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 hover:border-ocean-cyan/30 transition-all opacity-0 animate-fadeIn group">
                <div className="w-14 h-14 rounded-xl bg-ocean-cyan/20 flex items-center justify-center text-ocean-cyan mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-white/95 font-bold text-xl mb-3">{t.address}</h3>
                <p className="text-white/70 leading-relaxed">{contactInfo.addressTR}</p>
              </div>

              {/* Phone */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 hover:border-ocean-cyan/30 transition-all opacity-0 animate-fadeIn group" style={{ animationDelay: '100ms' }}>
                <div className="w-14 h-14 rounded-xl bg-ocean-cyan/20 flex items-center justify-center text-ocean-cyan mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-white/95 font-bold text-xl mb-3">{t.phone}</h3>
                <a href={`tel:${contactInfo.phoneNumber}`} className="block text-ocean-cyan hover:text-ocean-cyan/80 transition-colors font-medium">
                  {contactInfo.phoneNumber}
                </a>
              </div>

              {/* Email */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 hover:border-ocean-cyan/30 transition-all opacity-0 animate-fadeIn group" style={{ animationDelay: '200ms' }}>
                <div className="w-14 h-14 rounded-xl bg-ocean-cyan/20 flex items-center justify-center text-ocean-cyan mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-white/95 font-bold text-xl mb-3">{t.email}</h3>
                <a href={`mailto:${contactInfo.primaryEmail}`} className="block text-ocean-cyan hover:text-ocean-cyan/80 transition-colors font-medium mb-1">
                  {contactInfo.primaryEmail}
                </a>
                {contactInfo.secondaryEmail && (
                  <a href={`mailto:${contactInfo.secondaryEmail}`} className="block text-ocean-cyan hover:text-ocean-cyan/80 transition-colors font-medium">
                    {contactInfo.secondaryEmail}
                  </a>
                )}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form - 2 columns */}
              <div className="lg:col-span-2 opacity-0 animate-slideUp" style={{ animationDelay: '300ms' }}>
                <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <h2 className="text-3xl font-bold text-white mb-3">{t.formTitle}</h2>
                  <p className="text-white/70 mb-8">{t.formSubtitle}</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-white/90 text-sm font-medium mb-2">
                          {t.nameLabel} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-ocean-cyan/50 focus:ring-2 focus:ring-ocean-cyan/20 transition-all"
                          placeholder={t.namePlaceholder}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-2">
                          {t.emailLabel} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-ocean-cyan/50 focus:ring-2 focus:ring-ocean-cyan/20 transition-all"
                          placeholder={t.emailPlaceholder}
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-white/90 text-sm font-medium mb-2">
                          {t.phoneLabel}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-ocean-cyan/50 focus:ring-2 focus:ring-ocean-cyan/20 transition-all"
                          placeholder={t.phonePlaceholder}
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label htmlFor="subject" className="block text-white/90 text-sm font-medium mb-2">
                          {t.subjectLabel} *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-ocean-cyan/50 focus:ring-2 focus:ring-ocean-cyan/20 transition-all"
                        >
                          <option value="" className="bg-ocean-deep">{t.subjectPlaceholder}</option>
                          {t.subjects.map((subject) => (
                            <option key={subject} value={subject} className="bg-ocean-deep">
                              {subject}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-white/90 text-sm font-medium mb-2">
                        {t.messageLabel} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-ocean-cyan/50 focus:ring-2 focus:ring-ocean-cyan/20 transition-all resize-none"
                        placeholder={t.messagePlaceholder}
                      />
                    </div>

                    {/* Success Message */}
                    {submitStatus === 'success' && (
                      <div className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 animate-fadeIn">
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{t.successMessage}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-gradient-to-r from-ocean-cyan to-ocean-navy text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02]"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>{t.submitting}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.submitButton}</span>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Sidebar - 1 column */}
              <div className="space-y-6 opacity-0 animate-slideUp" style={{ animationDelay: '400ms' }}>
                {/* Social Media */}
                <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-3">{t.socialTitle}</h3>
                  <p className="text-white/70 text-sm mb-6">{t.socialSubtitle}</p>
                  <div className="flex flex-wrap gap-3">
                    {socialPlatforms.map((social, index) => (
                      social.url && (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-xl bg-white/5 hover:bg-ocean-cyan/20 border border-white/10 hover:border-ocean-cyan/30 flex items-center justify-center text-white/70 hover:text-ocean-cyan transition-all hover:scale-110"
                          title={social.name}
                        >
                          {social.icon}
                        </a>
                      )
                    ))}
                  </div>
                </div>

                {/* Quick Contact */}
                {contactInfo && (
                  <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-3">{t.quickContactTitle}</h3>
                    <p className="text-white/70 text-sm mb-6">{t.quickContactSubtitle}</p>
                    <a
                      href={`tel:${contactInfo.phoneNumber}`}
                      className="block w-full px-6 py-3 bg-ocean-cyan/20 hover:bg-ocean-cyan/30 border border-ocean-cyan/30 hover:border-ocean-cyan/50 rounded-xl text-ocean-cyan font-semibold text-center transition-all hover:scale-105"
                    >
                      {t.callNow}
                    </a>
                  </div>
                )}

                {/* Map Preview */}
                {contactInfo?.googleMapsUrl && (
                  <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-4">{t.mapTitle}</h3>
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <iframe
                        src={contactInfo.googleMapsUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

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