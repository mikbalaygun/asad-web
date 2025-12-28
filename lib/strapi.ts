const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function fetchAPI<T>(
  path: string,
  locale: 'tr' | 'en' = 'tr',
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const url = new URL(`${STRAPI_URL}/api${path}`);

  // Locale'i ekle
  url.searchParams.append('locale', locale);

  // Sadece path'de populate yoksa ekle
  if (!path.includes('populate')) {
    url.searchParams.append('populate', '*');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    ...options.headers,
  };

  const response = await fetch(url.toString(), {
    ...options,
    headers,
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status}`);
  }

  return response.json();
}

export function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}