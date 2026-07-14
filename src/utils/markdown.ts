export interface ListItem {
  readonly title: string;
  readonly anchor: string;
}

const LIST_ITEM_RE = /^\s*[-*]\s+\[(?<title>[^\]]+)]\(#(?<anchor>[^)]+)\)$/gm;

export function parseList(markdown: string): ListItem[] {
  const items: ListItem[] = [];

  for (const match of markdown.matchAll(LIST_ITEM_RE)) {
    const { title, anchor } = match.groups ?? {};
    if (!title || !anchor) continue;

    items.push({ title, anchor });
  }

  return items;
}

export function anchorToFilename(anchor: string): string {
  return `${anchor}.md`;
}

export function filenameToAnchor(filename: string): string {
  return filename.replace(/\.md$/i, "");
}
