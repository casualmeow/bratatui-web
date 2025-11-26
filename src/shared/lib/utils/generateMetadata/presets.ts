import type { Metadata } from "next";

export const SITE_NAME = "Bratatui";

export const SEO_PRESETS = {
  default: {
    buildTitle: (title: string) => `${SITE_NAME} - ${title}`,
  },

  admin: {
    buildTitle: (_title: string) => `${SITE_NAME} - Admin`,
  },
} as const;

export type SEOPreset = keyof typeof SEO_PRESETS;
