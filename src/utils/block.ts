function getBlockBounds(
  content: string,
  startMarker: string,
  endMarker: string,
): { start: number; end: number } | null {
  const start = content.indexOf(startMarker);
  if (start === -1) return null;

  const end = content.indexOf(endMarker, start + startMarker.length);
  if (end === -1) return null;

  return { start, end };
}

export function hasBlock(
  content: string,
  startMarker: string,
  endMarker: string,
): boolean {
  return getBlockBounds(content, startMarker, endMarker) !== null;
}

export function findBlock(
  content: string,
  startMarker: string,
  endMarker: string,
): string {
  const bounds = getBlockBounds(content, startMarker, endMarker);
  if (!bounds) return "";

  return content.slice(bounds.start + startMarker.length, bounds.end).trim();
}

export function replaceBlock(
  content: string,
  startMarker: string,
  endMarker: string,
  replacement: string,
): string {
  const bounds = getBlockBounds(content, startMarker, endMarker);
  if (!bounds) return content;

  const before = content.slice(0, bounds.start + startMarker.length);
  const after = content.slice(bounds.end);

  return [before, "", replacement.trim(), "", after].join("\n");
}
