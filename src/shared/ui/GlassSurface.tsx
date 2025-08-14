"use client";

import React, { useEffect, useRef, useState, useId } from "react";

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: "R" | "G" | "B";
  yChannel?: "R" | "G" | "B";
  mixBlendMode?: React.CSSProperties["mixBlendMode"];
  className?: string;
  style?: React.CSSProperties;
}

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isDark;
};

export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = "R",
  yChannel = "G",
  mixBlendMode = "difference",
  className = "",
  style = {},
}) => {
  const uniqueId = useId().replace(/:/g, "-");
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const redChannelRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const greenChannelRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const blueChannelRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isBackdropFilterSupported, setIsBackdropFilterSupported] =
    useState(false);
  const [isSVGSupported, setIsSVGSupported] = useState(false);

  const isDarkMode = useDarkMode();

  // Client-side feature detection
  useEffect(() => {
    setIsBackdropFilterSupported(
      CSS?.supports?.("backdrop-filter", "blur(1px)") ||
        CSS?.supports?.("-webkit-backdrop-filter", "blur(1px)") ||
        false,
    );
    setIsSVGSupported(typeof SVGElement !== "undefined");
    setIsMounted(true);
  }, []);

  const updateDisplacementMap = () => {
    if (!containerRef.current || !feImageRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 200;
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

    const svg = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"/>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})"/>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}"/>
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)"/>
      </svg>`;

    const encoded = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    feImageRef.current.setAttribute("href", encoded);
  };

  useEffect(() => {
    if (!isMounted) return;

    updateDisplacementMap();

    [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset },
    ].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute(
          "scale",
          (distortionScale + offset).toString(),
        );
        ref.current.setAttribute("xChannelSelector", xChannel);
        ref.current.setAttribute("yChannelSelector", yChannel);
      }
    });

    if (gaussianBlurRef.current) {
      gaussianBlurRef.current.setAttribute("stdDeviation", displace.toString());
    }
  }, [
    isMounted,
    width,
    height,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    updateDisplacementMap,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode,
  ]);

  useEffect(() => {
    if (!containerRef.current || !isMounted) return;

    let timeoutId: NodeJS.Timeout;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDisplacementMap, 100); // Debounce updates
    });
    observer.observe(containerRef.current);
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [isMounted]);

  if (!isMounted) {
    return null; // Prevent rendering until client-side checks are complete
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden transition-opacity duration-300 ease-out ${className}`}
      style={{
        ...style,
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        borderRadius,
        ...(isSVGSupported
          ? {
              background: isDarkMode
                ? `hsl(0 0% 0% / ${backgroundOpacity})`
                : `hsl(0 0% 100% / ${backgroundOpacity})`,
              backdropFilter: `url(#${filterId}) saturate(${saturation})`,
              boxShadow: isDarkMode
                ? `0 0 2px 1px color-mix(in oklch, white, transparent 65%) inset,
                   0 0 10px 4px color-mix(in oklch, white, transparent 85%) inset,
                   0px 4px 16px rgba(17, 17, 26, 0.05),
                   0px 8px 24px rgba(17, 17, 26, 0.05),
                   0px 16px 56px rgba(17, 17, 26, 0.05),
                   0px 4px 16px rgba(17, 17, 26, 0.05) inset,
                   0px 8px 24px rgba(17, 17, 26, 0.05) inset,
                   0px 16px 56px rgba(17, 17, 26, 0.05) inset`
                : `0 0 2px 1px color-mix(in oklch, black, transparent 85%) inset,
                   0 0 10px 4px color-mix(in oklch, black, transparent 90%) inset,
                   0px 4px 16px rgba(17, 17, 26, 0.05),
                   0px 8px 24px rgba(17, 17, 26, 0.05),
                   0px 16px 56px rgba(17, 17, 26, 0.05),
                   0px 4px 16px rgba(17, 17, 26, 0.05) inset,
                   0px 8px 24px rgba(17, 17, 26, 0.05) inset,
                   0px 16px 56px rgba(17, 17, 26, 0.05) inset`,
            }
          : isBackdropFilterSupported
            ? {
                background: isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(12px) saturate(1.8) brightness(1.1)",
                WebkitBackdropFilter:
                  "blur(12px) saturate(1.8) brightness(1.1)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.2),
                          0 2px 16px 0 rgba(31, 38, 135, 0.1),
                          inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
                          inset 0 -1px 0 0 rgba(255, 255, 255, 0.2)`,
              }
            : {
                background: isDarkMode
                  ? "rgba(0, 0, 0, 0.4)"
                  : "rgba(255, 255, 255, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
                          inset 0 -1px 0 0 rgba(255, 255, 255, 0.3)`,
              }),
      }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 -z-10">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feImage
              ref={feImageRef}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="map"
            />
            <feDisplacementMap
              ref={redChannelRef}
              in="SourceGraphic"
              in2="map"
              result="dispRed"
            />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
              result="red"
            />
            <feDisplacementMap
              ref={greenChannelRef}
              in="SourceGraphic"
              in2="map"
              result="dispGreen"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"
              result="green"
            />
            <feDisplacementMap
              ref={blueChannelRef}
              in="SourceGraphic"
              in2="map"
              result="dispBlue"
            />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"
              result="blue"
            />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur
              ref={gaussianBlurRef}
              in="output"
              stdDeviation="0.7"
            />
          </filter>
        </defs>
      </svg>
      <div className="w-full h-full flex items-center justify-center p-2 rounded-[inherit] relative z-10">
        {children}
      </div>
    </div>
  );
};
