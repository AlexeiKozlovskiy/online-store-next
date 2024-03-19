export function bodyNotScroll() {
  document.body.classList.toggle('lock');
}

export function replaceSpace(name: string) {
  return name.replace(/\s+/g, '_');
}

export function replaceUnderscore(name: string) {
  return name.replace(/_/g, ' ');
}

export function formatPrice(price: number) {
  return price?.toFixed(2);
}

export function getIDProductFromURL(pathname: string) {
  return pathname
    .split('/')
    .filter((el) => el.length === 36)
    .join('/');
}
