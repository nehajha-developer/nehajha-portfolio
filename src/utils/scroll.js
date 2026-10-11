
const MENU_CLOSE_MS = 450;

export function goToSection(event, id, afterClick) {
  event.preventDefault();
  afterClick?.();
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView();
    try {
      window.history.replaceState(null, "", `#${id}`);
    } catch {
      /* ignore */
    }
  }, MENU_CLOSE_MS);
}
