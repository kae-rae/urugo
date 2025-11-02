
export function priceBedsBaths(rent?: number | null, beds?: number | null, baths?: number | null): string {
  const price = typeof rent === 'number' ? `$${rent.toLocaleString()}/mo` : '$0/mo';
  const parts: string[] = [];
  if (typeof beds === 'number') parts.push(beds === 0 ? 'Studio' : `${beds} bd`);
  if (typeof baths === 'number') parts.push(`${baths} ba`);
  return parts.length ? `${price} • ${parts.join(' • ')}` : price;
}
