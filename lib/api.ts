/**
 * Custom API Client - Replaces Strapi API
 * Frontend uses this to fetch data from custom backend
 */

// For server-side calls, use absolute URL. Client-side uses relative.
function getBaseUrl(): string {
    // If NEXT_PUBLIC_API_URL is set, use it
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL;
    }
    // For server-side rendering, always use localhost to avoid DNS/Firewall issues
    if (typeof window === "undefined") {
        return "http://localhost:3000";
    }
    // Client-side: use relative URL
    return "";
}

export interface ApiResponse<T> {
    data: T;
    meta?: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface FetchOptions {
    locale?: "tr" | "en";
    page?: number;
    limit?: number;
    sort?: string;
    search?: string;
    filters?: Record<string, string | number | boolean>;
}

export async function fetchAPI<T>(
    path: string,
    options: FetchOptions = {}
): Promise<ApiResponse<T>> {
    const { locale = "tr", page, limit, sort, search, filters } = options;

    const baseUrl = getBaseUrl();
    const fullPath = `${baseUrl}/api${path}`;

    // Build URL with query params
    const params = new URLSearchParams();
    params.set("locale", locale);
    if (page) params.set("page", String(page));
    if (limit) params.set("limit", String(limit));
    if (sort) params.set("sort", sort);
    if (search) params.set("search", search);
    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            params.set(key, String(value));
        });
    }

    const url = `${fullPath}?${params.toString()}`;

    const response = await fetch(url, {
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json();
}

/**
 * Get media URL - Now uses local uploads
 * Returns empty string for null/undefined to avoid broken image errors
 */
export function getMediaUrl(url: string | null | undefined): string {
    if (!url) return ""; // Return empty string instead of placeholder
    if (url.startsWith("http")) return url;
    return url; // Already relative path like /uploads/...
}
