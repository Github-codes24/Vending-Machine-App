export function isLandscape(screen: { width: number; height: number }) {
  return screen.width > screen.height;
}

export function isPortrait(screen: { width: number; height: number }) {
  return screen.width < screen.height;
}
