import type { Metadata } from "next";
import { SEO_PRESETS, type SEOPreset } from "./presets";

export type GenerationMetadata = {
  title: string;
  description?: string;
  preset?: SEOPreset;
};

export function buildMetadata(params: GenerationMetadata): Metadata {
  const { title, description, preset } = params;

  const base: Metadata = {
    title,
    description,
  };

  if (!preset) return base;

  const presetConfig = SEO_PRESETS[preset];

  const fullTitle = presetConfig.buildTitle
    ? presetConfig.buildTitle(title)
    : title;

  return {
    ...base,
    title: fullTitle,
  };
}
