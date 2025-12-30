'use client';
import { createContext, useContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dict = Record<string, any>;
const Ctx = createContext<{ locale: 'tr' | 'en'; t: (key: string) => string }>({
  locale: 'tr', t: (k) => k
});

export function I18nProvider({ locale, dict, children }: {
  locale: 'tr' | 'en', dict: Dict, children: React.ReactNode
}) {
  const t = (path: string) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    path.split('.').reduce((acc: any, k) => acc?.[k], dict) ?? path;
  return <Ctx.Provider value={{ locale, t }}>{children}</Ctx.Provider>;
}

export function useT() { return useContext(Ctx).t; }
export function useLocale() { return useContext(Ctx).locale; }
