// lib/utils.ts

/**
 * Tarihi locale'e göre formatla
 */
export function formatDate(dateString: string, locale: 'tr' | 'en' = 'tr'): string {
  const date = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  if (locale === 'tr') {
    return date.toLocaleDateString('tr-TR', options);
  }
  
  return date.toLocaleDateString('en-US', options);
}

/**
 * İçeriğe göre okuma süresini hesapla
 */
export function calculateReadTime(content: any[], locale: 'tr' | 'en' = 'tr'): string {
  if (!content || !Array.isArray(content)) {
    return locale === 'tr' ? '5 dk okuma' : '5 min read';
  }

  // Tüm text içeriğini çıkar
  let totalText = '';
  
  const extractText = (blocks: any[]): void => {
    blocks.forEach((block) => {
      if (block.type === 'paragraph' && block.children) {
        block.children.forEach((child: any) => {
          if (child.type === 'text' && child.text) {
            totalText += child.text + ' ';
          }
        });
      } else if (block.type === 'heading' && block.children) {
        block.children.forEach((child: any) => {
          if (child.type === 'text' && child.text) {
            totalText += child.text + ' ';
          }
        });
      } else if (block.type === 'list' && block.children) {
        extractText(block.children);
      } else if (block.type === 'list-item' && block.children) {
        extractText(block.children);
      }
    });
  };

  extractText(content);

  // Kelime sayısını hesapla
  const words = totalText.trim().split(/\s+/).length;
  
  // Ortalama okuma hızı: 200 kelime/dakika
  const minutes = Math.ceil(words / 200);
  
  // Minimum 1 dakika
  const readTime = Math.max(1, minutes);

  if (locale === 'tr') {
    return `${readTime} dk okuma`;
  }
  
  return `${readTime} min read`;
}

/**
 * Slug oluştur (Türkçe karakterleri düzelt)
 */
export function slugify(text: string): string {
  const trMap: { [key: string]: string } = {
    'ç': 'c',
    'ğ': 'g',
    'ı': 'i',
    'ö': 'o',
    'ş': 's',
    'ü': 'u',
    'Ç': 'c',
    'Ğ': 'g',
    'İ': 'i',
    'Ö': 'o',
    'Ş': 's',
    'Ü': 'u',
  };

  return text
    .split('')
    .map((char) => trMap[char] || char)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Text'i kısalt
 */
export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

/**
 * Class name'leri birleştir (conditional)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}