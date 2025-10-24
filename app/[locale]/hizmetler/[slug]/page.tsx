// app/[locale]/hizmetler/[slug]/page.tsx
import { getServiceBySlug, getAllServices } from '@/lib/api/services';
import { getStrapiMedia } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import ServiceDetailClient from '@/components/ServiceDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: 'tr' | 'en' }>;
}) {
  const { slug, locale } = await params;
  const service = await getServiceBySlug(slug, locale);

  if (!service) {
    return {
      title: 'Hizmet Bulunamadı | ASAD',
    };
  }

  return {
    title: `${service.title} | ASAD`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: 'tr' | 'en' }>;
}) {
  const { slug, locale } = await params;
  const service = await getServiceBySlug(slug, locale);

  if (!service) {
    notFound();
  }

  // Diğer hizmetleri getir (max 3)
  const allServices = await getAllServices(locale);
  const relatedServices = allServices
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  // İçeriği HTML'e çevir
  let htmlContent = '';
  
  // Eğer description string ise (Long text), direkt paragraf yap
  if (typeof service.description === 'string') {
    // Satır sonlarını <br> veya <p> etiketlerine çevir
    const paragraphs = service.description.split('\n\n');
    htmlContent = paragraphs
      .map(para => {
        if (para.trim().startsWith('-')) {
          // Liste öğelerini ul/li'ye çevir
          const items = para
            .split('\n')
            .filter(line => line.trim().startsWith('-'))
            .map(line => `<li>${line.trim().substring(1).trim()}</li>`)
            .join('');
          return `<ul>${items}</ul>`;
        }
        return `<p>${para.replace(/\n/g, '<br>')}</p>`;
      })
      .join('');
  } else {
    // Rich text blocks ise
    htmlContent = convertBlocksToHTML(service.description);
  }

  const serviceData = {
    id: service.id,
    slug: service.slug,
    title: service.title,
    shortDescription: service.shortDescription,
    description: htmlContent,
    icon: service.icon || 'diving',
    image: service.coverImage ? getStrapiMedia(service.coverImage.url) : undefined,
    localizations: service.localizations || [],
  };

  const formattedRelated = relatedServices.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    shortDescription: item.shortDescription,
    icon: item.icon || 'diving',
    image: item.coverImage ? getStrapiMedia(item.coverImage.url) : undefined,
  }));

  return (
    <ServiceDetailClient 
      service={serviceData} 
      relatedServices={formattedRelated} 
      locale={locale} 
    />
  );
}

// Strapi blocks'u HTML'e çevir
function convertBlocksToHTML(blocks: any): string {
  if (!blocks) return '';
  if (typeof blocks === 'string') return `<p>${blocks}</p>`;
  if (!Array.isArray(blocks)) return '';
  if (blocks.length === 0) return '';

  return blocks
    .map((block) => {
      if (block.type === 'paragraph') {
        const text = block.children
          .map((child: any) => {
            let content = child.text || '';
            if (child.bold) content = `<strong>${content}</strong>`;
            if (child.italic) content = `<em>${content}</em>`;
            if (child.underline) content = `<u>${content}</u>`;
            if (child.strikethrough) content = `<s>${content}</s>`;
            if (child.code) content = `<code>${content}</code>`;
            return content;
          })
          .join('');
        return `<p>${text}</p>`;
      }

      if (block.type === 'heading') {
        const level = block.level || 2;
        const text = block.children.map((child: any) => child.text || '').join('');
        return `<h${level}>${text}</h${level}>`;
      }

      if (block.type === 'quote') {
        const text = block.children.map((child: any) => child.text || '').join('');
        return `<blockquote>${text}</blockquote>`;
      }

      if (block.type === 'list') {
        const tag = block.format === 'ordered' ? 'ol' : 'ul';
        const items = block.children
          .map((item: any) => {
            const text = item.children.map((child: any) => child.text || '').join('');
            return `<li>${text}</li>`;
          })
          .join('');
        return `<${tag}>${items}</${tag}>`;
      }

      return '';
    })
    .join('\n');
}