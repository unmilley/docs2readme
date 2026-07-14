export interface BlockMarkers {
  readonly start: string;
  readonly end: string;
}

function createMarkers(name: string): BlockMarkers {
  return {
    start: `<!-- docs2readme:${name}:start -->`,
    end: `<!-- docs2readme:${name}:end -->`,
  };
}

export const TABLE_MARKERS = createMarkers("table");

export const DOCS_MARKERS = createMarkers("docs");
