// Only these local approved photographs have generated responsive copies.
export function vehicleImageSrcSet(src: string): string | undefined {
  if (!/^\/vehicles\/benatna\/[^/]+\.webp$/.test(src)) return undefined;
  const stem = src.slice(0, -5);
  const responsive = stem.replace('/benatna/', '/benatna/responsive/');
  return `${responsive}-480.webp 480w, ${responsive}-960.webp 960w, ${src} 1536w`;
}
