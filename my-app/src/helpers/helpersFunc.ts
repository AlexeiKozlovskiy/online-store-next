export function bodyNotScroll() {
  document.body.classList.toggle('lock');
}

export function replaceSpace(name: string) {
  return name.replace(/\s+/g, '_');
}
