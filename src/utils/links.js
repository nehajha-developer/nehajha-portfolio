// True only for non-empty strings, so empty links never render as broken buttons.
export const hasLink = (url) =>
  typeof url === "string" && url.trim().length > 0;
